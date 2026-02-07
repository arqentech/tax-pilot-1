import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useCart } from "@/hooks/useCart";

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const paymentIntentId = location.state?.paymentIntentId;

  useEffect(() => {
    if (paymentIntentId) {
      clearCart();
    }
  }, [paymentIntentId, clearCart]);

  useEffect(() => {
    if (!paymentIntentId) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [paymentIntentId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="rounded-[20px] border border-[#E6E6E1] bg-[#FBFBFA] p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-bricolage text-[32px] font-extrabold text-[#1F201B]">
              Payment Successful!
            </h1>
            <p className="text-[16px] text-[#5F6057]">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {paymentIntentId && (
            <div className="rounded-[14px] border border-[#E6E6E1] bg-white p-4">
              <p className="text-[12px] text-[#9D9E98] mb-1">
                Transaction ID
              </p>
              <p className="text-[14px] font-mono text-[#5F6057] break-all">
                {paymentIntentId}
              </p>
            </div>
          )}

          <div className="space-y-3 pt-4">
            <PrimaryButton
              text="Return to Home"
              width="100%"
              onClick={() => navigate("/")}
            />
            <Link
              to="/services"
              className="block text-center text-[14px] text-[#0166FF] hover:underline"
            >
              Browse More Services
            </Link>
          </div>

          <p className="text-[12px] text-[#9D9E98] pt-4">
            A confirmation email has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}

