"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type SnippetId = "gitconfig" | "personal" | "ssh" | "zshrc"

interface Snippet {
  id: SnippetId
  label: string
  path: string
  description: string
  detail: string
  content: string
}

const SNIPPETS: Snippet[] = [
  {
    id: "gitconfig",
    label: ".gitconfig",
    path: "~/.gitconfig",
    description: "Work is the global fallback. Personal overrides load only under 1chooo/.",
    detail: "Trailing slash on gitdir: is required so every nested repo matches.",
    content: `# Default fallback (work)
[user]
    name = Your Work Name
    email = you@company.com

# Personal projects under ~/Developer/1chooo/
[includeIf "gitdir:~/Developer/1chooo/"]
    path = ~/Developer/1chooo/.gitconfig-personal
`,
  },
  {
    id: "personal",
    label: "personal",
    path: "~/Developer/1chooo/.gitconfig-personal",
    description: "Personal name/email plus insteadOf so clones keep the normal GitHub URL.",
    detail: "Active only when includeIf matches — work remotes stay untouched.",
    content: `[user]
    name = Your Personal Name
    email = you@personal.dev

# Rewrite remotes to the personal SSH host alias
[url "git@github.com-personal:"]
    insteadOf = git@github.com:
`,
  },
  {
    id: "ssh",
    label: "ssh",
    path: "~/.ssh/config",
    description: "Map github.com to the work key; reserve -personal for 1chooo.",
    detail: "Generate a second key with ssh-keygen -f ~/.ssh/id_ed25519_personal.",
    content: `# Work account (default)
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# Personal account
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
`,
  },
  {
    id: "zshrc",
    label: "zshrc",
    path: "~/.zshrc",
    description: "Swap GH_CONFIG_DIR on directory change so gh follows the same split.",
    detail: "Log in once with GH_CONFIG_DIR=~/.config/gh-work|gh-personal gh auth login.",
    content: `# Automatically switch GitHub CLI accounts by cwd
function chpwd_gh_switch() {
  if [[ "$PWD" == "$HOME/Developer/1chooo"* ]]; then
    export GH_CONFIG_DIR="$HOME/.config/gh-personal"
  elif [[ "$PWD" == "$HOME/Developer/works"* ]]; then
    export GH_CONFIG_DIR="$HOME/.config/gh-work"
  else
    export GH_CONFIG_DIR="$HOME/.config/gh-work"
  fi
}

autoload -U add-zsh-hook
add-zsh-hook chpwd chpwd_gh_switch
chpwd_gh_switch
`,
  },
]

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
      <path d="M10.5 5.5V3.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
    </svg>
  )
}

export function DemoConfigSnippets() {
  const [active, setActive] = useState<SnippetId>("gitconfig")
  const [copied, setCopied] = useState(false)
  const snippet = SNIPPETS.find((s) => s.id === active)!

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet.content)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 p-4 sm:p-6 overflow-x-auto"
              style={{ minHeight: 240 }}
            >
              <pre className="font-mono text-[11px] leading-5 text-rurikon-600 whitespace-pre">
                {snippet.content}
              </pre>
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                config files
              </span>
              {SNIPPETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActive(item.id)
                    setCopied(false)
                  }}
                  className={cn(
                    "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                    active === item.id
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Copied" : "Copy snippet"}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors inline-flex items-center gap-1.5",
                  copied
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                <CopyIcon className="w-3 h-3" />
                {copied ? "copied" : "copy"}
              </button>
            </div>
          </div>

          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6 break-all">
                <span className="text-[#5a9fd4]">path</span>:{" "}
                <span className="text-[#9b72d4]">{snippet.path}</span>
              </div>

              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">
                  {snippet.label}
                </span>
                <span className="text-xs text-rurikon-500">{snippet.description}</span>
                <span className="text-xs text-rurikon-400 italic">{snippet.detail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
