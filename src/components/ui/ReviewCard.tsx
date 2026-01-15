import React from "react";
import CommaSvg from "/svg/comma.svg";

interface ReviewCardProps {
  name: string;
  review: string;
  designation?: string;
  highlight?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  review,
  designation,
  highlight,
}) => {
  const parts = highlight ? review.split(highlight) : [review];

  return (
    <div className="bg-[#F6F6F3] w-full max-w-[414px] h-[300px] rounded-[26px] p-6 flex flex-col justify-between relative">
      <p className="text-[18px] text-[#34352E] leading-relaxed relative pt-12 ">
        <img src={CommaSvg} alt="comma" className="absolute top-4  w-6 h-6" />
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {part}
            {idx !== parts.length - 1 && (
              <span className="bg-green-200 px-1">{highlight}</span>
            )}
          </React.Fragment>
        ))}
      </p>
      <div className="mt-4 font-bricolage text-[#34352E] font-extrabold text-[18px]">
        -{name}
        {designation && `, ${designation}`}
      </div>
    </div>
  );
};
