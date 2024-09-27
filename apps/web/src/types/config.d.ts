import type { About } from "@/types/about";
import type { SocialMedia } from "@/types/social-media";
import type { Resume } from "@/types/resume";
import type { NavItem } from "@/types/nav-bar";

/**
 * Type definition for the Web app configuration.
 * 
 * @param {SocialMedia} socialMedia
 * @param {About} about
 * @param {Resume} resume
 */

export type Config = {
  avatar: string;
  navItems: NavItem[];
  socialMedia: SocialMedia;
  about: About;
  resume: Resume;
}
