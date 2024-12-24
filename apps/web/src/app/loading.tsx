import PageHeader from '@/components/page-header';
import AboutHeader from '@/components/about/about-header';
import config from '@/config';

const { about, title } = config;
const { subHeader, pronouns, firstName, lastName, preferredName } = about;

const header =
  preferredName === ''
    ? `About ${firstName} ${lastName} 👨🏻‍💻`
    : `About ${preferredName} 👨🏻‍💻`;

export default function Loading() {
  return (
    <article>
      <PageHeader header={header} />
      <AboutHeader text={`${subHeader} (${pronouns})`} />
      <p>Loading introduction...</p>
      <AboutHeader text="$ ls -al Latest Articles" />
      <p>Loading latest articles...</p>
      <p>Loading coding stats...</p>
      <p>Loading life styles...</p>
    </article>
  );
}

