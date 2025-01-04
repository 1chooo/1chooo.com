import React from "react";
import IconBox from "@/components/icon-box";
import { IconType } from "react-icons";

import "@/styles/side-bar/contact-info.css";

interface ContactItemProps {
  icon: IconType;
  title: string;
  children: React.ReactNode;
}

function ContactItem({
  icon, title, children
}: ContactItemProps) {
  return (
    <li className=" min-w-full flex items-center gap-4">
      <IconBox icon={icon} />
      <div className="contact-info">
        <p className="text-light-gray-70 uppercase mb-1 text-xs">
          {title}
        </p>
        {children}
      </div>
    </li>
  );
}

export default ContactItem;
