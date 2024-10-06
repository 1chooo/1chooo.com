import type { About } from "@/types/about";
import type { Resume } from "@/types/resume";
import type { NavItem } from "@/types/nav-bar";

/**
 * Type definition for the Web app configuration.
 * 
 * @param {About} about
 * @param {Resume} resume
 */

export type Config = {
  avatar: string;
  title: string;
  description: string;
  author: string;
  keywords: string[];
  status: string;
  navItems: NavItem[];
  about: About;
  resume: Resume;
}
