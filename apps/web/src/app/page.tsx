'use client';

import { usePathname } from 'next/navigation';
import AboutText from '@/components/about/about-text';
import GitHubStats from '@/components/about/github-stats';
import TechStack from '@/components/about/tech-stack';
import LifeStyles from '@/components/about/life-styles';
import PageContent from '@/components/page-content';
import H4 from '@/components/markdown/h4';
import config from '@/config';

const { about } = config;
const { subHeader, pronouns } = about;
const { firstName, lastName } = about;
const { preferredName } = about;
const { title } = config;

const header =
  preferredName === ''
    ? `About ${firstName} ${lastName} 👨🏻‍💻`
    : `About ${preferredName} 👨🏻‍💻`;

const About = () => {
  const pathname = usePathname();

  return (
    <PageContent
      documentTitle=''
      title={title}
      header={header}
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
