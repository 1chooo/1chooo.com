import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs';

export default {
  logo: <span>1chooo.com Documentation</span>,
  footer: {
    component: null
  },
  editLink: {
    component: null
  },
  head: (
    <>
      <link rel="icon" href="/favicon.ico" type="image/png" />
    </>
  ),
  project: {
    link: 'https://github.com/1chooo/1chooo.com',
  },
  docsRepositoryBase: 'https://github.com/1chooo/1chooo.com/tree/main/apps/docs',
} as DocsThemeConfig;
