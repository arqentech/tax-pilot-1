import React, { useEffect } from "react";
import { Check } from "lucide-react";

interface AddToCartSuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddToCartSuccessDialog({
  open,
  onClose,
}: AddToCartSuccessDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-to-cart-success-title"
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#03F704] border border-[#D9E6C0]">
            <Check className="w-8 h-8 text-[#FFFFFF]" strokeWidth={2.5} />
          </div>
        </div>
        <h2
          id="add-to-cart-success-title"
          className="text-[22px] font-bricolage font-extrabold text-[#34352E] mb-2"
        >
          Thank you
        </h2>
        <p className="text-[#5F6057] text-base mb-6">
          The service is added to cart.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-lg bg-[#037BFF] text-white font-medium hover:bg-blue-400 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
