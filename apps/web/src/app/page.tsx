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

const addJsonLd = () => {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Person",
      "@id": "http://www.1chooo.com#person",
      "givenName": "Chun-Ho",
      "familyName": "Lin",
      "additionalName": "Hugo",
      "gender": "male",
      "birthPlace": "New Taipei, TW",
      "nationality": "Taiwan",
      "alumniOf":[
        {
          "@type": "CollegeOrUniversity",
          "name": "National Central University",
          "sameAs": "https://www.ncu.edu.tw/"
        },
      ],
      "jobTitle": "Software Engineer",
      "skills": "Software Engineering, Web Development, Open Source",
      "image": "https://www.1chooo.com/images/profile.webp",
      "url": "http://www.1chooo.com",
      "sameAs": [
        "https://www.linkedin.com/in/1chooo/",
        "http://github.com/1chooo",
        "https://medium.com/@1chooo",
      ],
    }
  `,
  }
}

async function About() {
  let allBlogs = await getBlogPosts();

  let selectedPosts = allBlogs.map((post: any) => ({
    ...post,
    metadata: {
      ...post.metadata,
      category: post.metadata.category || "Uncategorized",
    },
  }));

  let header = preferredName ?
    `About ${preferredName} 👨🏻‍💻` : `About ${firstName} ${lastName} 👨🏻‍💻`;

  return (
    <article>
      <Script
        id="application/ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={addJsonLd()}
        key="1chooo-website-jsonld"
      />
      <PageHeader header={header} />
      <AboutHeader id="introduction" text={`${subHeader} (${pronouns})`} />
      <MarkdownRenderer className="text-light-gray leading-relaxed" content={introduction} />
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
