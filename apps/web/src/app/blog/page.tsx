'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initializeCustomSelect, filterItemsByCategory } from '@/lib/utils/dom-utils';

import BlogPosts from '@/components/blog/blog-post';
import PageContent from '@/components/page-content';


const Blog = () => {
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

export default Blog;
