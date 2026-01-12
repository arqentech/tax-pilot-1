import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const servicesLabel = cartItems.length === 1 ? "service" : "services";

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/cart"
            className="text-[#0166FF] hover:underline font-medium"
          >
            Return to cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="pb-16">
      <div className="flex flex-col gap-10">
        <div className="text-center space-y-3">
          <h1 className="font-bricolage heading-base">Checkout</h1>
          <p className="text-base text-[#5F6057]">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-8">
            <div className="rounded-[20px] border border-[#E6E6E1] bg-[#FBFBFA] p-6">
              <h2 className="font-bricolage text-[24px] font-extrabold leading-[28px] text-[#1F201B] mb-6">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-[14px] font-medium text-[#5F6057]">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      className="mt-2 h-[50px] rounded-[14px] border-[#E6E6E1] bg-white text-[16px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-[14px] font-medium text-[#5F6057]">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      className="mt-2 h-[50px] rounded-[14px] border-[#E6E6E1] bg-white text-[16px]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-[14px] font-medium text-[#5F6057]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    className="mt-2 h-[50px] rounded-[14px] border-[#E6E6E1] bg-white text-[16px]"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[14px] font-medium text-[#5F6057]">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="mt-2 h-[50px] rounded-[14px] border-[#E6E6E1] bg-white text-[16px]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-[#E6E6E1] bg-[#FBFBFA] p-6">
              <h2 className="font-bricolage text-[24px] font-extrabold leading-[28px] text-[#1F201B] mb-6">
                Payment Information
              </h2>
              <div className="space-y-4">
                <p className="text-[14px] text-[#5F6057]">
                  Stripe payment integration will be added here
                </p>
                <div className="rounded-[14px] border border-[#E6E6E1] bg-white p-8 min-h-[200px] flex items-center justify-center">
                  <p className="text-[16px] text-[#9D9E98] text-center">
                    Payment form placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full md:w-[360px]">
            <div className="flex flex-col rounded-[20px] border border-[#E6E6E1] bg-[#FBFBFA] sticky top-4">
              <header className="border-b border-[#E6E6E1] px-6 py-5">
                <h3 className="font-bricolage text-[20px] font-extrabold leading-[24px] text-[#1F201B]">
                  Order Summary
                </h3>
              </header>

              <div className="px-6 py-5 space-y-4">
                <div className="space-y-3">
                  <p className="text-[14px] font-medium text-[#5F6057]">
                    {cartItems.length} {servicesLabel}
                  </p>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-[14px] text-[#5F6057]"
                      >
                        <span className="truncate pr-2">{item.title}</span>
                        <span className="font-semibold">€ {item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#E6E6E1] pt-4 text-[16px] text-[#5F6057]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span>€ 0.00</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#1F201B] text-[18px] pt-2 border-t border-[#E6E6E1]">
                    <span>Total</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <PrimaryButton text="Complete Payment" width="100%" />
                </div>

                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-2 text-[14px] text-[#5F6057] hover:text-[#0166FF] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return to cart
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}






