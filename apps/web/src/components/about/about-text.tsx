import React from 'react';
import MarkdownRenderer from '@/components/markdown/markdown-renderer';

interface AboutTextProps {
  introduction: string;
}

const AboutText: React.FC<AboutTextProps> = ({ introduction }) => {
  return (
    <section className="text-light-gray leading-relaxed">
      <MarkdownRenderer content={introduction} />
    </section>
  );
}

export default AboutText;
