import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { rehypeGithubAlerts } from 'rehype-github-alerts'

import Anchor from './anchor';
import BlockQuote from './block-quote';
import CodeBlock from './code-block';
import MarkdownImage from './markdown-image';

interface MarkdownRendererProps {
  className?: string;
  content: string;
}

const isImageNode = (node: any): node is Element => {
  return node && node.type === 'element' && node.tagName === 'img';
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  className,
  content
}) => (
  <ReactMarkdown
    className={className}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw, rehypeGithubAlerts]}
    components={{
      p: ({ node, children }) => {
        const hasImage = node && node.children && node.children.some(isImageNode);
        if (hasImage) {
          return <>{children}</>;
        }
        return <p>{children}</p>;
      },
      a: (props) => <Anchor {...props} />,
      sup: 'sup',
      sub: 'sub',
      img: (props) => <MarkdownImage src={props.src ?? ''} alt={props.alt} />,
      ul: (props) => (
        <ul
          {...props}
          style={{
            paddingLeft: '1.0rem',
          }}
        />
      ),
      ol: (props) => (
        <ol
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
      h1: (props) => (
        <h1
          {...props}
          style={{
            marginTop: '3.0rem',
            marginBottom: '2.0rem',
          }}
        />
      ),
      h2: (props) => (
        <h2
          {...props}
          style={{
            marginTop: '2.5rem',
            marginBottom: '1.5rem',
          }}
        />
      ),
      h3: (props) => (
        <h3
          {...props}
          style={{
            marginTop: '2.0rem',
            marginBottom: '1.0rem',
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
