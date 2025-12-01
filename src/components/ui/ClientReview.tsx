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
        {showBadge && <Badge text="Testimonials" width="146px" center />}

        <div className="text-center mb-10">
          <h2 className="heading-base mb-3">A word from our Clients</h2>
          <p className="text-base max-w-[409px] mx-auto">
            Stories from people who turned complicated taxes into peace of mind
          </p>
        </div>

        <div className="md:hidden overflow-x-auto w-full">
          <div className="flex gap-4 justify-center px-4">
            {reviews.map((r, idx) => (
              <div key={idx} className="min-w-[300px] flex-shrink-0">
                <ReviewCard {...r} />
              </div>
            ))}

            <div className="min-w-[300px] flex-shrink-0">
              <div className="bg-black text-white rounded-[26px] h-[247px] flex flex-col justify-center items-center">
                <h2 className="text-5xl font-bold">4.6</h2>
                <p className="text-sm mt-2">Based on 456 reviews</p>
                <div className="flex mt-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-500 text-2xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-10 w-full">
          {reviews.map((r, idx) => (
            <ReviewCard key={idx} {...r} />
          ))}

          <div className="bg-black text-white w-full max-w-[414px] h-[247px] rounded-[26px] flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold">4.6</h2>
            <p className="text-sm mt-2">Based on 456 reviews</p>
            <div className="flex mt-4 space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-green-500 text-2xl">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
