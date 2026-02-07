import React from "react";
import { Input } from "../Input";

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
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-[18px] text-[#34352E]">{label}</label>
        <Input
          ref={ref}
          className={`w-full rounded-xl border border-[#E6E6E1] px-4 py-3 !text-[18px] placeholder:text-[18px] outline-none focus:ring-2 focus:ring-gray-400 ${className || ""}`}
          {...props}
        />
      </div>
    );
  },
);

FormInputField.displayName = "FormInputField";

export default FormInputField;
