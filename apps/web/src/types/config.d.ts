export type Config = {
  baseURL: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: { keyword: string }[];
  postsPerPage: number;
  twitterAccount: string;
  githubAccount: string;
};
