"use client"

import Image from "next/image"
import { useCallback, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

interface GitHubCommitCardProps {
  /** GitHub repo slug, e.g. "1chooo/1chooo.com" — used when hash is set */
  repo?: string
  /** Omit for private repos; shows hash badge, links, and copy when set */
  hash?: string
  /** Omit for private repos; shows parent link in metadata when set */
  parentHash?: string
  branch?: string
  author?: string
  authorAvatar?: string
  /** ISO 8601 date string */
  committedAt?: string
  title?: string
  body?: string[]
  filesChanged?: number
  additions?: number
  deletions?: number
}

function shortHash(hash?: string) {
  return hash?.slice(0, 7) ?? ""
}

const PREVIEW_COMMIT = {
  title: "feat(job-management): add job categories and applications tables with security policies",
  body: [
    "Introduced new tables for job categories and job applications to facilitate user organization of job applications.",
    "Implemented row-level security policies to ensure users can only access their own job categories and applications.",
    "Added triggers and functions to manage status changes and maintain an audit log of application status transitions.",
    "Updated navigation to include a link to the new jobs section for improved user access.",
  ],
  branch: "main",
  committedAt: "2026-05-22T20:28:59-07:00",
  filesChanged: 25,
  additions: 3176,
  deletions: 0,
} as const

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `committed ${years} year${years === 1 ? "" : "s"} ago`
  if (months > 0) return `committed ${months} month${months === 1 ? "" : "s"} ago`
  if (weeks > 0) return `committed ${weeks} week${weeks === 1 ? "" : "s"} ago`
  if (days > 0) return `committed ${days} day${days === 1 ? "" : "s"} ago`
  if (hours > 0) return `committed ${hours} hour${hours === 1 ? "" : "s"} ago`
  if (minutes > 0) return `committed ${minutes} minute${minutes === 1 ? "" : "s"} ago`
  return "committed just now"
}

function formatNum(n: number): string {
  return n.toLocaleString()
}

function DiffBlocks({ additions, deletions }: { additions: number; deletions: number }) {
  const total = additions + deletions
  const addBlocks = total > 0 ? Math.round((additions / total) * 5) : additions > 0 ? 5 : 0

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-[1px]",
            i < addBlocks ? "bg-[#3fb950]" : "bg-[#da3633]"
          )}
        />
      ))}
    </div>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  )
}

function BranchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
    </svg>
  )
}

function HashLink({
  hash,
  href,
  className,
}: {
  hash?: string
  href: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "font-mono text-xs text-[#5a9fd4] hover:underline underline-offset-2 transition-colors",
        className
      )}
    >
      {shortHash(hash)}
    </a>
  )
}

