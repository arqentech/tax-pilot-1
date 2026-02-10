import React from "react";
import { Input } from "@/components/ui/input";

interface FormInputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

const FormInputField = React.forwardRef<HTMLInputElement, FormInputFieldProps>(
  ({ label, className, ...props }, ref) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[18px] text-[#34352E]">{label}</label>
      <Input
        ref={ref}
        className={`w-full max-w-[439px] h-[60px] text-[#9D9E98] font-normal text-[16px] lg:text-[18px] leading-[24px] placeholder:text-[#9D9E98] border border-[#E6E6E1] bg-[#FBFBFA] rounded-[14px] px-6 py-4 outline-none focus:ring-1 focus:ring-[#E6E6E1] ${className || ""}`}
        {...props}
      />
    </div>
  ),
);

FormInputField.displayName = "FormInputField";
export default FormInputField;
