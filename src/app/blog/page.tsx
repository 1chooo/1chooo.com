'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';


const Blog = () => {
  const pathname = usePathname();

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

export default Blog
