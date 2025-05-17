"use client";

import { CalendarIcon, BriefcaseIcon, BuildingIcon } from "lucide-react";

interface CompanyCardProps {
  companyImage: string;
  companyName: string;
  title: string;
  position: string;
  date: string;
  description: string[];
}

export default function CompanyCard({
  companyImage = "/placeholder.svg?height=40&width=40",
  companyName = "Acme Corporation",
  title = "Software Engineer",
  position = "Full-time",
  date = "Jan 2022 - Present",
  description = [
    "Responsible for developing and maintaining web applications using React and Next.js.",
    "Collaborated with cross-functional teams to deliver high-quality software solutions.",
  ],
}: Partial<CompanyCardProps>) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-xs transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
      {/* Card Header */}
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
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            {companyName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-2">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300">
            <BriefcaseIcon className="h-3 w-3" />
            {position}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300">
            <CalendarIcon className="h-3 w-3" />
            {date}
          </span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500 dark:text-gray-400">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <BuildingIcon className="mr-1 h-3 w-3" />
          Company details
        </div>
      </div>
    </div>
  );
}
