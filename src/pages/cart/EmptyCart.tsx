import { Handbag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-[155px] h-[155px] rounded-full bg-[#F6F6F3] flex items-center justify-center mb-5">
        <img
          src="/svg/cart.svg"
          alt="empty cart illustration"
          className="h-[84px] w-[76px]"
        />
      </div>

      <h1 className="text-[20px] font-normal text-[#5F6057]">
        Your cart is empty
      </h1>

      <Link to="/services" className="w-full flex justify-center">
        <Button
          className="
            custom-box-shadow 
            w-full max-w-[320px] md:max-w-[466px] 
            h-[60px] 
            mt-6 
            rounded-full 
            text-white text-[20px] md:text-[24px]
            font-bricolage font-extrabold 
            hover:opacity-90
          "
        >
          Choose a Service
        </Button>
      </Link>
    </div>
  );
}
