import Link from "next/link";
import type { Icon } from "@primer/octicons-react";
import type { IconType } from "react-icons";

interface SocialLink {
  url: string;
  icon: Icon | IconType | React.FC;
  name: string;
}

interface SocialListProps {
  socialLinks: SocialLink[];
}

function SocialList({ socialLinks }: SocialListProps) {
  return (
    <ul className="social-list">
      {socialLinks.map(({ url, icon: Icon, name }) => (
        <li className="social-item hover:scale-110 hover:text-orange-yellow-crayola" key={name}>
          <Link
            href={url}
            className="text-light-gray-70 text-lg hover:scale-110 hover:text-orange-yellow-crayola"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
          >
            <Icon />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialList;

