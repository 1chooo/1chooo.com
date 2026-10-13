import type { Metadata } from 'next'

import type { JsonLdGraph, PublicContentSection } from '@/types/seo'

export const SITE_URL = 'https://1chooo.com'
export const SITE_NAME = 'Lin Hugo'
export const SITE_DESCRIPTION =
  "Hi, I'm Lin Hugo, a software builder and writer studying Computer Science at the USC Viterbi School of Engineering."

const PERSON_ID = `${SITE_URL}/#lin`
const WEBSITE_ID = `${SITE_URL}/#website`

const SAME_AS = [
  'https://github.com/1chooo',
  'https://www.linkedin.com/in/1chooo',
  'https://x.com/1chooo___',
] as const

const ARTICLE_SCHEMA_TYPE = {
  thoughts: 'BlogPosting',
  notes: 'BlogPosting',
  episodes: 'Article',
} as const satisfies Record<PublicContentSection, string>

const SECTION_LABEL = {
  thoughts: 'Thoughts',
  notes: 'Notes',
  episodes: 'Episodes',
} as const satisfies Record<PublicContentSection, string>

type ContentMeta = {
  section: PublicContentSection
  slug: string
  title: string
  description?: string
  date?: string
  chinese?: boolean
}

export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function toIsoDate(date?: string): string | undefined {
  if (!date) return undefined
  const normalized = date.replaceAll('.', '-')
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : undefined
}

export function siteGraph(): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Software builder',
        description: SITE_DESCRIPTION,
        affiliation: {
          '@type': 'CollegeOrUniversity',
          name: 'USC Viterbi School of Engineering',
          url: 'https://viterbischool.usc.edu/',
        },
        sameAs: [...SAME_AS],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
        inLanguage: 'en',
      },
    ],
  }
}

export function articleGraph(input: ContentMeta): JsonLdGraph {
  const path = `/${input.section}/${input.slug}`
  const url = `${SITE_URL}${path}`
  const published = toIsoDate(input.date)

  const article: Record<string, unknown> = {
    '@type': ARTICLE_SCHEMA_TYPE[input.section],
    '@id': `${url}#article`,
    headline: input.title,
    url,
    mainEntityOfPage: url,
    author: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: input.chinese ? 'zh-Hans' : 'en',
  }

  if (input.description) article.description = input.description
  if (published) article.datePublished = published
  if (input.section === 'thoughts' || input.section === 'notes') {
    article.image = `${url}/opengraph-image`
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      article,
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: SECTION_LABEL[input.section],
            item: `${SITE_URL}/${input.section}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: input.title,
            item: url,
          },
        ],
      },
    ],
  }
}

export function articleMetadata(input: ContentMeta): Metadata {
  const path = `/${input.section}/${input.slug}`
  const publishedTime = toIsoDate(input.date)

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: path,
      types: {
        'text/markdown': `/llm${path}`,
      },
    },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      locale: 'en_US',
      title: input.title,
      description: input.description,
      url: path,
      ...(publishedTime ? { publishedTime } : {}),
    },
  }
}
