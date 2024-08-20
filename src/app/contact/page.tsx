'use client';

import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import SideBar from '@/components/side-bar';
import NavBar from '@/components/nav-bar';
import Header from '@/components/header';
import MapBox from '@/components/contact/map-box';
import { FaRegPaperPlane } from "react-icons/fa";
import { initializeCustomSelect, filterItemsByCategory } from '@/utils/dom-utils';
import PageContent from "@/components/page-content";

const Contact = () => {
  const pathname = usePathname();


  return (
    <PageContent
      documentTitle='Contact'
      title="Hugo's Contact"
      page="contact"
      pathName={pathname}
    >
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
    </PageContent >
  );
}

export default Contact
