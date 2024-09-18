import { About } from "@/types/about";
import { SocialMedia } from "@/types/social-media";

/**
 * Type definition for the Web app configuration.
 * 
 * @param {About} about
 *  About component.
 */

export type Config = {
  socialMedia: SocialMedia;
  about: About;
}
