"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import SeeMoreButton from "@/components/about/see-more-btn";
import { FaRegPenToSquare } from "react-icons/fa6";
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
      const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
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
            className="latest-post-item group active"
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
                  priority
                  quality={50}
                  placeholder="empty"
                  loading="eager"
                />
              </figure>
              <h3 className="ml-[10px] text-white-2 text-base font-normal capitalize leading-[1.3] group-hover:text-orange-yellow-crayola group-hover:font-bold">
                <MarkdownRenderer content={post.metadata.title} />
              </h3>
            </Link>
          </li>
        ))}
      </ul>
      <SeeMoreButton badge="See All Articles" path="/blog" icon={FaRegPenToSquare} />
    </section>
  );
};

export default LatestArticles;
