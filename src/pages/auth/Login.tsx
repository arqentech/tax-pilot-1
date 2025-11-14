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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className=" flex items-center justify-center bg-[#FFFFFF] py-10">
      <Card className="w-full md:w-[650px] md:h-[732px] rounded-[26px] border border-[#E7E7E7] p-8 flex-col items-center justify-center">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-[32px] font-semibold text-[#1D1D1D]">
            Login
          </CardTitle>
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
              className="w-[460px] md:w-[466px] h-[60px] bg-[#FBFBFA] rounded-[14px] border border-[#E6E6E1] text-[18px] leading-[24px] font-normal placeholder-[#9D9E98]"
            />

            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[460px] md:w-[466px] h-[60px] bg-[#FBFBFA] rounded-[14px] border border-[#E6E6E1] text-[18px] leading-[24px] font-normal placeholder-text-[14px] placeholder-[#9D9E98]"
            />

            <div className="w-full w-[460px] md:w-[466px] flex justify-between items-center text-sm mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(val) => setRemember(!!val)}
                />
                <Label htmlFor="remember" className="text-gray-600">
                  Remember me
                </Label>
              </div>

              <a href="#" className="text-[13px] text-blue-600 hover:underline">
                Forgot your password
              </a>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-5 mt-4">
            <Button
              type="submit"
              className="h-[55px] rounded-full text-[16px] font-medium text-white
                bg-gradient-to-b from-[#2E2E2E] to-black shadow-md hover:opacity-90"
            >
              Continue
            </Button>

            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <hr className="flex-1 border-gray-300" />
              <span>or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-[55px] rounded-full border-[#E7E7E7] text-[15px] flex items-center justify-center gap-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login With Google
            </Button>

            <p className="text-center text-sm text-gray-700">
              New user?{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Create account
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
