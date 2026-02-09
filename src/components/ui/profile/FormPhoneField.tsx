import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface FormPhoneFieldProps {
  label: string;
  value: string;
  onChange: (phone: string) => void;
  disabled?: boolean;
  className?: string;
}

const FormPhoneField: React.FC<FormPhoneFieldProps> = ({
  label,
  value,
  onChange,
  disabled,
  className,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[18px] text-[#34352E]">{label}</label>

      <PhoneInput
        value={value}
        onChange={onChange}
        disabled={disabled}

        // ⭐ EXACT SAME STYLE AS YOUR INPUT FIELDS
        className={`w-[439px] h-[60px] border border-[#E6E6E1] bg-[#FBFBFA] ${className || ""}`}
        
        inputClassName="!h-[60px] !text-[18px] !bg-[#FBFBFA] !border-none placeholder:!text-[#9D9E98]"
      />
    </div>
  );
};

export default FormPhoneField;
