export interface ILifeStyle {
  icon  : string;
  title : string;
  text  : string;
}

export interface ITechStack {
  name: string;
  iconUrl: string;
}

interface ISocialMedia {
  githubUsername: string;
  mediumUsername: string;
  twitterUsername: string;
  linkedinUsername: string;
}

interface IAbout {
  githubUsername: string;
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
