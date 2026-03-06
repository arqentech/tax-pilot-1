import { api } from "./axios";
import { CartResponse } from "@/types/cart";

const CART_TOKEN_KEY = "cartToken";
const CART_ID_KEY = "cartId";

function getCustomerId(): string {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? String(JSON.parse(userData).id) : "guest";
  } catch {
    return "guest";
  }
}

function getStoredCartToken(): string {
  const token = localStorage.getItem(CART_TOKEN_KEY);
  if (!token) throw new Error("No cart token in localStorage");
  return token;
}

export const getCartId = async (cartToken: string): Promise<number> => {
  const stored = localStorage.getItem(CART_ID_KEY);
  if (stored) {
    const id = parseInt(stored, 10);
    if (!Number.isNaN(id)) return id;
  }

  const customerId = getCustomerId();
  const response = await api.get<CartResponse>("/customer/cart/available", {
    params: { cart_token: cartToken, customer_id: customerId },
  });

  if (response.data.status === "success" && response.data.results.id != null) {
    const cartId = response.data.results.id;
    localStorage.setItem(CART_ID_KEY, String(cartId));
    return cartId;
  }

  throw new Error("Failed to fetch cart ID");
};

export const addItemToCart = async (
  serviceId: number,
): Promise<{ cartData: CartResponse["results"]; message: string }> => {
  const cartToken = getStoredCartToken();
  const cartId = await getCartId(cartToken);
  const customerId = getCustomerId();

  const response = await api.post<CartResponse>(
    `/customer/cart/${cartId}/item`,
    { item: { service_id: serviceId } },
    { params: { customer_id: customerId } },
  );

  if (response.data.status !== "success") {
    throw new Error(response.data.message || "Failed to add item to cart");
  }

  const cartData = response.data.results;

  if (cartData.cart_token)
    localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);

  return {
    cartData,
    message: response.data.message || "Item added to cart successfully",
  };
};