export function GitHubCommitCard(props: GitHubCommitCardProps) {
  const {
    repo = "1chooo/1chooo.com",
    hash,
    parentHash,
    branch = "main",
    author = "1chooo",
    authorAvatar = "https://github.com/1chooo.png",
    committedAt,
    filesChanged,
    additions = 0,
    deletions = 0,
  } = props

  const isPreview = props.title == null
  const title = props.title ?? PREVIEW_COMMIT.title
  const body = props.body ?? (isPreview ? [...PREVIEW_COMMIT.body] : [])
  const committedAtResolved =
    committedAt ?? (isPreview ? PREVIEW_COMMIT.committedAt : undefined)
  const filesChangedResolved =
    filesChanged ?? (isPreview ? PREVIEW_COMMIT.filesChanged : undefined)
  const additionsResolved =
    props.additions ?? (isPreview ? PREVIEW_COMMIT.additions : 0)
  const deletionsResolved = deletions
  const [copied, setCopied] = useState(false)

  const hasHash = Boolean(hash)
  const commitUrl = hash ? `https://github.com/${repo}/commit/${hash}` : undefined
  const parentUrl =
    hasHash && parentHash
      ? `https://github.com/${repo}/commit/${parentHash}`
      : undefined
  const branchUrl = hasHash ? `https://github.com/${repo}/tree/${branch}` : undefined
  const authorUrl = `https://github.com/${author}`

  const relativeTime = useMemo(() => {
    if (!committedAtResolved) return null
    const date = new Date(committedAtResolved)
    if (Number.isNaN(date.getTime())) return null
    return formatRelativeTime(date)
  }, [committedAtResolved])

  const copyHash = useCallback(async () => {
    if (!hash) return
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }, [hash])

  const hasStats =
    filesChangedResolved != null || additionsResolved > 0 || deletionsResolved > 0

  return (
    <div className="my-8 w-full">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">

        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-rurikon-border bg-[#fdfcfa]">
          <span className="text-sm font-medium text-rurikon-600">Commit</span>
          {hasHash && commitUrl && (
            <a
              href={commitUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs rounded px-2 py-0.5 border border-rurikon-border bg-rurikon-50/60 text-rurikon-600 hover:border-rurikon-400 hover:text-rurikon-700 transition-colors"
            >
              {shortHash(hash)}
            </a>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-rurikon-border">
          <a
            href={authorUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full overflow-hidden border border-rurikon-border/60 hover:border-rurikon-400 transition-colors"
          >
            <Image
              src={authorAvatar}
              alt={author}
              width={32}
              height={32}
              className="object-cover w-8 h-8"
              unoptimized
            />
          </a>
          <div className="flex flex-wrap items-baseline gap-x-1.5 text-sm">
            <a
              href={authorUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono font-semibold text-rurikon-700 hover:text-[#5a9fd4] transition-colors"
            >
              {author}
            </a>
            {relativeTime && (
              <span className="text-xs text-rurikon-400">{relativeTime}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="px-4 py-4 border-b border-rurikon-border">
          <div className="font-mono text-xs text-rurikon-600 leading-relaxed whitespace-pre-wrap">
            {hasHash && commitUrl ? (
              <a
                href={commitUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-rurikon-700 hover:text-[#5a9fd4] transition-colors"
              >
                {title}
              </a>
            ) : (
              <span className="font-medium text-rurikon-700">{title}</span>
            )}
            {body.length > 0 && (
              <>
                {"\n"}
                {body.map((line, i) => (
                  <span key={i}>
                    {"\n"}- {line}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Metadata */}
        {(branch || hasHash) && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#fdfcfa] border-b border-rurikon-border">
            {branch && (
              <div className="flex items-center gap-2">
                <BranchIcon className="w-4 h-4 text-rurikon-400" />
                {branchUrl ? (
                  <a
                    href={branchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] rounded px-2 py-0.5 border border-[#5a9fd4]/40 bg-[#dce8f5] text-[#1a5a8b] hover:border-[#5a9fd4] transition-colors"
                  >
                    {branch}
                  </a>
                ) : (
                  <span className="font-mono text-[11px] rounded px-2 py-0.5 border border-[#5a9fd4]/40 bg-[#dce8f5] text-[#1a5a8b]">
                    {branch}
                  </span>
                )}
              </div>
            )}

            {hash && commitUrl && (
              <div className="flex items-center gap-2 text-xs text-rurikon-400">
                {parentHash && parentUrl && (
                  <>
                    <span>1 parent</span>
                    <HashLink hash={parentHash} href={parentUrl} />
                  </>
                )}
                <span>commit</span>
                <HashLink hash={hash} href={commitUrl} />
                <button
                  type="button"
                  onClick={copyHash}
                  aria-label={copied ? "Copied commit hash" : "Copy commit hash"}
                  className={cn(
                    "inline-flex items-center justify-center w-7 h-7 rounded border transition-colors",
                    copied
                      ? "border-[#3a6b1a]/40 bg-[#dce8dc] text-[#3a6b1a]"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {copied ? (
                    <CheckIcon className="w-3.5 h-3.5" />
                  ) : (
                    <CopyIcon className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {hasStats && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5">
            {filesChangedResolved != null && (
              <span className="text-sm font-medium text-rurikon-600">
                {filesChangedResolved} file{filesChangedResolved === 1 ? "" : "s"} changed
              </span>
            )}
            <div className="flex items-center gap-3 ml-auto">
              {additionsResolved > 0 && (
                <span className="font-mono text-xs font-semibold text-[#3a6b1a]">
                  +{formatNum(additionsResolved)}
                </span>
              )}
              {deletionsResolved > 0 && (
                <span className="font-mono text-xs font-semibold text-[#8b1a5a]">
                  -{formatNum(deletionsResolved)}
                </span>
              )}
              {(additionsResolved > 0 || deletionsResolved > 0) && (
                <DiffBlocks additions={additionsResolved} deletions={deletionsResolved} />
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
