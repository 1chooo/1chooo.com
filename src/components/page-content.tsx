import React, { useEffect } from 'react';
import Header from '@/components/markdown/header';

const PageContent: React.FC<{
  documentTitle: string;
  title: string;
  children: React.ReactNode;
  page?: string;
  pathName?: string;
}> = ({ documentTitle, title, children, page, pathName }) => {

  const isRootPage = pathName === '/' && page === 'about';

  if (isRootPage) {
    documentTitle = "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast";
  } else {
    documentTitle = `${documentTitle} | Hugo ChunHo Lin (1chooo) | Open Source Enthusiast`;
  }

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <article data-page={isRootPage ? '' : page}>
      <Header title={title} />
      {children}
    </article>
  );
};

export default PageContent;
