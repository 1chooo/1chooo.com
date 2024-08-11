'use client';

import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import DownloadCV from '@/components/resume/download-cv';
import TimeLine from '@/components/resume/timeline';
import { professionalExperiences } from '@/config/resume';
import { initializeCustomSelect, filterItemsByCategory } from '@/utils/dom-utils';

const profExp = <TimeLine data={professionalExperiences} />;

const Resume = () => {
  const pathname = usePathname();

  useEffect(() => {
    initializeCustomSelect(filterItemsByCategory);
    document.title = "Resume - Hugo ChunHo Lin (1chooo) | Open Source Enthusiast";
  }, []);

  return (
    <main>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <article
          className={`resume ${pathname === '/resume' ? 'active' : ''}`}
          data-page="resume"
        >
          <Header title="Hugo's Resume" />
          <DownloadCV />
          {profExp}
        </article>
      </div>
    </main>
  );
}

export default Resume
