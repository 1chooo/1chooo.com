import Link from 'next/link';
import { getBlogPosts } from '@/app/db/blog';
import PageHeader from '@/components/page-header';
import Image from 'next/image';

export const metadata = {
  title: 'Blog | Hugo ChunHo Lin (1chooo) | Open Source Enthusiast',
  description: 'Read my thoughts on software development, design, and more.',
};

// Define your blog tags here
let blogTags: string[] = ['All'];

export default function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  let allBlogs = getBlogPosts();
  blogTags = ['All', ...Array.from(new Set(allBlogs.map(post => post.metadata.category ?? '')))];
  const selectedTag = searchParams.tag || 'All';

  // Filter blogs based on the selected tag
  const filteredBlogs = selectedTag === 'All'
    ? allBlogs
    : allBlogs.filter(post => post.metadata.category === selectedTag);

  return (
    <article>
      <PageHeader title="Hugo's Blog" />
      {/* Filter List */}
      <section className="blog-posts">
        <ul className="filter-list">
          {blogTags.map((tag, index) => (
            <li className="filter-item" key={index}>
              <Link
                href={`/blog?tag=${encodeURIComponent(tag || '')}`}
                className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="blog-posts-list">
          {filteredBlogs
            .sort((a, b) => {
              if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                return -1;
              }
              return 1;
            })
            .map((post, index) => (
              <li
                key={index}
                className="blog-post-item active"
                data-category={post.metadata.category}
              >
                <Link href={`/blog/${post.slug}`} rel="noopener noreferrer">
                  <figure className="blog-banner-box">
                    <Image
                      src={post.metadata.banner}
                      alt={post.metadata.alt || 'Blog post image'}
                      loading="lazy"
                      width={1600}
                      height={900}
                    />
                  </figure>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <p className="blog-category">{post.metadata.category}</p>
                      <span className="dot"></span>
                      <time dateTime={post.metadata.publishedAt}>
                        {new Date(post.metadata.publishedAt).toLocaleDateString()}
                      </time>
                    </div>
                    <h3 className="h3 blog-item-title">{post.metadata.title}</h3>
                    <p className="blog-text">{post.metadata.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </article>
  );
}