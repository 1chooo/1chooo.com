import { promises as fs } from 'fs'
import cn from 'clsx'
import Link from 'next/link'
import { NOTE_DIRECTORY } from '@/lib/path'

export default async function NotesSlugPage(props: {
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
      <p className='mt-6 text-sm'>
        <Link
          href='/notes'
          className='text-rurikon-300 hover:text-rurikon-600 transition-colors underline focus-visible:outline focus-visible:outline-rurikon-400 focus-visible:rounded-xs focus-visible:outline-dotted'
        >
          ← back to notes
        </Link>
      </p>
    </div>
  )
}

export async function generateStaticParams() {
  const articles = await fs.readdir(NOTE_DIRECTORY)

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
