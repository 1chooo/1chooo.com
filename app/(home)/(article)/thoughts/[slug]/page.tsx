import { promises as fs } from 'fs'
import cn from 'clsx'
import type { Metadata } from 'next'

import { JsonLd } from '@/components/seo/json-ld'
import { THOUGHT_DIRECTORY } from '@/lib/path'
import { articleGraph, articleMetadata } from '@/lib/seo'

export default async function ThoughtsSlugPage(props: {
  params: Promise<{
    slug: string
  }>
}) {
  const params = await props.params
  const { default: MDXContent, metadata } = await import(
    '../_articles/' + `${params.slug}.mdx`
  )

  return (
    <div
      className={cn(metadata.chinese && 'text-justify font-zh')}
      lang={metadata.chinese ? 'zh-Hans' : 'en'}
    >
      <JsonLd
        data={articleGraph({
          section: 'thoughts',
          slug: params.slug,
          title: metadata.title,
          description: metadata.description,
          date: metadata.date,
          chinese: metadata.chinese,
        })}
      />
      <MDXContent />
    </div>
  )
}

export async function generateStaticParams() {
  const articles = await fs.readdir(THOUGHT_DIRECTORY)

  return articles
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => ({
      slug: name.replace(/\.mdx$/, ''),
    }))
}

export async function generateMetadata(props: {
  params: Promise<{
    slug: string
  }>
}): Promise<Metadata> {
  const params = await props.params
  const metadata = (await import('../_articles/' + `${params.slug}.mdx`))
    .metadata
  return articleMetadata({
    section: 'thoughts',
    slug: params.slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    chinese: metadata.chinese,
  })
}
