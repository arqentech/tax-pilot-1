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
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    surname: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className=" flex items-center justify-center bg-[#FFFFFF] py-10">
      <Card className="w-full md:max-w-[650px] md:h-[892px] rounded-[26px] border border-[#E7E7E7] p-8 flex-col items-center justify-center">
        <CardHeader className="text-center mb-4">
          <CardTitle className="sub-heading">Get Started</CardTitle>
        </CardHeader>

        <form onSubmit={handleLogin} className="">
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
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
              />

              <Input
                id="surname"
                name="surname"
                type="text"
                placeholder="Surname"
                value={form.surname}
                onChange={handleChange}
                required
                className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
              />
            </div>

            <Input
              id="mobile"
              name="mobile"
              type="text"
              placeholder="Mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
            />

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-[#FBFBFA] rounded-[14px] !text-[18px] h-[60px] border border-[#FBFBFA] placeholder:!text-[#9D9E98]"
            />

            <div className="w-full md:w-[466px] flex justify-between items-center text-sm mt-2">
              <span>
                I agree to the
                <Link
                  to="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  {" "}
                  Privacy Policy{" "}
                </Link>
                and
                <Link to="/terms" className="text-blue-500 hover:underline">
                  {" "}
                  Terms{" "}
                </Link>
                .
              </span>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-5 mt-4">
            <Button
              type="submit"
              className="w-full h-[60px] md:max-w-[466px] font-bricolage font-extrabold  rounded-full text-[#FFFFFF] text-[24px] custom-box-shadow hover:opacity-90"
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
              className="w-full md:max-w-[466px] h-[60px] rounded-full bg-[#F6F6F3] border-[#E6E6E1] text-[20px] text-[#5F6057] flex items-center justify-center gap-2"
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
