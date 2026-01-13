import React from "react";

interface BadgeProps {
  text: string;
  width?: string;
  center?: boolean;
  bgColor?: string;
  className?: string; // accept extra classes
}

const Badge: React.FC<BadgeProps> = ({
  text,
  width = "146px",
  center = false,
  bgColor = "#F6F6F3",
  className = "",
}) => {
  return (
    <span
      className={`text-[20px] leading-[25px] text-[#5F6057] border border-[#EFEFEB] rounded-[30px] flex items-center justify-center gap-2 ${
        center ? "mx-auto" : ""
      } ${className}`}
      style={{
        width,
        height: "34px",
        padding: "10px 18px",
        backgroundColor: bgColor,
      }}
    >
      {text}
    </span>
  );
};

export default Badge;
