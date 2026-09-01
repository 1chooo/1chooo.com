"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Category = "1xx" | "2xx" | "3xx" | "4xx" | "5xx"

interface StatusCode {
  code: number
  phrase: string
  short: string
  detail: string
  when: string
}

const CATEGORIES: { key: Category; label: string; color: string; border: string; text: string; short: string }[] = [
  {
    key: "1xx",
    label: "1xx",
    color: "bg-[#dcf5f0]",
    border: "border-[#4ed4b8]",
    text: "text-[#1a8b72]",
    short: "Informational",
  },
  {
    key: "2xx",
    label: "2xx",
    color: "bg-[#dce8dc]",
    border: "border-[#7aab4e]",
    text: "text-[#3a6b1a]",
    short: "Success",
  },
  {
    key: "3xx",
    label: "3xx",
    color: "bg-[#dce8f5]",
    border: "border-[#5a9fd4]",
    text: "text-[#1a5a8b]",
    short: "Redirection",
  },
  {
    key: "4xx",
    label: "4xx",
    color: "bg-[#f5e8dc]",
    border: "border-[#d4a96a]",
    text: "text-[#8b6914]",
    short: "Client Error",
  },
  {
    key: "5xx",
    label: "5xx",
    color: "bg-[#f5dce8]",
    border: "border-[#d45a9f]",
    text: "text-[#8b1a5a]",
    short: "Server Error",
  },
]

const STATUS_CODES: Record<Category, StatusCode[]> = {
  "1xx": [
    {
      code: 100,
      phrase: "Continue",
      short: "Keep sending.",
      detail: "Server received the request headers and the client should proceed to send the body. Used with the Expect: 100-continue request header to avoid sending a large body when the server would reject it anyway.",
      when: "Large uploads behind an Expect header",
    },
    {
      code: 101,
      phrase: "Switching Protocols",
      short: "Upgrade accepted.",
      detail: "Server agrees to the protocol upgrade requested by the Upgrade header. Most commonly seen when an HTTP/1.1 connection is being upgraded to a WebSocket connection.",
      when: "WebSocket handshake",
    },
  ],
  "2xx": [
    {
      code: 200,
      phrase: "OK",
      short: "Request succeeded.",
      detail: "The most common success code. GET returns the resource; POST may return the created item; PUT/PATCH return the updated item. The response body contains the result.",
      when: "GET, PUT, PATCH responses",
    },
    {
      code: 201,
      phrase: "Created",
      short: "New resource created.",
      detail: "Returned after a successful POST (or occasionally PUT) that created a resource. The Location header should contain the URI of the new resource.",
      when: "POST that creates a new record",
    },
    {
      code: 204,
      phrase: "No Content",
      short: "Success, no body.",
      detail: "The operation succeeded but there is nothing to return. Common on DELETE, or a PUT/PATCH where the client does not need the updated state echo. Do not include a body.",
      when: "DELETE, or PATCH that needs no echo",
    },
    {
      code: 206,
      phrase: "Partial Content",
      short: "Range of the resource returned.",
      detail: "Server fulfilled a partial GET — the client sent a Range header. Used for resumable downloads and adaptive bitrate video streaming (HLS, DASH).",
      when: "Video streaming, resume downloads",
    },
  ],
  "3xx": [
    {
      code: 301,
      phrase: "Moved Permanently",
      short: "Resource moved — update bookmarks.",
      detail: "The resource has a new permanent URI in the Location header. Clients and search engines should update their stored links. Browsers will cache this redirect indefinitely.",
      when: "Permanent domain or path changes",
    },
    {
      code: 302,
      phrase: "Found",
      short: "Temporary redirect.",
      detail: "The resource is temporarily at a different URI. Clients should keep using the original URI for future requests. Frequently misused — use 307 or 308 when the method must be preserved.",
      when: "Temporary feature redirects",
    },
    {
      code: 304,
      phrase: "Not Modified",
      short: "Use your cached copy.",
      detail: "The client sent a conditional GET (If-None-Match or If-Modified-Since) and the resource has not changed. The body is empty. Saves bandwidth by letting the client reuse its cached response.",
      when: "Conditional GET with ETags",
    },
  ],
  "4xx": [
    {
      code: 400,
      phrase: "Bad Request",
      short: "Malformed syntax.",
      detail: "The request is syntactically invalid — bad JSON, missing required fields, type errors. The body should include a human-readable error message (and ideally a machine-readable error code).",
      when: "Invalid JSON body, missing fields",
    },
    {
      code: 401,
      phrase: "Unauthorized",
      short: "Authentication required.",
      detail: "Confusingly named — this means unauthenticated. The client has not provided credentials or the credentials are invalid. The WWW-Authenticate header hints at the accepted auth scheme.",
      when: "Missing or invalid token",
    },
    {
      code: 403,
      phrase: "Forbidden",
      short: "Authenticated but not allowed.",
      detail: "The client's identity is known but they lack the required permissions. Unlike 401, re-authenticating will not help. Do not leak resource existence to unauthorised callers — use 404 instead.",
      when: "Insufficient role/scope",
    },
    {
      code: 404,
      phrase: "Not Found",
      short: "Resource does not exist.",
      detail: "The server cannot find the resource at the requested URI. Also used deliberately to conceal the existence of a resource that the caller is not allowed to see.",
      when: "Unknown ID, deleted record, hidden resource",
    },
    {
      code: 409,
      phrase: "Conflict",
      short: "State conflict prevents the request.",
      detail: "The request cannot be completed because of a conflict in the target resource's current state — e.g. duplicate unique key, optimistic locking mismatch, or a state transition that is not allowed.",
      when: "Duplicate email, version mismatch",
    },
    {
      code: 422,
      phrase: "Unprocessable Entity",
      short: "Valid syntax but semantic errors.",
      detail: "The body is well-formed but violates business rules — e.g. a valid JSON body with an end date before the start date. Preferred over 400 when the syntax is fine but validation fails.",
      when: "Failed validation rules",
    },
    {
      code: 429,
      phrase: "Too Many Requests",
      short: "Rate limit exceeded.",
      detail: "The client has sent too many requests in a given time window. The Retry-After header tells the client when to try again. Clients must implement exponential back-off to avoid hammering the server.",
      when: "Rate limiting, quota exceeded",
    },
  ],
  "5xx": [
    {
      code: 500,
      phrase: "Internal Server Error",
      short: "Unexpected server fault.",
      detail: "A generic catch-all for unhandled exceptions. The server failed to fulfil the request. Log the stack trace server-side; only return a safe error message to the client — never expose stack traces.",
      when: "Unhandled exception in server code",
    },
    {
      code: 502,
      phrase: "Bad Gateway",
      short: "Upstream returned an invalid response.",
      detail: "A reverse proxy or gateway received an invalid response from an upstream server. Common when a backend pod crashes and the load balancer is still routing traffic to it.",
      when: "Crashed upstream service",
    },
    {
      code: 503,
      phrase: "Service Unavailable",
      short: "Server temporarily unable to handle requests.",
      detail: "The server is down for maintenance or overloaded. The Retry-After header should indicate when to retry. Commonly returned during deployments or under extreme load-shedding.",
      when: "Maintenance, overload, circuit breaker",
    },
    {
      code: 504,
      phrase: "Gateway Timeout",
      short: "Upstream took too long.",
      detail: "A gateway did not receive a timely response from an upstream server. The downstream request timed out. Increase the upstream timeout, or optimise the slow service.",
      when: "Slow DB query, slow microservice",
    },
  ],
}

