interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  className?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  className,
}) => {
  const mobileLabel = label.split(" ").slice(0, 1).join(" ");
  return (
    <div
      className={`flex  items-center text-[18px] justify-center rounded-[11px] lg:justify-start gap-2 py-3 px-4 cursor-pointer ${
        active
          ? "lg:bg-[#F6F6F3] lg:text-[#34352E] text-[#007BFF]"
          : "hover:bg-[#F6F6F3]"
      } ${className || ""}`}
    >
      <span className="hidden lg:inline">{icon}</span>
      <span className="hidden lg:inline"> {label}</span>
      <span className="inline lg:hidden"> {mobileLabel}</span>
    </div>
  );
};
