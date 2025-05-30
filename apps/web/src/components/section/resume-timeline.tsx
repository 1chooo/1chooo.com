import IconBox from "@/components/icon-box";
import ResumeCard from "@/components/resume/resume-card";

import type { VCardIconType } from "@/types/config";
import type { TimeLine } from "@/types/resume";

import "@/styles/resume/timeline-item.css";

interface ResumeTimeLineProps {
  icon: VCardIconType;
  title: string;
  timeLines: TimeLine[];
  resumeCategory: string;
}

function ResumeTimeLine({
  icon,
  title,
  timeLines,
  resumeCategory,
}: ResumeTimeLineProps) {
  return (
    <section className="timeline">
      <div className="flex items-center gap-4 mb-6">
        <IconBox icon={icon} />
        <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
      </div>

      <ol className="timeline-list">
        {timeLines.map((timeLine: TimeLine) => (
          <li className="timeline-item" key={timeLine.company}>
            <ResumeCard timeLine={timeLine} resumeCategory={resumeCategory} />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ResumeTimeLine;
