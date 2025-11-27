import { ArrowRight, BadgeCheck } from "lucide-react";

export default function TaxPilotSection() {
  return (
    <section className="w-full flex justify-center py-10 px-4">
      <div className="bg-[#FFC107] w-full max-w-[430px] lg:max-w-[1200px] rounded-[28px] p-6 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
        <div className="flex-1">
          <h2 className="text-[28px] leading-[32px] font-extrabold text-[#0A0A0A] lg:text-[58px] lg:leading-[59px]">
            Ready to simplify <br /> your taxes with <br /> Tax Pilot?
          </h2>

          <ul className="mt-4 space-y-3 text-[16px] lg:text-[20px] leading-[23px]">
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

          <button className="mt-6 bg-[#007BFF] text-white rounded-full px-6 py-3 font-semibold flex items-center gap-2 shadow-lg hover:bg-[#0068d6] transition">
            Explore Services <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex-1 flex w-full justify-end relative">
          <img
            src="/svg/businesswoman-presents-business-report.svg"
            alt="Tax Illustration"
            className="w-full max-w-[330px] lg:max-w-[500px] mr-[-30px] sm:mr-[-40px] lg:mr-[-60px]"
          />
        </div>
      </div>
    </section>
  );
}
