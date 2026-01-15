import { ArrowRight, BadgeCheck } from "lucide-react";

export default function IseeSection() {
  return (
    <section className="w-full flex justify-center py-10 px">
      <div className="bg-[#037BFF] w-full rounded-[28px] p-6 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20 text-white">
        <div className="flex-1">
          <h2 className=" md:max-w-full font-bricolage leading-[38px] font-extrabold lg:text-[35px] lg:leading-[36px]">
            <p className="text-[33px]">
              Get your ISEE prepared by certified CAF experts.
            </p>
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

          <button
            className="mt-6 flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white border border-[#34352E47] bg-[linear-gradient(180deg,#54564A_0%,#34352E_44.72%)] shadow-[0px_6px_10px_0px_#34352E26] hover:opacity-90 transition
  "
            style={{
              boxShadow:
                "0px -3px 3px 0px #272822 inset, 0px 5px 8px 0px #2E2F289E inset, 0px 6px 10px 0px #34352E26",
            }}
          >
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
