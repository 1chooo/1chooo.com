'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';


const Contact = () => {
  const pathname = usePathname();

  return (
    <main>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <article
          className={`contact ${pathname === '/contact' ? 'active' : ''}`}
          data-page="contact"
        >
          <Header title="Contact" />
        </article>
      </div>
    </main>
  );
}

export default Contact
