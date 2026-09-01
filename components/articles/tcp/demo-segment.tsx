"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type FieldKey =
  | "src_port"
  | "dst_port"
  | "seq"
  | "ack"
  | "offset"
  | "flags"
  | "window"
  | "checksum"
  | "urgent"
  | "options"
  | "data"

interface FieldDef {
  key: FieldKey
  label: string
  bits: number
  color: string
  short: string
  detail: string
  example: string
}

const FIELDS: FieldDef[] = [
  {
    key: "src_port",
    label: "Source Port",
    bits: 16,
    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
    short: "Sending endpoint's port number.",
    detail: "A 16-bit unsigned integer (0–65535). Together with the source IP, it identifies the sending socket. Ephemeral ports for clients are usually in the range 49152–65535.",
    example: "54321",
  },
  {
    key: "dst_port",
    label: "Destination Port",
    bits: 16,
    color: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
    short: "Receiving endpoint's port number.",
    detail: "Identifies the service on the remote host. Well-known ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 25 (SMTP).",
    example: "443",
  },
  {
    key: "seq",
    label: "Sequence Number",
    bits: 32,
    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
    short: "Byte offset of the first data byte in this segment.",
    detail: "TCP is a byte-stream protocol. The sequence number tracks which byte of the stream this segment starts at. On a SYN segment it is the Initial Sequence Number (ISN), chosen randomly to avoid clashes with old connections.",
    example: "3_141_592_653",
  },
  {
    key: "ack",
    label: "Acknowledgment Number",
    bits: 32,
    color: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
    short: "Next byte the sender expects to receive.",
    detail: "Only valid when the ACK flag is set. If the remote sent bytes 0–999, this field is 1000 — meaning 'I got everything up to 999, send me 1000 next.' This is cumulative acknowledgment.",
    example: "2_718_281_829",
  },
  {
    key: "offset",
    label: "Data Offset",
    bits: 4,
    color: "bg-[#f5dce8] border-[#d45a9f] text-[#8b1a5a]",
    short: "Where the data starts (header length in 32-bit words).",
    detail: "Also called the header length field. A value of 5 means 5×32 = 160 bits = 20 bytes — the minimum TCP header. Options can extend the header up to 60 bytes (value 15).",
    example: "5 (= 20 bytes)",
  },
  {
    key: "flags",
    label: "Control Flags",
    bits: 6,
    color: "bg-[#dcf5f0] border-[#4ed4b8] text-[#1a8b72]",
    short: "SYN, ACK, FIN, RST, PSH, URG control bits.",
    detail: "Each bit enables a specific behavior: SYN=open connection, ACK=acknowledgment valid, FIN=no more data, RST=abort connection, PSH=push data to app immediately, URG=urgent pointer valid.",
    example: "SYN=1  ACK=0",
  },
  {
    key: "window",
    label: "Window Size",
    bits: 16,
    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
    short: "How many bytes the receiver can accept right now.",
    detail: "Flow control field. Tells the sender how much buffer space is available on the receiving side. The sender must not have more unacknowledged bytes in flight than this value (before scaling).",
    example: "65535",
  },
  {
    key: "checksum",
    label: "Checksum",
    bits: 16,
    color: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
    short: "Error detection over the header and data.",
    detail: "One's-complement sum of the TCP header, data, and a pseudo-header drawn from the IP layer (src IP, dst IP, protocol, TCP length). Mandatory for IPv4; strongly recommended for IPv6.",
    example: "0xA3F2",
  },
  {
    key: "urgent",
    label: "Urgent Pointer",
    bits: 16,
    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
    short: "Byte offset to urgent data (only when URG flag is set).",
    detail: "Rarely used in modern applications. Points to the last urgent byte relative to the sequence number. Used historically for out-of-band signals like Telnet interrupt characters.",
    example: "0 (unused)",
  },
  {
    key: "options",
    label: "Options",
    bits: 0,
    color: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
    short: "Variable-length extensions (0–40 bytes).",
    detail: "Common options: MSS (Maximum Segment Size), Window Scale (multiply window for high-bandwidth paths), SACK (selective acknowledgment), Timestamps. Padded to a 32-bit boundary.",
    example: "MSS=1460, WS=7",
  },
  {
    key: "data",
    label: "Data",
    bits: 0,
    color: "bg-[#dcf5f0] border-[#4ed4b8] text-[#1a8b72]",
    short: "Application payload (0 or more bytes).",
    detail: "The actual content being transported — HTTP request bytes, TLS records, SSH packets, etc. TCP is agnostic to what's inside; it simply delivers the byte stream reliably and in order.",
    example: "HTTP/1.1 GET …",
  },
]

