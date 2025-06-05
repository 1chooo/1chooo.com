"use client";

import Image from "next/image";
import {
  CalendarIcon,
  MapPin,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
} from "lucide-react";

import type { TimeLineExperience } from "@/types/resume";

import "@/styles/resume-card.css";

interface ResumeCardProps {
  iconType: string;
  timeLineExperience: TimeLineExperience;
}

export default function ResumeCard({
  iconType,
  timeLineExperience,
}: ResumeCardProps) {
  const { company, companyImage, title, employmentType, location, timePeriod } =
    timeLineExperience;

  const getIcon = () => {
    switch (iconType) {
      case "briefcase":
        return BriefcaseIcon;
      case "graduation-cap":
        return GraduationCapIcon;
      case "award":
        return AwardIcon;
      default:
        return BriefcaseIcon;
    }
  };

  const Icon = getIcon();

  return (
    <section className="skill">
      <div className="skills-list resume-card">
        <div className="flex flex-row items-center gap-4 p-6 pb-4">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={companyImage || "/favicon.ico"}
              alt={company}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/favicon.ico?height=40&width=40";
                e.currentTarget.onerror = null;
              }}
              width={40}
              height={40}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="font-semibold text-white-1 truncate">{company}</div>
            <div className="text-sm text-light-gray truncate">{title}</div>
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
