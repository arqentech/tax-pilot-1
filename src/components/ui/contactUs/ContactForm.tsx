import { TextArea } from "@/components/ui/TextAreaField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/InputField";

interface ContactFormProps {
  form: {
    name: string;
    surname: string;
    email: string;
    message: string;
    order_number: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isMobile?: boolean;
  isSubmitting?: boolean;
}

export default function ContactForm({
  form,
  onChange,
  onSubmit,
  isMobile = false,
  isSubmitting = false,
}: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className={`space-y-${isMobile ? "3" : "6"} `}>
      <Input
        name="name"
        placeholder="Nome *"
        required
        value={form.name}
        onChange={onChange}
        className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
      />
      <Input
        name="surname"
        placeholder="Cognome *"
        required
        value={form.surname}
        onChange={onChange}
        className="bg-[#FBFBFA] rounded-[14px] h-[60px] border border-[#FBFBFA] !text-[18px] placeholder:!text-[#9D9E98]"
      />
      <Input
        name="email"
        placeholder="Indirizzo email *"
        required
        value={form.email}
        onChange={onChange}
        className="bg-[#FBFBFA] rounded-[14px] h-[60px] border border-[#FBFBFA] !text-[18px] placeholder:!text-[#9D9E98]"
      />
      <Input
        name="order_number"
        placeholder="Numero Ordine"
        value={form.order_number}
        onChange={onChange}
        className="bg-[#FBFBFA] rounded-[14px] h-[60px] border border-[#FBFBFA] !text-[18px] placeholder:!text-[#9D9E98]"
      />

      <TextArea
        name="message"
        placeholder="Messaggio *"
        required
        className={`${
          isMobile ? "h-24" : "h-28"
        } bg-[#FBFBFA] rounded-[14px] border border-[#FBFBFA] placeholder:!text-[#9D9E98] !text-[18px]`}
        value={form.message}
        onChange={onChange}
      />

      <p className="text-[13px] text-[#9D9E98]">* Campi obbligatori</p>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-[60px] rounded-full bg-[linear-gradient(180deg,#54564A_0%,#34352E_44.72%)] text-[24px] text-white font-bricolage disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Invio in corso..." : "Invia"}
      </Button>
    </form>
  );
}
