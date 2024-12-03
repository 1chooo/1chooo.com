import React from 'react';
import ContactsList from './contact-list';
import SocialList from './social-list';
import Footer from './footer';

import { SiGithub } from "react-icons/si";
import { FaMedium, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { MdAttachment } from "react-icons/md";
import { FaRss } from "react-icons/fa";

import config from "@/config";

const { about, siteURL } = config;

const { socialMedia } = about;
const { githubUsername, twitterUsername, linkedinUsername, mediumUsername } = socialMedia;

const socialLinks = [
  { url: `https://github.com/${githubUsername}`, icon: SiGithub, name: 'GitHub' },
  { url: `https://www.linkedin.com/in/${linkedinUsername}/`, icon: FaLinkedinIn, name: 'LinkedIn' },
  { url: `https://medium.com/@${mediumUsername}`, icon: FaMedium, name: 'Medium' },
  { url: `https://twitter.com/${twitterUsername}`, icon: FaXTwitter, name: 'Twitter' },
  { url: `${siteURL}/rss.xml`, icon: FaRss, name: 'RSS Feed' },
  { url: `./cv.pdf`, icon: MdAttachment, name: 'CV' },
];

const SideBarInfoMore: React.FC = () => {
  return (
    <div className="sidebar-info-more">
      <div className="separator"></div>
      <ContactsList />
      <div className="separator-no-line"></div>
      <SocialList socialLinks={socialLinks} />
      <div className="separator-footer"></div>
      <Footer />
    </div>
  );
};

export default SideBarInfoMore;
