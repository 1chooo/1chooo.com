"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useRef } from "react";
import { MdExpandMore } from "react-icons/md";

import Footer from "@/components/layout/footer";
import IconBox from "@/components/icon-box";

import type { Contact, SocialLink } from "@/types/config";

import { useResponsiveImageSize } from "@/hooks/use-responsive-image-size";

import { breakpoints } from "@/lib/constants";

import config from "@/config";

import "@/styles/side-bar/sidebar-info.css";
import "@/styles/side-bar/info-more-btn.css";
import "@/styles/side-bar/contact-info.css";
import "@/styles/side-bar/contact-list.css";

interface ContactsListProps {
  contacts: Contact[];
}

function ContactsList({ contacts }: ContactsListProps) {
  return (
    <ul className="contacts-list">
      {contacts.map((contact, index) => {
        const { icon: Icon, title, content, link } = contact;

        const ContentElement = link ? (
          <Link
            href={link}
            className="block text-white-2 text-sm font-light truncate hover:text-orange-yellow-crayola
            transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </Link>
        ) : (
          <span className="block text-white-2 text-sm font-light truncate">
            {content}
          </span>
        );

        return (
          <li key={index} className="min-w-full flex items-center gap-4">
            <IconBox icon={Icon} />
            <div className="contact-info">
              <p className="text-light-gray-70 uppercase mb-1 text-xs">
                {title}
              </p>
              {ContentElement}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

interface SideBarInfoProps {
  onToggle: () => void;
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
}

function SideBarInfo({
  onToggle,
  avatar,
  firstName,
  lastName,
  preferredName,
  status,
}: SideBarInfoProps) {
  const imageSize = useResponsiveImageSize(breakpoints);

  return (
    <div className="sidebar-info">
      <figure className="avatar-box">
        <Image
          id={`${firstName} (${preferredName}) ${lastName}`}
          src={avatar}
          alt={`${firstName} (${preferredName}) ${lastName}`}
          width={imageSize.width}
          height={imageSize.height}
          quality={50}
          loading="eager"
          priority
        />
      </figure>
      <div className="info-content">
        <h1
          className="name"
          title={`${firstName} (${preferredName}) ${lastName}`}
        >
          {firstName} ({preferredName}) {lastName}
        </h1>
        <p className="text-white-1 bg-onyx text-xs font-light max-w-max rounded-[8px] custom-lg:m-auto px-3 py-1 md:px-[18px] md:py-[5px]">
          {status}
        </p>
      </div>

      <button className="info-more-btn" onClick={onToggle} data-sidebar-btn>
        <span>Show Contacts</span>
        <MdExpandMore />
      </button>
    </div>
  );
}

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

const { socialLinks, contacts } = config;

interface SideBarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
  contacts?: Contact[];
  socialLinks?: SocialLink[];
}

function SideBar({
  avatar,
  firstName,
  lastName,
  middleName,
  preferredName,
  status,
  contacts: propContacts = contacts,
  socialLinks: propSocialLinks = socialLinks,
}: SideBarProps) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  const sideBarState = `sidebar ${isActive ? "active" : ""}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <SideBarInfo
        onToggle={handleSidebarToggle}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        preferredName={preferredName}
        status={status}
      />

      <div className="sidebar-info-more">
        <div className="separator"></div>
        <ContactsList contacts={propContacts} />
        <div className="separator-no-line"></div>
        <SocialList socialLinks={propSocialLinks} />
        <div className="separator-footer"></div>
        <Footer />
      </div>
    </aside>
  );
}

export default SideBar;
