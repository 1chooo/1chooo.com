import IconBox from "@/components/icon-box";
import TimelineList from "@/components/resume/v2/timeline-list";

import type { ProfessionalExperience } from "@/types/resume";
import type { Education } from "@/types/resume";
import type { AwardLeaderships } from "@/types/resume";
import type { TeachingExperience } from "@/types/resume";
import type { VCardIconType } from "@/types/config";

/**
 * @todo update the type to be more specific
 */
interface TimeLineProps {
  data:
  | ProfessionalExperience
  | Education
  | AwardLeaderships
  | TeachingExperience;
}

/**
 * @todo update the type to be more specific
 */
// eslint-disable-next-line no-unused-vars
interface ResumeSectionProps {
  icon: VCardIconType;
  title: string;
}


function ResumeSection({ data }) {
  const { icon } = data;
  const { title } = data;
  const { timeLines } = data;

  return (
    <section className="timeline">
      <div className="flex items-center gap-4 mb-6">
        <IconBox icon={icon} />
        <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
      </div>
      <TimelineList timeLines={timeLines} />
    </section>
  );
}

export default ResumeSection;
