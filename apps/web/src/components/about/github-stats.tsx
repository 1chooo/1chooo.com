import GitHubCalendar from 'react-github-calendar';
import { ThemeInput } from 'react-activity-calendar';

import config from '@/config';

const yellowTheme: ThemeInput = {
  light: ['hsl(0, 0%, 92%)', '#FFDA6B'],
  dark: ['hsl(0, 0%, 22%)', '#FFDA6B'],
};

const { about } = config;
const { githubUsername } = about;

/**
 * @link
 * https://grubersjoe.github.io/react-activity-calendar/
 */
function GitHubStats({ }) {

  return (
    <section className="text-light-gray mt-5">
      <GitHubCalendar
        username={githubUsername}
        blockSize={12}
        blockMargin={4}
        colorScheme="dark"
        blockRadius={2}
        fontSize={14}
        style={{ fontWeight: 'bold' }}
        theme={yellowTheme}
      />
    </section>
  );
};

export default GitHubStats;
