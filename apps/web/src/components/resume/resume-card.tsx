import Image from "next/image";

import { CalendarIcon, MapPin } from "lucide-react";

import type { TimeLineExperience } from "@/types/resume";
import type { VCardIconType } from "@/types/config";

interface ResumeCardProps {
  icon: VCardIconType;
  timeLineExperience: TimeLineExperience;
}

import "@/styles/skills-bar.css";


/**
 * @bug
 * ```
 * Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.
  <... timeLineExperience={{...}} icon={{$$typeof: ..., render: ...}}>
                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * ```
 */
export default function ResumeCard({
  icon: Icon,
  timeLineExperience,
}: ResumeCardProps) {
  const { company } = timeLineExperience;
  const { companyImage } = timeLineExperience;
  const { title } = timeLineExperience;
  const { employmentType } = timeLineExperience;
  const { location } = timeLineExperience;
  const { timePeriod } = timeLineExperience;

  return (
    <section className="skill">
      <div className="skills-list content-card">
        <div className="flex flex-row items-center gap-4 p-6 pb-4">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={companyImage || "/favicon.ico"}
              alt={company}
              className="h-full w-full object-cover"
              // onError={(e) => {
              //   e.currentTarget.src = "/favicon.ico?height=40&width=40";
              //   e.currentTarget.onerror = null;
              // }}
              width={40}
              height={40}
            />
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-white-1">{company}</div>
            <div className="text-sm text-light-gray">{title}</div>
          </div>
        </div>

        <div className="px-6 pb-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium text-orange-yellow-crayola border-gray-700">
              <Icon className="h-3 w-3" />
              {employmentType}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium text-orange-yellow-crayola border-gray-700">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium text-orange-yellow-crayola border-gray-700">
              <CalendarIcon className="h-3 w-3" />
              {timePeriod}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
