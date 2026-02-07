import { useCart } from "@/hooks/useCart";
import EmptyCart from "./EmptyCart";
import FilledCart from "./FilledCart";

export default function CartPage() {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <FilledCart items={cartItems} />
  );
}
