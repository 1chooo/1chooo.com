'use client';

import React from 'react';
import MarkdownRenderer from './markdown-renderer';
import SubHeader from './sub-header';

import { abouts } from '@/config/about';

const { subHeader, introductions, pronouns } = abouts;

const AboutText: React.FC = () => {

  const renderIntroduction = () =>
    introductions.map((item, index) => (
      <MarkdownRenderer key={`${item}-${index}`} content={item} />
    ));

  return (
    <section className="about-text">
      <SubHeader text={`${subHeader} (${pronouns})`} />
      <br />
      {renderIntroduction()}
    </section>
  );
};

export default AboutText;