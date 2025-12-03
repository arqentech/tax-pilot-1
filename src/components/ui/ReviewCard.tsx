import React from "react";

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
    <div className="bg-[#F6F6F3] w-[414px] h-[247px] rounded-[26px] p-6 flex flex-col justify-between">
      <p className=" text-[18px] leading-relaxed">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {part}
            {idx !== parts.length - 1 && (
              <span className="bg-green-200 px-1">{highlight}</span>
            )}
          </React.Fragment>
        ))}
      </p>
      <div className="mt-4 font-extrabold text-[18px]">
        -{name}
        {designation && `, ${designation}`}
      </div>
    </div>
  );
};
