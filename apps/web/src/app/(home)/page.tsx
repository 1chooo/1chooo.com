import { Suspense } from "react";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AnimatedSection from "@/components/animated-section";
import PageHeader from "@/components/page-header";
import LifeStyles from "@/components/about/life-styles";
import CodingStats from "@/components/about/coding-stats";
import { LatestArticles } from "@/components/about/latest-articles";

import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts } from "@/lib/api";

import config from "@/config";

import { cn } from "@workspace/ui/lib/utils";

import 'react-loading-skeleton/dist/skeleton.css'
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

function AboutIntroductionSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <p>
        <Skeleton count={3} />
      </p>
    </SkeletonTheme>
  );
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
        <Suspense fallback={<AboutIntroductionSkeleton />}>
          <AboutIntroduction introduction={introduction} />
        </Suspense>
      </AnimatedSection>
      {allPosts.length > 0 && <LatestArticles posts={allPosts} />}
      <CodingStats techStacks={techStacks} githubUsername={githubUsername} />
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About;
