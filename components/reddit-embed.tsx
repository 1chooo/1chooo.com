// Custom Reddit post card for the thoughts section – client component
// Fetches post data from Reddit's public JSON API in the browser to avoid
// datacenter IP blocks that affect server-side fetches on Vercel.
// Usage: <RedditEmbed url="https://www.reddit.com/r/github/comments/..." />

"use client"

import { ArrowUp, MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import {
  fetchRedditPost,
  formatRedditScore,
  redditTimeAgo,
  decodeRedditHtmlEntities,
} from "embed-card"
import type { RedditPostData } from "embed-card"
import { RedditCopyLinkButton } from "@/components/reddit-copy-link-button"

const RedditLogo = ({ className }: { className?: string }) => (
  <span className={`flex items-center gap-1.5 ${className ?? ""}`}>
    {/* Snoo */}
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" xmlSpace="preserve">
      <defs>
        <radialGradient id="snoo-rg" cx="169.75" cy="92.19" r="50.98" fx="169.75" fy="92.19" gradientTransform="matrix(1 0 0 .87 0 11.64)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#feffff" /><stop offset=".4" stopColor="#feffff" /><stop offset=".51" stopColor="#f9fcfc" /><stop offset=".62" stopColor="#edf3f5" /><stop offset=".7" stopColor="#dee9ec" /><stop offset=".72" stopColor="#d8e4e8" /><stop offset=".76" stopColor="#ccd8df" /><stop offset=".8" stopColor="#c8d5dd" /><stop offset=".83" stopColor="#ccd6de" /><stop offset=".85" stopColor="#d8dbe2" /><stop offset=".88" stopColor="#ede3e9" /><stop offset=".9" stopColor="#ffebef" />
        </radialGradient>
        <radialGradient id="snoo-rg2" cx="47.31" cy="92.19" r="50.98" fx="47.31" fy="92.19" gradientTransform="matrix(1 0 0 .87 0 11.64)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#feffff" /><stop offset=".4" stopColor="#feffff" /><stop offset=".51" stopColor="#f9fcfc" /><stop offset=".62" stopColor="#edf3f5" /><stop offset=".7" stopColor="#dee9ec" /><stop offset=".72" stopColor="#d8e4e8" /><stop offset=".76" stopColor="#ccd8df" /><stop offset=".8" stopColor="#c8d5dd" /><stop offset=".83" stopColor="#ccd6de" /><stop offset=".85" stopColor="#d8dbe2" /><stop offset=".88" stopColor="#ede3e9" /><stop offset=".9" stopColor="#ffebef" />
        </radialGradient>
        <radialGradient id="snoo-rg3" cx="109.61" cy="85.59" r="153.78" fx="109.61" fy="85.59" gradientTransform="matrix(1 0 0 .7 0 25.56)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#feffff" /><stop offset=".4" stopColor="#feffff" /><stop offset=".51" stopColor="#f9fcfc" /><stop offset=".62" stopColor="#edf3f5" /><stop offset=".7" stopColor="#dee9ec" /><stop offset=".72" stopColor="#d8e4e8" /><stop offset=".76" stopColor="#ccd8df" /><stop offset=".8" stopColor="#c8d5dd" /><stop offset=".83" stopColor="#ccd6de" /><stop offset=".85" stopColor="#d8dbe2" /><stop offset=".88" stopColor="#ede3e9" /><stop offset=".9" stopColor="#ffebef" />
        </radialGradient>
        <radialGradient id="snoo-rg4" cx="-6.01" cy="64.68" r="12.85" fx="-6.01" fy="64.68" gradientTransform="matrix(1.07 0 0 1.55 81.08 27.26)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f60" /><stop offset=".5" stopColor="#ff4500" /><stop offset=".7" stopColor="#fc4301" /><stop offset=".82" stopColor="#f43f07" /><stop offset=".92" stopColor="#e53812" /><stop offset="1" stopColor="#d4301f" />
        </radialGradient>
        <radialGradient id="snoo-rg5" cx="-73.55" cy="64.68" r="12.85" fx="-73.55" fy="64.68" gradientTransform="matrix(-1.07 0 0 1.55 62.87 27.26)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f60" /><stop offset=".5" stopColor="#ff4500" /><stop offset=".7" stopColor="#fc4301" /><stop offset=".82" stopColor="#f43f07" /><stop offset=".92" stopColor="#e53812" /><stop offset="1" stopColor="#d4301f" />
        </radialGradient>
        <radialGradient id="snoo-rg6" cx="107.93" cy="166.96" r="45.3" fx="107.93" fy="166.96" gradientTransform="matrix(1 0 0 .66 0 57.4)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#172e35" /><stop offset=".29" stopColor="#0e1c21" /><stop offset=".73" stopColor="#030708" /><stop offset="1" stopColor="#000" />
        </radialGradient>
        <radialGradient id="snoo-rg7" cx="147.88" cy="32.94" r="39.77" fx="147.88" fy="32.94" gradientTransform="matrix(1 0 0 .98 0 .54)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#feffff" /><stop offset=".4" stopColor="#feffff" /><stop offset=".51" stopColor="#f9fcfc" /><stop offset=".62" stopColor="#edf3f5" /><stop offset=".7" stopColor="#dee9ec" /><stop offset=".72" stopColor="#d8e4e8" /><stop offset=".76" stopColor="#ccd8df" /><stop offset=".8" stopColor="#c8d5dd" /><stop offset=".83" stopColor="#ccd6de" /><stop offset=".85" stopColor="#d8dbe2" /><stop offset=".88" stopColor="#ede3e9" /><stop offset=".9" stopColor="#ffebef" />
        </radialGradient>
        <radialGradient id="snoo-rg8" cx="131.31" cy="73.08" r="32.6" fx="131.31" fy="73.08" gradientUnits="userSpaceOnUse">
          <stop offset=".48" stopColor="#7a9299" /><stop offset=".67" stopColor="#172e35" /><stop offset=".75" stopColor="#000" /><stop offset=".82" stopColor="#172e35" />
        </radialGradient>
      </defs>
      <path d="M108 0C48.35 0 0 48.35 0 108c0 29.82 12.09 56.82 31.63 76.37l-20.57 20.57C6.98 209.02 9.87 216 15.64 216H108c59.65 0 108-48.35 108-108S167.65 0 108 0Z" fill="#ff4500" />
      <circle cx="169.22" cy="106.98" r="25.22" fill="url(#snoo-rg)" />
      <circle cx="46.78" cy="106.98" r="25.22" fill="url(#snoo-rg2)" />
      <ellipse cx="108.06" cy="128.64" rx="72" ry="54" fill="url(#snoo-rg3)" />
      <path d="M86.78 123.48c-.42 9.08-6.49 12.38-13.56 12.38s-12.46-4.93-12.04-14.01c.42-9.08 6.49-15.02 13.56-15.02s12.46 7.58 12.04 16.66Z" fill="url(#snoo-rg4)" />
      <path d="M129.35 123.48c.42 9.08 6.49 12.38 13.56 12.38s12.46-4.93 12.04-14.01c-.42-9.08-6.49-15.02-13.56-15.02s-12.46 7.58-12.04 16.66Z" fill="url(#snoo-rg5)" />
      <ellipse cx="79.63" cy="116.37" fill="#ffc49c" rx="2.8" ry="3.05" />
      <ellipse cx="146.21" cy="116.37" fill="#ffc49c" rx="2.8" ry="3.05" />
      <path d="M108.06 142.92c-8.76 0-17.16.43-24.92 1.22-1.33.13-2.17 1.51-1.65 2.74 4.35 10.39 14.61 17.69 26.57 17.69s22.23-7.3 26.57-17.69c.52-1.23-.33-2.61-1.65-2.74-7.77-.79-16.16-1.22-24.92-1.22Z" fill="url(#snoo-rg6)" />
      <circle cx="147.49" cy="49.43" r="17.87" fill="url(#snoo-rg7)" />
      <path d="M107.8 76.92c-2.14 0-3.87-.89-3.87-2.27 0-16.01 13.03-29.04 29.04-29.04 2.14 0 3.87 1.73 3.87 3.87s-1.73 3.87-3.87 3.87c-11.74 0-21.29 9.55-21.29 21.29 0 1.38-1.73 2.27-3.87 2.27Z" fill="url(#snoo-rg8)" />
      <path d="M62.82 122.65c.39-8.56 6.08-14.16 12.69-14.16 6.26 0 11.1 6.39 11.28 14.33.17-8.88-5.13-15.99-12.05-15.99s-13.14 6.05-13.56 15.2c-.42 9.15 4.97 13.83 12.04 13.83h.52c-6.44-.16-11.3-4.79-10.91-13.2ZM153.3 122.65c-.39-8.56-6.08-14.16-12.69-14.16-6.26 0-11.1 6.39-11.28 14.33-.17-8.88 5.13-15.99 12.05-15.99 7.07 0 13.14 6.05 13.56 15.2.42 9.15-4.97 13.83-12.04 13.83h-.52c6.44-.16 11.3-4.79 10.91-13.2Z" fill="#842123" />
    </svg>
    {/* Wordmark */}
    <svg height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 514 149" aria-label="reddit">
      <g fill="#FF4500">
        <path d="m71.62,45.92l-12.01,28.56c-1.51-.76-5.11-1.61-8.51-1.61s-6.81.85-10.12,2.46c-6.53,3.31-11.35,9.93-11.35,19.48v52.3H-.26V45.35h29.04v14.28h.57c6.81-9.08,17.21-15.79,30.74-15.79,4.92,0,9.65.95,11.54,2.08Z" />
        <path d="m65.84,96.52c0-29.41,20.15-52.68,50.32-52.68,27.33,0,46.91,19.96,46.91,48.05,0,4.92-.47,9.55-1.51,14h-68.48c3.12,10.69,12.39,19.01,26.29,19.01,7.66,0,18.54-2.74,24.4-7.28l9.27,22.32c-8.61,5.86-21.75,8.7-33.29,8.7-32.25,0-53.91-20.81-53.91-52.11Zm26.67-9.36h43.03c0-13.05-8.89-19.96-19.77-19.96-12.3,0-20.62,7.94-23.27,19.96Z" />
        <path d="m419.53-.37c10.03,0,18.25,8.23,18.25,18.25s-8.23,18.25-18.25,18.25-18.25-8.23-18.25-18.25S409.51-.37,419.53-.37Zm14.94,147.49h-29.89V45.35h29.89v101.77Z" />
        <path d="m246,1.47l-.09,53.53h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66,0-47.67,23.08-47.67,52.3s17.78,52.4,46.72,52.4c12.11,0,23.55-4.16,30.93-13.62h.85v12.11h28.47V1.47h-29.89Zm1.42,121.39h-.99l-6.67-6.93c-4.34,4.33-10.28,6.93-17.22,6.93-14.64,0-24.88-11.58-24.88-26.6s10.24-26.6,24.88-26.6,24.88,11.58,24.88,26.6v26.6Z" />
        <path d="m360.15,1.47l-.09,53.53h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66,0-47.67,23.08-47.67,52.3s17.78,52.4,46.72,52.4c12.11,0,23.55-4.16,30.93-13.62h.85v12.11h28.47V1.47h-29.89Zm1.28,121.39h-.99l-6.67-6.93c-4.34,4.33-10.28,6.93-17.22,6.93-14.64,0-24.88-11.58-24.88-26.6s10.24-26.6,24.88-26.6,24.88,11.58,24.88,26.6v26.6Z" />
        <path d="m492.44,45.35h21.85v25.44h-21.85v76.33h-29.89v-76.33h-21.75v-25.44h21.75v-27.66h29.89v27.66Z" />
      </g>
    </svg>
  </span>
)

// ── Component ─────────────────────────────────────────────────────────────────

interface RedditEmbedProps {
  url: string
}

export function RedditEmbed({ url }: RedditEmbedProps) {
  const [post, setPost] = useState<RedditPostData | null | "loading">("loading")

  useEffect(() => {
    const ac = new AbortController()
    fetchRedditPost(url, { signal: ac.signal }).then((result) => {
      if (!ac.signal.aborted) setPost(result)
    })
    return () => ac.abort()
  }, [url])

  if (post === "loading") {
    return (
      <div className="my-8 border border-rurikon-border bg-[#fefefe] px-6 py-8 font-serif animate-pulse">
        <div className="h-3 w-1/3 rounded bg-rurikon-border/60 mb-3" />
        <div className="h-4 w-3/4 rounded bg-rurikon-border/60 mb-2" />
        <div className="h-4 w-1/2 rounded bg-rurikon-border/40" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="my-8 border border-rurikon-border bg-[#fefefe] px-6 py-8 font-serif">
        <p className="text-center text-sm text-rurikon-300">Post unavailable.</p>
      </div>
    )
  }

  const videoUrl = post.is_video
    ? decodeRedditHtmlEntities(post.media?.reddit_video?.fallback_url ?? "") || null
    : null

  const posterUrl = post.preview?.images?.[0]?.source?.url
    ? decodeRedditHtmlEntities(post.preview.images[0].source.url)
    : undefined

  const previewUrl = !post.is_video ? posterUrl ?? null : null

  const body =
    post.is_self && post.selftext
      ? post.selftext.length > 280
        ? post.selftext.slice(0, 280).trimEnd() + "…"
        : post.selftext
      : null

  const postHref = `https://www.reddit.com${post.permalink}`

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-rurikon-border/40">
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col gap-0.5">
            <a
              href={`https://www.reddit.com/r/${post.subreddit}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-rurikon-500 hover:opacity-70 transition-opacity"
            >
              r/{post.subreddit}
            </a>
            <span className="text-[11px] text-rurikon-300">
              Posted by u/{post.author} · {redditTimeAgo(post.created_utc)}
            </span>
          </div>
        </div>
        <a
          href={postHref}
          target="_blank"
          rel="noreferrer"
          className="text-rurikon-300 hover:text-rurikon-500 transition-colors"
          aria-label="View on Reddit"
        >
          <RedditLogo />
        </a>
      </div>

      {/* Title */}
      <div className="px-5 pt-4 pb-3">
        <a
          href={postHref}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-rurikon-600 leading-snug hover:opacity-70 transition-opacity"
        >
          {post.title}
        </a>
        {body && (
          <p className="mt-2 text-xs leading-relaxed text-rurikon-400 whitespace-pre-line">
            {body}
          </p>
        )}
      </div>

      {/* Media */}
      {videoUrl && (
        <div className="border-t border-b border-rurikon-border/40 overflow-hidden">
          <video
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full max-h-80 object-contain bg-[#f5f3ef]"
          />
        </div>
      )}
      {previewUrl && (
        <div className="border-t border-b border-rurikon-border/40 overflow-hidden">
          <img
            src={previewUrl}
            alt={post.title}
            className="w-full max-h-80 object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-y-2 gap-x-3 px-5 py-3 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-rurikon-300">
            <ArrowUp className="size-3.5" />
            {formatRedditScore(post.score)}
          </span>
          <a
            href={postHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-rurikon-300 hover:text-rurikon-500 transition-colors"
          >
            <MessageSquare className="size-3.5" />
            {post.num_comments.toLocaleString()} comments
          </a>
          <RedditCopyLinkButton href={postHref} />
        </div>
        <a
          href={postHref}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-rurikon-300 hover:text-rurikon-500 transition-colors underline underline-offset-2 shrink-0"
        >
          view on reddit
        </a>
      </div>
    </div>
  )
}
