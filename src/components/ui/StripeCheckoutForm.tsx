import { useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function StripeCheckoutForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Stripe payment will be enabled after client keys are provided.");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-[14px] border border-[#E6E6E1] bg-white p-8 min-h-[200px] flex items-center justify-center">
        <p className="text-[16px] text-[#9D9E98] text-center">
          Payment form placeholder (mocked)
        </p>
      </div>
      <PrimaryButton
        text={loading ? "Processing..." : "Complete Payment"}
        width="100%"
        disabled={loading}
      />
    </form>
  );
}
