import { FunctionComponent } from "react";

const AboutText: FunctionComponent = ({ }) => {
  return (
    <section className="about-text">
      <p>
        <h3><code> $ ls -al Hugo 👨🏻‍💻 (He/Him)</code></h3>
      </p>

      <p>
        <h4>📢 Incoming <code className="code-highlight-yellow">2024 eCloudvalley Intern - Cloud Developer 👨🏻‍💻</code></h4>
      </p>

      <p>
        I'm a 4th-year student at
        <a
          href="https://www.ncu.edu.tw/"
          className="code-highlight-yellow"
          target="_blank"
          rel="noreferrer"
        > National Central University 🐿️
        </a>, fueled by a <em><strong>sincere passion </strong></em>
        for the field of <strong>Software Engineering 💻</strong>.
      </p>

      <p>
        I do <strong>Web Development and Cloud Development </strong> 
        with a focus on creating APIs and handling backend tasks using Python, GO, and AWS.
        In general, I define new problems and find existing problems, 
        transforming solutions into helpful documents or articles to assist everyone in the process,
        and eventually apply them to make social impacts.
      </p>

      <p>
        In my spare time, I do street photography 📷 and consistently share my findings on GitHub with Global.
      </p>

    </section>
  );
}

export default AboutText;