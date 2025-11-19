import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
  };

  return (
    <div className="w-full flex items-center justify-center bg-[#FFFFFF] py-10">
      <Card className="w-full md:w-auto md:h-[471px] rounded-[26px] border border-[#E7E7E7] p-8 flex-col items-center justify-center">
        <CardHeader className="text-center mb-4">
          <CardTitle className="sub-heading">Lost Password?</CardTitle>
          <span className="max-w-[438px] text-base">
            Enter your email and we'll send you instructions to reset your
            password.
          </span>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 flex flex-col items-center">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[60px] bg-[#FBFBFA] rounded-[14px] border border-[#E6E6E1] text-[18px] leading-[24px] font-normal placeholder-[#9D9E98]"
            />
          </CardContent>

          <CardFooter className="flex flex-col space-y-5 mt-4">
            <Button
              type="submit"
              className="w-full h-[60px] font-bricolage font-extrabold rounded-full text-[#FFFFFF] text-[24px] bg-gradient-to-b from-[#2E2E2E] to-black shadow-md hover:opacity-90"
            >
              Send Reset Link
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
