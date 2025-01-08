import React from 'react';
import ContactsList from './contact-list';
import { LuGithub, LuLinkedin, LuMail, LuMapPin } from "react-icons/lu";
import SocialList from './social-list';
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import Footer from './footer';

import config from "@/config";

const { socialLinks } = config;

interface Contact {
  icon: ReactIconType | OcticonsType;
  title: string;
  content?: string;
  link?: string;
}

const contacts: Contact[] = [
  {
    icon: LuMapPin,
    title: "Location",
    content: "Taipei, Taiwan 🇹🇼",
  },
  {
    icon: LuMail,
    title: "Email",
    link: "mailto:hugo970217@gmail.com",
    content: "hugo970217@gmail.com",
  },
  {
    icon: LuGithub,
    title: "GitHub",
    link: "https://github.com/1chooo",
    content: "1chooo",
  },
  {
    icon: LuLinkedin,
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/1chooo/",
    content: "Chun-Ho (Hugo) Lin",
  },
];

function SideBarInfoMore() {
  return (
    <div className="sidebar-info-more">
      <div className="separator"></div>
      <ContactsList contacts={contacts}/>
      <div className="separator-no-line"></div>
      <SocialList socialLinks={socialLinks} />
      <div className="separator-footer"></div>
      <Footer />
    </div>
  );
};

export default SideBarInfoMore;
