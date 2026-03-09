import React from "react";
import { reviews } from "@/data/ReviewsData";
import { ReviewCard } from "./ReviewCard";
import Badge from "./Badge";

interface ClientReviewsProps {
  showBadge?: boolean;
}

const ClientReviews: React.FC<ClientReviewsProps> = ({ showBadge = true }) => {
  return (
    <section className="w-full full-bleed bg-[#FBFBFA] py-16">
      <div className="w-full max-w-[1320px] px-4 mx-auto flex flex-col items-center">
        {showBadge && <Badge text="Testimonianze" width="146px" center />}

        <div className="text-center  mt-6 md:mt-2">
          <h2 className="font-bricolage sub-heading">Cosa dicono di noi</h2>
          <p className="mt-4 text-base max-w-[409px] mx-auto">
            Ogni giorno supportiamo centinaia di persone ad orientarsi nel
            noioso mondo burocratico.
          </p>
        </div>

        <div className="md:hidden w-full overflow-x-auto px-4">
          <div className="flex gap-4 justify-start">
            {reviews.map((r, idx) => (
              <div key={idx} className="max-w-[300px] flex-shrink-0">
                <ReviewCard {...r} />
              </div>
            ))}

            <div className="flex-shrink-0 w-[414px] h-[300px]">
              <div className="bg-[#34352E] text-white rounded-[26px] w-full h-full flex flex-col justify-center items-center">
                <h2 className="text-5xl font-bold text-[#ffffff] font-degular">
                  4.6
                </h2>
                <p className="text-sm mt-2">
                  Basato su
                  <span className="ml-1 underline">456 reviews</span>
                </p>

                <img
                  src="/svg/Stars Combinations 2x.svg"
                  alt="Stars"
                  className="mt-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-10 w-full">
          {reviews.map((r, idx) => (
            <ReviewCard key={idx} {...r} />
          ))}

          <div className="bg-[#34352E] text-white w-full h-[300px] rounded-[26px] flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold text-[#ffffff] font-degular">
              4.6
            </h2>
            <p className="text-sm mt-2 font-light">
              Basato su
              <span className="ml-1 underline font-bold">456 reviews</span>
            </p>

            <img
              src="/svg/Stars Combinations 2x.svg"
              alt="Stars"
              className="mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
