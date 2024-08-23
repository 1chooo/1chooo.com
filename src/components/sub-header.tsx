import React from 'react';
import '@/styles/sub-header.css';

interface SubHeaderProps {
  text: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ text }) => {
  return (
    <h3 className="h3 sub-header">
      <code>{text}</code>
    </h3>
  );
};

export default SubHeader;
