import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/ui/contactUs/ContactForm";
import ContactInfo from "@/components/ui/contactUs/ContactInfo";
import { sendSupportRequest } from "@/api/contact.api";

const initialForm = {
  name: "",
  surname: "",
  email: "",
  message: "",
  order_number: "",
};

export default function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await sendSupportRequest({
        email: form.email.trim(),
        name: form.name.trim(),
        surname: form.surname.trim(),
        message: form.message.trim(),
        order_number: form.order_number.trim() || null,
      });
      setSuccessMessage(
        "La tua richiesta è stata inviata. Ti contatteremo al più presto.",
      );
      setForm(initialForm);
    } catch (err) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      setErrorMessage(
        message ||
          "Si è verificato un errore durante l'invio. Riprova più tardi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full w-auto md:max-w-[874px] flex-col justify-center items-center py-7 mb-10">
      <Card className="w-full px-6 py-3 shadow-lg rounded-[26px] border border-[#E6E6E1] bg-white">
        <CardHeader className="text-center ">
          <CardTitle className="sub-heading font-bricolage">
            Hai bisogno di supporto?
          </CardTitle>
          <div className="text-base  mt-4 md:max-w-[595px] text-justify">
            <p className="text-center">
              Il nostro supporto è attivo dal lunedì al venerdì. Puoi
              contattarci tramite chat o compilare il modulo per ricevere
              assistenza.
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col">
          {successMessage && (
            <p className="text-center text-green-600 font-medium mb-4">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-center text-red-600 font-medium mb-4">
              {errorMessage}
            </p>
          )}
          <ContactForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isMobile={false}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
      <ContactInfo />
    </div>
  );
}
