"use client";

import React, { useEffect } from "react";
import { Send } from "lucide-react";
import PageHeader from "@/components/page-header";
import config from "@/config";

const { title } = config;

import "@/styles/contact/map-box.css";

/**
 * TODO: #341 still need to update with another method to avoid client side not available metadata
 * export const metadata: Metadata = {
 *   title: `Contact | ${title}`,
 * };
 */

function Contact() {
  useEffect(() => {
    document.title = `Contact | ${title}`;
  }, [title]);

  return (
    <article>
      <PageHeader header="Contact Me" />
      <section className="mb-[10px]">
        <div className="mapbox" data-mapbox="true">
          <figure>
            <iframe
              title="map address"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.447790694502!2d-118.29153251133746!3d34.02089114329221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7fb61e73c2d%3A0xe6fd0a5832af7b29!2sUSC%20Viterbi%20School%20of%20Engineering!5e0!3m2!1sen!2stw!4v1749014215095!5m2!1sen!2stw"
              width="400"
              height="300"
              loading="lazy"
            >
            </iframe>
          </figure>
        </div>

        <h3 className="text-white-2 text-2xl font-bold mb-[20px]">
          Contact Form
        </h3>
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
            onClick={() => alert("not implemented yet!")}
          >
            <Send />
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
}

export default Contact;
