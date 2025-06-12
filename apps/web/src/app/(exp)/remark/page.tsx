import Container from "@/app/(exp)/remark/_components/container";
import { HeroPost } from "@/app/(exp)/remark/_components/hero-post";
import { MoreStories } from "@/app/(exp)/remark/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import ArticleTitile from "@/components/article-title";

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <article>
      <ArticleTitile title="Hugo's Blog" />
      <Container>
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </article>
  );
}
