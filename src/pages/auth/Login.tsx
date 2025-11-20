import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="w-full flex items-center justify-center bg-[#FFFFFF] py-10">
      <Card className="w-full md:w-auto md:h-[732px] rounded-[26px] border border-[#E7E7E7] p-8 flex-col items-center justify-center">
        <CardHeader className="text-center mb-4">
          <CardTitle className="sub-heading">Login</CardTitle>
        </CardHeader>

        <form onSubmit={handleLogin} className="">
          <CardContent className="space-y-5 flex flex-col items-center">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[60px] bg-[#FBFBFA] !placeholder-[#9D9E98] rounded-[14px] border border-[#E6E6E1] !text-[18px] !leading-[24px] font-normal placeholder-[#9D9E98]"
            />

            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full md:w-[466px] h-[60px] !placeholder-[#9D9E98] bg-[#FBFBFA] rounded-[14px] border border-[#E6E6E1] !text-[18px] !leading-[24px] font-normal placeholder-text-[14px] "
            />

            <div className="w-full flex justify-between items-center text-sm mt-2">
              <div className="flex items-center ">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(val) => setRemember(!!val)}
                />
                <Label
                  htmlFor="remember"
                  className="text-[14px] md:[16px] leading-[25px] ml-2"
                >
                  Remember me
                </Label>
              </div>

              <Link
                to="/forgot-password"
                className="text-[14px] md:[16px] leading-[25px] text-[#04226B] hover:underline "
              >
                Forgot your password
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-5 mt-4">
            <Button
              type="submit"
              className="w-full h-[60px] md:w-[466px] font-bricolage font-extrabold  rounded-full text-[#FFFFFF] text-[24px] custom-box-shadow hover:opacity-90"
            >
              Continue
            </Button>

            <div className="flex items-center gap-3 text-[#9D9E98]">
              <hr className="flex-1 border-t border-[#E6E6E1] w-[100px]" />
              <span className="text-[20px] leading-[25px]">or</span>
              <hr className="flex-1 border-t border-[#E6E6E1] w-[100px] " />
            </div>

            <Button
              type="button"
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

            <p className="text-center text-[18px] leading-[25px] ">
              New user?{" "}
              <Link
                to="/sign-up"
                className=" text-[18px] leading-[25px] italic hover:text-blue-500 underline font-medium"
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
