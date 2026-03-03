import { useState } from "react";
import { teamMembers } from "../../data/TeamData";
import TeamCard from "../../components/ui/TeamCard";
import Badge from "../../components/ui/Badge";

const TeamSection = () => {
  const [activeMember, setActiveMember] = useState<string | null>(
    teamMembers[0]?.name,
  );

  const [lead, ...others] = teamMembers;

  const handleActivate = (name: string) => setActiveMember(name);

  return (
    <section className="w-full py-16 px-3 full-bleed-mobile bg-[#F6F6F3] md:bg-transparent">
      <div className="flex w-full flex-col items-center text-center lg:flex-row lg:items-start lg:justify-center lg:gap-12 lg:text-left">
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <Badge text="Chi siamo" className="hidden md:flex" />
          <Badge
            text="Chi siamo"
            bgColor="#FFFFFF"
            className="flex md:hidden"
          />
          <h2 className=" mt-6 md:mt-2 font-bricolage text-[38px] text-[#34352E] font-extrabold leading-[38px] md:leading-[73px] tracking-[-0.07em] md:text-[58px]">
            <p>Non un semplice </p>
            <p>portale.</p>
            <p>Siamo un Team.</p>
          </h2>

          <h1 className="mt-4 mb-4 w-full text-centr text-[18px] font-medium text-[#5F6057] md:text-[20px]">
            <p>
              TaxPilot nasce dall’esperienza di professionisti che lavorano ogni
              giorno con pratiche CAF e Patronato.
            </p>
            <p>
              Abbiamo digitalizzato il processo, ma non abbiamo eliminato la
              parte più importante: il controllo umano.
            </p>
          </h1>
        </div>

        <div className="w-full md:flex justify-center mt-5">
          <div className="hidden md:flex  gap-5">
            {[lead, ...others].map((member) => (
              <div
                key={member.name}
                className="cursor-pointer"
                onMouseEnter={() => handleActivate(member.name)}
                onClick={() => handleActivate(member.name)}
              >
                <TeamCard
                  member={member}
                  variant={
                    activeMember === member.name ? "primary" : "secondary"
                  }
                  className={`${
                    activeMember === member.name
                      ? "shadow-[0_24px_64px_rgba(43,43,43,0.18)]"
                      : "shadow-[0_18px_40px_rgba(35,35,35,0.12)]"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4 overflow-x-auto md:hidden snap-x snap-mandatory scroll-smooth px-4">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.name}
                member={member}
                className={`snap-center flex-shrink-0 w-[80%] max-w-[380px] ${
                  index === teamMembers.length - 1 ? "mr-4" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
