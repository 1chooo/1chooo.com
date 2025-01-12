import React from 'react';

interface BlockQuoteProps {
  children: React.ReactNode;
}

function BlockQuote({ children }: BlockQuoteProps) {
  return (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 text-white-2 text-xl italic font-serif"
    >
      {children}
    </blockquote>
  )
}

export default BlockQuote;
