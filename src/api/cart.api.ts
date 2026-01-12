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

export const getCart = async (cartToken: string): Promise<CartResponse["results"]> => {
  const response = await api.get<CartResponse>(`/cart/${cartToken}`);
  
  if (response.data.status === "success") {
    return response.data.results;
  }

  throw new Error("Failed to fetch cart");
};

export const addItemToCart = async (serviceId: number): Promise<{
  cartData: CartResponse["results"];
  message: string;
}> => {
  const response = await api.post<CartResponse>("/cart/cart-token", {
    item: {
      service_id: serviceId,
    },
  });

  if (response.data.status === "success") {
    const cartData = response.data.results;
    
    // Validate cart data structure
    if (!cartData) {
      console.error("Cart data is missing from response:", response.data);
      throw new Error("Invalid response: cart data is missing");
    }

    // If cart_items is missing, fetch the full cart data
    if (!cartData.cart_items || !Array.isArray(cartData.cart_items)) {
      console.log("cart_items missing in response, fetching full cart data...");
      
      if (cartData.cart_token) {
        localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);
        
        try {
          // Add a small delay to allow backend to process the add operation
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Fetch the full cart to get cart_items, with retry if empty
          let fullCartData = await getCart(cartData.cart_token);
          
          // If cart is still empty, retry once more after a longer delay
          if (!fullCartData.cart_items || fullCartData.cart_items.length === 0) {
            console.log("Cart still empty after first fetch, retrying...");
            await new Promise(resolve => setTimeout(resolve, 500));
            fullCartData = await getCart(cartData.cart_token);
          }
          
          console.log("Fetched cart data:", fullCartData);
          
          // Merge the cart data with cart_items
          return {
            cartData: {
              ...cartData,
              cart_items: fullCartData.cart_items || [],
            },
            message: response.data.message || "Item added to cart successfully",
          };
        } catch (fetchError) {
          console.error("Failed to fetch cart after adding item:", fetchError);
          // Return cart data with empty cart_items array as fallback
          // The CartContext will handle preserving existing items
          return {
            cartData: {
              ...cartData,
              cart_items: [],
            },
            message: response.data.message || "Item added to cart successfully",
          };
        }
      } else {
        // No cart_token, return with empty cart_items
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
  const response = await api.delete<CartResponse>(
    `/cart/${cartToken}/${itemId}`,
    {
      data: {
        item: {
          service_id: serviceId,
        },
      },
    }
  );

  if (response.data.status === "success") {
    const cartData = response.data.results;

    // Validate cart data structure
    if (!cartData) {
      console.error("Cart data is missing from response:", response.data);
      throw new Error("Invalid response: cart data is missing");
    }

    // If cart_items is missing, fetch the full cart data
    if (!cartData.cart_items || !Array.isArray(cartData.cart_items)) {
      console.log("cart_items missing in delete response, fetching full cart data...");

      if (cartData.cart_token) {
        localStorage.setItem(CART_TOKEN_KEY, cartData.cart_token);

        try {
          // Add a small delay to allow backend to process the delete operation
          await new Promise((resolve) => setTimeout(resolve, 300));

          // Fetch the full cart to get cart_items
          const fullCartData = await getCart(cartData.cart_token);

          console.log("Fetched cart data after delete:", fullCartData);

          // Merge the cart data with cart_items
          return {
            cartData: {
              ...cartData,
              cart_items: fullCartData.cart_items || [],
            },
            message: response.data.message || "Item removed from cart successfully",
          };
        } catch (fetchError) {
          console.error("Failed to fetch cart after deleting item:", fetchError);
          // Return cart data with empty cart_items array as fallback
          return {
            cartData: {
              ...cartData,
              cart_items: [],
            },
            message: response.data.message || "Item removed from cart successfully",
          };
        }
      } else {
        // No cart_token, return with empty cart_items
        return {
          cartData: {
            ...cartData,
            cart_items: [],
          },
          message: response.data.message || "Item removed from cart successfully",
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
