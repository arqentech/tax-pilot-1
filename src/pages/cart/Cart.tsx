import { useCart } from "@/contexts/CartContext";
import EmptyCart from "./EmptyCart";
import FilledCart from "./FilledCart";

export default function CartPage() {
  const { cartItems } = useCart();

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <FilledCart items={cartItems} />
  );
}
