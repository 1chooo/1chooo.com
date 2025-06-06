import IconBox from "@/components/icon-box";
import ResumeCard from "@/components/resume/resume-card";

import type { VCardIconType } from "@/types/config";
import type { ResumeCardType } from "@/types/resume";

interface ResumeTimeLineProps {
  icon: VCardIconType;
  title: string;
  resumeCards: ResumeCardType[];
}

function ResumeTimeLine({
  icon,
  title,
  resumeCards,
}: ResumeTimeLineProps) {
  return (
    <div className="timeline">
      <div className="flex items-center gap-4 mb-6">
        <IconBox icon={icon} />
        <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
      </div>

      <ol className="timeline-list">
        {resumeCards.map((resumeCard: ResumeCardType, index: number) => (
          <li className="timeline-item" key={`${resumeCard.institution}-${index}`}>
            <ResumeCard
              resumeCard={resumeCard}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ResumeTimeLine;
