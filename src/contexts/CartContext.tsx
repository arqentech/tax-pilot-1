import { useState, useEffect, useCallback } from "react";
import {
  getCartToken,
  getCart,
  getStoredCartToken,
  addItemToCart,
  removeItemFromCart,
  initGuestCart,
  getCartCount,
} from "@/api/cart.api";
import { CartItemResponse, CartItemMetadata } from "@/types/cart";
import { stripHtml } from "@/lib/utils";
import { CartContext, type CartItem } from "./cart-state";

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

const mapCartItemFromBackend = (item: CartItemResponse): CartItem => {
  let hours: string | undefined;
  let vatIncluded: boolean | undefined;

  if (item.service?.hours) {
    hours = item.service.hours;
  }
  if (item.service?.vatIncluded !== undefined) {
    vatIncluded = item.service.vatIncluded;
  }

  if (!hours || vatIncluded === undefined) {
    if (item.metadata && Array.isArray(item.metadata)) {
      const metadataObj = item.metadata.find(
        (m): m is CartItemMetadata => typeof m === "object" && m !== null,
      );
      if (metadataObj) {
        if (!hours && metadataObj.hours) {
          hours = metadataObj.hours;
        }
        if (
          vatIncluded === undefined &&
          metadataObj.vatIncluded !== undefined
        ) {
          vatIncluded = metadataObj.vatIncluded;
        }
      }
    }
  }

  if (vatIncluded === undefined) {
    vatIncluded = true;
  }

  return {
    id: String(item.id),
    cart_item_id: item.id,
    service_id: item.service_id,
    title: item.service?.title ?? "",
    price: item.price,
    description: item.service?.description_short
      ? stripHtml(item.service.description_short)
      : "",
    link: item.service?.identifier ? `/servizi/${item.service.identifier}` : "",
    hours,
    vatIncluded,
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
      const data: StoredCartData = JSON.parse(storedData) as StoredCartData;
      return data.items;
    }

    const stored = localStorage.getItem(CART_ITEMS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as CartItem[];
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

    const data: StoredCartData = JSON.parse(storedData) as StoredCartData;
    const age = Date.now() - data.timestamp;
    return age > CART_SYNC_INTERVAL;
  } catch {
    return true;
  }
};

