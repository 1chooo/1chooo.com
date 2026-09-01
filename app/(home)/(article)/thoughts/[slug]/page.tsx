import { promises as fs } from 'fs'
import cn from 'clsx'
import { THOUGHT_DIRECTORY } from '@/lib/path'

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
}) {
  const params = await props.params
  const metadata = (await import('../_articles/' + `${params.slug}.mdx`))
    .metadata
  return {
    title: metadata.title,
    description: metadata.description,
  }
}
