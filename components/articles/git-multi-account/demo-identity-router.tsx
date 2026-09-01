"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type PathContext = "personal" | "work" | "elsewhere"

interface Outcome {
  id: PathContext
  label: string
  path: string
  email: string
  emailSource: string
  sshHost: string
  sshKey: string
  ghDir: string
  ghUser: string
  remoteIn: string
  remoteOut: string
  layers: { title: string; detail: string }[]
}

const OUTCOMES: Outcome[] = [
  {
    id: "personal",
    label: "1chooo",
    path: "~/Developer/1chooo/dotfiles",
    email: "you@personal.dev",
    emailSource: "~/Developer/1chooo/.gitconfig-personal",
    sshHost: "github.com-personal",
    sshKey: "~/.ssh/id_ed25519_personal",
    ghDir: "~/.config/gh-personal",
    ghUser: "1chooo",
    remoteIn: "git@github.com:1chooo/dotfiles.git",
    remoteOut: "git@github.com-personal:1chooo/dotfiles.git",
    layers: [
      {
        title: "includeIf",
        detail: "gitdir matches ~/Developer/1chooo/ → personal user.email",
      },
      {
        title: "insteadOf",
        detail: "rewrites git@github.com: → git@github.com-personal:",
      },
      {
        title: "zsh chpwd",
        detail: "GH_CONFIG_DIR points at ~/.config/gh-personal",
      },
    ],
  },
  {
    id: "work",
    label: "works",
    path: "~/Developer/works/awesome-project",
    email: "you@company.com",
    emailSource: "~/.gitconfig (global default)",
    sshHost: "github.com",
    sshKey: "~/.ssh/id_ed25519",
    ghDir: "~/.config/gh-work",
    ghUser: "your-work-user",
    remoteIn: "git@github.com:company/awesome-project.git",
    remoteOut: "git@github.com:company/awesome-project.git",
    layers: [
      {
        title: "global default",
        detail: "no includeIf match → work user.email from ~/.gitconfig",
      },
      {
        title: "SSH Host",
        detail: "Host github.com maps to the work IdentityFile",
      },
      {
        title: "zsh chpwd",
        detail: "GH_CONFIG_DIR points at ~/.config/gh-work",
      },
    ],
  },
  {
    id: "elsewhere",
    label: "elsewhere",
    path: "~/Documents/scratch",
    email: "you@company.com",
    emailSource: "~/.gitconfig (global default)",
    sshHost: "github.com",
    sshKey: "~/.ssh/id_ed25519",
    ghDir: "~/.config/gh-work",
    ghUser: "your-work-user",
    remoteIn: "git@github.com:someone/scratch.git",
    remoteOut: "git@github.com:someone/scratch.git",
    layers: [
      {
        title: "fallback",
        detail: "outside 1chooo/ → same work defaults as works/",
      },
      {
        title: "SSH Host",
        detail: "plain github.com still uses the work key",
      },
      {
        title: "zsh chpwd",
        detail: "else branch keeps GH_CONFIG_DIR on work",
      },
    ],
  },
]

export function DemoIdentityRouter() {
  const [ctx, setCtx] = useState<PathContext>("personal")
  const o = OUTCOMES.find((x) => x.id === ctx)!

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex flex-col justify-center p-4 sm:p-6 gap-4"
              style={{ minHeight: 220 }}
            >
              <div className="font-mono text-xs text-rurikon-500 border border-rurikon-border/40 bg-rurikon-50/40 px-3 py-2">
                <span className="text-rurikon-400">cwd </span>
                <span className="text-rurikon-700">{o.path}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    title: "user.email",
                    value: o.email,
                    hint: o.emailSource,
                    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
                  },
                  {
                    title: "SSH host",
                    value: o.sshHost,
                    hint: o.sshKey,
                    color: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
                  },
                  {
                    title: "GH_CONFIG_DIR",
                    value: o.ghDir,
                    hint: `gh → ${o.ghUser}`,
                    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
                  },
                  {
                    title: "remote after rewrite",
                    value: o.remoteOut,
                    hint:
                      o.remoteIn === o.remoteOut
                        ? "no insteadOf rewrite"
                        : `from ${o.remoteIn}`,
                    color: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className={cn(
                      "border px-3 py-2.5 flex flex-col gap-1 min-w-0",
                      card.color
                    )}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wide opacity-80">
                      {card.title}
                    </span>
                    <span className="font-mono text-[11px] font-medium break-all leading-snug">
                      {card.value}
                    </span>
                    <span className="text-[10px] opacity-70 break-all leading-snug">
                      {card.hint}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                path context
              </span>
              {OUTCOMES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCtx(item.id)}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    ctx === item.id
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">
                  which layers fire
                </span>
                <span className="text-xs text-rurikon-500">
                  email, SSH, and gh are independent — toggle a path to see each
                  one resolve.
                </span>
              </div>

              {o.layers.map((layer) => (
                <div
                  key={layer.title}
                  className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1"
                >
                  <span className="font-mono text-xs text-rurikon-700 font-medium">
                    {layer.title}
                  </span>
                  <span className="text-xs text-rurikon-500">{layer.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
