import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/stripe";
import StripeCheckoutForm from "@/components/ui/StripeCheckoutForm";
import { createPaymentIntent } from "@/api/payment.api";

export default function CheckoutPage() {
  const { cartItems, cartToken, isLoading: cartLoading } = useCart();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const servicesLabel = cartItems.length === 1 ? "service" : "services";

  const initializePaymentIntent = useCallback(
    async (showLoading = true) => {
      if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        setError(
          "Stripe is not configured. Please add VITE_STRIPE_PUBLISHABLE_KEY to your .env file.",
        );
        if (showLoading) setLoading(false);
        return;
      }

      if (cartLoading) {
        return;
      }

      const tokenToUse = cartToken || localStorage.getItem("cartToken");

      if (!tokenToUse || cartItems.length === 0) {
        if (showLoading) setLoading(false);
        if (!tokenToUse && !cartLoading) {
          setError(
            "Cart token is missing. Please wait a moment or add items to cart.",
          );
        }
        return;
      }

      try {
        if (showLoading) {
          setLoading(true);
        }
        setError(null);

        const result = await createPaymentIntent({
          cart_token: tokenToUse,
        });

        setClientSecret(result.client_secret);
        if (result.payment_intent_id) {
          setPaymentIntentId(result.payment_intent_id);
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Failed to initialize payment. Please check your backend API endpoint.";
        setError(errorMsg);
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [cartToken, cartItems.length, cartLoading],
  );

  useEffect(() => {
    if (cartLoading) {
      return;
    }

    if (!cartToken && cartItems.length > 0) {
      const storedToken = localStorage.getItem("cartToken");
      if (storedToken) {
        setTimeout(() => initializePaymentIntent(), 500);
        return;
      }
    }

    if (cartToken && cartItems.length > 0) {
      initializePaymentIntent();
    }
  }, [cartToken, cartItems.length, cartLoading, initializePaymentIntent]);

  const handlePaymentSuccess = async (stripePaymentIntentId?: string) => {
    const finalPaymentIntentId = stripePaymentIntentId || paymentIntentId;
    navigate("/checkout/success", {
      state: { paymentIntentId: finalPaymentIntentId || "completed" },
    });
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

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
    <section className="py-10 ">
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
                Payment Information
              </h2>
              <div className="space-y-4">
                {error && (
                  <div className="rounded-[14px] border border-red-200 bg-red-50 p-4">
                    <p className="text-[14px] text-red-600">{error}</p>
                  </div>
                )}

                {loading || cartLoading ? (
                  <div className="rounded-[14px] border border-[#E6E6E1] bg-white p-8 min-h-[200px] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <p className="text-[16px] text-[#9D9E98]">
                        {cartLoading
                          ? "Loading cart..."
                          : "Loading payment form..."}
                      </p>
                      {cartLoading && (
                        <p className="text-[12px] text-[#9D9E98]">
                          Please wait while we prepare your cart
                        </p>
                      )}
                    </div>
                  </div>
                ) : clientSecret ? (
                  <Elements
                    key={clientSecret}
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#0166FF",
                          borderRadius: "14px",
                        },
                      },
                    }}
                  >
                    <StripeCheckoutForm
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      clientSecret={clientSecret}
                    />
                  </Elements>
                ) : (
                  <div className="rounded-[14px] border border-[#E6E6E1] bg-white p-8 min-h-[200px] flex items-center justify-center">
                    <p className="text-[16px] text-[#9D9E98] text-center">
                      {error ? "Unable to load payment form" : "Loading payment form..."}
                    </p>
                  </div>
                )}
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
                        <span className="font-semibold">
                          € {item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#E6E6E1] pt-4 text-[16px] text-[#5F6057]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#1F201B] text-[18px] pt-2 border-t border-[#E6E6E1]">
                    <span>Total</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-[12px] text-[#9D9E98] text-center mb-2">
                    Complete payment using the form on the left
                  </p>
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
