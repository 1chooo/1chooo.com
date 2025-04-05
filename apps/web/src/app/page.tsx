import PageHeader from "@/components/page-header";
import CodeHeader from "@/components/section/about/code-header";
import { BlurFade } from "@/components/magicui/blur-fade";
import LatestArticles from "@/components/about/latest-articles";
import LifeStyles from "@/components/about/life-styles";
import CodingStats from "@/components/about/coding-stats";
import AnimatedSection from "@/components/animated-section";
import { getBlogPosts } from "@/lib/db/v1/post";
import markdownToHtml from "@/lib/markdownToHtml";
import { cn } from "@workspace/ui/lib/utils";

import config from "@/config";

import markdownStyles from "@/styles/markdown-styles.module.css";

const { about } = config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  lifestyles,
  techStacks,
  githubUsername,
} = about;

async function About() {
  let allBlogs = await getBlogPosts();

  let selectedPosts = allBlogs.map((post: any) => ({
    ...post,
    metadata: {
      ...post.metadata,
      category: post.metadata.category || "Uncategorized",
    },
  }));

  let header = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  const content = await markdownToHtml(introduction || "");

  return (
    <article>
      <AnimatedSection>
        <PageHeader header={header} />
      </AnimatedSection>
      <AnimatedSection>
        <CodeHeader id="introduction" text="$ ls -al Hugo 👨🏻‍💻 (He/Him)" />
        <div
          className={cn(markdownStyles["markdown"])}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </AnimatedSection>
      <BlurFade inView delay={0.4}>
        <LatestArticles posts={selectedPosts} />
      </BlurFade>
      <BlurFade inView delay={0.6}>
        <CodingStats techStacks={techStacks} githubUsername={githubUsername} />
      </BlurFade>
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About;
