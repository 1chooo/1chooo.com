import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Anchor from '../../components/Anchor'; // Adjust the import path accordingly


export const aboutHeader: string = "About Hugo 👨🏻‍💻";

export const description = `
I'm **Hugo ChunHo Lin**, a 4th-year student at [National Central University 🐿️](https://www.ncu.edu.tw/), fueled by a ***sincere passion*** for the field of **Software Engineering 💻.**

*I do **Web Development and Cloud Development** with a focus on **creating APIs and handling backend tasks** using \`FastAPI, Gin, and AWS\`. In general, I define new problems and find existing problems, transforming solutions into helpful documents or articles to assist everyone in the process, and eventually apply them to make social impacts.*

In my spare time, I do *street photography 📷* and *consistently share my findings on GitHub with Global 🌏*.
`;

export const messages: JSX.Element[] = [
  (
    <ReactMarkdown
      key="content"
      children={description}
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => <Anchor {...props} />,
      }}
    />
  ),
];
