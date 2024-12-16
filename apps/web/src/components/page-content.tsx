import React, { useEffect } from 'react';
import PageHeader from '@/components/page-header';

interface PageContentProps {
  documentTitle: string;
  title: string;
  header: string;
  children: React.ReactNode;
  page?: string;
  pathName?: string;
}

function PageContent({
  documentTitle,
  title,
  header,
  children,
  page,
  pathName
}: PageContentProps) {

  const isRootPage = pathName === '/' && page === 'about';

  if (isRootPage) {
    documentTitle = title;
  } else {
    documentTitle = `${documentTitle} | ${title}`;
  }

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <article data-page={isRootPage ? '' : page}>
      <PageHeader header={header} />
      {children}
    </article>
  );
};

export default PageContent;
