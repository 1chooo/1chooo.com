import IconBox from "@/components/icon-box";
import ResumeCard from "@/components/resume/resume-card";

import type { VCardIconType } from "@/types/config";
import type { TimeLine } from "@/types/resume";

import "@/styles/resume/timeline-item.css";

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
    </section>
  );
}

export default ResumeSection;
