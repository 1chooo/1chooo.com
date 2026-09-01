import { promises as fs } from 'fs'
import Link from 'next/link'
import { THOUGHT_DIRECTORY, thoughtPath } from '@/lib/path'

export const metadata = {
  title: 'Thoughts',
}

export default async function ThoughtsPage() {
  const articles = await fs.readdir(THOUGHT_DIRECTORY)

  const items = []
  for (const article of articles) {
    if (!article.endsWith('.mdx')) continue
    const mdx = await import('./_articles/' + article)

    if (!mdx.metadata) throw new Error('Missing `metadata` in ' + article)
    if (mdx.metadata.draft) continue

    items.push({
      slug: article.replace(/\.mdx$/, ''),
      title: mdx.metadata.title,
      date: mdx.metadata.date || '-',
      sort: Number(mdx.metadata.date?.replaceAll('.', '') || 0),
    })
  }
  items.sort((a, b) => b.sort - a.sort)

  return (
    <div>
      {/* <h1 className="font-semibold mb-7 text-rurikon-600 text-balance">Thoughts</h1> */}
      <ul>
        {items.map((item) => (
          <li key={item.slug} className='font-medium'>
            <Link
              href={thoughtPath(item.slug)}
              className='group flex gap-1 -mx-2 px-2 justify-between items-center focus-visible:outline focus-visible:outline-rurikon-400 focus-visible:rounded-xs focus-visible:outline-dotted focus-visible:text-rurikon-600'
              draggable={false}
            >
              <span className='block text-rurikon-500 group-hover:text-rurikon-700 group-focus-visible:text-rurikon-700'>
                {item.title}
              </span>
              <span className='text-sm dot-leaders flex-1 text-rurikon-100 font-normal group-hover:text-rurikon-500 group-focus-visible:text-rurikon-500 transition-colors group-hover:transition-none leading-none' />
              <time className='block text-rurikon-200 tabular-nums font-normal tracking-tighter group-hover:text-rurikon-500 group-focus-visible:text-rurikon-500 transition-colors group-hover:transition-none self-start'>
                {item.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
      <p className='mt-6 text-sm text-right'>
        <Link
          href='/notes'
          className='text-rurikon-300 hover:text-rurikon-600 transition-colors underline focus-visible:outline focus-visible:outline-rurikon-400 focus-visible:rounded-xs focus-visible:outline-dotted'
        >
          see more notes →
        </Link>
      </p>
    </div>
  )
}
