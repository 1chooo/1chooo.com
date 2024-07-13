import React from 'react';
import MarkdownRenderer from '../MarkdownRenderer';

import { abouts } from '../../config/about';

const AboutText: React.FC = () => {
  const { subHeader, description } = abouts;

  const renderDescription = () =>
    description.map((item, index) => (
      <MarkdownRenderer
        key={`${item}-${index}`}
        content={item}
      />
    ));

  return (
    <section className="about-text">
      <p>
        <h3><code>{subHeader}</code></h3>
      </p>
      {renderDescription()}
    </section>
  );
};

export default AboutText;
