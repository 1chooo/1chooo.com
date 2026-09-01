"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface ContributorStats {
  /** Display name, e.g. "1chooo" or "claude" */
  name: string
  /** GitHub avatar URL, e.g. "https://github.com/1chooo.png" */
  avatarUrl: string
  /** Total number of commits */
  commits: number
  /** Total lines added */
  additions: number
  /** Total lines deleted */
  deletions: number
  /** Rank badge, e.g. 1 */
  rank?: number
}

interface GitContributorsStatsProps {
  contributors?: ContributorStats[]
  label?: string
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toLocaleString()
}

function ContributorCard({ stats }: { stats: ContributorStats }) {
  return (
    <div className="flex-1 min-w-0 p-4 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-rurikon-border last:border-0">
      {/* Header row: avatar + name + rank */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden border border-rurikon-border/60">
          <Image
            src={stats.avatarUrl}
            alt={stats.name}
            width={40}
            height={40}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>

        {/* Name + commit count */}
        <div className="flex flex-col min-w-0">
          <span className="font-mono text-sm font-semibold text-rurikon-700 truncate">
            {stats.name}
          </span>
          <span className="font-serif text-xs text-rurikon-400 italic">
            {formatNum(stats.commits)} commits
          </span>
        </div>

        {/* Rank badge */}
        {stats.rank != null && (
          <div className="ml-auto shrink-0 w-6 h-6 rounded-full border border-rurikon-border flex items-center justify-center">
            <span className="font-mono text-[10px] text-rurikon-500 font-semibold">
              #{stats.rank}
            </span>
          </div>
        )}
      </div>

      {/* Addition / Deletion inline */}
      <div className="flex items-center gap-1 flex-wrap">
        <span className="font-mono text-xs font-semibold text-[#3a6b1a]">
          {formatNum(stats.additions)} ++
        </span>
        <span className="font-mono text-xs text-rurikon-300">·</span>
        <span className="font-mono text-xs font-semibold text-[#8b1a5a]">
          {formatNum(stats.deletions)} --
        </span>
      </div>

      {/* Diff bar */}
      <div className="w-full h-1 flex rounded-sm overflow-hidden gap-px">
        {Array.from({ length: 5 }).map((_, i) => {
          const total = stats.additions + stats.deletions
          const addBlocks = total > 0 ? Math.round((stats.additions / total) * 5) : 0
          return (
            <div
              key={i}
              className={cn(
                "flex-1 h-full",
                i < addBlocks ? "bg-[#3fb950]" : "bg-[#da3633]"
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

const DEFAULT_CONTRIBUTORS: ContributorStats[] = [
  {
    name: "1chooo",
    avatarUrl: "https://github.com/1chooo.png",
    commits: 188,
    additions: 90830,
    deletions: 47980,
    rank: 1,
  },
  {
    name: "claude",
    avatarUrl: "https://github.com/claude.png",
    commits: 28,
    additions: 25086,
    deletions: 11505,
    rank: 2,
  },
]

export function GitContributorsStats({
  contributors = DEFAULT_CONTRIBUTORS,
  label = "git contributors",
}: GitContributorsStatsProps) {
  const totalCommits = contributors.reduce((s, c) => s + c.commits, 0)
  const totalAdditions = contributors.reduce((s, c) => s + c.additions, 0)
  const totalDeletions = contributors.reduce((s, c) => s + c.deletions, 0)

  return (
    <div className="my-8 w-full">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">

        {/* Contributor cards */}
        <div className="flex flex-col lg:flex-row">
          {contributors.map((c) => (
            <ContributorCard key={c.name} stats={c} />
          ))}
        </div>

        {/* Summary row */}
        <div className="border-t border-rurikon-border bg-[#fdfcfa] px-4 py-2.5 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <span className="font-mono text-xs font-semibold text-rurikon-700">{formatNum(totalCommits)}</span>
              <span className="font-serif text-[10px] text-rurikon-400 italic">total commits</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-xs font-semibold text-[#3a6b1a]">+{formatNum(totalAdditions)}</span>
              <span className="font-serif text-[10px] text-rurikon-400 italic">additions</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-xs font-semibold text-[#8b1a5a]">-{formatNum(totalDeletions)}</span>
              <span className="font-serif text-[10px] text-rurikon-400 italic">deletions</span>
            </div>
          </div>

          {/* Human vs AI ratio bar */}
          {contributors.length === 2 && (
            <div className="flex items-center gap-1.5 min-w-30">
              <span className="font-mono text-[10px] text-rurikon-500">
                {totalCommits > 0 ? Math.round((contributors[0].commits / totalCommits) * 100) : 0}%
              </span>
              <div className="flex-1 h-1 rounded-sm overflow-hidden bg-rurikon-100 flex">
                <div
                  className="h-full bg-[#5a9fd4] transition-all duration-500"
                  style={{
                    width: totalCommits > 0
                      ? `${Math.round((contributors[0].commits / totalCommits) * 100)}%`
                      : "0%",
                  }}
                />
              </div>
              <span className="font-mono text-[10px] text-rurikon-500">
                {totalCommits > 0 ? Math.round((contributors[1].commits / totalCommits) * 100) : 0}%
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-3 py-2 border-t border-rurikon-border flex-wrap">
          <span className="font-serif text-xs text-rurikon-400 mr-auto italic">{label}</span>
          {contributors.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full overflow-hidden border border-rurikon-border/40">
                <Image
                  src={c.avatarUrl}
                  alt={c.name}
                  width={16}
                  height={16}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-xs text-rurikon-400 font-mono">{c.name}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
