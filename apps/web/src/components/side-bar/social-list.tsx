import Link from "next/link";
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";

interface SocialLink {
  url: string;
  icon: ReactIconType | OcticonsType;
  name: string;
}

interface SocialListProps {
  socialLinks: SocialLink[];
}

function SocialList({ socialLinks }: SocialListProps) {
  return (
    <ul className="flex justify-start items-center gap-[15px] pb-1 pl-[7px] xl:justify-center md:justify-center">
      {socialLinks.map(({ url, icon: Icon, name }) => (
        <li key={name} className="text-light-gray-70 text-lg hover:scale-110 hover:text-orange-yellow-crayola">
          <Link
            href={url}
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

