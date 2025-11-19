import { Handbag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="w-[155px] h-[155px] rounded-full bg-[#F6F6F3] flex items-center justify-center mb-5">
        <img
          src="/svg/cart.svg"
          className="h-[83.88px] w-[76.35px] "
          alt="cart"
        />
      </div>

      <h1 className="text-[20px] font-normal text-[#5F6057] ">Empty Cart</h1>
      <Button
        type="submit"
        className="custom-box-shadow max-w-[244px] h-[60px] mt-6 w-[460px] h-[60px] md:w-[466px] font-bricolage font-extrabold  rounded-full text-[#FFFFFF] text-[24px]  hover:opacity-90"
      >
        Choose a Service
      </Button>
    </div>
  );
}
