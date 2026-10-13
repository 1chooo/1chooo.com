import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'

import { projectsMarkdown } from '@/lib/projects'

export const revalidate = false

function stripMetadataExport(content: string): string {
  const start = content.search(/export\s+const\s+metadata\s*=\s*\{/)
  if (start === -1) return content
  const open = content.indexOf('{', start)
  let depth = 0
  for (let i = open; i < content.length; i++) {
    if (content[i] === '{') depth += 1
    else if (content[i] === '}') {
      depth -= 1
      if (depth === 0) return content.slice(0, start) + content.slice(i + 1)
    }
  }
  return content
}

function stripMdx(content: string): string {
  return stripMetadataExport(content)
    .replace(/^import\s+.*$/gm, '')
    .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, '')
    .replace(/<[A-Z][A-Za-z]*[^>]*>([\s\S]*?)<\/[A-Z][A-Za-z]*>/g, '$1')
    .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '$1')
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1')
    .replace(/^\n+/, '')
    .trimEnd()
}

async function readMdx(...segments: string[]): Promise<string | null> {
  try {
    const file = path.join(/*turbopackIgnore: true*/ process.cwd(), ...segments)
    const raw = await fs.readFile(file, 'utf-8')
    if (/draft\s*:\s*true/.test(raw)) return null
    return stripMdx(raw)
  } catch {
    return null
  }
}

const ARTICLE_SECTIONS = ['thoughts', 'notes', 'episodes'] as const
type ArticleSection = (typeof ARTICLE_SECTIONS)[number]

function isArticleSection(section: string): section is ArticleSection {
  return ARTICLE_SECTIONS.includes(section as ArticleSection)
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const slug = (await params).slug ?? []
  let content: string | null = null

  if (slug.length === 0) {
    content = await readMdx('app', '(home)', 'page.mdx')
  } else if (slug.length === 1 && slug[0] === 'projects') {
    content = projectsMarkdown()
  } else if (slug.length === 2 && isArticleSection(slug[0])) {
    content = await readMdx(
      'app',
      '(home)',
      '(article)',
      slug[0],
      '_articles',
      `${slug[1]}.mdx`,
    )
  }

  if (content === null) notFound()

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}

export async function generateStaticParams() {
  const params: { slug: string[] }[] = [
    { slug: [] },
    { slug: ['projects'] },
  ]

  for (const section of ARTICLE_SECTIONS) {
    const dir = path.join(process.cwd(), 'app', '(home)', '(article)', section, '_articles')
    const files = await fs.readdir(dir)
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue
      const raw = await fs.readFile(path.join(dir, file), 'utf-8')
      if (/draft\s*:\s*true/.test(raw)) continue
      params.push({ slug: [section, file.replace(/\.mdx$/, '')] })
    }
  }

  return params
}
