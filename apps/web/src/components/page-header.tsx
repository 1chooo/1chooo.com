'use client';

import React from 'react';

const PageHeader = ({ title }: { title: string }) => (
  <header>
    <h2 className="h2 article-title">
      {title}
    </h2>
  </header>
);

export default PageHeader;
