import React, { useEffect } from 'react';
import PageHeader from '@/components/page-header';

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
      <PageHeader title={title} />
      {children}
    </article>
  );
};

export default PageContent;
