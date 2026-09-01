"use client"

import { Link, Check } from "lucide-react"
import { useState } from "react"

export function RedditCopyLinkButton({ href }: { href: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-rurikon-300 hover:text-rurikon-500 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Link className="size-3.5" />
          Copy link
        </>
      )}
    </button>
  )
}
