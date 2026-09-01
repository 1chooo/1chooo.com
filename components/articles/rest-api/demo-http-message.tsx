"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type MessageMode = "request" | "response"

type RequestPart =
  | "method"
  | "path"
  | "version"
  | "host"
  | "accept"
  | "auth"
  | "content-type"
  | "body"

type ResponsePart =
  | "status-line"
  | "content-type-res"
  | "cache-control"
  | "x-rate-limit"
  | "body-res"

type Part = RequestPart | ResponsePart

interface PartDef {
  key: Part
  label: string
  color: string
  short: string
  detail: string
  example: string
}

const REQUEST_PARTS: PartDef[] = [
  {
    key: "method",
    label: "Method",
    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
    short: "The action to perform on the resource.",
    detail:
      "HTTP defines a fixed vocabulary of verbs. GET retrieves data without side effects; POST creates a new resource; PUT replaces a resource entirely; PATCH applies a partial update; DELETE removes a resource. Safe methods (GET, HEAD, OPTIONS) must not change server state.",
    example: "GET",
  },
  {
    key: "path",
    label: "Request Target",
    color: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
    short: "The resource URI path and optional query string.",
    detail:
      "Identifies the resource. The path component names the resource (/users/42), and the query string (?include=email) refines the request. REST convention: plural nouns for collections (/articles), specific IDs for members (/articles/17).",
    example: "/users/42?include=email",
  },
  {
    key: "version",
    label: "HTTP Version",
    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
    short: "Protocol version negotiated between client and server.",
    detail:
      "HTTP/1.1 uses persistent keep-alive connections. HTTP/2 multiplexes many requests over a single TCP connection, eliminating head-of-line blocking. HTTP/3 replaces TCP with QUIC for faster connection setup.",
    example: "HTTP/1.1",
  },
  {
    key: "host",
    label: "Host",
    color: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
    short: "Target server hostname (mandatory in HTTP/1.1).",
    detail:
      "Required since HTTP/1.1, enabling virtual hosting — multiple domains served by the same IP. Reverse proxies and CDNs use this header to route requests to the correct backend application.",
    example: "api.example.com",
  },
  {
    key: "accept",
    label: "Accept",
    color: "bg-[#f5dce8] border-[#d45a9f] text-[#8b1a5a]",
    short: "Media types the client can process.",
    detail:
      "Content negotiation: the client declares what formats it understands. The server selects the best match and echoes it back in Content-Type. Using application/json for REST APIs is convention; some APIs also support application/xml.",
    example: "application/json",
  },
  {
    key: "auth",
    label: "Authorization",
    color: "bg-[#dcf5f0] border-[#4ed4b8] text-[#1a8b72]",
    short: "Credentials proving the caller's identity.",
    detail:
      "Common schemes: Bearer <jwt> sends a JSON Web Token; Basic base64(user:pass) sends credentials; API-Key sends a long-lived opaque token. Never send credentials over plain HTTP — use HTTPS/TLS.",
    example: "Bearer eyJhbGciOi…",
  },
  {
    key: "content-type",
    label: "Content-Type",
    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
    short: "Format of the request body (required when body is present).",
    detail:
      "Tells the server how to parse the body. application/json is standard for REST APIs. multipart/form-data is used for file uploads. application/x-www-form-urlencoded is the HTML form default.",
    example: "application/json",
  },
  {
    key: "body",
    label: "Body",
    color: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
    short: "Optional payload carrying data to the server.",
    detail:
      "Only present on POST, PUT, and PATCH requests. The body is a stream of bytes; its meaning is determined by Content-Type. For JSON APIs, the body is a UTF-8 encoded JSON object or array.",
    example: '{"name":"Ada","role":"admin"}',
  },
]

