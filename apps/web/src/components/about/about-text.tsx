import React from 'react';
import MarkdownRenderer from '../markdown/markdown-renderer';
import H4 from '../markdown/h4';

import { abouts } from '@/config/about';
import "@/styles/about/about-text.css"

const { subHeader, introductions, pronouns } = abouts;

const AboutText: React.FC = () => {

  const renderIntroduction = () =>
    introductions.map((item, index) => (
      <MarkdownRenderer key={`${item}-${index}`} content={item} />
    ));

  return (
    <section className="about-text">
      <H4 text={`${subHeader} (${pronouns})`} />
      <br />
      {renderIntroduction()}
    </section>
  );
};

export default AboutText;
