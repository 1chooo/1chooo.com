'use client';

import React from "react";
import { usePathname } from 'next/navigation';
import DownloadCV from '@/components/resume/download-cv';
import TimeLine from '@/components/resume/timeline';
import PageContent from '@/components/page-content';

import config from "@/config";

const { resume } = config;
const { professionalExperiences } = resume;
const { educations } = resume;
const { awardLeaderships } = resume;
const { teachingExperiences } = resume;

const profExp = <TimeLine data={professionalExperiences} />;
const education = <TimeLine data={educations} />;
const awardLeadership = <TimeLine data={awardLeaderships} />;
const teachingExp = <TimeLine data={teachingExperiences} />;

const Resume = () => {
  const pathname = usePathname();

  return (
    <PageContent
      documentTitle='Resume'
      title="Hugo's Resume"
      page="resume"
      pathName={pathname}
    >
      <DownloadCV />
      {profExp}
      {education}
      {awardLeadership}
      {teachingExp}
    </PageContent >
  );
}

export default Resume
