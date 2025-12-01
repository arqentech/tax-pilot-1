import { useState } from "react";
import { teamMembers } from "../../data/TeamData";
import TeamCard from "../../components/ui/TeamCard";
import Badge from "../../components/ui/Badge";

const TeamSection = () => {
  const [activeMember, setActiveMember] = useState<string | null>(
    teamMembers[0]?.name
  );

  const [lead, ...others] = teamMembers;

  const handleActivate = (name: string) => setActiveMember(name);

  return (
    <section className="w-full py-16 md:py-10">
      <div className="flex w-full flex-col items-center text-center lg:flex-row lg:items-start lg:justify-center lg:gap-12 lg:text-left">
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <Badge text="Team" width="86px" />
          <h2 className="font-bricolage text-[38px] font-extrabold leading-[38px] md:leading-[73px] tracking-[-0.09em] md:text-[58px]">
            The TaxPilot Team
          </h2>
          <p className="w-full text-justify text-[18px] font-medium text-[#5A5851] md:text-[20px]">
            Our professionals bring years of CAF experience and fiscal expertise
            to ensure precision, compliance, and total peace of mind.
          </p>
        </div>

        <div className="w-full md:flex mt-5">
          <div className="hidden md:flex items-end gap-5">
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
                className={`snap-center flex-shrink-0 w-[80%] max-w-[360px] ${
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
