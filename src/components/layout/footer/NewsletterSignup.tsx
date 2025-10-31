import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsletterSignup() {
  return (
    <div>
      <h3 className="font-bricolage font-semibold text-lg md:text-xl leading-tight mb-4">
        Newsletter
      </h3>
      <div className="flex items-center bg-[#D7D7D7] rounded-md overflow-hidden w-full max-w-[300px]">
        <input
          type="email"
          placeholder="Email"
          className="px-3 py-2 w-full text-black bg-transparent outline-none text-sm md:text-base placeholder:text-[#373737]"
          aria-label="Email address"
        />
        <Link
          to="/newsletter"
          className="p-2 flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Subscribe to newsletter"
        >
          <ArrowRight className="text-[#373737] h-4 w-4 md:h-5 md:w-5" />
        </Link>
      </div>
      <p className="mt-2 text-xs sm:text-sm text-[#999999] max-w-[300px]">
        Get exclusive Tax filing updates straight to your inbox
      </p>
    </div>
  );
}
