import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import Anchor from './anchor';
import BlockQuote from './markdown/block-quote';


interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      a: (props) => <Anchor {...props} />,
      sup: 'sup',
      sub: 'sub',
      blockquote: (props) => <BlockQuote {...props}>{props.children}</BlockQuote>,
      
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;

