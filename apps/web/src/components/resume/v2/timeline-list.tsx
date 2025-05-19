import React from "react";

import { TimelineItemProps } from "@/components/resume/timeline-item";
import ResumeCard from "@/components/resume/resume-card";

import "@/styles/resume/timeline-item.css";

interface TimelineListProps {
  items: TimelineItemProps[];
}

/**
 * @todo update TimeLineListProps
 */
// eslint-disable-next-line no-unused-vars
function TimelineList({ items }: TimelineListProps) {
  return (
    <ol className="timeline-list">
      <li className="timeline-item">
        <ResumeCard
          companyImage="/favicon.ico?height=40&width=40"
          companyName="Digital Solutions"
          title="Web Developer"
          position="Part-time"
          date="Jun 2018 - Feb 2020"
          location="Remote"
          description={[
            "Created and maintained websites for small businesses",
            "Implemented SEO best practices and improved site performance",
            "Provided technical support and training to clients",
          ]}
        />
      </li>
      <li className="timeline-item">
        <ResumeCard
          companyImage="/favicon.ico?height=40&width=40"
          companyName="Digital Solutions"
          title="Web Developer"
          position="Part-time"
          date="Jun 2018 - Feb 2020"
          location="Remote"
          description={[
            "Created and maintained websites for small businesses",
            "Implemented SEO best practices and improved site performance",
            "Provided technical support and training to clients",
          ]}
        />
      </li>
    </ol>
  );
}

export default TimelineList;
