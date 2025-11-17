import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/ui/contactUs/ContactForm";
import ContactInfo from "@/components/ui/contactUs/ContactInfo";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
  };

  return (
    <div className="w-full w-auto md:max-w-[874px] md:h-[817px] flex-col justify-center items-center py-10 mb-10">
      <Card className="w-full p-6 md:p-10 shadow-lg rounded-[26px] border border-[#E6E6E1] bg-white">
        <CardHeader className="text-center ">
          <CardTitle className="sub-heading ">
            Do you need assistance?
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Our chat is available Monday to Friday. Outside these hours, email
            us.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col ">
          <ContactForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isMobile={false}
          />
        </CardContent>
      </Card>
      <ContactInfo isMobile={false} />
    </div>
  );
}
