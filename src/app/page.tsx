'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import AboutText from '@/components/about/about-text';
import GitHubStats from '@/components/about/github-stats';
import TechStack from '@/components/about/tech-stack';
import LifeStyles from '@/components/about/life-styles';
import { abouts } from '@/config/about';

const About = () => {
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

export default About
