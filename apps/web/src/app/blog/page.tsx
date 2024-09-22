import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/page-header";
import FilterSelectBox from "@/components/blog/filter-select-box";
import FilterList from "@/components/blog/filter-list";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import { getBlogPosts } from "@/lib/db/blog";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "Blog | Hugo ChunHo Lin (1chooo) | Open Source Enthusiast",
  description: "Read my thoughts on software development, design, and more.",
};

const POSTS_PER_PAGE = 4;

export default function BlogPage({
  searchParams,
}: {
  searchParams: { tag?: string; page?: string };
}) {
  let allBlogs = getBlogPosts();
  const blogTags = [
    "All",
    ...Array.from(
      new Set(allBlogs.map((post) => post.metadata.category ?? ""))
    ),
  ];
  const selectedTag = searchParams.tag || "All";
  const currentPage = parseInt(searchParams.page || "1", 10);

  // Filter blogs based on the selected tag
  const filteredBlogs =
    selectedTag === "All"
      ? allBlogs
      : allBlogs.filter((post) => post.metadata.category === selectedTag);

  // Sort blogs by date
  const sortedBlogs = filteredBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  // Calculate total pages
  const totalPages = Math.ceil(sortedBlogs.length / POSTS_PER_PAGE);

  // Get blogs for current page
  const paginatedBlogs = sortedBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const isLoading = !paginatedBlogs.length;

  return (
    <article>
      <PageHeader title="Hugo's Blog" />
      <section className="blog-posts">
        <FilterList selectedTag={selectedTag} blogTags={blogTags} />
        <FilterSelectBox selectedTag={selectedTag} blogTags={blogTags} />

        <ul className="blog-posts-list">
          {isLoading
            ? Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                <li key={index} className="blog-post-item skeleton">
                  <Skeleton height={200} className="blog-banner-skeleton" />
                  <div className="blog-content-skeleton">
                    <Skeleton width={100} className="blog-category-skeleton" />
                    <Skeleton width={180} className="blog-meta-skeleton" />
                    <Skeleton height={24} className="blog-title-skeleton" />
                    <Skeleton count={3} className="blog-summary-skeleton" />
                  </div>
                </li>
              ))
            : paginatedBlogs.map((post, index) => (
                <li
                  key={index}
                  className="blog-post-item active"
                  data-category={post.metadata.category}
                >
                  <Link href={`/blog/${post.slug}`} rel="noopener noreferrer">
                    <figure className="blog-banner-box">
                      <Image
                        src={post.metadata.banner}
                        alt={post.metadata.alt || "Blog post image"}
                        loading="lazy"
                        width={1600}
                        height={900}
                      />
                    </figure>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <p className="blog-category">
                          {post.metadata.category}
                        </p>
                        <span className="dot"></span>
                        <time dateTime={post.metadata.publishedAt}>
                          {new Date(
                            post.metadata.publishedAt
                          ).toLocaleDateString("en-us", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="h3 blog-item-title">
                        <MarkdownRenderer content={post.metadata.title} />
                      </h3>
                      <MarkdownRenderer
                        className="blog-summary"
                        content={post.metadata.summary}
                      />
                    </div>
                  </Link>
                </li>
              ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Link
                key={pageNum}
                href={{
                  pathname: "/blog",
                  query: { ...searchParams, page: pageNum.toString() },
                }}
                className={`pagination-btn ${pageNum === currentPage ? "active" : ""}`}
              >
                {pageNum}
              </Link>
            )
          )}
        </div>
      </section>
    </article>
  );
}
