import { createContext } from "react";

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

export type CartContextType = {
  cartItems: CartItem[];
  isLoading: boolean;
  cartToken: string | null;
  addToCart: (item: CartItem) => Promise<{ added: boolean; message: string }>;
  removeFromCart: (
    id: string,
  ) => Promise<{ removed: boolean; message: string }>;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;
  refreshCart: (force?: boolean) => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);
