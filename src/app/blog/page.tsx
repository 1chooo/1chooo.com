'use client';

import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import { initializeCustomSelect, filterItemsByCategory } from '@/utils/dom-utils';

const Blog = () => {
  const pathname = usePathname();

  useEffect(() => {
    initializeCustomSelect(filterItemsByCategory);
    document.title = "Blog - Hugo ChunHo Lin (1chooo) | Open Source Enthusiast";
  }, []);

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
        </article>
      </div>
    </main>
  );
}

export default Blog;
