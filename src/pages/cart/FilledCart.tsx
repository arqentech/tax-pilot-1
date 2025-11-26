import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface FilledCartProps {
  items: {
    id: number;
    title: string;
    price: number;
    description: string;
    hours?: string;
  }[];
}

export default function FilledCart({ items }: FilledCartProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const servicesLabel = items.length === 1 ? "service" : "services";

  return (
    <section className="full-bleed bg-[#FBFBFA] py-12 md:py-20">
      <div className="global-container flex flex-col gap-10">
        <div className="text-center space-y-3">
          <h1 className="font-bricolage heading-base">Cart</h1>
          <p className="text-base text-[#5F6057]">
            You have {items.length} {servicesLabel} in your cart
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[18px] border border-[#E6E6E1] bg-white shadow-[0_16px_32px_rgba(15,18,21,0.04)]"
              >
                <header className="flex flex-col gap-3 border-b border-[#E6E6E1] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
                  <h2 className="font-bricolage text-[20px] font-extrabold leading-[25px] text-[#1F201B]">
                    {item.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 md:gap-4 md:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EEFCD7] px-3 py-1 text-xs font-semibold text-[#36500C]">
                      <CheckCircle className="h-4 w-4" />
                      VAT Included
                    </span>
                    {item.hours ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#E9E3FF] px-3 py-1 text-xs font-semibold text-[#4C3A9A] md:hidden lg:inline-flex">
                        <Clock className="h-4 w-4" />
                        {item.hours}
                      </span>
                    ) : null}
                    <span className="font-bricolage text-[24px] font-extrabold leading-[28px] text-[#1F201B]">
                      € {item.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      aria-label="Remove service from cart"
                      className="hidden rounded-full border border-[#E6E6E1] bg-white p-2 text-[#5F6057] transition hover:text-[#0166FF] md:inline-flex"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </header>

                <div className="px-4 py-4 md:px-6 md:py-5">
                  <p className="text-[16px] leading-[24px] text-[#5F6057]">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="block w-full rounded-b-[18px] border-t border-[#E6E6E1] bg-[#FBFBFA] py-3 text-center text-[16px] font-semibold text-[#FF3B30] transition hover:bg-[#F7F7F2] md:hidden"
                  aria-label="Remove service from cart"
                >
                  Remove <Trash2 className="ml-2 inline-block h-4 w-4 align-middle" />
                </button>
              </article>
            ))}
          </div>

          <aside className="w-full lg:w-[360px]">
            <div className="flex flex-col rounded-[20px] border border-[#E6E6E1] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.05)]">
              <header className="border-b border-[#E6E6E1] px-6 py-5">
                <h3 className="font-bricolage text-[20px] font-extrabold leading-[24px] text-[#1F201B]">
                  Summary
                </h3>
              </header>

              <div className="space-y-5 px-6 py-5">
                <div className="space-y-3">
                  <label
                    htmlFor="promo-code"
                    className="text-[14px] font-medium text-[#5F6057]"
                  >
                    Have a discount code?
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="promo-code"
                      placeholder="Enter promo code"
                      className="h-[46px] rounded-[14px] border-[#E6E6E1] bg-[#FBFBFA] text-[16px]"
                    />
                    <Button className="h-[46px] rounded-[14px] bg-[#F6F6F3] px-5 text-[16px] font-semibold text-[#5F6057] hover:bg-[#EDEDE8]">
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#E6E6E1] pt-4 text-[16px] text-[#5F6057]">
                  <div className="flex items-center justify-between">
                    <span>Sub total</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#1F201B]">
                    <span>Total</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="relative flex flex-col items-center gap-4 border-t border-[#E6E6E1] pt-6 text-center">
                  <span className="absolute -left-3 top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-[#FF3B30]" />
                  <p className="text-[14px] font-medium text-[#5F6057]">
                    To continue you need to
                  </p>
                  <Button className="custom-box-shadow h-[60px] w-full rounded-full bg-[#0166FF] text-[18px] font-semibold text-white hover:opacity-95">
                    Login To Your Account
                  </Button>
                  <p className="text-[14px] text-[#5F6057]">
                    New user?{" "}
                    <Link to="/sign-up" className="underline">
                      Create account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
