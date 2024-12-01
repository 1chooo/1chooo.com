import Link from "next/link";
import React from 'react';
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import { sendGTMEvent } from "@/components/google";


import "@/styles/about/see-more-btn.css"

interface SeeMoreButtonProps {
  badge: string;
  path: string;
  icon: ReactIconType | OcticonsType;
}

const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({ badge, path, icon: Icon }) => {
  return (
    <div className="see-more">
      <Link href={path}>
        <button className="see-more-btn" onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'GTM-PDJ3NF4Q' })}>
          <Icon />
          <span>{badge}</span>
        </button>
      </Link>
    </div>
  );
}

export default SeeMoreButton;
