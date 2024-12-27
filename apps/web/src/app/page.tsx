import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import PageHeader from '@/components/page-header';
import AboutHeader from '@/components/about/about-header';
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import { getBlogPosts } from "@/lib/db/v1/post";
import config from '@/config';
import { Suspense } from "react";
import Script from "next/script";

const DynamicLatestArticles = dynamic(() => import('@/components/about/latest-articles'), {
  loading: () => <p>Loading latest articles...</p>,
});

const DynamicLifeStyles = dynamic(() => import('@/components/about/life-styles'), {
  loading: () => <p>Loading life styles...</p>,
});

const DynamicCodingStats = dynamic(() => import('@/components/about/coding-stats'), {
  loading: () => <p>Loading coding stats...</p>,
});

const {
  about, title, description,
  author, keywords,
  openGraph, 
} = config;
const {
  subHeader, pronouns, firstName,
  lastName, preferredName, introduction,
  lifestyles, techStacks, githubUsername
} = about;

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [{ name: author }],
  creator: author,
  keywords: keywords,
  openGraph: {
    url: openGraph.url,
    type: "website",
    siteName: openGraph.siteName,
    title: openGraph.title,
    description: openGraph.description,
    images: openGraph.images,
  },
  manifest: '/manifest.webmanifest',
  twitter: {
    card: "summary_large_image",
    title: "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast",
    description:
      "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    images: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/logo192.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ],
  },
};

const header =
  preferredName === ''
    ? `About ${firstName} ${lastName} 👨🏻‍💻`
    : `About ${preferredName} 👨🏻‍💻`;

const jsonData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  "name": `${firstName} ${lastName}`,
  "url": "https://www.1chooo.com",
  author: {
    '@type': 'Person',
    name: `${firstName} ${lastName}`,
    url: "https://www.1chooo.com",
    sameAs: [
      "https://www.linkedin.com/in/1chooo",
    ],
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.1chooo.com',
  },
  "inLanguage": 'en-US',
  "copyrightYear": new Date().getFullYear(),
  "jobTitle": "Software Engineer",
  "keywords": keywords,
  "worksFor": {
    "@type": "Organization",
    "name": "1chooo.com",
    "url": "https://1chooo.com"
  },
  "image": "https://1chooo.com/images/1chooo-avatar.png",
  "email": "hugo970217@gmail.com",
  dateModified: new Date().toISOString(),
  dateCreated: '2024-01-06',
};

async function About() {
  let allBlogs = await getBlogPosts();

  let selectedPosts = allBlogs.map((post: any) => ({
    ...post,
    metadata: {
      ...post.metadata,
      category: post.metadata.category || "Uncategorized",
    },
  }));

  return (
    <article>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
      />
      <PageHeader header={header} />
      <AboutHeader text={`${subHeader} (${pronouns})`} />
      <MarkdownRenderer className="text-light-gray leading-relaxed" content={introduction} />
      <AboutHeader text="$ ls -al Latest Articles" />
      <Suspense fallback={<p>Loading latest articles...</p>}>
        <DynamicLatestArticles posts={selectedPosts} />
      </Suspense>
      <Suspense fallback={<p>Loading latest articles...</p>}>
        <DynamicCodingStats techStacks={techStacks} githubUsername={githubUsername} />
      </Suspense>
      <Suspense fallback={<p>Loading latest articles...</p>}>
        <DynamicLifeStyles lifestyles={lifestyles} />
      </Suspense>
    </article>
  );
};

export default About;
