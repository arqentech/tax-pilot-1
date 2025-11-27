import { Link } from "react-router-dom";

const shareLinks = [
  {
    name: "Instagram",
    icon: "/svg/footer/instagram.svg",
    href: "https://www.instagram.com/",
  },
  {
    name: "Linkedin",
    icon: "/svg/footer/linkedin.svg",
    href: "https://www.linkedin.com/",
  },
  {
    name: "Facebook",
    icon: "/svg/footer/facebook.svg",
    href: "https://www.facebook.com/",
  },
];

export default function ShareButtons() {
  return (
    <div className="">
      <h3 className="text-[20px] font-semibold text-[#34352E] mb-3">Share</h3>

      <div className="flex items-center gap-3">
        {shareLinks.map(({ name, icon, href }) => (
          <Link
            key={name}
            to={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            className="
              w-[48px]
              h-[48px]
              rounded-[44px]
              bg-[#F5F5F3]
              flex items-center justify-center
              p-[14px]
              transition
              hover:bg-[#EDEDEB]
            "
          >
            <img
              src={icon}
              alt={name}
              className="w-[20px] h-[20px] object-contain opacity-60"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
