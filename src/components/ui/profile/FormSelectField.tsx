import React from "react";

interface FormSelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder?: string;
}

const FormSelectField = React.forwardRef<
  HTMLSelectElement,
  FormSelectFieldProps
>(({ label, placeholder, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[18px] text-[#34352E]">{label}</label>
      <select
        ref={ref}
        className={`w-full rounded-xl border border-[#E6E6E1] p-4 py-3 text-[18px] text-[#9D9E98]  outline-none focus:ring-1 focus:ring-[#E6E6E1] ${className || ""}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
      </select>
    </div>
  );
});

FormSelectField.displayName = "FormSelectField";

export default FormSelectField;
