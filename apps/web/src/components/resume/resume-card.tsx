"use client";

import {
  CalendarIcon,
  BriefcaseIcon,
  BuildingIcon,
  MapPin,
} from "lucide-react";

interface CompanyCardProps {
  companyImage: string;
  companyName: string;
  title: string;
  employmentType: string;
  timePeriod: string;
  location: string;
  details: string[];
}

import "@/styles/skills-bar.css";

export default function ResumeCard({
  companyImage = "/placeholder.svg?height=40&width=40",
  companyName = "Acme Corporation",
  title = "Software Engineer",
  employmentType = "Full-time",
  timePeriod = "Jan 2022 - Present",
  location = "Remote",
  details = [
    "Responsible for developing and maintaining web applications using React and Next.js.",
    "Collaborated with cross-functional teams to deliver high-quality software solutions.",
  ],
}: Partial<CompanyCardProps>) {
  return (
    <section className="skill">
      <div className="skills-list content-card">
        <div className="flex flex-row items-center gap-4 p-6 pb-4">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <img
              src={companyImage || "/favicon.ico"}
              alt={companyName}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/favicon.ico?height=40&width=40";
                e.currentTarget.onerror = null;
              }}
            />
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-white-1">{companyName}</div>
            <div className="text-sm text-light-gray">{title}</div>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-6 pb-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium text-orange-yellow-crayola border-gray-700">
              <BriefcaseIcon className="h-3 w-3" />
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
          <ul className="list-disc pl-5 space-y-1 text-sm text-white-1">
            {details.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-4">
          <div className="resume-card-separator"></div>
          <div className="flex items-center text-xs text-light-gray-70 mt-2">
            <BuildingIcon className="mr-1 h-3 w-3" />
            Company details
          </div>
        </div>
      </div>
    </section>
  );
}
