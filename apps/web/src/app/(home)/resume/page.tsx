import React from "react";

import type { Metadata } from "next";

import ArticleTitile from "@/components/article-title";
import ResumeTimeLine from "@/components/section/resume-timeline";

import type { ResumeTimeLineType } from "@/types/resume";

import config from "@/config";

const { title, resumes } = config;

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

export default function Resume() {
  return (
    <article>
      <ArticleTitile title="Hugo's Resume" />
      {(Object.entries(resumes) as [string, ResumeTimeLineType][]).map(
        ([key, resumeTimeLine]) => (
          <ResumeTimeLine
            key={key}
            icon={resumeTimeLine.icon}
            title={resumeTimeLine.title}
            resumeCards={resumeTimeLine.resumeCards}
          />
        ),
      )}
    </article>
  );
}
