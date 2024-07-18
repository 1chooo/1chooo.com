import {
  useLocation
} from 'react-router-dom';
import React from 'react';

import NavBar from "../Navbar";
import Sidebar from "../SideBar/SideBar";
import CodeBlock from "../CodeBlock";
/* 
 * https://github.com/grubersjoe/react-github-calendar/blob/main/example/src/components/Docs.tsx
 */
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
        <CodeBlock>
          {`import Hugo feom 'hugo';
          
          const hugo = new Hugo();
          hugo.sayHi();`}
        </CodeBlock>
        </article>
      </div>
    </main>

  );
}

export default Docs;
