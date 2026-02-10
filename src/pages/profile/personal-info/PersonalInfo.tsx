import React, { useEffect, useState } from "react";
import FormInputField from "@/components/ui/profile/FormInputField";
import FormSelectField from "@/components/ui/profile/FormSelectField";
import { FormFieldConfig, formFields, PersonalInfoFormData } from "./FormField";
import { ChevronRight } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { DashboardLayout } from "../DashboardLayout";

const PersonalInfoPage: React.FC = () => {
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: "",
    surname: "",
    email: "",
    taxId: "",
    phone: "",
    dateOfBirth: "",
    placeOfBirth: "",
    address: "",
    zipCode: "",
    city: "",
    citizenship: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        taxId: user.fiscal_code || "",
        phone: user.phone || "",
        dateOfBirth: user.dob_date || "",
        placeOfBirth: user.dob_city || "",
        address: user.address || "",
        zipCode: "",
        city: "",
        citizenship: user.citizenship || "",
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const commonFieldStyle =
    "w-full max-w-[439px] h-[60px] text-[#9D9E98] font-normal text-[16px] lg:text-[18px] border border-[#E6E6E1] bg-[#FBFBFA] rounded-[14px] px-6 py-4 placeholder:!text-[#9D9E98]";

  const renderField = (field: FormFieldConfig) => {
    const wrapperClass = field.colSpan === "full" ? "md:col-span-2" : "";

    if (field.name === "phone") {
      return (
        <div
          key={field.name}
          className={`${wrapperClass} flex flex-col gap-2 w-full`}
        >
          <label className="text-[18px] text-[#34352E]">{field.label}</label>
          <PhoneInput
            value={formData.phone || ""}
            onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
            placeholder={field.placeholder}
            className="w-full max-w-[439px] !rounded-[14px] !border !border-[#E6E6E1] !bg-[#FBFBFA]"
            inputClassName="!h-[60px] !w-full !text-[16px] lg:!text-[18px] !text-[#9D9E98] font-normal !leading-[24px] !bg-[#FBFBFA] !border-none !px-6 !py-4 !outline-none focus:!ring-1 focus:!ring-[#E6E6E1] placeholder:!text-[#9D9E98]"
            disabled
          />
        </div>
      );
    }

    if (field.type === "input") {
      return (
        <div key={field.name} className={`${wrapperClass} w-full`}>
          <FormInputField
            label={field.label}
            name={field.name}
            type={field.inputType || "text"}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleInputChange}
            disabled
            className={commonFieldStyle}
          />
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={field.name} className={`${wrapperClass} w-full`}>
          <FormSelectField
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleSelectChange}
            disabled={field.disabled}
            className={commonFieldStyle}
          />
        </div>
      );
    }

    return null;
  };

  const handleUpdate = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Information updated successfully!");
  };

  return (
    <div className="w-[80vw]">
      <DashboardLayout>
        <div className="rounded-[16px] border border-[#F0F0ED] p-6 md:p-8 lg:p-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {formFields.map(renderField)}
          </div>

          <div className="mt-8">
            <button
              onClick={handleUpdate}
              className="bg-[#34352E] text-[#F1F1EC] text-[18px] px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90"
            >
              Update Information
              <ChevronRight width={18} />
            </button>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default PersonalInfoPage;
