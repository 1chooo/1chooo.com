import { getAllPosts } from "@/lib/api";
import PageHeader from "@/components/page-header";
import BlogPosts from "@/components/blog/blog-posts";

import "@/styles/blog.css";

export default function Blog() {
  const allPosts = getAllPosts();

  return (
    <article>
      <PageHeader header="Hugo's Blog" />
      <BlogPosts allPosts={allPosts} />
    </article>
  );
}
