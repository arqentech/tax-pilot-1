import { teamMembers, type TeamMember } from "../../data/TeamData";

type TeamCardProps = {
  member: TeamMember;
  variant?: "primary" | "secondary";
  className?: string;
};

const TeamCard = ({
  member,
  variant = "primary",
  className = "",
}: TeamCardProps) => {
  const isPrimary = variant === "primary";
  const sizeClasses = isPrimary ? "w-[356px] h-[438px]" : "w-[106px] h-[438px]";
  const borderRadius = isPrimary ? "rounded-[32px]" : "rounded-[26px]";
  const nameTextSize = isPrimary ? "text-[22px]" : "text-[18px]";
  const roleTextSize = isPrimary ? "text-[16px]" : "text-[14px]";

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden ${borderRadius} ${sizeClasses} ${className}`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {isPrimary && (
        <div className="absolute bottom-5 left-5 right-5 rounded-[24px] bg-white/92 px-6 py-5 backdrop-blur-md shadow-[0_18px_42px_rgba(43,43,43,0.18)]">
          <p
            className={`font-bricolage font-semibold text-[#2F2D24] ${nameTextSize}`}
          >
            {member.name}
          </p>
          <p className={`mt-1 font-medium text-[#6F6C64] ${roleTextSize}`}>
            {member.role}
          </p>
        </div>
      )}
    </div>
  );
};

const TeamSection = () => {
  const [lead, ...others] = teamMembers;

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="container-main flex w-full flex-col items-center gap-12 text-center lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:text-left">
        <div className="flex max-w-[500px] flex-col items-center gap-6 lg:items-start lg:flex-none">
          <span className="inline-flex items-center rounded-full bg-[#F1EDE7] px-4 py-1.5 text-[14px] font-semibold uppercase tracking-[0.18em] text-[#6F6D66]">
            Team
          </span>
          <div className="space-y-4">
            <h2 className="font-bricolage text-[38px] font-extrabold leading-[1.05] tracking-[-0.09em] text-[#2F2D24] lg:text-[58px] lg:whitespace-nowrap">
              The TaxPilot Team
            </h2>
            <p className="max-w-[480px] text-[18px] font-medium leading-relaxed text-[#5A5851] lg:text-[20px]">
              Our professionals bring years of CAF experience and fiscal
              expertise to ensure precision, compliance, and total peace of
              mind.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:flex-none">
          <div className="hidden items-end gap-5 lg:flex">
            {lead ? (
              <TeamCard
                member={lead}
                className="shadow-[0_24px_64px_rgba(43,43,43,0.18)]"
              />
            ) : null}
            <div className="flex items-end gap-5">
              {others.map((member) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  variant="secondary"
                  className="shadow-[0_18px_40px_rgba(35,35,35,0.12)]"
                />
              ))}
            </div>
          </div>

          <div
            className="flex gap-6 overflow-x-auto pb-6 pl-4 pr-8 lg:hidden snap-x snap-mandatory"
            aria-label="TaxPilot team"
          >
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.name}
                member={member}
                className={`snap-center ${
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
