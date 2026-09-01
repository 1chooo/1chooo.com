"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type NodeId =
  | "layout"
  | "posts-page"
  | "post-page"
  | "post-list"
  | "post-card"
  | "like-button"
  | "comment-section"
  | "share-menu"

type NodeDef = {
  id: NodeId
  label: string
  file: string
  type: "server" | "client"
  isBoundary?: boolean
  description: string
  detail: string
  code: string
}

const NODES: Record<NodeId, NodeDef> = {
  layout: {
    id: "layout",
    label: "layout.tsx",
    file: "app/layout.tsx",
    type: "server",
    description: "Root layout — Server Component.",
    detail: "Wraps every page. Fetches the current user session once for the whole tree. No interactivity needed here, so it stays a Server Component.",
    code: `// app/layout.tsx
export default async function RootLayout({ children }) {
  const session = await getSession()
  return (
    <html>
      <body>
        <Nav user={session?.user} />
        {children}
      </body>
    </html>
  )
}`,
  },
  "posts-page": {
    id: "posts-page",
    label: "posts/page.tsx",
    file: "app/posts/page.tsx",
    type: "server",
    description: "Posts listing page — Server Component.",
    detail: "Fetches all posts directly from the database at request time. No loading state, no client-side fetch. The rendered HTML arrives pre-filled.",
    code: `// app/posts/page.tsx
export default async function PostsPage() {
  const posts = await db.posts.findMany({
    orderBy: { date: "desc" },
  })
  return <PostList posts={posts} />
}`,
  },
  "post-page": {
    id: "post-page",
    label: "posts/[slug]/page.tsx",
    file: "app/posts/[slug]/page.tsx",
    type: "server",
    description: "Single post page — Server Component.",
    detail: "Fetches the post by slug, parses Markdown on the server (zero bundle cost), and passes the rendered HTML down. Interactive leaves are composed in below.",
    code: `// app/posts/[slug]/page.tsx
export default async function PostPage({ params }) {
  const post = await db.posts.findUnique({
    where: { slug: params.slug },
  })
  const html = await renderMarkdown(post.content)
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <LikeButton postId={post.id} initialLikes={post.likes} />
      <ShareMenu title={post.title} />
      <CommentSection postId={post.id} />
    </article>
  )
}`,
  },
  "post-list": {
    id: "post-list",
    label: "PostList",
    file: "components/PostList.tsx",
    type: "server",
    description: "Renders the list of posts — Server Component.",
    detail: "Receives posts as props from the page. Purely presentational — maps over posts and renders PostCard for each. No state or events needed.",
    code: `// components/PostList.tsx
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  )
}`,
  },
  "post-card": {
    id: "post-card",
    label: "PostCard",
    file: "components/PostCard.tsx",
    type: "server",
    description: "Individual post card — Server Component.",
    detail: "Static card with title, excerpt, date, and a link. No interactivity on the card itself — the like button inside the detail page is a separate Client Component.",
    code: `// components/PostCard.tsx
export function PostCard({ post }: { post: Post }) {
  return (
    <li>
      <Link href={"/posts/" + post.slug}>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <time>{post.date}</time>
      </Link>
    </li>
  )
}`,
  },
  "like-button": {
    id: "like-button",
    label: "LikeButton",
    file: "components/LikeButton.tsx",
    type: "client",
    isBoundary: true,
    description: "Like button — Client Component.",
    detail: "Needs useState to track optimistic like count and onClick to fire the API call. Receives the initial count as a prop from the Server Component parent so the first render is instant.",
    code: `// components/LikeButton.tsx
"use client"
export function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  async function handleLike() {
    setLikes(l => l + 1)
    setLiked(true)
    await fetch("/api/posts/" + postId + "/like", {
      method: "POST",
    })
  }
  return (
    <button onClick={handleLike} disabled={liked}>
      ♥ {likes}
    </button>
  )
}`,
  },
  "comment-section": {
    id: "comment-section",
    label: "CommentSection",
    file: "components/CommentSection.tsx",
    type: "client",
    isBoundary: true,
    description: "Comment section — Client Component.",
    detail: "Manages a controlled textarea, optimistic comment list, and submission state. All state lives in the browser — fetching and posting comments is purely client-side after the initial page load.",
    code: `// components/CommentSection.tsx
"use client"
export function CommentSection({ postId }) {
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")

  async function submit(e) {
    e.preventDefault()
    const comment = { text, id: Date.now() }
    setComments(c => [...c, comment])   // optimistic
    setText("")
    await fetch("/api/posts/" + postId + "/comments", {
      method: "POST",
      body: JSON.stringify({ text }),
    })
  }
  return (
    <section>
      {comments.map(c => <p key={c.id}>{c.text}</p>)}
      <form onSubmit={submit}>
        <textarea value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Post</button>
      </form>
    </section>
  )
}`,
  },
  "share-menu": {
    id: "share-menu",
    label: "ShareMenu",
    file: "components/ShareMenu.tsx",
    type: "client",
    isBoundary: true,
    description: "Share menu — Client Component.",
    detail: "Toggles a dropdown and calls navigator.share() or copies the URL to the clipboard. Both require browser APIs unavailable in a Server Component.",
    code: `// components/ShareMenu.tsx
"use client"
export function ShareMenu({ title }) {
  const [open, setOpen] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setOpen(false)
  }
  return (
    <div>
      <button onClick={() => setOpen(o => !o)}>Share</button>
      {open && (
        <menu>
          <button onClick={copyLink}>Copy link</button>
          <button onClick={() =>
            navigator.share({ title, url: location.href })
          }>
            Native share
          </button>
        </menu>
      )}
    </div>
  )
}`,
  },
}

