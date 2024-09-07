import React from 'react';
import MarkdownRenderer from '@/components/markdown/markdown-renderer';

import { abouts } from '@/config/about';
import "@/styles/about/about-text.css"

const { introductions } = abouts;

const AboutText: React.FC = () => {

  const renderIntroduction = () =>
    introductions.map((item, index) => (
      <MarkdownRenderer key={`${item}-${index}`} content={item} />
    ));

  return (
    <section className="about-text">
      {renderIntroduction()}
    </section>
  );
};

export default AboutText;
