"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import "@/styles/about/latest-posts.css";

type Post = {
  slug: string;
  metadata: {
    banner: string;
    alt?: string;
    title: string;
    category?: string;
    publishedAt: string;
  };
};

const LatestArticles = ({ posts }: { posts: Post[] }) => {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);

  useEffect(() => {
    const updateVisiblePosts = () => {
      const isMobile = window.innerWidth <= 768;
      setVisiblePosts(isMobile ? posts.slice(0, 2) : posts.slice(0, 3));
    };

    updateVisiblePosts();
    window.addEventListener("resize", updateVisiblePosts);
    return () => window.removeEventListener("resize", updateVisiblePosts);
  }, [posts]);

  return (
    <section>
      <ul className="latest-post-list">
        {visiblePosts.map((post) => (
          <li
            key={post.slug}
            className="latest-post-item active"
            data-category={post.metadata.category}
          >
            <Link href={`/blog/${post.slug}`} rel="noopener noreferrer">
              <figure className="latest-post-img">
                <div className="latest-post-item-icon-box">
                  <LuEye />
                </div>
                <Image
                  src={post.metadata.banner}
                  alt={post.metadata.alt || "Blog post image"}
                  width={1600}
                  height={900}
                  priority={true}
                  placeholder="empty"
                  loading="eager"
                />
              </figure>
              <h3 className="latest-post-title">
                <MarkdownRenderer content={post.metadata.title} />
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LatestArticles;
