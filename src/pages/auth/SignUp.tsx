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

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [surname, setSurname] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, name, surname });
  };

  return (
    <div className=" flex items-center justify-center bg-[#FFFFFF] py-10">
      <Card className="w-full md:w-auto md:h-[892px] rounded-[26px] border border-[#E7E7E7] p-8 flex-col items-center justify-center">
        <CardHeader className="text-center mb-4">
          <CardTitle className="sub-heading">Get Started</CardTitle>
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
              className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
            />

            <div className="flex gap-2">
              <Input
                id="Name"
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
              />{" "}
              <Input
                id="surname"
                type="surname"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
              />
            </div>
            <Input
              id="mobile"
              type="mobile"
              placeholder="Mobile"
              value={password}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
            />
            <div className="w-full md:w-[466px] flex justify-between items-center text-sm mt-2">
              <span>
                I agree to the
                <a
                  href="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>
                and
                <a href="/terms" className="text-blue-500 hover:underline">
                  {" "}
                  Terms{" "}
                </a>
                .
              </span>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-5 mt-4">
            <Button
              type="submit"
              className="w-full h-[60px] md:w-[466px] font-bricolage font-extrabold  rounded-full text-[#FFFFFF] text-[24px] bg-gradient-to-b from-[#2E2E2E] to-black shadow-md hover:opacity-90"
            >
              Sign Up
            </Button>

            <div className="flex items-center gap-3 text-[#9D9E98]">
              <hr className="flex-1 border-t border-[#E6E6E1] w-[100px]" />
              <span className="text-[20px] leading-[25px]">or</span>
              <hr className="flex-1 border-t border-[#E6E6E1] w-[100px] " />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-[400px] md:w-[466px] h-[60px] rounded-full bg-[#F6F6F3] border-[#E6E6E1] text-[20px] text-[#5F6057] flex items-center justify-center gap-2"
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
                to="/login"
                className=" text-[18px] leading-[25px] italic hover:text-blue-500 font-medium underline "
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
