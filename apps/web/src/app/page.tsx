import type { Metadata } from "next";
import GitHubStats from '@/components/about/github-stats';
import LifeStyles from '@/components/about/life-styles';
import PageHeader from '@/components/page-header';
import AboutHeader from '@/components/about/about-header';
import SeeMoreButton from "@/components/about/see-more-btn";
import LatestArticles from "@/components/about/latest-articles";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import TechStack from "@/components/about/tech-stack";
import { getBlogPosts } from "@/lib/db/blog";
import { FaRegPenToSquare } from "react-icons/fa6";
import config from '@/config';



const { about, title } = config;
const {
  subHeader, pronouns, firstName,
  lastName, preferredName, introduction,
  lifestyles, techStacks
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
      <TechStack techStacks={techStacks} />
      <AboutHeader text="$ ls -al Life Style" />
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
};

export default About;
