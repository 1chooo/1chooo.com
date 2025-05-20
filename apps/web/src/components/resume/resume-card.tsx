"use client";

import Image from "next/image";

import {
  CalendarIcon,
  BriefcaseIcon,
  MapPin,
  School,
} from "lucide-react";

import type { TimeLine } from "@/types/resume";

interface ResumeCardProps {
  timeLine: TimeLine;
  sectionType: string;
}

import "@/styles/skills-bar.css";

export default function ResumeCard({ timeLine, sectionType }: ResumeCardProps) {
  const { company } = timeLine
  const { companyImage } = timeLine
  const { title } = timeLine
  const { employmentType } = timeLine
  const { location } = timeLine
  const { timePeriod } = timeLine

  return (
    <section className="skill">
      <div className="skills-list content-card">
        <div className="flex flex-row items-center gap-4 p-6 pb-4">
          <div className="h-12 w-12 overflow-hidden rounded-md">
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
          <div className="space-y-1">
            <div className="font-semibold text-white-1">{company}</div>
            <div className="text-sm text-light-gray">{title}</div>
          </div>
        </div>

        <div className="px-6 pb-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium text-orange-yellow-crayola border-gray-700">
              {sectionType === "education" ? (
                <School className="h-3 w-3" />
              ) : sectionType === "experience" ? (
                <BriefcaseIcon className="h-3 w-3" />
              ) : null}
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
