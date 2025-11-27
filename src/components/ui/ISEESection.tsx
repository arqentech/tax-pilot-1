import { ArrowRight, BadgeCheck } from "lucide-react";

export default function IseeSection() {
  return (
    <section className="w-full flex justify-center py-10 px-4">
      <div className="bg-[#037BFF] w-full rounded-[28px] p-6 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20 text-white">
        <div className="flex-1">
          <h2 className="text-[34px] md:max-w-[403px] leading-[38px] font-extrabold lg:text-[35px] lg:leading-[36px]">
            <p>Get your ISEE prepared by certified CAF experts.</p>
          </h2>

          <ul className="mt-4 space-y-3 text-[16px] lg:text-[20px] leading-[23px]">
            <li className="flex items-center gap-3">
              <BadgeCheck color="#FFC107" width={20} />
              <span>Upload. Done. Relax</span>
            </li>

            <li className="flex items-center gap-3">
              <BadgeCheck color="#FFC107" width={20} />
              <span>Anytime, anywhere, any device</span>
            </li>

            <li className="flex items-center gap-3">
              <BadgeCheck color="#FFC107" width={20} />
              <span>Your data protected by certified experts</span>
            </li>
          </ul>

          <button className="mt-6 bg-black text-white rounded-full px-6 py-3 font-semibold flex items-center gap-2 shadow-lg hover:bg-gray-900 transition">
            Get Started <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex-1 flex w-full justify-end relative">
          <img
            src="/svg/isee-illustration.svg"
            alt="ISEE Illustration"
            className="w-full  lg:max-w-[500px] mr-[30px]  lg:mr-[-60px]"
          />
        </div>
      </div>
    </section>
  );
}
