type FieldType = "input" | "select" | "phone";

export interface FormFieldConfig {
  label: string;
  name: keyof PersonalInfoFormData;
  type: FieldType;
  inputType?: string;
  placeholder?: string;
  disabled?: boolean;
  colSpan?: "full";
}

export interface PersonalInfoFormData {
  name: string;
  surname: string;
  email: string;
  taxId: string;
  phone: string;
  dateOfBirth: string;
  placeOfBirth: string;
  address: string;
  zipCode: string;
  city: string;
  citizenship: string;
}

export const formFields: FormFieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "input",
    placeholder: "Ali",
    disabled: true,
  },
  {
    name: "surname",
    label: "Surname",
    type: "input",
    placeholder: "Sher",
    disabled: true,
  },
  {
    name: "email",
    label: "Email",
    type: "input",
    inputType: "email",
    placeholder: "alisher@triox.io",
    disabled: true,
  },
  {
    name: "taxId",
    label: "Tax ID code",
    type: "input",
    placeholder: "enter here",
    disabled: true,
  },
  {
    name: "phone",
    label: "Phone no",
    type: "input",
    inputType: "tel",
    placeholder: "334 539 6199",
    disabled: true,
  },
  {
    name: "dateOfBirth",
    label: "Date of birth",
    type: "input",
    placeholder: "mm/dd/yyyy",
    disabled: true,
  },

  {
    name: "placeOfBirth",
    label: "Place of birth",
    type: "select",
    placeholder: "Abbadia San Salvatore",
  },
  {
    name: "address",
    label: "Residential address",
    type: "input",
    placeholder: "enter location",
  },
  {
    name: "zipCode",
    label: "Zip code",
    type: "input",
    placeholder: "example: 98168",
  },
  {
    name: "city",
    label: "City of residence",
    type: "select",
    placeholder: "Abbadia San Salvatore",
  },
  {
    name: "citizenship",
    label: "Citizenship",
    type: "select",
    placeholder: "PAPUANA",
    colSpan: "full",
  },
];
