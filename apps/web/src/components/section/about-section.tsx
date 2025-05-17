import React from "react";

import "@/styles/about-section.css";

interface AboutSectionProps {
  id?: string;
  aboutSectionTitle: string;
  marginTop?: string;
  marginBottom?: string;
  children: React.ReactNode;
}

function AboutSection({ id, aboutSectionTitle, children }: AboutSectionProps) {
  return (
    <section id={id} className="about-section">
      <h2 className="about-section-title">{aboutSectionTitle}</h2>
      {children}
    </section>
  );
}

export default AboutSection;
