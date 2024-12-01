import type { Metadata } from "next";
import LifeStyles from '@/components/about/life-styles';
import PageHeader from '@/components/page-header';
import AboutHeader from '@/components/about/about-header';
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import CodingStats from "@/components/about/coding-stats";
import { getBlogPosts } from "@/lib/db/blog";
import config from '@/config';
import LatestArticles from "@/components/about/latest-articles";

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
      <CodingStats techStacks={techStacks} />
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
};

export default About;
