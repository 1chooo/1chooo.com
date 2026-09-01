"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Route = "index" | "full" | "perpage"

interface RouteConfig {
  id: Route
  label: string
  file: string
  description: string
  detail: string
}

const ROUTES: RouteConfig[] = [
  {
    id: "index",
    label: "llms.txt",
    file: "app/(llms)/llms.txt/route.ts",
    description: "Reads MDX frontmatter from every article. Skips drafts, sorts by date, and builds a one-line-per-post index.",
    detail: "parseMetadata uses a Function constructor to evaluate the JS object literal directly from the MDX file — no JSON serialisation needed.",
  },
  {
    id: "full",
    label: "llms-full.txt",
    file: "app/(llms)/llms-full.txt/route.ts",
    description: "Reads the complete MDX source, strips imports and JSX tags with regex, and concatenates every article body with --- dividers.",
    detail: "Static pages (home, bio, projects) are also included. The stripMdx pipeline removes all component tags while preserving the prose.",
  },
  {
    id: "perpage",
    label: "llm/[…slug]",
    file: "app/(llms)/llm/[[...slug]]/route.ts",
    description: "A catch-all route that serves any single page as clean Markdown. /llm/notes/css-layout returns just that note's stripped content.",
    detail: "Useful when an LLM wants to read one specific article in full without downloading the entire site. Served as text/markdown.",
  },
]

type TreeItem = { path: string; active: boolean }

const FILE_TREES: Record<Route, TreeItem[]> = {
  index: [
    { path: "app/", active: false },
    { path: "  (llms)/", active: false },
    { path: "    llms.txt/", active: false },
    { path: "      route.ts", active: true },
    { path: "    llms-full.txt/", active: false },
    { path: "    llm/[[...slug]]/", active: false },
  ],
  full: [
    { path: "app/", active: false },
    { path: "  (llms)/", active: false },
    { path: "    llms.txt/", active: false },
    { path: "    llms-full.txt/", active: false },
    { path: "      route.ts", active: true },
    { path: "    llm/[[...slug]]/", active: false },
  ],
  perpage: [
    { path: "app/", active: false },
    { path: "  (llms)/", active: false },
    { path: "    llms.txt/", active: false },
    { path: "    llms-full.txt/", active: false },
    { path: "    llm/", active: false },
    { path: "      [[...slug]]/", active: false },
    { path: "        route.ts", active: true },
  ],
}

type CodeLine = { text: string; color?: string }

