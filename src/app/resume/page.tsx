'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import DownloadCV from '@/components/resume/download-cv';
import TimeLine from '@/components/resume/timeline';
import { professionalExperiences } from '@/config/resume';


const Resume = () => {
  const pathname = usePathname();

  return (
    <main>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <article
          className={`resume ${pathname === '/resume' ? 'active' : ''}`}
          data-page="resume"
        >
          <Header title="Resume" />
          <DownloadCV />
          <TimeLine data={professionalExperiences} />

        </article>
      </div>
    </main>
  );
}

export default Resume
