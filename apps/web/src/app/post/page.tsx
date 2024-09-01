'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initializeCustomSelect, filterItemsByCategory } from '@/utils/dom-utils';

import BlogPosts from '@/components/posts/blog-post';
import PageContent from '@/components/page-content';


const Post = () => {
  const pathname = usePathname();

  useEffect(() => {
    initializeCustomSelect(filterItemsByCategory);
  }, []);

  return (
    <PageContent
      documentTitle='Blog'
      title="Hugo's Blog"
      page="blog"
      pathName={pathname}
    >
      <BlogPosts />
    </PageContent >
  );
}

export default Post;
