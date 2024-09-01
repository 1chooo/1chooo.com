import type { NavItem } from "@/types/nav-bar";
import type { Breakpoint } from "@/hooks/use-responsive-image-size";

export const GITHUB_USERNAME = '1chooo';
export const MEDIUM_USERNAME = '1chooo';
export const TWITTER_USERNAME = '1chooo___';
export const LINKEDIN_USERNAME = '1chooo';
export const EMAIL = 'hugo970217@gmail.com';

export const DEVOPS = {
  linux: "linux",
  aws: "aws",
  azure: "azure",
  githubactions: "githubactions",
  docker: "docker",
  fastapi: "fastapi",
  kubernetes: "kubernetes",
  flask: "flask",
  gitlab: "gitlab",
  redis: "redis"
}

export const PROGLANG =  {
  python: "py",
  go: "go",
  java: "java",
  cpp: "cpp",
  c: "c",
  react: "react",
  typescript: "typescript",
  javascript: "javascript",
  flutter: "flutter",
  bash: "bash"
}

export const breakpoints: Breakpoint[] = [
  { maxWidth: 375, size: { width: 80, height: 80 } },
  { maxWidth: 580, size: { width: 150, height: 150 } },
  { maxWidth: 1250, size: { width: 120, height: 120 } },
  { maxWidth: Infinity, size: { width: 150, height: 150 } },
];

export const ROUTES = {
  about: 'about',
  resume: 'resume',
  portfolio: 'portfolio',
  blog: 'blog',
  contact: 'contact'
};

export const navItems: NavItem[] = [
  { path: '/', label: 'About' },
  { path: '/resume', label: 'Resume' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' }
];
