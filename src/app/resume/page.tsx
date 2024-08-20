'use client';

import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import DownloadCV from '@/components/resume/download-cv';
import TimeLine from '@/components/resume/timeline';
import {
  professionalExperiences, educations,
  awardLeaderships, teachingExperiences
} from '@/config/resume';
import { initializeCustomSelect, filterItemsByCategory } from '@/utils/dom-utils';
import PageContent from '@/components/page-content';

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