const CODE_LINES: Record<Route, CodeLine[]> = {
  index: [
    { text: "export const revalidate = false", color: "text-[#5a9fd4]" },
    { text: "" },
    { text: "function parseMetadata(content: string) {", color: "text-rurikon-600" },
    { text: "  const match = content.match(" },
    { text: "    /export\\s+const\\s+metadata\\s*=\\s*\\{([\\s\\S]*?)\\}/", color: "text-[#9b72d4]" },
    { text: "  )" },
    { text: "  return new Function(`return ({${match[1]}})`)()", color: "text-[#7aab4e]" },
    { text: "}" },
    { text: "" },
    { text: "export async function GET() {", color: "text-[#5a9fd4]" },
    { text: "  const [thoughts, notes, episodes] =" },
    { text: "    await Promise.all([" },
    { text: "      getArticles('thoughts')," },
    { text: "      getArticles('notes')," },
    { text: "      getArticles('episodes')," },
    { text: "    ])" },
    { text: "" },
    { text: "  const lines = [", color: "text-rurikon-600" },
    { text: "    '# Lin Hugo'," },
    { text: "    '## Thoughts', ''," },
    { text: "    ...thoughts.map(({ metadata, slug }) =>", color: "text-rurikon-500" },
    { text: "      `- [${metadata.title}](...): ${metadata.description}`", color: "text-[#9b72d4]" },
    { text: "    )," },
    { text: "  ]" },
    { text: "" },
    { text: "  return new NextResponse(lines.join('\\n'), {" },
    { text: "    headers: {" },
    { text: "      'Content-Type': 'text/plain; charset=utf-8',", color: "text-[#7aab4e]" },
    { text: "      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',", color: "text-[#7aab4e]" },
    { text: "    }" },
    { text: "  })" },
    { text: "}", color: "text-[#5a9fd4]" },
  ],
  full: [
    { text: "function stripMdx(content: string): string {", color: "text-[#5a9fd4]" },
    { text: "  return content" },
    { text: "    // remove export const metadata = { … }" },
    { text: "    .replace(/export\\s+const\\s+metadata.../, '')", color: "text-[#9b72d4]" },
    { text: "    // remove import statements" },
    { text: "    .replace(/^import\\s+.*$/gm, '')", color: "text-[#9b72d4]" },
    { text: "    // remove <Component /> self-closing tags" },
    { text: "    .replace(/<[A-Z][A-Za-z]*[^>]*\\/>/g, '')", color: "text-[#9b72d4]" },
    { text: "    // unwrap <BlockSideTitle>…</BlockSideTitle>" },
    { text: "    .replace(/<[A-Z]...>(...)/, '$1')", color: "text-[#9b72d4]" },
    { text: "    .trimEnd()" },
    { text: "}" },
    { text: "" },
    { text: "export async function GET() {", color: "text-[#5a9fd4]" },
    { text: "  const [notes, indexBody] = await Promise.all([" },
    { text: "    getArticlesFull('notes')," },
    { text: "    getStaticPage('page.mdx')," },
    { text: "  ])" },
    { text: "" },
    { text: "  const sections = notes.map(({ slug, metadata, body }) => [" },
    { text: "    `## ${metadata.title}`," },
    { text: "    `URL: /notes/${slug}`," },
    { text: "    metadata.date ? `Date: ${metadata.date}` : null," },
    { text: "    ''," },
    { text: "    body,", color: "text-[#7aab4e]" },
    { text: "  ].filter(Boolean).join('\\n'))" },
    { text: "" },
    { text: "  return new NextResponse(sections.join('\\n\\n---\\n\\n'), {" },
    { text: "    headers: { 'Content-Type': 'text/plain; charset=utf-8' }" },
    { text: "  })" },
    { text: "}", color: "text-[#5a9fd4]" },
  ],
  perpage: [
    { text: "// /llm           → homepage", color: "text-rurikon-300 italic" },
    { text: "// /llm/bio       → bio page", color: "text-rurikon-300 italic" },
    { text: "// /llm/notes/css-layout → that note", color: "text-rurikon-300 italic" },
    { text: "" },
    { text: "export async function GET(_req, { params }) {", color: "text-[#5a9fd4]" },
    { text: "  const slug = (await params).slug ?? []" },
    { text: "" },
    { text: "  let content: string | null = null" },
    { text: "" },
    { text: "  if (slug.length === 0) {", color: "text-rurikon-600" },
    { text: "    content = await readMdx('app/(home)/page.mdx')" },
    { text: "  } else if (slug.length === 1) {", color: "text-rurikon-600" },
    { text: "    // bio, projects …" },
    { text: "    content = await readMdx(`app/(home)/${slug[0]}/page.mdx`)" },
    { text: "  } else if (slug.length === 2) {", color: "text-rurikon-600" },
    { text: "    const [section, articleSlug] = slug" },
    { text: "    content = await readMdx(", color: "text-[#7aab4e]" },
    { text: "      `app/(home)/(article)/${section}/_articles/`", color: "text-[#9b72d4]" },
    { text: "      + `${articleSlug}.mdx`", color: "text-[#9b72d4]" },
    { text: "    )" },
    { text: "  }" },
    { text: "" },
    { text: "  if (!content) notFound()", color: "text-[#d4a96a]" },
    { text: "" },
    { text: "  return new Response(content, {" },
    { text: "    headers: {" },
    { text: "      'Content-Type': 'text/markdown; charset=utf-8',", color: "text-[#7aab4e]" },
    { text: "    }" },
    { text: "  })" },
    { text: "}", color: "text-[#5a9fd4]" },
  ],
}

export function DemoNextRoutes() {
  const [route, setRoute] = useState<Route>("index")
  const current = ROUTES.find((r) => r.id === route)!
  const tree = FILE_TREES[route]
  const codeLines = CODE_LINES[route]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — file tree + description */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4" style={{ minHeight: 200 }}>

              {/* File tree */}
              <div className="font-mono text-xs leading-7">
                {tree.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "px-2 rounded transition-colors duration-200",
                      item.active
                        ? "bg-rurikon-800 text-white"
                        : "text-rurikon-400"
                    )}
                  >
                    {item.path}
                  </div>
                ))}
              </div>

              {/* Description card */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{current.file}</span>
                <span className="text-xs text-rurikon-500">{current.description}</span>
                <span className="text-xs text-rurikon-400 italic">{current.detail}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">route handlers</span>
              {ROUTES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRoute(r.id)}
                  className={cn(
                    "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                    route === r.id
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right — code output */}
          <div className="w-full text:w-85 flex flex-col bg-[#fdfcfa]">
            <div className="p-3 overflow-y-auto" style={{ maxHeight: 460 }}>
              <div className="font-mono text-[11px] bg-rurikon-50/60 border border-rurikon-border/40 p-3 leading-6">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className={cn("text-rurikon-600", line.color)}
                  >
                    {line.text || "\u00a0"}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
