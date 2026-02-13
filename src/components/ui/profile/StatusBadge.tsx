import React from "react";
import { cn } from "@/lib/utils";

export interface StatusBadgeConfig {
  icon: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  width: string;
  textSize: string;
}

interface StatusBadgeProps {
  status: string;
  config: StatusBadgeConfig;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  config,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-[5px] rounded-[21px] border h-[26px] px-3 py-1.5",
        config.width,
        config.textSize,
        className
      )}
      style={{
        color: config.textColor,
        borderColor: config.borderColor,
        backgroundColor: config.bgColor,
      }}
    >
      <img src={config.icon} alt="" className="w-4 h-4 flex-shrink-0" />
      <span>{status}</span>
    </div>
  );
};
