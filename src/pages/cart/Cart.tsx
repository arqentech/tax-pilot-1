import { useCart } from "@/contexts/CartContext";
import EmptyCart from "./EmptyCart";
import { useEffect } from "react";
import FilledCart from "./FilledCart";

export default function CartPage() {
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        title: "ISEE Form for Minors",
        price: 19.5,
        description:
          "The Equivalent Economic Situation Indicator (ISEE) certifies...",
        hours: "Delivered within 48h",
      },
    ];

    setCartItems(dummy); 
  }, []);

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <FilledCart items={cartItems} />
  );
}
