import type { Metadata } from "next";
import GitHubStats from '@/components/about/github-stats';
import LifeStyles from '@/components/about/life-styles';
import PageHeader from '@/components/page-header';
import AboutHeader from '@/components/about/about-header';
import SeeMoreButton from "@/components/about/see-more-btn";
import LatestArticles from "@/components/about/latest-articles";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import { getBlogPosts } from "@/lib/db/blog";
import { FaRegPenToSquare } from "react-icons/fa6";
import config from '@/config';
import TechStack from "@/components/about/tech-stack";

import React from "react";
import {
  TbBrandCpp,
  TbBrandTypescript,
  TbBrandGolang,
  TbMarkdown,
  TbBrandNextjs,
  TbBrandDjango,
  TbBrandApple,
  TbBrandTailwind,
  TbBrandDocker,
  TbBrandMysql,
} from "react-icons/tb";
import { FaReact, FaAws } from "react-icons/fa";
import { AiOutlinePython } from "react-icons/ai";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import {
  SiLatex,
  SiFastapi,
  SiKubernetes,
  SiMicrosoftazure,
  SiAwslambda,
} from "react-icons/si";
import { BiLogoFlask } from "react-icons/bi";
import { VscTerminalLinux } from "react-icons/vsc";
import { DiRedis } from "react-icons/di";

type TechStack = {
  name: string;
  icon: JSX.Element;
};

type TechStackCategory = {
  category: string;
  stacks: TechStack[];
};

const techStacks: TechStackCategory[] = [
  {
    category: "Programming Languages",
    stacks: [
      { name: "Python", icon: <AiOutlinePython /> },
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "Go", icon: <TbBrandGolang /> },
      { name: "C++", icon: <TbBrandCpp /> },
      { name: "Java", icon: <RiJavaLine /> },
      { name: "Markdown", icon: <TbMarkdown /> },
      { name: "LaTeX", icon: <SiLatex /> },
      { name: "JavaScript", icon: <RiJavascriptLine /> },
      { name: "Linux", icon: <VscTerminalLinux /> },
      { name: "Apple", icon: <TbBrandApple /> },
      { name: "MySQL", icon: <TbBrandMysql /> },
      { name: "Redis", icon: <DiRedis /> },
      { name: "Tailwind", icon: <TbBrandTailwind /> },
    ],
  },
  {
    category: "Frameworks and Tools",
    stacks: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <TbBrandNextjs /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Django", icon: <TbBrandDjango /> },
      { name: "Flask", icon: <BiLogoFlask /> },
      { name: "Docker", icon: <TbBrandDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "Azure", icon: <SiMicrosoftazure /> },
      { name: "Lambda", icon: <SiAwslambda /> },
    ],
  },
];

const { about,
  title
} = config;
const {
  subHeader, pronouns, firstName,
  lastName, preferredName, introduction,
  lifestyles, programmingLanguage, devOps
} = about;

export const metadata: Metadata = {
  title: title,
};

const header =
  preferredName === ''
    ? `About ${firstName} ${lastName} 👨🏻‍💻`
    : `About ${preferredName} 👨🏻‍💻`;

const About = async () => {
  let allBlogs = await getBlogPosts();

  let selectedPosts = allBlogs
    .map((post) => ({
      ...post,
      metadata: {
        ...post.metadata,
        category: post.metadata.category || "Uncategorized",
      },
    }))
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    });

  return (
    <article>
      <PageHeader header={header} />
      <AboutHeader text={`${subHeader} (${pronouns})`} />
      <MarkdownRenderer className="text-light-gray leading-relaxed" content={introduction} />
      <AboutHeader text="$ ls -al Latest Articles" />
      <LatestArticles posts={selectedPosts} />
      <SeeMoreButton badge="See All Articles" path="/blog" icon={FaRegPenToSquare} />
      <AboutHeader text="$ ls -al GitHub Stats" />
      <GitHubStats />
      <AboutHeader text="$ ls -al Tech Stack" />
      <TechStack techStacks={techStacks}/>
      <AboutHeader text="$ ls -al Life Style" />
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
};

export default About;
