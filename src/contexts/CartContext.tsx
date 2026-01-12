import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getCartToken,
  getCart,
  getStoredCartToken,
  addItemToCart,
} from "@/api/cart.api";
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
  addToCart: (item: CartItem) => Promise<{ added: boolean; message: string }>;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;
  refreshCart: (force?: boolean) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_ITEMS_STORAGE_KEY = "cartItems";
const CART_DATA_STORAGE_KEY = "cartData";
const CART_SYNC_INTERVAL = 5 * 60 * 1000;

interface StoredCartData {
  items: CartItem[];
  timestamp: number;
  cartToken: string;
}

const ensureId = (item: CartItem) => ({
  ...item,
  id:
    item.id ??
    (item.cart_item_id ? String(item.cart_item_id) : crypto.randomUUID()),
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
    vatIncluded: true,
  };
};

const saveCartToStorage = (items: CartItem[], token: string | null): void => {
  try {
    const data: StoredCartData = {
      items,
      timestamp: Date.now(),
      cartToken: token || "",
    };
    localStorage.setItem(CART_DATA_STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedData = localStorage.getItem(CART_DATA_STORAGE_KEY);
    if (storedData) {
      const data: StoredCartData = JSON.parse(storedData);
      return data.items;
    }

    const stored = localStorage.getItem(CART_ITEMS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }
  return [];
};

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

const getStoredCartTokenFromData = (): string | null => {
  try {
    const storedData = localStorage.getItem(CART_DATA_STORAGE_KEY);
    if (storedData) {
      const data: StoredCartData = JSON.parse(storedData);
      return data.cartToken || null;
    }
  } catch (error) {}
  return null;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartToken, setCartToken] = useState<string | null>(null);

  const refreshCart = useCallback(
    async (force: boolean = false) => {
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

        const localItems = loadCartFromStorage();
        const backendServiceIds = new Set(
          backendItems.map((item) => item.service_id)
        );

        const localOnlyItems = localItems.filter(
          (item) => item.service_id && !backendServiceIds.has(item.service_id)
        );

        const mergedItems = [...backendItems, ...localOnlyItems];
        setCartItemsState(mergedItems);
        saveCartToStorage(mergedItems, token);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        const localItems = loadCartFromStorage();
        if (localItems.length > 0) {
          setCartItemsState(localItems);
          console.warn("Using localStorage backup cart due to backend error");
        } else {
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
    },
    [cartToken]
  );

  useEffect(() => {
    const initializeCart = async () => {
      const localItems = loadCartFromStorage();
      const storedToken = getStoredCartTokenFromData() || getStoredCartToken();

      if (localItems.length > 0 || storedToken) {
        setCartItemsState(localItems);
        setCartToken(storedToken);
        setIsLoading(false);
      }

      const needsSync =
        localItems.length === 0 || isCartDataStale() || !storedToken;

      if (needsSync) {
        try {
          const existingToken = storedToken || getStoredCartToken();
          if (existingToken) {
            setCartToken(existingToken);
            try {
              const cartData = await getCart(existingToken);
              const backendItems = cartData.cart_items.map(
                mapCartItemFromBackend
              );

              const backendServiceIds = new Set(
                backendItems.map((item) => item.service_id)
              );
              const localOnlyItems = localItems.filter(
                (item) =>
                  item.service_id && !backendServiceIds.has(item.service_id)
              );

              const mergedItems = [...backendItems, ...localOnlyItems];
              setCartItemsState(mergedItems);
              saveCartToStorage(mergedItems, existingToken);
              return;
            } catch (error) {
              console.warn("Existing cart token invalid, getting new token");
              localStorage.removeItem("cartToken");
            }
          }

          await refreshCart(true);
        } catch (error) {
          console.error("Failed to initialize cart:", error);
        }
      } else {
        console.log("Using cached cart data, skipping backend fetch");
      }
    };

    initializeCart();
  }, []);

  const addToCart = async (item: CartItem) => {
    const itemWithId = ensureId(item);

    if (!itemWithId.service_id) {
      console.error("Cannot add item to cart: service_id is required");
      return {
        added: false,
        message: "error",
      };
    }

    const localExists = cartItems.some(
      (existing) =>
        itemWithId.service_id && existing.service_id === itemWithId.service_id
    );

    if (localExists) {
      return {
        added: false,
        message: "already",
      };
    }

    const optimisticItem: CartItem = {
      ...itemWithId,
      id: itemWithId.id || `temp-${Date.now()}`,
    };

    const previousItems = [...cartItems];
    const previousToken = cartToken;

    setCartItemsState((prev) => {
      const newItems = [...prev, optimisticItem];
      saveCartToStorage(newItems, cartToken);
      return newItems;
    });

    try {
      const cartData = await addItemToCart(itemWithId.service_id);

      const backendItems = cartData.cart_items.map(mapCartItemFromBackend);

      setCartItemsState(backendItems);
      setCartToken(cartData.cart_token);

      saveCartToStorage(backendItems, cartData.cart_token);

      return {
        added: true,
        message: "added",
      };
    } catch (error) {
      console.error("Failed to add item to cart:", error);

      setCartItemsState(previousItems);
      setCartToken(previousToken);
      saveCartToStorage(previousItems, previousToken);

      return {
        added: false,
        message: "error",
      };
    }
  };

  const removeFromCart = (id: string) => {
    setCartItemsState((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      saveCartToStorage(newItems, cartToken);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItemsState([]);
    localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
    localStorage.removeItem(CART_DATA_STORAGE_KEY);
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