const RESPONSE_PARTS: PartDef[] = [
  {
    key: "status-line",
    label: "Status Line",
    color: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
    short: "HTTP version, numeric status code, and reason phrase.",
    detail:
      "The first line of every HTTP response. The 3-digit code is machine-readable; the reason phrase is human-readable. The code drives client behaviour: 2xx succeed, 3xx redirect, 4xx are client errors, 5xx are server errors.",
    example: "HTTP/1.1 200 OK",
  },
  {
    key: "content-type-res",
    label: "Content-Type",
    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
    short: "Format and encoding of the response body.",
    detail:
      "The client uses this to parse the body. application/json; charset=utf-8 is the standard REST response type. A mismatch between the declared type and the actual body content causes parse failures.",
    example: "application/json; charset=utf-8",
  },
  {
    key: "cache-control",
    label: "Cache-Control",
    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
    short: "Caching directives for browsers and proxies.",
    detail:
      "Controls how long the response may be cached. max-age=300 allows caching for 5 minutes. no-store prevents any caching. private restricts caching to the end browser. Correct cache headers massively improve API throughput.",
    example: "max-age=300, must-revalidate",
  },
  {
    key: "x-rate-limit",
    label: "X-RateLimit-*",
    color: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
    short: "Custom headers signalling API rate-limit quotas.",
    detail:
      "Not standardised but widely used. X-RateLimit-Limit = total allowed per window; X-RateLimit-Remaining = calls left. When Remaining hits 0 the server returns 429 Too Many Requests. Helps clients self-throttle without polling.",
    example: "X-RateLimit-Remaining: 47",
  },
  {
    key: "body-res",
    label: "Body",
    color: "bg-[#dcf5f0] border-[#4ed4b8] text-[#1a8b72]",
    short: "JSON payload (or other media type) returned by the server.",
    detail:
      "For REST APIs this is almost always a JSON object. Collections return arrays; single resources return objects. Include an id field so clients can cache and identify items. Envelope vs. bare-array is a style choice.",
    example: '{"id":42,"name":"Ada","role":"admin"}',
  },
]

const REQUEST_ROWS: RequestPart[][] = [
  ["method", "path", "version"],
  ["host"],
  ["accept", "auth"],
  ["content-type"],
  ["body"],
]

const RESPONSE_ROWS: ResponsePart[][] = [
  ["status-line"],
  ["content-type-res", "cache-control"],
  ["x-rate-limit"],
  ["body-res"],
]

const REQUEST_ROW_WIDTHS: number[][] = [
  [2, 5, 3],
  [10],
  [5, 5],
  [10],
  [10],
]

const RESPONSE_ROW_WIDTHS: number[][] = [
  [10],
  [5, 5],
  [10],
  [10],
]

export function DemoHTTPMessage() {
  const [mode, setMode] = useState<MessageMode>("request")
  const [active, setActive] = useState<Part>("method")

  const parts = mode === "request" ? REQUEST_PARTS : RESPONSE_PARTS
  const rows = mode === "request" ? REQUEST_ROWS : RESPONSE_ROWS
  const widths = mode === "request" ? REQUEST_ROW_WIDTHS : RESPONSE_ROW_WIDTHS

  const field = parts.find((p) => p.key === active) ?? parts[0]

  function switchMode(m: MessageMode) {
    setMode(m)
    setActive(m === "request" ? "method" : "status-line")
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left: message diagram */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6" style={{ minHeight: 220 }}>
              <div className="w-full max-w-sm mx-auto flex flex-col gap-px border border-rurikon-border/40 overflow-hidden rounded-sm">
                {/* header strip */}
                <div className="bg-rurikon-50/60 border-b border-rurikon-border/30 px-3 py-1.5 flex gap-2 items-center">
                  <span className="font-mono text-[10px] text-rurikon-400 uppercase tracking-wide">
                    {mode === "request" ? "HTTP Request" : "HTTP Response"}
                  </span>
                </div>
                {rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="flex"
                    style={{
                      display: "grid",
                      gridTemplateColumns: widths[ri].map((w) => `${w}fr`).join(" "),
                    }}
                  >
                    {row.map((key) => {
                      const p = parts.find((x) => x.key === key)!
                      const isActive = active === key
                      return (
                        <button
                          key={key}
                          onClick={() => setActive(key)}
                          className={cn(
                            "border text-center py-2.5 px-1.5 transition-colors cursor-pointer",
                            isActive
                              ? p.color + " border-2"
                              : "bg-[#fefefe] border-rurikon-border/30 text-rurikon-400 hover:bg-rurikon-50"
                          )}
                        >
                          <span className="font-mono text-[10px] leading-tight block">{p.label}</span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                {mode === "request" ? "HTTP request message" : "HTTP response message"}
              </span>
              <button
                onClick={() => switchMode("request")}
                className={cn(
                  "text-xs rounded px-2.5 py-1.5 border transition-colors",
                  mode === "request"
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                request
              </button>
              <button
                onClick={() => switchMode("response")}
                className={cn(
                  "text-xs rounded px-2.5 py-1.5 border transition-colors",
                  mode === "response"
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                response
              </button>
            </div>
          </div>

          {/* Right: field detail */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* info block */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{field.label}</span>
                <span className="text-xs text-rurikon-500">{field.short}</span>
                <span className="text-xs text-rurikon-400 italic">{field.detail}</span>
              </div>
              {/* example */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">example</span>
                <br />
                {"  "}
                <span className={cn(field.color, "px-1 rounded text-[11px] border")}>{field.example}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
