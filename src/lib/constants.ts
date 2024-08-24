// reference: https://github.com/vercel/commerce/blob/main/lib/constants.ts

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

export type About = {
  socialMedia: SocialMedia;
  header: string;
  subHeader: string;
  pronouns: string;
  introductions: string[];
  lifestyle: LifeStyle[];
  programmingLanguage: TechStack[];
  devOps: TechStack[];
}
