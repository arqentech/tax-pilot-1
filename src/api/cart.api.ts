import { api } from "./axios";
import { CartTokenResponse, CartResponse } from "@/types/cart";

const CART_TOKEN_KEY = "cartToken";

export const getCartToken = async (forceNew: boolean = false): Promise<string> => {
  if (!forceNew) {
    const existingToken = localStorage.getItem(CART_TOKEN_KEY);
    if (existingToken) {
      return existingToken;
    }
  }

  const response = await api.post<CartTokenResponse>("/cart/cart-token");
  
  if (response.data.status === "success" && response.data.results.token) {
    const token = response.data.results.token;
    localStorage.setItem(CART_TOKEN_KEY, token);
    return token;
  }

  throw new Error("Failed to get cart token");
};

export const addItemToCart = async (serviceId: number): Promise<CartResponse["results"]> => {
  const response = await api.post<CartResponse>("/cart/cart-token", {
    item: {
      service_id: serviceId,
    },
  });

  if (response.data.status === "success") {
    const cartData = response.data.results;
    if (cartData.cart_token) {
      localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);
    }
    return cartData;
  }

  throw new Error(response.data.message || "Failed to add item to cart");
};

export const getCart = async (cartToken: string): Promise<CartResponse["results"]> => {
  const response = await api.get<CartResponse>(`/cart/${cartToken}`);
  
  if (response.data.status === "success") {
    return response.data.results;
  }

  throw new Error("Failed to fetch cart");
};

export const clearCartToken = (): void => {
  localStorage.removeItem(CART_TOKEN_KEY);
};

export const getStoredCartToken = (): string | null => {
  return localStorage.getItem(CART_TOKEN_KEY);
};
