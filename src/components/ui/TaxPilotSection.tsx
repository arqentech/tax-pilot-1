import { ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

export default function TaxPilotSection() {
  return (
    <section className="w-full flex justify-center py-10 ">
      <div className="bg-[#FFC107] w-full lg:max-w-full rounded-[28px] p-6 flex flex-col justify-center lg:flex-row lg:items-center ">
        <div className="flex-1">
          <h2 className="sub-heading ">
            Ready to simplify your taxes with Tax Pilot?
          </h2>

          <ul className="mt-4 py-5 text-[16px] lg:text-[20px] leading-[23px]">
            <li className="flex items-center gap-3">
              <BadgeCheck color="#0AD6A1" width={20} />
              <span>Upload. Done. Relax</span>
            </li>

            <li className="flex items-center gap-3">
              <BadgeCheck color="#0AD6A1" width={20} />
              <span>Anytime, anywhere, any device</span>
            </li>

            <li className="flex items-center gap-3">
              <BadgeCheck color="#0AD6A1" width={20} />
              <span>Data protected by certified experts</span>
            </li>
          </ul>
          <Link to="/services">
            <PrimaryButton text="Explore Services" width="262px" />
          </Link>
        </div>

        <div className="flex-1 flex w-full justify-center lg:justify-end py-5">
          <img
            src="/svg/businesswoman-presents-business-report.svg"
            alt="Tax Illustration"
            className="w-full max-w-[500px] lg:max-w-[604px] mr-[-60px] lg:mr-[-40px] "
          />
        </div>
      </div>
    </section>
  );
}
