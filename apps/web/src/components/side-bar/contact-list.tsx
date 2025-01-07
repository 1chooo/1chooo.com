import React from "react";
import Link from "next/link";
import ContactItem from "@/components/side-bar/contact-item";
import { LuGithub, LuLinkedin, LuMail, LuMapPin } from "react-icons/lu";

import "@/styles/side-bar/contact-list.css";

function ContactsList() {
  return (
    <ul className="contacts-list">
      <ContactItem icon={LuMapPin} title="Location">
        <address className="text-white-2 text-sm font-light">Taipei, Taiwan 🇹🇼</address>
      </ContactItem>

      <ContactItem icon={LuMail} title="Email">
        <Link
          href="mailto:hugo970217@gmail.com"
          className="block text-white-2 text-sm font-light custom-lg:truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          hugo970217@gmail.com
        </Link>
      </ContactItem>

      <ContactItem icon={LuGithub} title="Github">
        <Link
          href="https://github.com/1chooo"
          className="contact-link block text-white-2 text-sm font-light custom-lg:truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          1chooo
        </Link>
      </ContactItem>

      <ContactItem icon={LuLinkedin} title="Linkedin">
        <Link
          href="https://www.linkedin.com/in/1chooo/"
          className="contact-link block text-white-2 text-sm font-light custom-lg:truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chun-Ho (Hugo) Lin
        </Link>
      </ContactItem>
    </ul>
  );
};

export default ContactsList;
