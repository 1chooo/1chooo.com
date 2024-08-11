'use client';

import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import { initializeCustomSelect, filterItemsByCategory } from '@/utils/dom-utils';


const Portfolio = () => {
  const pathname = usePathname();

  useEffect(() => {
    initializeCustomSelect(filterItemsByCategory);
    document.title = "Portfolio - Hugo ChunHo Lin (1chooo) | Open Source Enthusiast";
  }, []);

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
