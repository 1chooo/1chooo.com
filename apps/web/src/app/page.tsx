'use client';

import { usePathname } from 'next/navigation';
import AboutText from '@/components/about/about-text';
import GitHubStats from '@/components/about/github-stats';
import TechStack from '@/components/about/tech-stack';
import LifeStyles from '@/components/about/life-styles';
import config from '@/config';
import PageContent from '@/components/page-content';
import H4 from '@/components/markdown/h4';

const { about } = config;
const { subHeader, pronouns } = about;
const { firstName, lastName } = config;
const { preferredName } = config;

const title =
  preferredName === ''
    ? `About ${firstName} ${lastName} 👨🏻‍💻`
    : `About ${preferredName} 👨🏻‍💻`;


const About = () => {
  const pathname = usePathname();

  return (
    <PageContent
      documentTitle=''
      title={title}
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
