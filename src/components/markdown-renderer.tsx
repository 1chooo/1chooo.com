import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Anchor from './anchor';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{ a: (props) => <Anchor {...props} /> }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;