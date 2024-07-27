import React, { useEffect, useState, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import GitHubCalendar from 'react-github-calendar';
import { ThemeInput } from 'react-activity-calendar';

import SubHeader from './SubHeader';
import { abouts } from '../../config/about';

/* 
* goto https://grubersjoe.github.io/react-activity-calendar/
* to see more themes
*/
const yellowTheme: ThemeInput = {
  light: ['hsl(0, 0%, 92%)', '#FFDA6B'],
  dark: ['hsl(0, 0%, 22%)', '#FFDA6B'],
};

const { githubUsername } = abouts;
const subHeaderText = '$ ls -al GitHub Stats';
const MOBILE_CALENDAR_SIZE = 12;
const LAPTOP_CALENDAR_SIZE = 12;
const MOBILE_BREAKPOINT = 768;

const GitHub: FC = () => {
  const [searchParams] = useSearchParams();
  const initialUsername = searchParams.get('user') ?? githubUsername;

  const [username, setUsername] = useState(initialUsername);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setUsername(initialUsername);
  }, [initialUsername]);

  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  return (
    <section className="about-text">
      <SubHeader text={subHeaderText} />
      <br />
      <GitHubCalendar
        username={username}
        blockSize={isMobile ? MOBILE_CALENDAR_SIZE : LAPTOP_CALENDAR_SIZE}
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

export default GitHub;
