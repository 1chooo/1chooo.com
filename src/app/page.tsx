'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import AboutText from '@/components/about-text';
import GitHubStats from '@/components/github-stats';
import TechStack from '@/components/tech-stack';
import LifeStyles from '@/components/life-styles';
import { abouts } from '@/config/about';

export default function Home() {
  const pathname = usePathname();

  return (
    <main>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <article
          className={`about ${pathname === '/' ? 'active' : ''}`}
          data-page="about"
        >
          <Header title={abouts.header} />
          <AboutText />
          <GitHubStats />
          <TechStack />
          <LifeStyles />
        </article>
      </div>
    </main>
  );
}
