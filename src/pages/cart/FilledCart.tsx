import { Input } from "@/components/ui/InputField";
import { CircleCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { stripHtml } from "@/lib/utils";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAuth } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FilledCartProps {
  items: {
    id?: string;
    title: string;
    price: number;
    description: string;
    hours?: string;
    link?: string;
    vatIncluded?: boolean;
  }[];
}

export default function FilledCart({ items }: FilledCartProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const servicesLabel = items.length === 1 ? "servizio" : "servizi";
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <section className=" pb-16">
      <div className=" flex flex-col gap-10">
        <div className="text-center space-y-3">
          <h1 className="font-bricolage heading-base">Carrello</h1>
          <p className="text-base text-[#5F6057]">
            Hai {items.length} {servicesLabel} nel tuo carrello
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-4 ">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[18px] border border-[#E6E6E1] bg-white "
              >
                <header className="flex flex-col gap-3 bg-[#F6F6F3] border-b border-[#E6E6E1] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="font-bricolage text-[24px] md:text-[24px] font-extrabold leading-[25px] text-[#1F201B] hover:underline"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <h2 className="font-bricolage text-[24px] md:text-[24px] font-extrabold leading-[25px] text-[#1F201B]">
                      {item.title}
                    </h2>
                  )}

                  <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3 md:gap-4 md:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EEFCD7] px-3 py-1 text-xs font-semibold text-[#36500C]">
                      <CircleCheck className="h-4 w-4" />
                      IVA inclusa
                    </span>
                    {item.hours ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#E9E3FF] px-3 py-1 text-xs font-semibold text-[#4C3A9A] ">
                        <Clock className="h-4 w-4" />
                        {item.hours}
                      </span>
                    ) : null}
                    <span className="font-bricolage text-[24px] font-extrabold leading-[28px] text-[#1F201B]">
                      € {item.price.toFixed(2)}
                    </span>
                  </div>
                </header>

                <div className="px-4 py-4 md:px-6 md:py-5 bg-[#FBFBFA]">
                  <p className="text-[16px] leading-[24px] text-[#5F6057]">
                    {stripHtml(item.description)}
                  </p>
                </div>

                <div className="block md:hidden px-4 py-4 bg-[#FBFBFA] border-t border-[#E6E6E1]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EEFCD7] px-3 py-1 text-xs font-semibold text-[#36500C]">
                      <CircleCheck className="h-4 w-4" />
                      IVA inclusa
                    </span>
                    {item.hours ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#E9E3FF] px-3 py-1 text-xs font-semibold text-[#4C3A9A] ">
                        <Clock className="h-4 w-4" />
                        {item.hours}
                      </span>
                    ) : null}
                    <span className="font-bricolage text-[24px] font-extrabold leading-[28px] text-[#1F201B]">
                      € {item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="w-full md:w-[360px] ">
            <div className="flex flex-col rounded-[20px] border border-[#E6E6E1] bg-[#FBFBFA] ">
              <header className="border-b border-[#E6E6E1] px-6 py-5">
                <h3 className="font-bricolage text-[20px] font-extrabold leading-[24px] text-[#1F201B]">
                  Riepilogo
                </h3>
              </header>

              <div className="space-y-5 px-6 py-5">
                <div className="space-y-3">
                  <label
                    htmlFor="promo-code"
                    className="text-[14px] font-medium text-[#5F6057]"
                  >
                    Hai un codice sconto?
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="promo-code"
                      placeholder="Inserisci codice"
                      className="h-[46px] rounded-[14px] placeholder:text-[#9D9E98] border-[#E6E6E1] bg-[#FBFBFA] text-[16px]"
                    />
                    <Button className="h-[46px] rounded-[14px] bg-[#F6F6F3] px-5 text-[16px] font-semibold text-[#5F6057] hover:bg-[#EDEDE8]">
                      Applica
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#E6E6E1] pt-4 text-[16px] text-[#5F6057]">
                  <div className="flex items-center justify-between">
                    <span>Sub totale</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#1F201B]">
                    <span>Totale</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="relative flex flex-col items-center gap-4 border-t border-[#E6E6E1] pt-6 text-center">
                  {isAuthenticated ? (
                    <PrimaryButton
                      text="Proceed to Checkout"
                      width="291px"
                      onClick={() => navigate("/checkout")}
                    />
                  ) : (
                    <>
                      <p className="text-[14px] font-medium text-[#5F6057]">
                        Per continuare
                      </p>
                      <Link to="/login?redirect=/cart">
                        <PrimaryButton
                          text="Accedi al tuo Account "
                          width="291px"
                        />
                      </Link>
                      <p className="text-[14px] text-[#5F6057]">
                        Nuovo utente?{" "}
                        <Link to="/sign-up" className="underline">
                          Crea un account
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
