import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "@/app/(exp)/remark/_components/post-body";
import PageHeader from "@/components/page-header";
import { LuFacebook, LuTwitter } from "react-icons/lu";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Comments from "@/components/comments";
import config from "@/config";

import "@/styles/blog/blog-text.css";

const { giscusConfig } = config;

function formatDate(date: string) {
  noStore();
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let daysLater: number = 0;
  if (targetDate > currentDate) {
    daysLater = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  if (daysLater > 365) {
    return `${fullDate} (${daysLater}d later)`;
  } else if (daysLater > 30) {
    const weeksAgo = Math.floor(daysLater / 7);
    return `${fullDate} (${weeksAgo}w later)`;
  } else if (daysLater > 7) {
    const monthsAgo = Math.floor(daysLater / 30);
    return `${fullDate} (${monthsAgo}mo later)`;
  } else if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  const shareUrl = `https://www.1chooo.com/blog/${post.slug}`;
  const shareText = `Check out this post:`;

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div>
      <article>
        <section className="blog-text">
          <PageHeader header="Hugo's Blog" />
          <h1 className="font-semibold text-4xl text-white-2 max-w-[650px]">{post.title}
          </h1>
          <div className="flex items-center justify-between mt-4 text-sm w-full text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center space-x-2">
              <span>{formatDate(post.date)}</span>
              <span
                className="w-1 h-1 bg-current rounded-full"
                aria-hidden="true"
              ></span>
              {/* <span>{post.metadata.category}</span> */}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-yellow-crayola transition-colors"
                aria-label="Share on Facebook"
              >
                <LuFacebook className="w-5 h-5" />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-yellow-crayola transition-colors"
                aria-label="Share on Twitter"
              >
                <LuTwitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="separator"></div>
          <PostBody content={content} />
        </section>
      </article>

      <article style={{ marginTop: "1rem" }}>
        <section className="blog-text">
          <PageHeader header="Comments" />
          <Comments giscusConfig={giscusConfig} />
        </section>
      </article>
    </div>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
