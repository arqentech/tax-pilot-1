import { ArrowRight, BadgeCheck } from "lucide-react";

export default function IseeSection() {
  return (
    <section className="w-full flex justify-center py-10 px">
      <div className=" bg-[#037BFF] relative w-full rounded-[28px] p-6 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20 text-white">
        <div className="flex-1">
          <h2 className=" md:max-w-full font-bricolage leading-[38px] font-extrabold lg:text-[35px] lg:leading-[36px]">
            <p className="text-[33px]">La burocrazia, finalmente semplice.</p>
          </h2>

          <ul className="mt-4 space-y-3 text-[#BFDDFF] text-[16px] lg:text-[20px] leading-[25px]">
            <li className="flex items-center gap-3">
              <BadgeCheck color="#FFC107" width={20} />
              <span>Carica i documenti. Al resto pensiamo noi.</span>
            </li>

            <li className="flex text-[#BFDDFF] items-center gap-3">
              <BadgeCheck color="#FFC107" width={20} />
              <span>Ovunque ti trovi, da qualsiasi dispositivo.</span>
            </li>

            <li className="flex text-[#BFDDFF] items-center gap-3">
              <BadgeCheck color="#FFC107" width={20} />
              <span>I tuoi documenti verificati da professionisti reali.</span>
            </li>
          </ul>

          <button
            className="mt-6 flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white border border-[#34352E47] bg-[linear-gradient(180deg,#54564A_0%,#34352E_44.72%)] shadow-[0px_6px_10px_0px_#34352E26] hover:opacity-90 transition
  "
            style={{
              boxShadow:
                "0px -3px 3px 0px #272822 inset, 0px 5px 8px 0px #2E2F289E inset, 0px 6px 10px 0px #34352E26",
            }}
          >
            Esplora i servizi <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex-1 flex w-full justify-end">
          <img
            src="/svg/isee-illustration.svg"
            alt="ISEE Illustration"
            className="w-full lg:max-w-[400px] mr-[30px]  lg:mr-[-50px] lg:absolute lg:bottom-0"
          />
        </div>
      </div>
    </section>
  );
}
