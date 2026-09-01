type SmellKind = {
  title: string
  tag: string
  border: string
  bg: string
  text: string
  tagBg: string
  short: string
  detail: string
  visual: React.ReactNode
}

function SpaghettiVisual() {
  return (
    <svg viewBox="0 0 80 60" className="w-full h-full" aria-hidden>
      {/* Tangled lines */}
      <line x1="10" y1="10" x2="70" y2="50" stroke="#d45a9f" strokeWidth="1.5" />
      <line x1="70" y1="10" x2="10" y2="50" stroke="#d45a9f" strokeWidth="1.5" />
      <line x1="40" y1="5" x2="15" y2="55" stroke="#9b72d4" strokeWidth="1.5" />
      <line x1="40" y1="5" x2="65" y2="55" stroke="#9b72d4" strokeWidth="1.5" />
      <line x1="5" y1="30" x2="75" y2="30" stroke="#d4a96a" strokeWidth="1.5" />
      {/* Nodes */}
      {[[10,10],[70,10],[40,5],[10,50],[70,50],[5,30],[75,30],[15,55],[65,55]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#f5dce8" stroke="#d45a9f" strokeWidth="1" />
      ))}
    </svg>
  )
}

function LasagnaVisual() {
  const layers = [
    { color: "#dce8f5", border: "#5a9fd4", label: "UI" },
    { color: "#dce8dc", border: "#7aab4e", label: "Logic" },
    { color: "#f5e8dc", border: "#d4a96a", label: "Service" },
    { color: "#ecdcf5", border: "#9b72d4", label: "Data" },
  ]
  return (
    <div className="flex flex-col w-full h-full gap-1 px-2">
      {layers.map((l) => (
        <div
          key={l.label}
          className="flex-1 border flex items-center justify-center font-mono text-[10px] min-h-0"
          style={{ backgroundColor: l.color, borderColor: l.border, color: l.border }}
        >
          {l.label}
        </div>
      ))}
    </div>
  )
}

function RavioliVisual() {
  const nodes = [
    { label: "A", color: "#dce8f5", border: "#5a9fd4", text: "#1a5a8b", x: "10%", y: "10%" },
    { label: "B", color: "#dce8dc", border: "#7aab4e", text: "#3a6b1a", x: "55%", y: "5%" },
    { label: "C", color: "#f5e8dc", border: "#d4a96a", text: "#8b6914", x: "70%", y: "50%" },
    { label: "D", color: "#ecdcf5", border: "#9b72d4", text: "#5a1a8b", x: "5%", y: "55%" },
    { label: "E", color: "#f5dce8", border: "#d45a9f", text: "#8b1a5a", x: "35%", y: "60%" },
  ]
  return (
    <div className="relative w-full h-full min-h-[56px]">
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute border font-mono text-[10px] font-semibold w-7 h-7 flex items-center justify-center rounded-sm"
          style={{
            backgroundColor: n.color,
            borderColor: n.border,
            color: n.text,
            left: n.x,
            top: n.y,
          }}
        >
          {n.label}
        </div>
      ))}
    </div>
  )
}

const SMELLS: SmellKind[] = [
  {
    title: "Spaghetti Code",
    tag: "avoid",
    border: "#d45a9f",
    bg: "#f5dce8",
    text: "#8b1a5a",
    tagBg: "#d45a9f",
    short: "No structure. Everything depends on everything else.",
    detail: "Tangled control flow and object references. Global state everywhere. Adding a feature means chasing connections across the entire codebase.",
    visual: <SpaghettiVisual />,
  },
  {
    title: "Lasagna Code",
    tag: "tolerable",
    border: "#d4a96a",
    bg: "#f5e8dc",
    text: "#8b6914",
    tagBg: "#d4a96a",
    short: "Layered and readable, but monolithic layers.",
    detail: "Clean conceptual separation (UI / Logic / Data), but each layer is a monolith. Understanding is easy; changing a layer in isolation is hard.",
    visual: <LasagnaVisual />,
  },
  {
    title: "Ravioli Code",
    tag: "ideal",
    border: "#7aab4e",
    bg: "#dce8dc",
    text: "#3a6b1a",
    tagBg: "#7aab4e",
    short: "Small, self-contained, loosely coupled components.",
    detail: "Each component knows only what it needs to. Replacing or modifying one raviolo does not ripple through the system — the OO ideal.",
    visual: <RavioliVisual />,
  },
]

export function DemoCodeSmells() {
  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-rurikon-border">
        {SMELLS.map((s) => (
          <div key={s.title} className="flex flex-col">
            {/* Visual */}
            <div className="flex items-center justify-center p-3 h-28 bg-rurikon-50/20 overflow-hidden">
              {s.visual}
            </div>
            {/* Info */}
            <div className="px-3 py-3 border-t border-rurikon-border flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold" style={{ color: s.text }}>{s.title}</span>
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 text-white rounded"
                  style={{ backgroundColor: s.tagBg }}
                >
                  {s.tag}
                </span>
              </div>
              <span className="text-xs text-rurikon-500">{s.short}</span>
              <span className="text-xs text-rurikon-400 italic">{s.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
