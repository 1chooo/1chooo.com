export interface ILifeStyle {
  icon  : string;
  title : string;
  text  : string;
}

export interface ITechStack {
  id: string;
  src: string;
  alt: string;
}

interface ISocialMedia {
  githubUsername: string;
  mediumUsername: string;
  twitterUsername: string;
  linkedinUsername: string;
}

interface IAbout {
  socialMedia: ISocialMedia;
  header: string;
  subHeader: string;
  pronouns: string;
  introductions: string[];
  lifestyle: ILifeStyle[];
  programmingLanguage: ITechStack[];
  devOps: ITechStack[];
}

export default IAbout;
