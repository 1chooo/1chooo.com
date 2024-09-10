import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import Anchor from './anchor';
import BlockQuote from './block-quote';
import CodeBlock from './code-block';


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
      img: (props) => <img {...props} style={{ maxWidth: '80%', margin: '0 auto' }} />,
      ul: (props) => (
        <ul
          {...props}
          style={{
            paddingLeft: '1.0rem',
          }}
        />
      ),
      li: (props) => (
        <li
          {...props}
          style={{
            marginBottom: '0.15rem',
          }}
        />
      ),
      blockquote: (props) => <BlockQuote {...props}>{props.children}</BlockQuote>,
      code({ node, inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '');

        return !inline && match ? (
          <CodeBlock language={match[1]}>{children}</CodeBlock>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;
