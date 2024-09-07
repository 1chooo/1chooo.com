'use client';

import { usePathname } from 'next/navigation';
import AboutText from '@/components/about/about-text';
import GitHubStats from '@/components/about/github-stats';
import TechStack from '@/components/about/tech-stack';
import LifeStyles from '@/components/about/life-styles';
import { abouts } from '@/config/about';
import PageContent from '@/components/page-content';
import H4 from '@/components/markdown/h4';

const { subHeader, pronouns } = abouts;

const About = () => {
  const pathname = usePathname();

  return (
    <PageContent
      documentTitle=''
      title={abouts.header}
      page="about"
      pathName={pathname}
    >
      {/* TODO: #157 */}
      <H4 text={`${subHeader} (${pronouns})`} />
      <br />
      <AboutText />
      <GitHubStats />
      <TechStack />
      <LifeStyles />
    </PageContent >
  );
}

export default About
