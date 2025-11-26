import { createContext, useContext, useState } from "react";

export interface CartItem {
  id?: string;
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
  addToCart: (item: CartItem) => { added: boolean; message: string };
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const ensureId = (item: CartItem) => ({
  ...item,
  id: item.id ?? crypto.randomUUID(),
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const itemWithId = ensureId(item);
    let added = false;
    setCartItemsState((prev) => {
      const exists = prev.some((existing) => existing.link === itemWithId.link);
      if (exists) {
        return prev;
      }
      added = true;
      return [...prev, itemWithId];
    });
    return {
      added,
      message: added ? "added" : "already",
    };
  };

  const removeFromCart = (id: string) => {
    setCartItemsState((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItemsState([]);
  };

  const setCartItems = (items: CartItem[]) => {
    setCartItemsState(items.map(ensureId));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, setCartItems }}
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
