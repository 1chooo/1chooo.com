'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PageContent from '@/components/page-content';
import Projects from '@/components/portfolio/projects';
import { initializeCustomSelect, filterItemsByCategory } from '@/lib/utils/dom-utils';
import config from '@/config';

const { title } = config;

const Portfolio = () => {
  const pathname = usePathname();

  useEffect(() => {
    initializeCustomSelect(filterItemsByCategory);
  }, []);

  return (
    <PageContent
      documentTitle='Portfolio'
      title={title}
      header="Hugo's Portfolio"
      page="portfolio"
      pathName={pathname}
    >
      <Projects />
    </PageContent>
  );
}

export default Portfolio;
