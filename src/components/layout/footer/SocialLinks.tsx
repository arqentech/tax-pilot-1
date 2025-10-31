import { Linkedin, Instagram, Facebook, Music2 } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { name: "Linkedin", icon: Linkedin, href: "https://www.linkedin.com/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/" },
  { name: "TikTok", icon: Music2, href: "https://www.tiktok.com/" },
];

export default function SocialLinks() {
  return (
    <div className="w-full border-t border-b border-[#999999] mt-10">
      <div className="grid grid-cols-4 w-full text-center divide-x divide-[#999999]">
        {socialLinks.map(({ name, icon: Icon, href }) => (
          <Link
            key={name}
            to={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-16 sm:h-[75px] gap-2 text-[#999999] hover:text-white transition-colors border-b sm:border-b-0 border-[#999999] last:border-b-0 sm:last:border-b"
            aria-label={`Visit our ${name} page`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base md:text-lg">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