export function DemoStatusCodes() {
  const [category, setCategory] = useState<Category>("2xx")
  const [selected, setSelected] = useState<number>(200)

  const codes = STATUS_CODES[category]
  const cat = CATEGORIES.find((c) => c.key === category)!
  const code = codes.find((c) => c.code === selected) ?? codes[0]

  function switchCategory(c: Category) {
    setCategory(c)
    setSelected(STATUS_CODES[c][0].code)
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left: category + code list */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6" style={{ minHeight: 220 }}>
              <div className="w-full max-w-sm mx-auto flex flex-col gap-2">
                {/* Category row */}
                <div className="flex gap-px">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => switchCategory(c.key)}
                      className={cn(
                        "flex-1 py-2 border text-center transition-colors",
                        category === c.key
                          ? `${c.color} ${c.border} border-2 ${c.text}`
                          : "bg-[#fefefe] border-rurikon-border/30 text-rurikon-400 hover:bg-rurikon-50"
                      )}
                    >
                      <span className="font-mono text-[11px] block font-medium">{c.label}</span>
                      <span className="font-serif text-[9px] text-rurikon-400 block">{c.short}</span>
                    </button>
                  ))}
                </div>

                {/* Codes in category */}
                <div className="flex flex-col gap-px">
                  {codes.map((sc) => (
                    <button
                      key={sc.code}
                      onClick={() => setSelected(sc.code)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 border text-left transition-colors",
                        selected === sc.code
                          ? `${cat.color} ${cat.border} border-2 ${cat.text}`
                          : "bg-[#fefefe] border-rurikon-border/30 text-rurikon-400 hover:bg-rurikon-50"
                      )}
                    >
                      <span className="font-mono text-xs font-semibold w-8 shrink-0">{sc.code}</span>
                      <span className="font-mono text-[11px]">{sc.phrase}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 italic">HTTP status codes</span>
            </div>
          </div>

          {/* Right: detail */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* code + phrase */}
              <div className={cn("border-2 px-3 py-3 flex flex-col gap-1", cat.color, cat.border)}>
                <span className={cn("font-mono text-lg font-bold", cat.text)}>{code.code}</span>
                <span className={cn("font-serif text-sm font-medium", cat.text)}>{code.phrase}</span>
                <span className="text-xs text-rurikon-500">{code.short}</span>
              </div>

              {/* detail */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">detail</span>
                <span className="text-xs text-rurikon-400 italic">{code.detail}</span>
              </div>

              {/* when */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">when to use</span>
                <br />
                {"  "}
                <span className={cn("px-1 rounded text-[11px] border", cat.color, cat.border, cat.text)}>{code.when}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
