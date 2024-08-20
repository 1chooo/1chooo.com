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
import PageContent from '@/components/page-content';

const About = () => {
  const pathname = usePathname();

  return (
    <PageContent
      documentTitle=''
      title={abouts.header}
      page="about"
      pathName={pathname}
    >
      <AboutText />
      <GitHubStats />
      <TechStack />
      <LifeStyles />
    </PageContent >
  );
}

export default About
