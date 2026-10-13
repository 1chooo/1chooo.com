import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

import { SITE_URL } from '@/lib/seo'

export const revalidate = false

type ArticleMetadata = {
  title: string
  date?: string
  description?: string
  draft?: boolean
}

const SECTIONS = ['thoughts', 'notes', 'episodes'] as const

function readString(block: string, key: string): string | undefined {
  const match = block.match(new RegExp(`${key}\\s*:\\s*(['"])([\\s\\S]*?)\\1`))
  return match?.[2]
}

function parseMetadata(content: string): ArticleMetadata {
  const match = content.match(/export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\n\}/)
  if (!match) return { title: '' }
  const block = match[1]
  return {
    title: readString(block, 'title') ?? '',
    date: readString(block, 'date'),
    description: readString(block, 'description'),
    draft: /draft\s*:\s*true/.test(block),
  }
}

async function getArticles(section: (typeof SECTIONS)[number]) {
  const dir = path.join(process.cwd(), 'app', '(home)', '(article)', section, '_articles')
  const files = await fs.readdir(dir)
  const items: { slug: string; metadata: ArticleMetadata; sort: number }[] = []

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue
    const raw = await fs.readFile(path.join(dir, file), 'utf-8')
    const metadata = parseMetadata(raw)
    if (metadata.draft) continue
    items.push({
      slug: file.replace(/\.mdx$/, ''),
      metadata,
      sort: Number(metadata.date?.replaceAll('.', '') || 0),
    })
  }

  items.sort((a, b) => b.sort - a.sort)
  return items
}

export async function GET() {
  const [thoughts, notes, episodes] = await Promise.all(SECTIONS.map((section) => getArticles(section)))

  const lines: string[] = [
    '# Lin Hugo',
    '',
    '> Personal site of Lin Hugo — software builder, writer, and photographer. Covers code, systems design, photography and travel.',
    '',
    '## Pages',
    '',
    `- [About](${SITE_URL}/llm): A short introduction to who I am.`,
    `- [Bio](${SITE_URL}/bio): My background, work history, and interests.`,
    `- [Projects](${SITE_URL}/llm/projects): Open-source and personal projects.`,
    '',
  ]

  const groups = [
    ['Thoughts', 'thoughts', thoughts],
    ['Notes', 'notes', notes],
    ['Episodes', 'episodes', episodes],
  ] as const

  for (const [heading, section, articles] of groups) {
    lines.push(`## ${heading}`, '')
    for (const { slug, metadata } of articles) {
      const desc = metadata.description ? `: ${metadata.description}` : ''
      lines.push(`- [${metadata.title}](${SITE_URL}/llm/${section}/${slug})${desc}`)
    }
    lines.push('')
  }

  lines.push(
    '## Optional',
    '',
    '- [GitHub](https://github.com/1chooo): Source code.',
    '- [LinkedIn](https://www.linkedin.com/in/1chooo): Profile.',
    '- [X](https://x.com/1chooo___): Updates.',
    '',
  )

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
