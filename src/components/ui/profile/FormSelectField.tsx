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
      className={`w-full max-w-[439px] h-[60px] text-[16px] lg:text-[18px] text-[#9D9E98] border border-[#E6E6E1] bg-[#FBFBFA] rounded-[14px] px-6 py-4 outline-none focus:ring-1 focus:ring-[#E6E6E1] ${
        className || ""
      }`}
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
