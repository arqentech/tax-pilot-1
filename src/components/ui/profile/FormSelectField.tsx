import React from "react";

interface FormSelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder?: string;
}

const FormSelectField = React.forwardRef<
  HTMLSelectElement,
  FormSelectFieldProps
>(({ label, placeholder, className, ...props }, ref) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-[18px] text-[#34352E]">{label}</label>
    <select
      ref={ref}
      className={`w-full h-[60px] text-[#34352E] font-Archivo font-normal text-[18px] leading-[24px] placeholder:text-[#9D9E98] border border-[#E6E6E1] bg-[#FBFBFA] rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#E6E6E1] ${className || ""}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {props.children}
    </select>
  </div>
));

FormSelectField.displayName = "FormSelectField";
export default FormSelectField;
