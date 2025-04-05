import PageHeader from "@/components/page-header";
import CodeHeader from "@/components/section/about/code-header";
import { BlurFade } from "@/components/magicui/blur-fade";
import LifeStyles from "@/components/about/life-styles";
import CodingStats from "@/components/about/coding-stats";
import AnimatedSection from "@/components/animated-section";
import markdownToHtml from "@/lib/markdownToHtml";
import { cn } from "@workspace/ui/lib/utils";
import { getAllPosts } from "@/lib/api";
import { MoreStories } from "@/components/about/v2/latest-articles";

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
  const allPosts = getAllPosts();

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
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </BlurFade>
      <BlurFade inView delay={0.6}>
        <CodingStats techStacks={techStacks} githubUsername={githubUsername} />
      </BlurFade>
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About;
