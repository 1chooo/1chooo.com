import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

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
      <BlurFade inView delay={0.4} direction="down">
        <h2 className="about-section-title">{aboutSectionTitle}</h2>
      </BlurFade>
      {children}
    </section>
  );
}

export default AboutSection;
