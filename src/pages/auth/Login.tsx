import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email.trim(),
      password: password,
    };

    loginMutation.mutate(payload, {
      onSuccess: (data) => {
        const token = data.results.access_token;
        const user = data.results.user;

        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user)); // store real user data
        window.dispatchEvent(new Event("auth-changed"));
        navigate("/");
      },
      onError: () => {},
    });
  };

  const isLoading = loginMutation.isPending;
  const isError = loginMutation.isError;
  const errorMessage = "Email or password is incorrect";

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("authToken", tokenResponse.access_token);
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    },
    onError: () => {
      console.log("Google login failed");
    },
  });

  return (
    <div className="w-full flex items-center justify-center bg-[#FFFFFF] py-10">
      <Card className="w-full md:w-auto md:h-[732px] rounded-[26px] border border-[#E7E7E7] p-8 flex-col items-center justify-center">
        <CardHeader className="text-center mb-4">
          <CardTitle className="sub-heading">Login</CardTitle>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-5 flex flex-col items-center">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[60px] bg-[#FBFBFA] rounded-[14px] border border-[#E6E6E1] !text-[18px] placeholder:!text-[#9D9E98]"
            />

            <div className="relative w-full md:w-[466px]">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[60px] bg-[#FBFBFA] rounded-[14px] border border-[#E6E6E1] !text-[18px] pr-12 placeholder:!text-[#9D9E98]"
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

            <div className="w-full flex justify-between items-center text-sm mt-2">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(val) => setRemember(!!val)}
                />
                <Label
                  htmlFor="remember"
                  className="ml-2 text-[14px] md:text-[16px]"
                >
                  Remember me
                </Label>
              </div>

              <Link
                to="/forgot-password"
                className="text-[14px] md:text-[16px] text-[#04226B] hover:underline"
              >
                Forgot your password
              </Link>
            </div>

            {isError && (
              <p className="text-red-500 text-center text-sm">{errorMessage}</p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-5 mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[60px] md:w-[466px] font-bricolage font-extrabold rounded-full text-[#FFFFFF] text-[24px] custom-box-shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Continue"}
            </Button>

            <div className="flex items-center gap-3 text-[#9D9E98]">
              <hr className="flex-1 border-t border-[#E6E6E1]" />
              <span className="text-[20px] leading-[25px]">or</span>
              <hr className="flex-1 border-t border-[#E6E6E1]" />
            </div>

            <Button
              type="button"
              onClick={() => googleLogin()}
              variant="outline"
              className="w-full md:w-[466px] h-[60px] rounded-full bg-[#F6F6F3] border-[#E6E6E1] text-[20px] text-[#5F6057] flex items-center justify-center gap-2"
            >
              <img
                src="/svg/google-icon-logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login With Google
            </Button>

            <p className="text-center text-[18px] leading-[25px]">
              New user?{" "}
              <Link
                to="/sign-up"
                className="italic hover:text-blue-500 underline font-medium"
              >
                Create account
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
