export interface ProfessionalExperienceProps {
  company: string;
  title: string;
  date: string;
  description: JSX.Element[];
  location: string;
}

export const professionalExperiences: ProfessionalExperienceProps[] = [
  {
    company: "eCloudvalley Digital Technology",
    title: "Cloud Engineer Intern",
    date: "Mar. 2024 - May. 2024",
    description: [
      (
        <p className="timeline-text">
          <ul>
            <li>
              ☁️ Utilized a serverless architecture on <strong>AWS Lambda</strong>, performing <strong>troubleshooting with CloudWatch</strong>, deployed via <strong>AWS CDK</strong>, and integrated with <strong>DynamoDB and Bedrock</strong> services.
            </li>
            <li>
              ☁️ <strong>Led a team of 5</strong> to enhance the existing ticket system with Claude, boosting <strong>cloud support enigineer efficiency by 80%.</strong> Integrated <strong>multi-language</strong> support and <strong>image recognition</strong>, achieving <strong>95%</strong> accuracy.
            </li>
            <li>
              ☁️ Identified issues in <strong>10+</strong> mock-cases, like <strong>VPC entry failures, EC2 Apache Server restarts, and S3 photo access
              problems.</strong> Documented solutions in a <strong><u><a
                className="code-highlight-yellow"
                href="https://github.com/1chooo/ecv-training-materials/tree/main/msp/aws_challenge"
                target="_blank"
                rel="noreferrer"
              >Tech Note</a></u></strong> for sharing with interns.
            </li>
          </ul>
        </p>
      ),
    ],
    location: "📍 New Taipei, Taiwan"
  },
  {
    company: "Amazon Web Services",
    title: "Campus Ambassador",
    date: "Aug. 2023 - Jan. 2024",
    description: [
      (
        <p className="timeline-text">
          <ul>
            <li>
              ☁️ Educated <strong>700+</strong> cloud developers and achieved <strong>96%</strong> of
              user satisfaction by publishing and lecturing <strong>2+ technical workshops, 1 UAD</strong> on
              AWS cloud computing services <strong>(Lex, Amazon S3, Lambda, API Gateway)</strong>.
            </li>
            <li>
              ☁️ <strong>Developed</strong> an <strong>open-source</strong> project called <strong>"AWS 101 LINE Bot"</strong> designed for integration with <strong>AWS 101</strong>.
            </li>
          </ul>
        </p>
      ),
    ],
    location: "📍 Taipei, Taiwan",
  },
  {
    company: "PEGATRON Corporation",
    title: "Software Engineer Intern",
    date: "Jul. 2023 - Aug. 2023",
    description: [
      (
        <p className="timeline-text">
          <ul>
            <li>
              <em><strong>Smart Robot, Smart World 🦾:</strong> Prompt-based Learning for manipulating with the Visual-World Robot</em>
            </li>
            <li>
              🦾 Implementing <strong>Prompt Engineering and <code>LangChain</code></strong> allows
              the <strong><u><a
                className="code-highlight-yellow"
                href="https://www.nvidia.com/en-us/omniverse/"
                target="_blank"
                rel="noreferrer"
              >NVIDIA Ominerve visual robot</a></u></strong> to function
              through <strong>speech or text</strong>, leading to an <strong>83%</strong> improvement
              in scenario test support across <strong>6 to 11</strong> scenarios.
            </li>
            <li>
              🦾 During the <strong>Proof of Concept (POC)</strong> phase,
              transform the trained model into a <strong>Web Application</strong> with
              a user interface using <strong><code>Gradio</code></strong>, the UI toolkit
              for the <strong><code>FastAPI</code></strong> framework.
            </li>
          </ul>
        </p>
      ),
    ],
    location: "📍 Taipei, Taiwan",
  },
  // {
  //   title: "National Central University",
  //   description: [
  //     (
  //       <p>
  //         <a
  //           href="https://www.ecloudture.com/en/internship-program/"
  //           className="profession-experience-title"
  //           target="_blank"
  //           rel="noreferrer"
  //         >
  //           Website Developer
  //         </a>
  //         <span className="profession-experience-duration">
  //           🗓️ Jul. 2022 - Jan. 2023
  //         </span>
  //       </p>
  //     ),
  //     (
  //       <br />
  //     ),
  //   ],
  //   location: "📍 Taoyuan, Taiwan"
  // },
];
