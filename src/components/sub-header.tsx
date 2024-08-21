import React from 'react';

interface SubHeaderProps {
  text: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ text }) => {
  return (
    // TODO: update inheritance of p.h3
    <h3>
      <code>{text}</code>
    </h3>
  );
};

export default SubHeader;
