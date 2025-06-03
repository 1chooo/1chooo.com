import IconBox from "@/components/icon-box";
import ResumeCard from "@/components/resume/resume-card";

import type { VCardIconType } from "@/types/config";
import type { TimeLineExperience } from "@/types/resume";

import "@/styles/resume/timeline-item.css";

interface ResumeTimeLineProps {
  icon: VCardIconType;
  title: string;
  timeLineExperiences: TimeLineExperience[];
  resumeCategory: string;
}

function ResumeTimeLine({
  icon,
  title,
  timeLineExperiences,
  resumeCategory,
}: ResumeTimeLineProps) {
  return (
    <div className="timeline">
      <div className="flex items-center gap-4 mb-6">
        <IconBox icon={icon} />
        <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
      </div>

      <ol className="timeline-list">
        {timeLineExperiences.map((timeLineExperience: TimeLineExperience) => (
          <li className="timeline-item" key={timeLineExperience.company}>
            <ResumeCard
              timeLineExperience={timeLineExperience}
              resumeCategory={resumeCategory}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ResumeTimeLine;
