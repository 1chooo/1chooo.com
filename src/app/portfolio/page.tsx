'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';


const Portfolio = () => {
  const pathname = usePathname();

  return (
    <main>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <article
          className={`portfolio ${pathname === '/portfolio' ? 'active' : ''}`}
          data-page="portfolio"
        >
          <Header title="Hugo's Portfolio" />
        </article>
      </div>
    </main>
  );
}

export default Portfolio
