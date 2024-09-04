import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>1chooo.com Documentation</span>,
  head: (
    <>
      <link rel="icon" href="/favicon.ico" type="image/png" />
    </>
  ),
  project: {
    link: 'https://github.com/1chooo/1chooo.com',
  },
  docsRepositoryBase: 'https://github.com/1chooo/1chooo.com/tree/main/apps/docs',
  footer: {
    text: '2024 © 1chooo',
  },
  // ... other theme options
}

export default config
