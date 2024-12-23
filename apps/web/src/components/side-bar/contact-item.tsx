import React from "react";
import IconBox from "../icon-box";
import ContactInfo from "./contact-info";
import { IconType } from "react-icons";

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
      <ContactInfo title={title}>{children}</ContactInfo>
    </li>
  );
}

export default ContactItem;
