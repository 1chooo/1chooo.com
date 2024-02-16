

export interface ResumeProps {
  title: string;
  duration: string;
  university: string;
  description: JSX.Element[];
}

const items = ['Item 1', 'Item 2', 'Item 3'];
const symbol = '☁️'; // 或者你可以使用其他符號，比如 '👉🏻'

// 建立課程物件
export const courses: ResumeProps[] = [
  {
    title: "Linux and Edge Computing",
    duration: "Feb, 2024 - present",
    university: "National Central University",
    description: [
      (
        <p className="timeline-text">
          <a
            href="https://www.ncu.edu.tw/"
            target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            National Central University</a> | 📍 Taoyuan, Taiwan
        </p>
      ),
      (
        <p className="timeline-text">
          GitHub: <a
            href="https://github.com/NCU-GS4538-Linux"
            target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            NCU-GS4538-Linux
          </a> | Course Website: <a
            href="https://ncuedu.tw/"
            target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            NCUEDU
          </a>
        </p>
      ),
      (
        <p className="timeline-text">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {symbol} {item}
              </li>
            ))}
          </ul>

        </p>
      ),
    ],
  },
  {
    title: "GS4719 Python Programming",
    duration: "Sep, 2023 - Jan, 2024",
    university: "National Central University",
    description: [
      (
        <p className="timeline-text">
          <a
            href="https://www.ncu.edu.tw/"
            target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            National Central University</a> | 📍 Taoyuan, Taiwan
        </p>
      ),
      (
        <p className="timeline-text">
          GitHub: <a
            href="https://github.com/NCU-GS4719-Python/"
            target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            NCU-GS4719-Python
          </a> | Course Website: <a
            href="https://ncuedu.tw/"
            target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            NCUEDU
          </a>
        </p>
      ),
    ],
  },
  {
    title: "AP4063 Weather and Artificial Intelligence Ⅰ/Ⅱ",
    duration: "Sep, 2023 - present",
    university: "National Central University",
    description: [
      (
        <p className="timeline-text">
          <a
            href="https://www.ncu.edu.tw/"
            target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            National Central University</a> | 📍 Taoyuan, Taiwan
        </p>
      ),
      (
        <p className="timeline-text">
          GitHub: <a
            href="https://github.com/weather-and-ai" target="_blank"
            className="code-highlight-yellow"
            rel="noreferrer"
          >
            Weather and Artificial Intelligence
          </a>
        </p>
      ),
    ],
  }
];