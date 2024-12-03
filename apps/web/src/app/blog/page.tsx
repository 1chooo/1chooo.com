import Link from "next/link";
import Image from "next/image";
import Balancer from 'react-wrap-balancer'
import PageHeader from "@/components/page-header";
import FilterSelectBox from "@/components/blog/filter-select-box";
import FilterList from "@/components/blog/filter-list";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import { getBlogPosts } from "@/lib/db/blog";
import { POSTS_PER_PAGE } from "@/lib/constants";
import config from "@/config";

const { title } = config;

export const metadata = {
  title: `Blog | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
};

type tParams = Promise<{ tag?: string; page?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: tParams }) {
  const { tag = "All", page = "1" } = await searchParams;
  let allBlogs = await getBlogPosts();
  const blogTags = [
    "All",
    ...Array.from(
      new Set(allBlogs.map((post) => post.metadata.category ?? ""))
    ),
  ];
  const selectedTag = tag;
  const currentPage = parseInt(page, 10);

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

  return (
    <article>
      <PageHeader header="Hugo's Blog" />
      <section className="blog-posts">
        <FilterList selectedTag={selectedTag} blogTags={blogTags} />
        <FilterSelectBox selectedTag={selectedTag} blogTags={blogTags} />
        <ul className="blog-posts-list">
          {paginatedBlogs.map((post, index) => (
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
                    width={1600}
                    height={900}
                    priority={false}
                    placeholder="blur"
                    loading="eager"
                    blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                  />
                </figure>
                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.metadata.category}</p>
                    <span className="dot"></span>
                    <time dateTime={post.metadata.publishedAt}>
                      {new Date(post.metadata.publishedAt).toLocaleDateString(
                        "en-us",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </time>
                  </div>
                  <h3 className="text-2xl text-white-2 font-semibold leading-[1.3] transition-all hover:text-orange-yellow-crayola">
                    <Balancer><MarkdownRenderer content={post.metadata.title} /></Balancer>
                  </h3>
                  <MarkdownRenderer
                    className="text-light-gray text-s font-light leading-6 overflow-hidden line-clamp-2"
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
                  query: { tag: selectedTag, page: pageNum.toString() },
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
