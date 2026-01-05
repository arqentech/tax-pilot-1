import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCartToken, getCart, getStoredCartToken } from "@/api/cart.api";
import { CartItemResponse } from "@/types/cart";

export interface CartItem {
  id?: string;
  service_id?: number;
  cart_item_id?: number;
  title: string;
  price: number;
  description: string;
  hours?: string;
  link?: string;
  vatIncluded?: boolean;
  quantity?: number;
}

type CartContextType = {
  cartItems: CartItem[];
  isLoading: boolean;
  cartToken: string | null;
  addToCart: (item: CartItem) => { added: boolean; message: string };
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;
  refreshCart: (force?: boolean) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_ITEMS_STORAGE_KEY = "cartItems";
const CART_DATA_STORAGE_KEY = "cartData"; // Full cart data with timestamp
const CART_SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes - only sync if data is older than this

interface StoredCartData {
  items: CartItem[];
  timestamp: number;
  cartToken: string;
}

const ensureId = (item: CartItem) => ({
  ...item,
  id: item.id ?? (item.cart_item_id ? String(item.cart_item_id) : crypto.randomUUID()),
});

/**
 * Map backend cart item to frontend CartItem format
 */
const mapCartItemFromBackend = (item: CartItemResponse): CartItem => {
  return {
    id: String(item.id),
    cart_item_id: item.id,
    service_id: item.service_id,
    title: item.service.title,
    price: item.price,
    description: item.service.description_short,
    link: `/services/${item.service.identifier}`,
    vatIncluded: true, // Assuming VAT is included based on existing UI
  };
};

/**
 * Save cart items to localStorage with timestamp
 */
const saveCartToStorage = (items: CartItem[], token: string | null): void => {
  try {
    const data: StoredCartData = {
      items,
      timestamp: Date.now(),
      cartToken: token || "",
    };
    localStorage.setItem(CART_DATA_STORAGE_KEY, JSON.stringify(data));
    // Keep backward compatibility
    localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

/**
 * Load cart items from localStorage
 */
const loadCartFromStorage = (): CartItem[] => {
  try {
    // Try new format first
    const storedData = localStorage.getItem(CART_DATA_STORAGE_KEY);
    if (storedData) {
      const data: StoredCartData = JSON.parse(storedData);
      return data.items;
    }
    
    // Fallback to old format for backward compatibility
    const stored = localStorage.getItem(CART_ITEMS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }
  return [];
};

/**
 * Check if stored cart data is stale and needs refresh
 */
const isCartDataStale = (): boolean => {
  try {
    const storedData = localStorage.getItem(CART_DATA_STORAGE_KEY);
    if (!storedData) return true;
    
    const data: StoredCartData = JSON.parse(storedData);
    const age = Date.now() - data.timestamp;
    return age > CART_SYNC_INTERVAL;
  } catch (error) {
    return true;
  }
};

/**
 * Get stored cart token from cart data
 */
const getStoredCartTokenFromData = (): string | null => {
  try {
    const storedData = localStorage.getItem(CART_DATA_STORAGE_KEY);
    if (storedData) {
      const data: StoredCartData = JSON.parse(storedData);
      return data.cartToken || null;
    }
  } catch (error) {
    // Ignore
  }
  return null;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartToken, setCartToken] = useState<string | null>(null);

  /**
   * Fetch cart from backend and update state
   * Only called when explicitly needed (stale data, manual refresh, or first load)
   */
  const refreshCart = useCallback(async (force: boolean = false) => {
    // Don't fetch if data is fresh and not forced
    if (!force && !isCartDataStale()) {
      console.log("Cart data is fresh, skipping backend fetch");
      return;
    }

    try {
      setIsLoading(true);
      const token = cartToken || (await getCartToken());
      setCartToken(token);

      const cartData = await getCart(token);
      const backendItems = cartData.cart_items.map(mapCartItemFromBackend);
      
      // Merge with localStorage backup (prioritize backend, but keep local items not in backend)
      const localItems = loadCartFromStorage();
      const backendServiceIds = new Set(backendItems.map(item => item.service_id));
      
      // Keep local items that aren't in backend (in case backend sync failed)
      const localOnlyItems = localItems.filter(
        item => item.service_id && !backendServiceIds.has(item.service_id)
      );
      
      const mergedItems = [...backendItems, ...localOnlyItems];
      setCartItemsState(mergedItems);
      saveCartToStorage(mergedItems, token);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      // If backend fetch fails, use localStorage backup
      const localItems = loadCartFromStorage();
      if (localItems.length > 0) {
        setCartItemsState(localItems);
        console.warn("Using localStorage backup cart due to backend error");
      } else {
        // If cart fetch fails, try to get a new token
        try {
          localStorage.removeItem("cartToken");
          const newToken = await getCartToken(true);
          setCartToken(newToken);
          setCartItemsState([]);
          saveCartToStorage([], newToken);
        } catch (tokenError) {
          console.error("Failed to get cart token:", tokenError);
          setCartItemsState([]);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [cartToken]);

  /**
   * Initialize cart on mount
   * Loads from localStorage immediately, then syncs with backend only if needed
   */
  useEffect(() => {
    const initializeCart = async () => {
      // Load from localStorage first for instant display (no loading state)
      const localItems = loadCartFromStorage();
      const storedToken = getStoredCartTokenFromData() || getStoredCartToken();
      
      if (localItems.length > 0 || storedToken) {
        setCartItemsState(localItems);
        setCartToken(storedToken);
        setIsLoading(false);
      }

      // Only sync with backend if:
      // 1. No data in localStorage
      // 2. Data is stale (older than 5 minutes)
      // 3. Token changed
      const needsSync = localItems.length === 0 || isCartDataStale() || !storedToken;

      if (needsSync) {
        try {
          // Check for existing token
          const existingToken = storedToken || getStoredCartToken();
          if (existingToken) {
            setCartToken(existingToken);
            // Try to fetch cart with existing token
            try {
              const cartData = await getCart(existingToken);
              const backendItems = cartData.cart_items.map(mapCartItemFromBackend);
              
              // Merge backend with localStorage
              const backendServiceIds = new Set(backendItems.map(item => item.service_id));
              const localOnlyItems = localItems.filter(
                item => item.service_id && !backendServiceIds.has(item.service_id)
              );
              
              const mergedItems = [...backendItems, ...localOnlyItems];
              setCartItemsState(mergedItems);
              saveCartToStorage(mergedItems, existingToken);
              return;
            } catch (error) {
              // Token might be invalid, get a new one
              console.warn("Existing cart token invalid, getting new token");
              localStorage.removeItem("cartToken");
            }
          }

          // Get new token and fetch cart (only if needed)
          await refreshCart(true);
        } catch (error) {
          console.error("Failed to initialize cart:", error);
          // Keep localStorage items if backend fails
        }
      } else {
        console.log("Using cached cart data, skipping backend fetch");
      }
    };

    initializeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (item: CartItem) => {
    const itemWithId = ensureId(item);
    let added = false;
    setCartItemsState((prev) => {
      // Check if item already exists by service_id or link
      const exists = prev.some(
        (existing) =>
          (itemWithId.service_id && existing.service_id === itemWithId.service_id) ||
          (itemWithId.link && existing.link === itemWithId.link)
      );
      if (exists) {
        return prev;
      }
      added = true;
      const newItems = [...prev, itemWithId];
      // Save to localStorage immediately for persistence (with current token)
      saveCartToStorage(newItems, cartToken);
      return newItems;
    });

    // TODO: When POST /cart/:cart_token/items endpoint is available, call it here
    // Example: await addCartItem(cartToken, itemWithId.service_id);

    return {
      added,
      message: added ? "added" : "already",
    };
  };

  const removeFromCart = (id: string) => {
    setCartItemsState((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      // Save to localStorage immediately (with current token)
      saveCartToStorage(newItems, cartToken);
      return newItems;
    });
    
    // TODO: When DELETE /cart/:cart_token/items/:item_id endpoint is available, call it here
    // Example: await removeCartItem(cartToken, id);
  };

  const clearCart = () => {
    setCartItemsState([]);
    // Clear localStorage
    localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
    localStorage.removeItem(CART_DATA_STORAGE_KEY);
    
    // TODO: When DELETE /cart/:cart_token endpoint is available, call it here
    // Example: await clearCartBackend(cartToken);
  };

  const setCartItems = (items: CartItem[]) => {
    setCartItemsState(items.map(ensureId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        cartToken,
        addToCart,
        removeFromCart,
        clearCart,
        setCartItems,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
