import { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
