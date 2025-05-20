import React from "react";

import type { Metadata } from "next";

import PageHeader from "@/components/page-header";
import { Icons } from "@/components/icons";
import ResumeSection from "@/components/section/resume";

import config from "@/config";

import { IoSchoolOutline } from "react-icons/io5";

const { title } = config;

const educations = {
  icon: IoSchoolOutline,
  title: "Education",
  sectionType: "education",
  timeLines: [
    {
      company: "University of Southern California",
      companyImage: "/images/logo/usc.png",
      title: "Master of Science in Computer Science",
      employmentType: "Viterbi School of Engineering",
      location: "Los Angeles, CA 🇺🇸",
      timePeriod: "Aug. 2025 - Present",
    },
    {
      company: "National Central University",
      companyImage: "/images/logo/ncu.png",
      title: "Bachelors of Science in Atmospheric Science",
      employmentType: "College of Earth Sciences",
      location: "Taoyuan, Taiwan 🇹🇼",
      timePeriod: "Sep. 2020 - Jun. 2024",
    }
  ]
}

const experiences = {
  icon: Icons.Devices,
  title: "Professional Experiences",
  sectionType: "experience",
  timeLines: [
    {
      company: "eCloudvalley Digital Technology",
      companyImage: "/images/logo/ecv.png",
      title: "Cloud Engineer",
      employmentType: "Intern",
      location: "New Taipei, Taiwan 🇹🇼",
      timePeriod: "Mar. 2024 - May. 2024",
    },
    {
      company: "AWS",
      companyImage: "/images/logo/aws.svg",
      title: "Campus Ambassador",
      employmentType: "Contract",
      location: "Taipei, Taiwan 🇹🇼",
      timePeriod: "Aug. 2023 - Feb. 2024",
    },
    {
      company: "PEGATRON",
      companyImage: "/images/logo/pegatron.png",
      title: "AI Engineer",
      employmentType: "Intern",
      location: "Taipei, Taiwan 🇹🇼",
      timePeriod: "Jul. 2023 - Aug. 2023",
    },
    {
      company: "National Central University",
      companyImage: "/images/logo/ncu.png",
      title: "Website Developer",
      employmentType: "Part-time",
      location: "Taoyuan, Taiwan 🇹🇼",
      timePeriod: "Jul. 2022 - Jan. 2023",
    },
  ],
};

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

export default function Resume() {
  return (
    <article>
      <PageHeader header="Hugo's Resume" />
      <ResumeSection
        icon={educations.icon}
        title={educations.title}
        timeLines={educations.timeLines}
        sectionType={educations.sectionType}
      />
      <ResumeSection
        icon={experiences.icon}
        title={experiences.title}
        timeLines={experiences.timeLines}
        sectionType={experiences.sectionType}
      />
    </article>
  );
}
