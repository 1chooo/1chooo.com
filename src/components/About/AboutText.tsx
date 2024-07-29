import React from 'react';
import SubHeader from './SubHeader';
import MarkdownRenderer from '../MarkdownRenderer';

import { abouts } from '../../config/about';

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
