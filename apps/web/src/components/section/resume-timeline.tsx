import IconBox from "@/components/icon-box";
import ResumeCard from "@/components/resume/resume-card";

import type { VCardIconType } from "@/types/config";
import type { TimeLineExperience } from "@/types/resume";

interface ResumeTimeLineProps {
  icon: VCardIconType;
  title: string;
  timeLineExperiences: TimeLineExperience[];
  iconName: string; // Changed from icon component to string identifier
}

function ResumeTimeLine({
  icon,
  title,
  timeLineExperiences,
  iconName,
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
              iconName={iconName} // Pass the icon type as a string
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ResumeTimeLine;
