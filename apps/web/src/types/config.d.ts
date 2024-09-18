import type { About } from "@/types/about";
import type { SocialMedia } from "@/types/social-media";
import type { Resume } from "@/types/resume";

/**
 * Type definition for the Web app configuration.
 * 
 * @param {SocialMedia} socialMedia
 * @param {About} about
 * @param {Resume} resume
 */

export type Config = {
  socialMedia: SocialMedia;
  about: About;
  resume: Resume;
}
