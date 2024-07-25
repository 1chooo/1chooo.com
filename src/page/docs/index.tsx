import {
  useLocation
} from 'react-router-dom';
import React from 'react';

import NavBar from '../../components/Navbar';
import Sidebar from '../../components/SideBar/SideBar';
import CodeBlock from '../../components/CodeBlock';

/* 
 * https://github.com/grubersjoe/react-github-calendar/blob/main/example/src/components/Docs.tsx
 */

const codeString = `
console.log('Hello World');
console.log("Hello");
`;
const Docs: React.FC = () => {

  const location = useLocation();
  const htmlContent = '<a href="https://1chooo.com" target="_blank" rel="noreferrer"> HiHi</a>';

  return (
    <main>
      <Sidebar />
      <div className="main-content">
        <NavBar />
        <article
          className={`docs ${location.pathname === '/docs' ? 'active' : ''}`}
          data-page="docs"
        >
          <header>
            <h2 className="h2 article-title">Docs</h2>
          </header>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          <CodeBlock language="javascript" code={codeString} />
          <pre>
            <code>
              {`
console.log('Hello World');
console.log("Hello");
        `}
            </code>
          </pre>
        </article>
      </div>
    </main>

  );
}

export default Docs;
