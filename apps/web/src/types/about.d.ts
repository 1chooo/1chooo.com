// https://github.com/afiiif/pokemon-world/blob/main/src/types/pokemon.ts

export type LifeStyle = {
  icon  : string;
  title : string;
  text  : string;
}

export type TechStack = {
  id: string;
  src: string;
  alt: string;
}

export type SocialMedia = {
  githubUsername: string;
  mediumUsername: string;
  twitterUsername: string;
  linkedinUsername: string;
}

/**
 * Type definition for the About component.
 *
 * @param {Readonly<Options>} options
 *   Props.
 * @returns {JSX.Element}
 *   React element.
 */
export type About = {
  socialMedia: SocialMedia;
  header: string;
  subHeader: string;
  pronouns: string;
  introductions: string[];
  lifestyles: LifeStyle[];
  programmingLanguage: TechStack[];
  devOps: TechStack[];
}
