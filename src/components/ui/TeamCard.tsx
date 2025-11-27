import type { TeamMember } from "../../data/TeamData";

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

  const sizeClasses = isPrimary
    ? "w-[356px] h-[438px] md:hover:scale-105"
    : "w-[106px] h-[438px] md:hover:scale-105 opacity-50";

  const borderRadius = isPrimary ? "rounded-[32px]" : "rounded-[26px]";
  const nameTextSize = isPrimary ? "text-[22px]" : "text-[18px]";
  const roleTextSize = isPrimary ? "text-[16px]" : "text-[14px]";

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden ${borderRadius} ${sizeClasses} ${className} transition-all duration-300`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      {isPrimary && (
        <div className="absolute bottom-5 left-5 right-5 rounded-[24px] bg-white/80 px-6 py-5 backdrop-blur-md shadow-[0_18px_42px_rgba(43,43,43,0.18)]">
          <p
            className={`font-bricolage font-extrabold text-[26px] ${nameTextSize}`}
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

export default TeamCard;
