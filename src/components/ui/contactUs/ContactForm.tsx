import { TextArea } from "@/components/ui/TextAreaField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/InputField";

interface ContactFormProps {
  form: {
    name: string;
    surname: string;
    email: string;
    message: string;
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
        placeholder="Nome"
        value={form.name}
        onChange={onChange}
        className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
      />
      <Input
        name="surname"
        placeholder="Cognome"
        value={form.surname}
        onChange={onChange}
        className="bg-[#FBFBFA] rounded-[14px] h-[60px] border border-[#FBFBFA] !text-[18px] placeholder:!text-[#9D9E98]"
      />
      <Input
        name="email"
        placeholder="Indirizzo email"
        value={form.email}
        onChange={onChange}
        className="bg-[#FBFBFA] rounded-[14px] h-[60px] border border-[#FBFBFA] !text-[18px] placeholder:!text-[#9D9E98]"
      />

      <TextArea
        name="message"
        placeholder="Messaggio"
        className={`${
          isMobile ? "h-24" : "h-28"
        } bg-[#FBFBFA] rounded-[14px] border border-[#FBFBFA] placeholder:!text-[#9D9E98] !text-[18px]`}
        value={form.message}
        onChange={onChange}
      />

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
