interface SidebarItemProps {
  label: string;
  active?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  active,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 px-4 py-2 h-[54px] items-center rounded-[11px] cursor-pointer text-[18px] text-[#34352E] ${
        active ? "bg-[#F6F6F3]" : "hover:bg-[#F6F6F3]"
      }`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
