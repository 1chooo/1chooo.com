import React from "react";
import TimelineItem from "../timeline-item";
import { TimelineItemProps } from "../timeline-item";
import ResumeCard from "../resume-card";

import "@/styles/resume/timeline-item.css";

interface TimelineListProps {
  items: TimelineItemProps[];
}

function TimelineList({ items }: TimelineListProps) {
  return (
    <ol className="timeline-list">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          company={item.company}
          location={item.location}
          role={item.role}
          duration={item.duration}
          tasksMarkdown={item.tasksMarkdown}
        />
      ))}
      <li className="timeline-item">
        <ResumeCard
          companyImage="/favicon.ico?height=40&width=40"
          companyName="Digital Solutions"
          title="Web Developer"
          position="Part-time"
          date="Jun 2018 - Feb 2020"
          description={[
            "Created and maintained websites for small businesses",
            "Implemented SEO best practices and improved site performance",
            "Provided technical support and training to clients",
          ]} />
      </li>
      <li className="timeline-item">
        <ResumeCard
          companyImage="/favicon.ico?height=40&width=40"
          companyName="Digital Solutions"
          title="Web Developer"
          position="Part-time"
          date="Jun 2018 - Feb 2020"
          description={[
            "Created and maintained websites for small businesses",
            "Implemented SEO best practices and improved site performance",
            "Provided technical support and training to clients",
          ]} />
      </li>
    </ol>
  );
}

export default TimelineList;
