import { Linkedin, Instagram, Facebook, Music2 } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Linkedin",
    icon: "/svg/footer/linkedin.svg",
    href: "https://www.linkedin.com/",
    alt: "Linkedin Logo",
  },
  {
    name: "Instagram",
    icon: "/svg/footer/instagram.svg",
    href: "https://www.instagram.com/",
    alt: "Instagram Logo",
  },
  {
    name: "Facebook",
    icon: "/svg/footer/facebook.svg",
    href: "https://www.facebook.com/",
    alt: "Facebook Logo",
  },
  {
    name: "TikTok",
    icon: "/svg/footer/tiktok.svg",
    href: "https://www.tiktok.com/",
    alt: "TikTok Logo",
  },
];

export default function SocialLinks() {
  return (
    <div className="w-full border-t border-b border-[#999999] mt-10">
      <div className="grid grid-cols-4 w-full text-center divide-x divide-[#999999]">
        {socialLinks.map(({ name, icon, href, alt }) => (
          <Link
            key={name}
            to={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-16 sm:h-[75px] gap-2 text-[#999999] hover:text-white transition-colors border-b sm:border-b-0 border-[#999999] last:border-b-0 sm:last:border-b"
            aria-label={`Visit our ${name} page`}
          >
            <img
              src={icon}
              alt={alt || name}
              className="h-4 w-4 sm:h-5 sm:w-5 object-contain"
            />

            <span className="hidden md:block text-[18px] ">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
