import React from "react";

import ResumeCard from "@/components/resume/resume-card";

import "@/styles/resume/timeline-item.css";

type TimeLine = {
  company: string;
  companyImage: string;
  title: string;
  employmentType: string;
  location: string;
  timePeriod: string;
  details: string[];
}

interface TimelineListProps {
  timeLines: TimeLine[];
}

/**
 * @todo update TimeLineListProps
 */
// eslint-disable-next-line no-unused-vars
function TimelineList({ timeLines }: TimelineListProps) {
  return (
    <ol className="timeline-list">
      {timeLines.map((item: TimeLine) => (
        <li className="timeline-item" key={item.company}>
          <ResumeCard
            companyImage={item.companyImage}
            companyName={item.company}
            title={item.title}
            employmentType={item.employmentType}
            timePeriod={item.timePeriod}
            location={item.location}
            details={item.details}
          />
        </li>
      ))}
    </ol>
  );
}

export default TimelineList;
