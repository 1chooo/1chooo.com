'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import FilterList from "@/components/blog/filter-list";
import FilterSelectBox from "@/components/blog/filter-select-box";
import BlogPostList from "@/components/blog/blog-post-list";
import Pagination from "@/components/blog/pagination";
import { initializeCustomSelect, filterItemsByCategory } from '@/utils/dom-utils';

import { filterCategory, handleItemClick } from "@/utils/filter-utils";
import { IPost } from "@/interface/iPost";
import { postsData } from "@/config/blog";
import BlogPosts from '@/components/blog/blog-post';
import PageContent from '@/components/page-content';


const Blog = () => {
  const pathname = usePathname();

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
