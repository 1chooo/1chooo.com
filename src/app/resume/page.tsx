'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';

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
        </article>
      </div>
    </main>
  );
}

export default Resume
