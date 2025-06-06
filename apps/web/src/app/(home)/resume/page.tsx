import React from "react";

import type { Metadata } from "next";

import PageHeader from "@/components/page-header";
import ResumeTimeLine from "@/components/section/resume-timeline";

import type { ResumeTimeLine as ResumeTimeLineType } from "@/types/resume";

import config from "@/config";

const { title, resumes } = config;

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

export default function Resume() {
  return (
    <article>
      <PageHeader header="Hugo's Resume" />
      {(Object.entries(resumes) as [string, ResumeTimeLineType][]).map(
        ([key, resumeTimeLine]) => (
          <ResumeTimeLine
            key={key}
            icon={resumeTimeLine.icon}
            title={resumeTimeLine.title}
            timeLineExperiences={resumeTimeLine.timeLineExperiences}
            iconName={resumeTimeLine.iconName} // Pass the icon type as a string
          />
        ),
      )}
    </article>
  );
}
