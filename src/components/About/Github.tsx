import React, { useEffect, useState, FC } from "react";
import { useSearchParams } from 'react-router-dom';
import GitHubCalendar from "react-github-calendar";
import { ThemeInput } from "react-activity-calendar";

import SubHeader from "./SubHeader";
import { abouts } from '../../config/about';

/* 
* goto https://grubersjoe.github.io/react-activity-calendar/
* to see more themes
*/
const yellowTheme: ThemeInput = {
  light: ['hsl(0, 0%, 92%)', '#FFDA6B'],
  dark: ["hsl(0, 0%, 22%)", "#FFDA6B"],
};
const { githubUsername } = abouts;
const subHeader = "$ ls -al GitHub Stats";

const GitHub: FC = () => {
  const [searchParams] = useSearchParams();
  const initialUsername = searchParams.get('user') ?? githubUsername;

  const [username, setUsername] = useState(initialUsername);

  useEffect(() => {
    if (initialUsername !== username) {
      setUsername(initialUsername);
    }
  }, [initialUsername, username]);


  return (
    <section className="about-text">
      <SubHeader text={subHeader} />
      <br />
      <GitHubCalendar
        username={username}
        blockSize={12}
        blockMargin={4}
        colorScheme="dark"
        blockRadius={2}
        fontSize={14}
        style={{ fontWeight: 'bold', }}
        theme={yellowTheme}
      />
    </section>
  );
}

export default GitHub;
