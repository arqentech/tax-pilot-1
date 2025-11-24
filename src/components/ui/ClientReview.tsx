import React from "react";
import { reviews } from "@/data/ReviewsData";
import { ReviewCard } from "./ReviewCard";
import Badge from "./Badge";

interface ClientReviewsProps {
  showBadge?: boolean; 
}

const ClientReviews: React.FC<ClientReviewsProps> = ({ showBadge = true }) => {
  return (
    <section className="hidden lg:w-full lg:flex flex-col items-center py-16">
      {showBadge && <Badge text="Testimonials" width="146px" />}

      <div className="text-center max-w-2xl mb-10">
        <h2 className="heading-base mb-3">A word from our Clients</h2>
        <p className="text-base max-w-[409px]">
          Stories from people who turned complicated taxes into peace of mind
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <ReviewCard key={idx} {...r} />
        ))}

        <div className="bg-black text-white w-[414px] h-[247px] rounded-[26px] flex flex-col justify-center items-center">
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
    </section>
  );
};

export default ClientReviews;