// Rows that fit in the bitmap: each inner array = one 32-bit row
const HEADER_ROWS: FieldKey[][] = [
  ["src_port", "dst_port"],
  ["seq"],
  ["ack"],
  ["offset", "flags", "window"],
  ["checksum", "urgent"],
  ["options"],
  ["data"],
]

// Widths (in fr) for each row
const ROW_WIDTHS: number[][] = [
  [16, 16],
  [32],
  [32],
  [4, 6, 16],
  [16, 16],
  [32],
  [32],
]

export function DemoSegment() {
  const [active, setActive] = useState<FieldKey>("seq")

  const field = FIELDS.find((f) => f.key === active)!

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left: header diagram */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6" style={{ minHeight: 220 }}>
              <div className="w-full max-w-sm mx-auto flex flex-col gap-px border border-rurikon-border/40 overflow-hidden rounded-sm">
                {/* bit ruler */}
                <div className="flex bg-rurikon-50/60 border-b border-rurikon-border/30">
                  {[0, 4, 8, 12, 16, 20, 24, 28, 31].map((n) => (
                    <div key={n} className="flex-1 text-center">
                      <span className="font-mono text-[9px] text-rurikon-300">{n}</span>
                    </div>
                  ))}
                </div>
                {HEADER_ROWS.map((row, ri) => (
                  <div key={ri} className="flex" style={{ display: "grid", gridTemplateColumns: ROW_WIDTHS[ri].map((w) => `${w}fr`).join(" ") }}>
                    {row.map((key) => {
                      const f = FIELDS.find((x) => x.key === key)!
                      return (
                        <button
                          key={key}
                          onClick={() => setActive(key)}
                          className={cn(
                            "border text-center py-2 px-1 transition-colors cursor-pointer",
                            active === key
                              ? f.color + " border-2"
                              : "bg-[#fefefe] border-rurikon-border/30 text-rurikon-400 hover:bg-rurikon-50"
                          )}
                        >
                          <span className="font-mono text-[10px] leading-tight block">{f.label}</span>
                          {f.bits > 0 && (
                            <span className="font-mono text-[9px] text-rurikon-300 block">{f.bits}b</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">TCP segment header</span>
              <span className="font-mono text-[10px] text-rurikon-300">click a field to inspect</span>
            </div>
          </div>

          {/* Right: field description */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className={cn("border px-3 py-3 flex flex-col gap-1", field.color.split(" ").filter(c => c.startsWith("border-") || c.startsWith("bg-") || c.startsWith("text-")).join(" ").replace(/bg-\[.*?\]/, "bg-[#fefefe]"))}>
                <span className="font-mono text-xs font-medium">{field.label}</span>
                <span className="text-xs opacity-80">{field.short}</span>
                <span className="text-xs opacity-60 italic">{field.detail}</span>
              </div>

              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">field {"{"}</span>
                <br />
                {"  "}<span className="text-[#5a9fd4]">name</span>: <span className="text-[#9b72d4]">{field.label}</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">size</span>: <span className="text-[#9b72d4]">{field.bits > 0 ? `${field.bits} bits` : "variable"}</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">example</span>: <span className="text-[#9b72d4]">{field.example}</span>;
                <br />
                <span className="text-rurikon-400">{"}"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
