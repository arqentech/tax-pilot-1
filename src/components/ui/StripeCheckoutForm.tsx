import { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ChevronRight } from "lucide-react";

interface StripeCheckoutFormProps {
  onSuccess?: (paymentIntentId?: string) => void;
  onError?: (error: string) => void;
  clientSecret?: string;
}

export default function StripeCheckoutForm({
  onSuccess,
  onError,
  clientSecret,
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Payment form is not ready. Please wait a moment and try again.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      interface ElementsWithOptions {
        options?: {
          clientSecret?: string;
        };
      }
      const elementsWithOptions = elements as ElementsWithOptions | null;
      const secret = clientSecret || elementsWithOptions?.options?.clientSecret;
      
      if (!secret) {
        throw new Error("Client secret not found");
      }

      const isSetupIntent = secret.startsWith("seti_");

      if (isSetupIntent) {
        const { error, setupIntent } = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/checkout/success`,
          },
          redirect: "if_required",
        });

        if (error) {
          setErrorMessage(error.message || "Payment setup failed. Please try again.");
          onError?.(error.message || "Payment setup failed");
        } else if (setupIntent && setupIntent.status === "succeeded") {
          onSuccess?.(setupIntent.id);
        } else if (setupIntent && setupIntent.status !== "requires_action") {
          setErrorMessage(`Setup status: ${setupIntent.status}. Please try again.`);
        }
      } else {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/checkout/success`,
          },
          redirect: "if_required",
        });

        if (error) {
          setErrorMessage(error.message || "Payment failed. Please try again.");
          onError?.(error.message || "Payment failed");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          onSuccess?.(paymentIntent.id);
        } else if (paymentIntent && paymentIntent.status !== "requires_action" && paymentIntent.status !== "processing") {
          setErrorMessage(`Payment status: ${paymentIntent.status}. Please try again.`);
        }
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setErrorMessage(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-[14px] border border-[#E6E6E1] bg-white p-6">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {errorMessage && (
        <div className="rounded-[14px] border border-red-200 bg-red-50 p-4">
          <p className="text-[14px] text-red-600">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full h-[62px] rounded-full font-bricolage text-[22px] font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 text-white"
        style={{
          backgroundColor: loading || !stripe || !elements ? "#9D9E98" : "#007BFF",
          boxShadow: loading || !stripe || !elements 
            ? "none" 
            : "0px -3px 3px 0px #5DAAFF inset, 0px 5px 8px 0px #419CFF inset, 0px 6px 10px 0px #037BFF1A",
          cursor: loading || !stripe || !elements ? "not-allowed" : "pointer",
          opacity: loading || !stripe || !elements ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loading && stripe && elements) {
            e.currentTarget.style.backgroundColor = "#0068d6";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && stripe && elements) {
            e.currentTarget.style.backgroundColor = "#007BFF";
          }
        }}
      >
        {loading ? "Processing..." : "Complete Payment"} <ChevronRight size={22} strokeWidth={3} />
      </button>
    </form>
  );
}
