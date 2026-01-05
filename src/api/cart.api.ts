import { api } from "./axios";
import { CartTokenResponse, CartResponse } from "@/types/cart";

const CART_TOKEN_KEY = "cartToken";

/**
 * Get or create a cart token
 * Stores the token in localStorage for persistence
 * @param forceNew - If true, creates a new token even if one exists
 */
export const getCartToken = async (forceNew: boolean = false): Promise<string> => {
  // Check if we already have a token (unless forcing new)
  if (!forceNew) {
    const existingToken = localStorage.getItem(CART_TOKEN_KEY);
    if (existingToken) {
      return existingToken;
    }
  }

  // Create a new cart token
  const response = await api.post<CartTokenResponse>("/cart/cart-token");
  
  if (response.data.status === "success" && response.data.results.token) {
    const token = response.data.results.token;
    localStorage.setItem(CART_TOKEN_KEY, token);
    return token;
  }

  throw new Error("Failed to get cart token");
};

/**
 * Get cart by token
 */
export const getCart = async (cartToken: string): Promise<CartResponse["results"]> => {
  const response = await api.get<CartResponse>(`/cart/${cartToken}`);
  
  if (response.data.status === "success") {
    return response.data.results;
  }

  throw new Error("Failed to fetch cart");
};

/**
 * Clear cart token from localStorage
 */
export const clearCartToken = (): void => {
  localStorage.removeItem(CART_TOKEN_KEY);
};

/**
 * Get stored cart token
 */
export const getStoredCartToken = (): string | null => {
  return localStorage.getItem(CART_TOKEN_KEY);
};
