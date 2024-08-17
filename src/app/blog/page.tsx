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


const Blog = () => {
  const pathname = usePathname();

  useEffect(() => {
    initializeCustomSelect(filterItemsByCategory);
    handleItemClick('All', setSelectedValue);
    document.title = "Blog - Hugo ChunHo Lin (1chooo) | Open Source Enthusiast";
  }, []);



  const [selectedValue, setSelectedValue] = useState('All');
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const filteredPosts = filterCategory(selectedValue, postsData);

  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <article
          className={`blog ${pathname === '/blog' ? 'active' : ''}`}
          data-page="blog"
        >
          <Header title="Hugo's Blog" />
          <section className="blog-posts">
            <FilterList
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              setCurrentPage={setCurrentPage}
            />
            <FilterSelectBox
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              isSelectActive={isSelectActive}
              setIsSelectActive={setIsSelectActive}
              setCurrentPage={setCurrentPage}
            />
            <BlogPostList posts={currentPosts as IPost[]} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </section>
        </article>
      </div>
    </main>
  );
}

export default Blog;
