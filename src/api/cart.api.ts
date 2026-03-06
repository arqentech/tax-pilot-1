import { api } from "./axios";
import { CartTokenResponse, CartResponse } from "@/types/cart";

const CART_TOKEN_KEY = "cartToken";

export const getCartToken = async (
  forceNew: boolean = false
): Promise<string> => {
  if (!forceNew) {
    const existingToken = localStorage.getItem(CART_TOKEN_KEY);
    if (existingToken) {
      return existingToken;
    }
  }

  const response = await api.post<CartTokenResponse>("/customer/cart/cart-token");

  if (response.data.status === "success" && response.data.results.token) {
    const token = response.data.results.token;
    localStorage.setItem(CART_TOKEN_KEY, token);
    return token;
  }

  throw new Error("Failed to get cart token");
};

export const getCart = async (
  cartToken: string
): Promise<CartResponse["results"]> => {
  // Get customer_id from stored user data or generate if needed
  const userData = localStorage.getItem("userData");
  const customerId = userData ? JSON.parse(userData).id : "guest";
  
  const response = await api.get<CartResponse>(`/customer/cart/${cartToken}`, {
    params: { customer_id: customerId }
  });

  if (response.data.status === "success") {
    return response.data.results;
  }

  throw new Error("Failed to fetch cart");
};

export const addItemToCart = async (
  serviceId: number
): Promise<{
  cartData: CartResponse["results"];
  message: string;
}> => {
  // Get or create cart token
  const cartToken = await getCartToken();
  
  // Get customer_id from stored user data or generate if needed
  const userData = localStorage.getItem("userData");
  const customerId = userData ? JSON.parse(userData).id : "guest";
  
  const response = await api.post<CartResponse>(`/customer/cart/${cartToken}/item`, 
    {
      item: {
        service_id: serviceId,
      },
    },
    {
      params: { customer_id: customerId }
    }
  );

  if (response.data.status === "success") {
    const cartData = response.data.results;

    if (!cartData) {
      console.error("Cart data is missing from response:", response.data);
      throw new Error("Invalid response: cart data is missing");
    }

    if (!cartData.cart_items || !Array.isArray(cartData.cart_items)) {
      console.log("cart_items missing in response, fetching full cart data...");

      if (cartData.cart_token) {
        localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);

        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          let fullCartData = await getCart(cartData.cart_token);

          if (
            !fullCartData.cart_items ||
            fullCartData.cart_items.length === 0
          ) {
            console.log("Cart still empty after first fetch, retrying...");
            await new Promise((resolve) => setTimeout(resolve, 500));
            fullCartData = await getCart(cartData.cart_token);
          }

          console.log("Fetched cart data:", fullCartData);

          return {
            cartData: {
              ...cartData,
              cart_items: fullCartData.cart_items || [],
            },
            message: response.data.message || "Item added to cart successfully",
          };
        } catch (fetchError) {
          console.error("Failed to fetch cart after adding item:", fetchError);

          return {
            cartData: {
              ...cartData,
              cart_items: [],
            },
            message: response.data.message || "Item added to cart successfully",
          };
        }
      } else {
        return {
          cartData: {
            ...cartData,
            cart_items: [],
          },
          message: response.data.message || "Item added to cart successfully",
        };
      }
    }

    if (cartData.cart_token) {
      localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);
    }
    return {
      cartData,
      message: response.data.message || "Item added to cart successfully",
    };
  }

  throw new Error(response.data.message || "Failed to add item to cart");
};

export const removeItemFromCart = async (
  cartToken: string,
  itemId: number,
  serviceId: number
): Promise<{
  cartData: CartResponse["results"];
  message: string;
}> => {
  // Get customer_id from stored user data or generate if needed
  const userData = localStorage.getItem("userData");
  const customerId = userData ? JSON.parse(userData).id : "guest";
  
  const response = await api.delete<CartResponse>(
    `/customer/cart/${cartToken}/item/${itemId}`,
    {
      params: { customer_id: customerId },
      data: {
        item: {
          service_id: serviceId,
        },
      },
    }
  );

  if (response.data.status === "success") {
    const cartData = response.data.results;

    if (!cartData) {
      console.error("Cart data is missing from response:", response.data);
      throw new Error("Invalid response: cart data is missing");
    }

    if (!cartData.cart_items || !Array.isArray(cartData.cart_items)) {
      console.log(
        "cart_items missing in delete response, fetching full cart data..."
      );

      if (cartData.cart_token) {
        localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);

        try {
          await new Promise((resolve) => setTimeout(resolve, 300));

          const fullCartData = await getCart(cartData.cart_token);

          console.log("Fetched cart data after delete:", fullCartData);

          return {
            cartData: {
              ...cartData,
              cart_items: fullCartData.cart_items || [],
            },
            message:
              response.data.message || "Item removed from cart successfully",
          };
        } catch (fetchError) {
          console.error(
            "Failed to fetch cart after deleting item:",
            fetchError
          );
          return {
            cartData: {
              ...cartData,
              cart_items: [],
            },
            message:
              response.data.message || "Item removed from cart successfully",
          };
        }
      } else {
        return {
          cartData: {
            ...cartData,
            cart_items: [],
          },
          message:
            response.data.message || "Item removed from cart successfully",
        };
      }
    }

    if (cartData.cart_token) {
      localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);
    }

    return {
      cartData,
      message: response.data.message || "Item removed from cart successfully",
    };
  }

  throw new Error(response.data.message || "Failed to remove item from cart");
};

export const clearCartToken = (): void => {
  localStorage.removeItem(CART_TOKEN_KEY);
};

export const getStoredCartToken = (): string | null => {
  return localStorage.getItem(CART_TOKEN_KEY);
};
