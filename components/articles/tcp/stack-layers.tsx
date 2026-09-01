"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Layer {
  key: string
  name: string
  number: string
  protocols: string[]
  color: string
  border: string
  text: string
  short: string
  detail: string
}

const LAYERS: Layer[] = [
  {
    key: "application",
    name: "Application",
    number: "L7",
    protocols: ["HTTP", "TLS", "SSH", "SMTP", "DNS", "FTP"],
    color: "bg-[#ecdcf5]",
    border: "border-[#9b72d4]",
    text: "text-[#5a1a8b]",
    short: "Where your application logic lives.",
    detail: "Produces or consumes the data stream. Protocols like HTTP define the message format; TLS encrypts before handing to TCP; DNS resolves names to IPs via UDP.",
  },
  {
    key: "transport",
    name: "Transport",
    number: "L4",
    protocols: ["TCP", "UDP", "QUIC"],
    color: "bg-[#dce8f5]",
    border: "border-[#5a9fd4]",
    text: "text-[#1a5a8b]",
    short: "End-to-end delivery between processes.",
    detail: "TCP provides reliable, ordered, flow-controlled byte streams. UDP offers low-overhead datagrams. QUIC (HTTP/3) combines TLS + transport into a single layer over UDP.",
  },
  {
    key: "internet",
    name: "Internet",
    number: "L3",
    protocols: ["IPv4", "IPv6", "ICMP", "BGP"],
    color: "bg-[#dce8dc]",
    border: "border-[#7aab4e]",
    text: "text-[#3a6b1a]",
    short: "Best-effort routing of packets across networks.",
    detail: "IP addresses every host globally. Routers forward packets hop-by-hop toward the destination, with no delivery guarantee — that is TCP's job. ICMP carries control messages (ping, traceroute).",
  },
  {
    key: "link",
    name: "Link",
    number: "L2",
    protocols: ["Ethernet", "Wi-Fi", "ARP"],
    color: "bg-[#f5e8dc]",
    border: "border-[#d4a96a]",
    text: "text-[#8b6914]",
    short: "Delivery within a single local network segment.",
    detail: "Frames move between physically adjacent nodes using MAC addresses. ARP maps IP addresses to MAC addresses on a LAN. Wi-Fi adds wireless framing and collision avoidance.",
  },
]

export function StackLayers() {
  const [active, setActive] = useState<string>("transport")

  const layer = LAYERS.find((l) => l.key === active)!

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left: stack diagram */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 flex items-center justify-center p-6" style={{ minHeight: 220 }}>
              <div className="w-full max-w-xs flex flex-col gap-px">
                {LAYERS.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => setActive(l.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 border transition-colors text-left",
                      active === l.key
                        ? `${l.color} ${l.border} border-2 ${l.text}`
                        : "bg-[#fefefe] border-rurikon-border/40 text-rurikon-400 hover:bg-rurikon-50/60 hover:border-rurikon-border"
                    )}
                  >
                    {/* Layer badge */}
                    <span className={cn(
                      "font-mono text-[10px] w-6 shrink-0 text-center",
                      active === l.key ? l.text : "text-rurikon-300"
                    )}>
                      {l.number}
                    </span>

                    {/* Layer name */}
                    <span className="font-mono text-xs font-medium w-24 shrink-0">{l.name}</span>

                    {/* Protocols */}
                    <div className="flex flex-wrap gap-1">
                      {l.protocols.map((p) => (
                        <span
                          key={p}
                          className={cn(
                            "font-mono text-[10px] px-1 py-0.5 border rounded",
                            active === l.key
                              ? `${l.border} ${l.text} bg-white/40`
                              : "border-rurikon-border/30 text-rurikon-300"
                          )}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}

                {/* Downward arrow between layers */}
                <div className="flex justify-center pt-1">
                  <span className="font-mono text-[10px] text-rurikon-300">↕ each layer hands off to the one below</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">TCP/IP stack</span>
              <span className="font-mono text-[10px] text-rurikon-300">click a layer to inspect</span>
            </div>
          </div>

          {/* Right: layer detail */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className={cn("border px-3 py-3 flex flex-col gap-1", layer.color, layer.border, layer.text)}>
                <span className="font-mono text-xs font-medium">{layer.number} — {layer.name} Layer</span>
                <span className="text-xs opacity-80">{layer.short}</span>
                <span className="text-xs opacity-60 italic">{layer.detail}</span>
              </div>

              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">layer {"{"}</span>
                <br />
                {"  "}<span className="text-[#5a9fd4]">name</span>: <span className="text-[#9b72d4]">{layer.name}</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">protocols</span>: <span className="text-[#9b72d4]">[{layer.protocols.join(", ")}]</span>;
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
