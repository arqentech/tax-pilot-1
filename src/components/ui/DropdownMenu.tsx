import React, { forwardRef, useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  items: string[];
  onSelect: (key: string) => void;
  wrapperClass?: string;
}

const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      side="bottom"
      align="end"
      collisionPadding={16}
      className={cn(
        "rounded-[32px] border border-[#E6E6E1] bg-[#FFFFFF] p-1 shadow-md max-h-[min(60vh,400px)] overflow-y-auto min-w-[var(--radix-dropdown-menu-trigger-width)] max-w-[min(280px,90vw)]",
        className,
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
      className,
    )}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export default function SimpleDropdown({ items, onSelect, wrapperClass }: DropdownProps) {
  const [selectedItem, setSelectedItem] = useState<string>(items[0]);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div className={cn("flex-shrink-0", wrapperClass)}>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger className="inline-flex items-center justify-center rounded-[48px] bg-[#34352E] w-[45px] h-[45px] md:w-[64px] lg:w-[144px] lg:min-w-[144px] md:h-[64px] text-[#F1F1EC] overflow-hidden">
        <img
          src="/svg/filter-funnel.svg"
          alt="Filter"
          className="w-5 h-5 flex-shrink-0 lg:hidden"
        />

        <span className="hidden lg:inline ml-2 truncate min-w-0 text-left">
          {selectedItem}
        </span>

        <ChevronDown className="hidden lg:inline ml-1 h-4 w-4 flex-shrink-0" />
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item} onClick={() => handleSelect(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
