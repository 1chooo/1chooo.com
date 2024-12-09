import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import PageHeader from '@/components/page-header';
import AboutHeader from '@/components/about/about-header';
import { getBlogPosts } from "@/lib/db/blog";
import config from '@/config';
import Introduction from "@/contents/about/introduction.mdx";

const DynamicLatestArticles = dynamic(() => import('@/components/about/latest-articles'), {
  loading: () => <p>Loading latest articles...</p>,
});

const DynamicLifeStyles = dynamic(() => import('@/components/about/life-styles'), {
  loading: () => <p>Loading life styles...</p>,
});

const DynamicCodingStats = dynamic(() => import('@/components/about/coding-stats'), {
  loading: () => <p>Loading coding stats...</p>,
});


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
      <div className="text-light-gray leading-relaxed">
        <Introduction />
      </div>
      <AboutHeader text="$ ls -al Latest Articles" />
      <Suspense fallback={<div>Loading latest articles...</div>}>
        <DynamicLatestArticles posts={selectedPosts} />
      </Suspense>
      <Suspense fallback={<div>Loading coding stats...</div>}>
        <DynamicCodingStats techStacks={techStacks} />
      </Suspense>
      <Suspense fallback={<div>Loading life styles...</div>}>
        <DynamicLifeStyles lifestyles={lifestyles} />
      </Suspense>
      
    </article>
  );
};

export default About;
