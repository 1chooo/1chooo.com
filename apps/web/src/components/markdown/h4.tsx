import React from 'react';

interface H4Props {
  text: string;
}

const H4: React.FC<H4Props> = ({ text }) => {
  return (
    <h4 className="text-light-gray text-lg font-bold mt-[30px] mb-[30px]">
      <code>{text}</code>
    </h4>
  );
};

export default H4;
