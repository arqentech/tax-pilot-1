import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

export default function TaxPilotSection() {
  return (
    <section className="w-full flex justify-center py-16">
      <div className="bg-[#FFC107] relative w-full lg:max-w-full rounded-[28px] p-6 flex flex-col justify-center lg:flex-row lg:items-center ">
        <div className="flex-1 py-5">
          <h2 className="sub-heading md:font-bricolage font-degular">
            La burocrazia, finalmente semplice.
          </h2>

          <ul className="mt-4 py-5 text-[16px] lg:text-[20px] leading-[23px] space-y-3">
            <li className="flex text-[#34352E] items-center gap-3">
              <BadgeCheck color="#0AD6A1" width={20} />
              <span>Carica i documenti. Al resto pensiamo noi.</span>
            </li>

            <li className="flex text-[#34352E] items-center gap-3">
              <BadgeCheck color="#0AD6A1" width={20} />
              <span>Ovunque ti trovi, da qualsiasi dispositivo.</span>
            </li>

            <li className="flex text-[#34352E] items-center gap-3">
              <BadgeCheck color="#0AD6A1" width={20} />
              <span>I tuoi documenti verificati da professionisti reali.</span>
            </li>
          </ul>
          <Link to="/services">
            <PrimaryButton text="Esplora i servizi" width="262px" />
          </Link>
        </div>

        <div className="flex-1 flex w-full justify-center lg:justify-end py-5">
          <img
            src="/svg/businesswoman-presents-business-report.svg"
            alt="Tax Illustration"
            className="w-full max-w-[600px] lg:max-w-[550px] mr-[-60px] lg:mr-[-40px] lg:absolute lg:bottom-0"
          />
        </div>
      </div>
    </section>
  );
}
