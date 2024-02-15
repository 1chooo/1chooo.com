// AboutTextData.tsx

import writingImage from "../../Assets/images/icons/writing.png";
import dumbBellImage from "../../Assets/images/icons/dumbbell.png";
import developerImage from "../../Assets/images/icons/developer.png";
import cameraImage from "../../Assets/images/icons/camera.png";

export const messages: JSX.Element[] = [
  (
    <p key="announcement">
      <h4>📢 Incoming <code className="code-highlight-yellow">2024 eCloudvalley Intern - Cloud Developer 👨🏻‍💻</code></h4>
    </p>
  ),
  (
    <p>
      I'm <strong>Hugo ChunHo Lin</strong>, a 4th-year student at
      <a
        href="https://www.ncu.edu.tw/"
        className="code-highlight-yellow"
        target="_blank"
        rel="noreferrer"
      > National Central University 🐿️
      </a>, fueled by a <em><strong>sincere passion </strong></em>
      for the field of <strong>Software Engineering 💻</strong>.
    </p>
  ),
  (
    <p>
      <em>I do <strong>Web Development and Cloud Development </strong>
        with a focus on <strong>creating APIs and handling backend tasks </strong>
        using <code className="code-highlight-yellow">FastAPI, Gin, and AWS</code>. </em>

      In general, I define new problems and find existing problems,
      transforming solutions into helpful documents or articles to assist everyone in the process,
      and eventually apply them to make social impacts.
    </p>
  ),
  (
    <p>
      In my spare time, I do <em>street photography 📷</em> and <em>consistently share my findings on GitHub with Global 🌏.</em>
    </p>
  ),
];


export interface LifeStyle {
  icon:   string;
  title:  string;
  text:   string;
}

export const lifestyles: LifeStyle[] = [
  {
    icon: developerImage,
    title: "Open Source Contributor",
    text: "Actively contributing to open source projects on GitHub."
  },
  {
    icon: writingImage,
    title: "Content Creator",
    text: "Love to share my knowledge and experience with others."
  },
  {
    icon: dumbBellImage,
    title: "Workouts",
    text: "Basketball and weight training defines my active workout lifestyle."
  },
  {
    icon: cameraImage,
    title: "Photography",
    text: "Sky brings freedom; streets, a reminder of others' contributions."
  }
];
