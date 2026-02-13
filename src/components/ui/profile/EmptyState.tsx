import React from "react";

interface EmptyStateProps {
  message: string;
  className?: string;
  textClassName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  className = "",
  textClassName = "text-[#9D9E98] text-lg",
}) => {
  return (
    <div className={`w-full py-12 text-center ${className}`}>
      <p className={textClassName}>{message}</p>
    </div>
  );
};
