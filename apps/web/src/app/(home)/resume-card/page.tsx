import type { Metadata } from "next";
import React from "react";
import TimeLine from "@/components/resume/v2/timeline";
import PageHeader from "@/components/page-header";
import config from "@/config";
import DownloadCV from "@/components/resume/download-cv";
import SkillsBar from "@/components/resume/skills-bar";

const skills = [
  { name: "JavaScript", level: 80 },
  { name: "TypeScript", level: 70 },
  { name: "React", level: 75 },
  { name: "Node.js", level: 65 },
];

const { title, resume } = config;
const {
  professionalExperiences,
  educations,
  awardLeaderships,
  teachingExperiences,
} = resume;

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

export default function Resume() {
  return (
    <article>
      <PageHeader header="Hugo's Resume" />
      <DownloadCV />
      <TimeLine data={professionalExperiences} />
      <TimeLine data={educations} />
      <TimeLine data={awardLeaderships} />
      <TimeLine data={teachingExperiences} />
      <SkillsBar skills={skills} />
    </article>
  );
}
