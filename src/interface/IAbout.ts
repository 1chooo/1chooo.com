export interface ILifeStyle {
  icon  : string;
  title : string;
  text  : string;
}

export interface ITechStack {
  name: string;
  iconUrl: string;
}

interface IAbout {
  githubUsername: string;
  header: string;
  subHeader: string;
  pronouns: string;
  introductions: string[];
  lifestyle: ILifeStyle[];
  programmingLanguage: ITechStack[];
  devOps: ITechStack[];
}

export default IAbout;
