import type { About } from "@/types/about";
import type { Resume } from "@/types/resume";
import type { NavigationLink } from "@/types/nav-bar";
import { OpenGraph } from "./open-graph";
import type { GiscusProps } from "@giscus/react";
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import type { Person } from "@/types/json-ld";
import type { Metadata } from "next";
import type { Resumes } from "@/types/resume";

export type VCardIconType = ReactIconType | OcticonsType | string;

export type SocialLink = {
  url: string;
  icon: string;
};

export type Contact = {
  icon: string;
  title: string;
  content?: string;
  link?: string;
};

export type Config = {
  avatar: string;
  title: string;
  description: string;
  author: string;
  keywords: string[];
  status: string;
  siteURL: string;
  openGraph: OpenGraph;
  navigationLinks: NavigationLink[];
  contacts: Contact[];
  socialLinks: SocialLink[];
  homeMetaData: Metadata;
  about: About;
  resumes: Resumes;
  jsonLdPerson: Person;
  giscusConfig: GiscusProps;
  googleAnalyticId: string;
  googleTagManagerId: string;
  /**
   * web3formsAccessKey - Access key for Web3Forms to handle contact form submissions. Go to https://web3forms.com/ to get your access key.
   * @todo Support multiple access keys for different forms in the future.
   */
  web3formsAccessKey: string;
};
