import PageHeader from "@/components/page-header";
import LifeStyles from "@/components/about/life-styles";
import CodingStats from "@/components/about/coding-stats";
import AnimatedSection from "@/components/animated-section";
import markdownToHtml from "@/lib/markdownToHtml";
import { cn } from "@workspace/ui/lib/utils";
import { getAllPosts } from "@/lib/api";
import { LatestArticles } from "@/components/about/latest-articles";

import config from "@/config";

import "@/styles/markdown-styles.css";

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

interface AboutIntroductionProps {
  introduction: string;
}

async function AboutIntroduction({ introduction }: AboutIntroductionProps) {

  if (!introduction) {
    return null;
  }
  const content = await markdownToHtml(introduction || "")

  return <div className={cn("markdown")} dangerouslySetInnerHTML={{ __html: content }} />
}

async function About() {
  const allPosts = getAllPosts();

  let header = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  return (
    <article>
      <AnimatedSection id="about">
        <PageHeader header={header} />
      </AnimatedSection>
      <AnimatedSection>
        <AboutIntroduction introduction={introduction} />
      </AnimatedSection>
      {allPosts.length > 0 && <LatestArticles posts={allPosts} />}
      <CodingStats techStacks={techStacks} githubUsername={githubUsername} />
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About;
