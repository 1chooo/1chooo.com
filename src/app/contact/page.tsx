'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import MapBox from '@/components/contact/map-box';
import { FaRegPaperPlane } from "react-icons/fa";


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
          <section className="contact-form">
            <MapBox />
            <h3 className="h3 form-title">Contact Form</h3>
            <form action="#" className="form" data-form>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="fullname"
                  className="form-input"
                  placeholder="Full name"
                  required
                  data-form-input
                />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email address"
                  required
                  data-form-input
                />
              </div>
              <textarea
                name="message"
                className="form-input"
                placeholder="Your Message"
                required
                data-form-input
              ></textarea>
              <button
                className="form-btn"
                disabled
                data-form-btn
                onClick={() => alert('not implemented yet!')}
              >
                <FaRegPaperPlane />
                <span>Send Message</span>
              </button>
            </form>
          </section>
        </article>
      </div>
    </main>
  );
}

export default Contact