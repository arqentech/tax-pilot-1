import { Link } from "react-router-dom";

interface FooterLinksProps {
  title: string;
  links: { label: string; path: string }[];
}

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h3 className="font-bricolage font-semibold text-lg md:text-xl leading-tight mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-[#D7D7D7] font-normal font-inter hover:text-white transition-colors text-[18px] md:text-lg"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
