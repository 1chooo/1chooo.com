import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, code }: { language: string, code: string }) => {
  const customStyle = {
    padding: '1em',
    margin: '0.5em 0',
    overflow: 'auto',
    background: 'rgb(30, 30, 30)',
    fontSize: '13px',
    lineHeight: '1.5',
    whiteSpace: 'pre',
  };

  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={customStyle}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