const getStoredCartTokenFromData = (): string | null => {
  try {
    const storedData = localStorage.getItem(CART_DATA_STORAGE_KEY);
    if (storedData) {
      const data: StoredCartData = JSON.parse(storedData) as StoredCartData;
      return data.cartToken || null;
    }
  } catch {
    // ignore parse errors
  }
  return null;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartToken, setCartToken] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

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
          backendItems.map((item) => item.service_id),
        );

        const localOnlyItems = localItems.filter(
          (item) => item.service_id && !backendServiceIds.has(item.service_id),
        );

        const mergedItems = [...backendItems, ...localOnlyItems];
        setCartItemsState(mergedItems);
        setCartItemCount(mergedItems.length);
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
    [cartToken],
  );

  const refreshCartCount = useCallback(async () => {
    try {
      const token = cartToken || getStoredCartToken();
      if (!token) return;
      const count = await getCartCount(token);
      setCartItemCount(count);
    } catch (error) {
      console.error("Failed to refresh cart count:", error);
    }
  }, [cartToken]);

  useEffect(() => {
    const initializeCart = async () => {
      const localItems = loadCartFromStorage();
      const storedToken = getStoredCartTokenFromData() || getStoredCartToken();

      let effectiveToken = storedToken;
      let tokenWasGuest = false;

      // If we still have the legacy \"guest\" token, drop it and create
      // a fresh anonymous cart token from the backend.
      if (effectiveToken === "guest") {
        try {
          localStorage.removeItem("cartToken");
          localStorage.removeItem("cartId");
          effectiveToken = await initGuestCart();
          tokenWasGuest = true;
        } catch (e) {
          console.error("Failed to reinitialize guest cart token", e);
          effectiveToken = null;
        }
      }

      if (localItems.length > 0 || effectiveToken) {
        setCartItemsState(localItems);
        setCartItemCount(localItems.length);
        setCartToken(effectiveToken);
        setIsLoading(false);
      }

      const needsSync =
        localItems.length === 0 ||
        isCartDataStale() ||
        !effectiveToken ||
        tokenWasGuest;

      if (needsSync) {
        try {
          const existingToken = effectiveToken;
          if (existingToken) {
            setCartToken(existingToken);
            try {
              const cartData = await getCart(existingToken);
              const backendItems = cartData.cart_items.map(
                mapCartItemFromBackend,
              );

              const backendServiceIds = new Set(
                backendItems.map((item) => item.service_id),
              );
              const localOnlyItems = localItems.filter(
                (item) =>
                  item.service_id && !backendServiceIds.has(item.service_id),
              );

              const mergedItems = [...backendItems, ...localOnlyItems];
              setCartItemsState(mergedItems);
              setCartItemCount(mergedItems.length);
              saveCartToStorage(mergedItems, existingToken);
              return;
            } catch {
              console.warn(
                "Failed to fetch cart with existing token, keeping token for redirect",
              );
            }
          }

          if (!existingToken) {
            await refreshCart(true);
          }
        } catch (error) {
          console.error("Failed to initialize cart:", error);
        }
      } else {
        console.log("Using cached cart data, skipping backend fetch");
      }
    };

    initializeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        itemWithId.service_id &&
        existing.service_id === itemWithId.service_id &&
        existing.cart_item_id != null,
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

    setCartItemsState((prev) => {
      const newItems = [...prev, optimisticItem];
      saveCartToStorage(newItems, cartToken);
      return newItems;
    });

    try {
      const { cartData, message } = await addItemToCart(itemWithId.service_id);

      const fetchedCartItems = cartData?.cart_items ?? [];
      let backendItems: CartItem[] = [];
      try {
        backendItems = fetchedCartItems.map(mapCartItemFromBackend);
      } catch (mapError) {
        console.warn(
          "Could not map backend cart items, keeping optimistic cart:",
          mapError,
        );
      }

      let finalItems: CartItem[];

      if (backendItems.length > 0) {
        finalItems = backendItems;
      } else {
        const itemExistsInPrevious = previousItems.some(
          (p) => p.service_id === itemWithId.service_id,
        );
        finalItems = itemExistsInPrevious
          ? previousItems
          : [...previousItems, optimisticItem];
      }

      setCartItemsState(finalItems);
      if (cartData.cart_token) {
        setCartToken(cartData.cart_token);
      }
      saveCartToStorage(finalItems, cartData.cart_token ?? cartToken);

      return {
        added: true,
        message: message,
      };
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      const keptItems = [...previousItems, optimisticItem];
      setCartItemsState(keptItems);
      saveCartToStorage(keptItems, cartToken);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to add item to cart";

      return {
        added: false,
        message: errorMessage,
      };
    }
  };

  const removeFromCart = async (
    id: string,
  ): Promise<{ removed: boolean; message: string }> => {
    const itemToRemove = cartItems.find((item) => item.id === id);

    if (!itemToRemove) {
      console.error("Item not found in cart:", id);
      return {
        removed: false,
        message: "Item not found in cart",
      };
    }

    if (!cartToken) {
      console.error("Cart token is missing");
      setCartItemsState((prev) => {
        const newItems = prev.filter((item) => item.id !== id);
        saveCartToStorage(newItems, cartToken);
        return newItems;
      });
      return {
        removed: false,
        message: "Cart token is missing",
      };
    }

    const cartItemId = itemToRemove.cart_item_id;
    const serviceId = itemToRemove.service_id;

    if (
      !cartItemId ||
      !serviceId ||
      typeof cartItemId !== "number" ||
      typeof serviceId !== "number"
    ) {
      console.error(
        "Missing cart_item_id or service_id for item:",
        itemToRemove,
      );
      setCartItemsState((prev) => {
        const newItems = prev.filter((item) => item.id !== id);
        saveCartToStorage(newItems, cartToken);
        return newItems;
      });
      return {
        removed: false,
        message: "Missing required item information",
      };
    }

    const previousItems = [...cartItems];
    const previousToken = cartToken;

    setCartItemsState((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      saveCartToStorage(newItems, cartToken);
      return newItems;
    });

    try {
      const { cartData, message } = await removeItemFromCart(
        cartToken,
        cartItemId as number,
        serviceId as number,
      );

      const fetchedCartItems = cartData?.cart_items || [];
      const backendItems = fetchedCartItems.map(mapCartItemFromBackend);

      setCartItemsState(backendItems);
      setCartToken(cartData.cart_token);

      saveCartToStorage(backendItems, cartData.cart_token);

      return {
        removed: true,
        message: message,
      };
    } catch (error) {
      console.error("Failed to remove item from cart:", error);

      setCartItemsState(previousItems);
      setCartToken(previousToken);
      saveCartToStorage(previousItems, previousToken);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to remove item from cart";

      return {
        removed: false,
        message: errorMessage,
      };
    }
  };

  const clearCart = useCallback(() => {
    setCartItemsState([]);
    localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
    localStorage.removeItem(CART_DATA_STORAGE_KEY);
  }, []);

  const setCartItems = (items: CartItem[]) => {
    setCartItemsState(items.map(ensureId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        cartToken,
        cartItemCount,
        addToCart,
        removeFromCart,
        clearCart,
        setCartItems,
        refreshCart,
        refreshCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
