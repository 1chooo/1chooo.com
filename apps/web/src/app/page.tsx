import type { Metadata } from "next";
import Script from "next/script";

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

const {
  about,
  title,
  description,
  author,
  keywords,
  openGraph,
  siteURL,
} = config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  lifestyles,
  techStacks,
  githubUsername,
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
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

const addJsonLd = () => {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Person",
      "@id": "${siteURL}#person",
      "givenName": ${firstName},
      "familyName": ${lastName},
      "additionalName": ${preferredName},
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
      "url": ${siteURL},
      "sameAs": [
        "https://www.linkedin.com/in/1chooo/",
        "http://github.com/1chooo",
        "https://medium.com/@1chooo",
      ]
    }
  `,
  };
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

  let header = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  const content = await markdownToHtml(introduction || "");

  return (
    <article>
      <Script
        id="application/ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={addJsonLd()}
        key="1chooo-website-jsonld"
      />
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
