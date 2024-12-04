import "@/styles/about/see-more-btn.css";

import Link from "next/link";
import React from 'react';
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import { sendGTMEvent } from "@/components/google";

interface SeeMoreButtonProps {
  badge: string;
  path: string;
  icon: ReactIconType | OcticonsType;
}

// TODO: customize button onclick effect https://articles.readytowork.jp/google-analytics-in-next-js-a26cc2b28db5
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
