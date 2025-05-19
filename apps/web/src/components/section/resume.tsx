import IconBox from "@/components/icon-box";
import TimelineList from "@/components/resume/v2/timeline-list";

import type { VCardIconType } from "@/types/config";
import type { TimeLine } from "@/types/resume";

interface ResumeSectionProps {
  icon: VCardIconType;
  title: string;
  timeLines: TimeLine[];
}

function ResumeSection({ icon, title, timeLines }: ResumeSectionProps) {
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
