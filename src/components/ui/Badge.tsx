import React from "react";

interface BadgeProps {
  text: string;
  width?: string;
  center?: boolean; // optional: auto-center the badge
}

const Badge: React.FC<BadgeProps> = ({
  text,
  width = "146px",
  center = false,
}) => {
  return (
    <span
      className={`text-[20px] leading-[25px] text-[#5F6057] bg-[#F6F6F3] border border-[#EFEFEB] rounded-[30px] flex items-center justify-center gap-2 ${
        center ? "mx-auto" : ""
      }`}
      style={{
        width,
        height: "34px",
        padding: "10px 18px",
      }}
    >
      {text}
    </span>
  );
};

export default Badge;
