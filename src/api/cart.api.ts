import { api } from "./axios";

const CART_ID_KEY = "cartId";

const getCustomerId = (): string => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData).id : "guest";
  } catch {
    return "guest";
  }
};

export const getCartId = async (): Promise<number> => {
  const storedCartId = localStorage.getItem(CART_ID_KEY);

  if (storedCartId) {
    return Number(storedCartId);
  }

  const customerId = getCustomerId();

  const response = await api.get("/customer/cart/available", {
    params: { customer_id: customerId },
  });

  const cartId = response.data?.cart?.id;

  if (!cartId) {
    throw new Error("Cart not found");
  }

  localStorage.setItem(CART_ID_KEY, cartId.toString());

  return cartId;
};

export const getCart = async () => {
  const customerId = getCustomerId();
  const cartId = await getCartId();

  const response = await api.get(`/customer/cart/${cartId}`, {
    params: { customer_id: customerId },
  });

  if (response.data.status === "success") {
    return response.data.results;
  }

  throw new Error(response.data.message || "Failed to fetch cart");
};

export const addItemToCart = async (serviceId: number) => {
  const customerId = getCustomerId();
  const cartId = await getCartId();

  const response = await api.post(
    `/customer/cart/${cartId}/item`,
    {
      item: {
        service_id: serviceId,
      },
    },
    {
      params: { customer_id: customerId },
    },
  );

  if (response.data.status === "success") {
    return {
      cartData: response.data.results,
      message: response.data.message || "Item added to cart",
    };
  }

  throw new Error(response.data.message || "Failed to add item");
};

export const removeItemFromCart = async (itemId: number, serviceId: number) => {
  const customerId = getCustomerId();
  const cartId = await getCartId();

  const response = await api.delete(`/customer/cart/${cartId}/item/${itemId}`, {
    params: { customer_id: customerId },
    data: {
      item: {
        service_id: serviceId,
      },
    },
  });

  if (response.data.status === "success") {
    return {
      cartData: response.data.results,
      message: response.data.message || "Item removed from cart",
    };
  }

  throw new Error(response.data.message || "Failed to remove item");
};

export const clearCart = () => {
  localStorage.removeItem(CART_ID_KEY);
};

export const getStoredCartId = (): number | null => {
  const id = localStorage.getItem(CART_ID_KEY);
  return id ? Number(id) : null;
};
