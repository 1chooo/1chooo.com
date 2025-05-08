import Link from "next/link";
import type { SocialLink } from "@/types/config";

interface SocialListProps {
  socialLinks: SocialLink[];
}

function SocialList({ socialLinks }: SocialListProps) {
  return (
    <ul className="flex items-center gap-4 pb-1 pl-2 justify-center">
      {socialLinks.map(({ url, icon: Icon, name }) => (
        <li
          key={name}
          className="text-light-gray-70 text-lg hover:scale-110 hover:text-orange-yellow-crayola"
        >
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
}

export default SocialList;
