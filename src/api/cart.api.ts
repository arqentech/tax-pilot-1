import { api } from "./axios";
import { CartResponse, CartTokenResponse } from "@/types/cart";

const CART_TOKEN_KEY = "cartToken";
const CART_ID_KEY = "cartId";

interface CartAvailableResponse {
  cart?: {
    id: number;
    customer_id: string | number | null;
    cart_items?: CartResponse["results"]["cart_items"];
    [key: string]: unknown;
  };
  results?: CartResponse["results"];
}

const getStoredCartToken = (): string | null =>
  localStorage.getItem(CART_TOKEN_KEY);

function getCustomerId(): string {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? String(JSON.parse(userData).id) : "guest";
  } catch {
    return "guest";
  }
}

function normalizeCartResponse(
  data: CartAvailableResponse,
  cartToken?: string,
): CartResponse["results"] {
  const cart = data.cart;
  if (cart) {
    const id = cart.id;
    const cart_token =
      cartToken ??
      (cart.customer_id != null ? String(cart.customer_id) : null) ??
      "";
    const numCustomerId =
      typeof cart.customer_id === "number"
        ? cart.customer_id
        : typeof cart.customer_id === "string" && /^\d+$/.test(cart.customer_id)
          ? parseInt(cart.customer_id, 10)
          : null;
    return {
      id,
      customer_id: numCustomerId,
      cart_token,
      coupon_code:
        (cart as { coupon_code?: string | null }).coupon_code ?? null,
      discount_amount:
        Number(
          (cart as { discount_amount?: string | number }).discount_amount,
        ) || 0,
      total_amount:
        Number((cart as { total_amount?: string | number }).total_amount) || 0,
      paid: (cart as { paid?: boolean }).paid ?? false,
      created_at: (cart as { created_at?: string }).created_at ?? "",
      updated_at: (cart as { updated_at?: string }).updated_at ?? "",
      cart_items: Array.isArray(cart.cart_items) ? cart.cart_items : [],
    };
  }
  if (data.results) return data.results;
  throw new Error("Invalid cart response");
}

/** Get or create a cart token (for refresh/init when no token yet). */
const getCartToken = async (forceNew: boolean = false): Promise<string> => {
  if (!forceNew) {
    const existing = getStoredCartToken();
    if (existing) return existing;
  } else {
    localStorage.removeItem(CART_TOKEN_KEY);
    localStorage.removeItem(CART_ID_KEY);
  }

  try {
    const res = await api.get<CartTokenResponse>("/customer/cart/cart-token");
    if (res.data.status === "success" && res.data.results?.token) {
      const token = res.data.results.token;
      localStorage.setItem(CART_TOKEN_KEY, token);
      return token;
    }
  } catch {
    // Fallback: create cart via /available with customer_id=guest
  }
  const res = await api.get<CartAvailableResponse>("/customer/cart/available", {
    params: { customer_id: getCustomerId() },
  });
  const results = normalizeCartResponse(res.data);
  if (results.id != null && results.cart_token) {
    localStorage.setItem(CART_ID_KEY, String(results.id));
    localStorage.setItem(CART_TOKEN_KEY, results.cart_token);
    return results.cart_token;
  }
  throw new Error("Failed to get cart token");
};

const getCart = async (cartToken: string): Promise<CartResponse["results"]> => {
  const response = await api.get<CartAvailableResponse>(
    "/customer/cart/available",
    {
      params: { customer_id: cartToken },
    },
  );

  const results = normalizeCartResponse(response.data, cartToken);
  if (results.id != null) {
    localStorage.setItem(CART_ID_KEY, String(results.id));
  }
  if (results.cart_token) {
    localStorage.setItem(CART_TOKEN_KEY, results.cart_token);
  }
  return results;
};

const getCartId = async (cartToken: string): Promise<number> => {
  const stored = localStorage.getItem(CART_ID_KEY);
  if (stored) {
    const id = parseInt(stored, 10);
    if (!Number.isNaN(id)) return id;
  }

  const response = await api.get<CartAvailableResponse>(
    "/customer/cart/available",
    {
      params: { customer_id: cartToken },
    },
  );

  const results = normalizeCartResponse(response.data, cartToken);
  if (results.id != null) {
    const cartId = results.id;
    localStorage.setItem(CART_ID_KEY, String(cartId));
    return cartId;
  }

  throw new Error("Failed to fetch cart ID");
};

const addItemToCart = async (
  serviceId: number,
): Promise<{ cartData: CartResponse["results"]; message: string }> => {
  const cartToken = getStoredCartToken() ?? (await getCartToken());
  const cartId = await getCartId(cartToken);

  const response = await api.post<CartResponse | CartAvailableResponse>(
    `/customer/cart/${cartId}/item`,
    { item: { service_id: serviceId } },
    { params: { customer_id: cartToken } },
  );

  const data = response.data as CartResponse | CartAvailableResponse;
  const cartData =
    (data as CartAvailableResponse).cart != null
      ? normalizeCartResponse(data as CartAvailableResponse, cartToken)
      : (data as CartResponse).results;

  if (!cartData) {
    throw new Error(
      (data as CartResponse).message || "Failed to add item to cart",
    );
  }
  if (cartData.cart_token) {
    localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);
  }

  return {
    cartData,
    message: "Item added to cart successfully",
  };
};

const removeItemFromCart = async (
  cartToken: string,
  itemId: number,
  serviceId: number,
): Promise<{ cartData: CartResponse["results"]; message: string }> => {
  const cartId = await getCartId(cartToken);

  const response = await api.delete<CartResponse | CartAvailableResponse>(
    `/customer/cart/${cartId}/item/${itemId}`,
    {
      params: { customer_id: cartToken },
      data: { item: { service_id: serviceId } },
    },
  );

  const data = response.data as CartResponse | CartAvailableResponse;
  const cartData =
    (data as CartAvailableResponse).cart != null
      ? normalizeCartResponse(data as CartAvailableResponse, cartToken)
      : (data as CartResponse).results;

  if (!cartData) {
    throw new Error(
      (data as CartResponse).message || "Failed to remove item from cart",
    );
  }
  if (cartData.cart_token) {
    localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);
  }
  return {
    cartData,
    message: "Item removed from cart successfully",
  };
};

const clearCartToken = (): void => {
  localStorage.removeItem(CART_TOKEN_KEY);
  localStorage.removeItem(CART_ID_KEY);
};

export {
  getCartToken,
  getCart,
  getStoredCartToken,
  getCartId,
  addItemToCart,
  removeItemFromCart,
  clearCartToken,
};
