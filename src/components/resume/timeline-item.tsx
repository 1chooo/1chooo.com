import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "@/styles/resume/timeline-item.css";

export interface TimelineItemProps {
  company: string;
  location: string;
  role: string;
  duration: string;
  tasksMarkdown: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  company,
  location,
  role,
  duration,
  tasksMarkdown,
}) => (
  <li className="timeline-item">
    <h4 className="h4 timeline-item-title">
      {company}
      <span>📍 {location}</span>
    </h4>
    <p className="profession-experience-title">
      {role}
      <span className="profession-experience-duration">🗓️ {duration}</span>
    </p>
    <br />
    <p className="timeline-text">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {tasksMarkdown}
      </ReactMarkdown>
    </p>
  </li>
);

export default TimelineItem;