type TreeItem = {
  id: NodeId
  children?: TreeItem[]
}

const TREE: TreeItem = {
  id: "layout",
  children: [
    {
      id: "posts-page",
      children: [{ id: "post-list", children: [{ id: "post-card" }] }],
    },
    {
      id: "post-page",
      children: [
        { id: "like-button" },
        { id: "share-menu" },
        { id: "comment-section" },
      ],
    },
  ],
}

function TreeNode({
  item,
  depth,
  selected,
  onSelect,
}: {
  item: TreeItem
  depth: number
  selected: NodeId
  onSelect: (id: NodeId) => void
}) {
  const node = NODES[item.id]
  const isClient = node.type === "client"
  const isSelected = selected === item.id

  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-0.75"
        style={{ paddingLeft: depth * 18 }}
      >
        {depth > 0 && (
          <span className="font-mono text-[10px] text-rurikon-200 select-none shrink-0">
            └─
          </span>
        )}
        <button
          onClick={() => onSelect(item.id)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono transition-colors",
            isSelected
              ? isClient
                ? "bg-[#5a9fd4] text-white border-[#1a5a8b]"
                : "bg-rurikon-600 text-white border-rurikon-800"
              : isClient
                ? "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b] hover:bg-[#c8dcf0]"
                : "bg-[#f5f5f0] border-rurikon-border text-rurikon-500 hover:border-rurikon-400"
          )}
        >
          {node.label}
          {node.isBoundary && (
            <span
              className={cn(
                "text-[9px] px-1 py-px rounded leading-none",
                isSelected ? "bg-white/20 text-white" : "bg-[#5a9fd4] text-white"
              )}
            >
              "use&nbsp;client"
            </span>
          )}
        </button>
      </div>
      {item.children?.map((child) => (
        <TreeNode
          key={child.id}
          item={child}
          depth={depth + 1}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export function DemoBlogArchitecture() {
  const [selected, setSelected] = useState<NodeId>("posts-page")
  const node = NODES[selected]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — tree + footer */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6" style={{ minHeight: 240 }}>
              <TreeNode
                item={TREE}
                depth={0}
                selected={selected}
                onSelect={setSelected}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 italic">
                blog architecture
              </span>
              <div className="ml-auto flex gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#f5f5f0] border border-rurikon-border" />
                  <span className="text-[10px] font-mono text-rurikon-400">server</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#dce8f5] border border-[#5a9fd4]" />
                  <span className="text-[10px] font-mono text-[#1a5a8b]/70">client</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — info + code */}
          <div className="w-full text:w-85 flex flex-col bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3 flex-1">
              {/* Description */}
              <div
                className={cn(
                  "border px-3 py-3 flex flex-col gap-1.5",
                  node.type === "client"
                    ? "border-[#5a9fd4]/30 bg-[#dce8f5]/20"
                    : "border-rurikon-border/40 bg-rurikon-50/30"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-rurikon-700 font-medium">
                    {node.label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[10px] px-1.5 py-0.5 rounded border",
                      node.type === "client"
                        ? "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]"
                        : "bg-[#f5f5f0] border-rurikon-border text-rurikon-500"
                    )}
                  >
                    {node.type}
                  </span>
                </div>
                <span className="text-xs text-rurikon-500">{node.description}</span>
                <span className="text-xs text-rurikon-400 italic">{node.detail}</span>
              </div>

              {/* Code */}
              <div className="font-mono text-[11px] bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-[1.65] overflow-x-auto whitespace-pre">
                {node.code}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
