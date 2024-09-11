"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

import Anchor from './anchor';
import BlockQuote from './block-quote';
import CodeBlock from './code-block';

interface MarkdownRendererProps {
  content: string;
}

const isImageNode = (node: any): node is Element => {
  return node && node.type === 'element' && node.tagName === 'img';
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
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
      img: (props) => {
        const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

        return (
          <div
            style={{
              maxWidth: '80%',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <Image
              src={props.src ?? ''}
              alt={props.alt ?? 'Image'}
              layout="responsive"
              objectFit="contain"
              priority={true}
              onLoadingComplete={(target) => {
                setImageSize({
                  width: target.naturalWidth,
                  height: target.naturalHeight,
                });
              }}
              width={imageSize.width}
              height={imageSize.height}
            />
            {props.alt && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                color: '#555',
                textAlign: 'center'
              }}>
                {props.alt}
              </div>
            )}
          </div>
        );
      },
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