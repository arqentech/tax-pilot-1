import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useRegister } from "@/hooks/useRegister";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    name: "",
    surname: "",
    mobile: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const registerMutation = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phone: string) => {
    const cleanedPhone = phone.replace(/[^\d+\s()]/g, "");

    setForm((prev) => ({ ...prev, mobile: cleanedPhone }));
    setPhoneError("");

    if (cleanedPhone.trim()) {
      const digitsOnly = cleanedPhone.replace(/\D/g, "");

      const countryCodeMatch = cleanedPhone.match(/^\+\d{1,4}/);
      const countryCodeLength = countryCodeMatch
        ? countryCodeMatch[0].length - 1
        : 0;

      const nationalNumberLength = digitsOnly.length - countryCodeLength;

      if (nationalNumberLength > 0 && nationalNumberLength < 8) {
        setPhoneError("Phone number must have at least 8 digits");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.mobile.trim()) {
      const digitsOnly = form.mobile.replace(/\D/g, "");
      const countryCodeMatch = form.mobile.match(/^\+\d{1,4}/);
      const countryCodeLength = countryCodeMatch
        ? countryCodeMatch[0].length - 1
        : 0;
      const nationalNumberLength = digitsOnly.length - countryCodeLength;

      if (nationalNumberLength < 8) {
        setPhoneError("Phone number must have at least 8 digits");
        return;
      }
    }

    const payload = {
      email: form.email,
      phone: form.mobile,
      password: form.password,
      name: form.name,
      surname: form.surname,
      accepted_terms_of_use: true,
      accepted_privacy_policy: true,
      accepted_marketing: true,
    };

    registerMutation.mutate(payload, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: () => {},
    });
  };

  const isLoading = registerMutation.isPending;
  const isError = registerMutation.isError;

  const getErrorMessage = () => {
    if (!isError) return "";

    interface ErrorResponse {
      response?: {
        status?: number;
        data?: {
          message?: string;
        };
      };
    }

    const error = registerMutation.error as ErrorResponse | undefined;
    const errorResponse = error?.response;
    const statusCode = errorResponse?.status;
    const backendMessage = errorResponse?.data?.message?.toLowerCase() || "";

    if (statusCode === 409 && backendMessage.includes("email")) {
      return "Email already exists";
    }

    if (statusCode === 409 && backendMessage.includes("phone")) {
      return "Phone number already exists";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) return "Enter correct email";

    return "Something went wrong. Please try again.";
  };

  const errorMessage = getErrorMessage();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("authToken", tokenResponse.access_token);
      localStorage.setItem("tokenTimestamp", Date.now().toString());
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    },
    onError: () => {
      console.log("Google login failed");
    },
  });

  return (
    <div className="flex items-center justify-center bg-[#FFFFFF] py-10">
      <Card className="w-full md:max-w-[650px] md:h-[892px] rounded-[26px] border border-[#E7E7E7] p-8 flex-col items-center justify-center">
        <CardHeader className="text-center mb-4">
          <CardTitle className="sub-heading">Ci siamo!</CardTitle>
        </CardHeader>

        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-5 flex flex-col items-center">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
            />

            <div className="w-full flex gap-6 justify-between">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
              />
              <Input
                id="surname"
                name="surname"
                type="text"
                placeholder="Cognome"
                value={form.surname}
                onChange={handleChange}
                required
                className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
              />
            </div>

            <div className="w-full">
              <PhoneInput
                defaultCountry="it"
                value={form.mobile}
                onChange={handlePhoneChange}
                placeholder="Numero di telefono"
                className="w-full !rounded-[14px] !border !border-[#E6E6E1] !bg-[#FBFBFA]"
                inputClassName="!h-[60px] !text-[18px] !bg-[#FBFBFA] !border-none  placeholder:!text-[#9D9E98]"
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>

            <div className="relative w-full">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center text-[#5F6057]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeClosed className="h-5 w-5" />
                )}
              </button>
            </div>

            {(isError || phoneError) && (
              <p className="text-red-500 text-center text-sm">
                {phoneError || errorMessage}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-5 mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[60px] md:max-w-[466px] font-bricolage font-extrabold rounded-full text-[#FFFFFF] text-[24px] custom-box-shadow hover:opacity-90"
            >
              {isLoading ? "Registrazione..." : "Registrati"}
            </Button>

            <div className="flex items-center gap-3 text-[#9D9E98]">
              <hr className="flex-1 border-t border-[#E6E6E1] w-[100px]" />
              <span className="text-[20px] leading-[25px]">o</span>
              <hr className="flex-1 border-t border-[#E6E6E1] w-[100px]" />
            </div>

            <Button
              type="button"
              onClick={() => googleLogin()}
              variant="outline"
              className="w-full md:max-w-[466px] h-[60px] rounded-full bg-[#F6F6F3] border-[#E6E6E1] text-[20px] text-[#5F6057] flex items-center justify-center gap-2"
            >
              <img
                src="/svg/google-icon-logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login con Google
            </Button>

            <p className="text-center text-[18px] leading-[25px]">
              Hai già un account?{" "}
              <Link
                to="/login"
                className="text-[18px] leading-[25px] italic hover:text-blue-500 font-medium underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
