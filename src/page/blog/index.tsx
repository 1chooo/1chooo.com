import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../../components/SideBar/SideBar";
import NavBar from "../../components/Navbar";
import BlogPosts from "../../components/blog/blogPosts";
import {
  initializeCustomSelect, filterItemsByCategory
} from "../../utils/domUtils";

const Blog = () => {
  const location = useLocation();

  useEffect(() => {
    initializeCustomSelect(filterItemsByCategory);
  }, []);

  return (
    <main>
      <Sidebar />
      <div className="main-content">
        <NavBar />
        <article
          className={`blog ${location.pathname === '/blog' ? 'active' : ''}`}
          data-page="blog"
        >
          <header>
            <h2 className="h2 article-title">Blog</h2>
          </header>
          <BlogPosts />
        </article>
      </div>
    </main>
  );
}

export default Blog;
