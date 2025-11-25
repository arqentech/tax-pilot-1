import React, { forwardRef, useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  items: string[];
  onSelect: (key: string) => void;
}

const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "rounded-[32px] border border-[#E6E6E1] bg-[#FFFFFF] p-1 shadow-md",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "cursor-pointer select-none rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export default function SimpleDropdown({ items, onSelect }: DropdownProps) {
  const [selectedItem, setSelectedItem] = useState<string>(items[0]);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className="inline-flex items-center justify-center rounded-[48px] bg-[#34352E] px-3 w-[45px] h-[45px] md:w-[64px] lg:w-[144px] md:h-[64px]  text-[#F1F1EC]">
        <img
          src="/svg/filter-funnel.svg"
          alt="Filter"
          className="w-5 h-5 lg:hidden"
        />

        <span className="hidden lg:inline ml-2">{selectedItem}</span>

        <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item} onClick={() => handleSelect(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuPrimitive.Root>
  );
}
