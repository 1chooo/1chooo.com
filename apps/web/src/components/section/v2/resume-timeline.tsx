import IconBox from "@/components/icon-box";
import ResumeCard from "@/components/resume/v2/resume-card";

import type { VCardIconType } from "@/types/config";
import type { ResumeCardType } from "@/types/resume";

interface ResumeTimeLineProps {
  icon: VCardIconType;
  title: string;
  timeLineExperiences: ResumeCardType[];
  iconName: string; // Changed from icon component to string identifier
}

function ResumeTimeLine({
  icon,
  title,
  timeLineExperiences,
}: ResumeTimeLineProps) {
  return (
    <div className="timeline">
      <div className="flex items-center gap-4 mb-6">
        <IconBox icon={icon} />
        <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
      </div>

      <ol className="timeline-list">
        {timeLineExperiences.map((timeLineExperience: ResumeCardType) => (
          <li className="timeline-item" key={timeLineExperience.institution}>
            <ResumeCard
              timeLineExperience={timeLineExperience}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ResumeTimeLine;
