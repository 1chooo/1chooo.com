import Image from "next/image";
import { ProgressBarLink } from "@/components/progress-bar";
import { Post } from "@/interfaces/post";

interface BlogPostsProps {
  allPosts: Post[];
}

export default function BlogPosts({ allPosts }: BlogPostsProps) {
  return (
    <section className="blog-posts">
      <ul className="blog-posts-list">
        {allPosts.map((post) => (
          <li
            key={post.slug}
            className="blog-post-item"
          >
            <ProgressBarLink
              href={`/blog/${post.slug}`}
              rel="noopener noreferrer"
            >
              <figure className="blog-banner-box">
                <Image
                  src={post.coverImage}
                  alt={post.title || "Blog post image"}
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
                  <span className="dot"></span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(
                      "en-us",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </time>
                </div>
                <h3 className="text-2xl text-white-2 font-semibold leading-[1.3] transition-all hover:text-orange-yellow-crayola">
                  {post.title}
                </h3>
                <p className="text-light-gray text-s font-light leading-6 overflow-hidden line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </ProgressBarLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
