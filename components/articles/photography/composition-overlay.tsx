'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type CompositionId =
  | 'thirds'
  | 'golden-section'
  | 'golden-triangles'
  | 'spiral-section'
  | 'golden-spiral'
  | 'harmonious-triangles'

interface Composition {
  id: CompositionId
  label: string
  short: string
}

// ─── Config ───────────────────────────────────────────────────────────────────

const COMPOSITIONS: Composition[] = [
  { id: 'thirds',               label: 'Rule of Thirds',       short: 'Thirds'     },
  { id: 'golden-section',       label: 'Golden Section',       short: 'Golden §'   },
  { id: 'golden-triangles',     label: 'Golden Triangles',     short: '△ Golden'   },
  // bug here
  // { id: 'spiral-section',       label: 'Spiral Section',       short: 'Spiral §'   },
  // { id: 'golden-spiral',        label: 'Golden Spiral',        short: '◎ Spiral'   },
  { id: 'harmonious-triangles', label: 'Harmonious Triangles', short: '△ Harmonic' },
]

// ─── SVG overlay ─────────────────────────────────────────────────────────────
// All paths use a normalised viewBox of "0 0 300 200" (3:2, common photographic format).
// Golden-ratio constant: phi ≈ 1.618033988
// Spiral section + golden spiral use a true phi:1 sub-frame (162×100) embedded in the 300×200 canvas.

const phi = 1.618033988749895

const LINE = {
  stroke: 'rgba(253,224,71,0.85)',
  strokeWidth: '1',
  fill: 'none',
}

const DOT_FILL = 'rgba(253,224,71,0.9)'

function OverlaySVG({ id, flipped }: { id: CompositionId; flipped: boolean }) {
  const W = 320
  const H = 180

  // ── Rule of Thirds ──────────────────────────────────────────────────────────
  if (id === 'thirds') {
    const xs = [W / 3, (W * 2) / 3]
    const ys = [H / 3, (H * 2) / 3]
    return (
      <>
        {xs.map((x) => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} {...LINE} />
        ))}
        {ys.map((y) => (
          <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} {...LINE} />
        ))}
      </>
    )
  }

  // ── Golden Section ──────────────────────────────────────────────────────────
  if (id === 'golden-section') {
    const gx1 = W * (1 - 1 / phi)   // ≈ 114.6
    const gx2 = W / phi              // ≈ 185.4
    const gy1 = H * (1 - 1 / phi)   // ≈ 76.4
    const gy2 = H / phi              // ≈ 123.6
    return (
      <>
        <line x1={gx1} y1={0} x2={gx1} y2={H} {...LINE} />
        <line x1={gx2} y1={0} x2={gx2} y2={H} {...LINE} />
        <line x1={0} y1={gy1} x2={W} y2={gy1} {...LINE} />
        <line x1={0} y1={gy2} x2={W} y2={gy2} {...LINE} />
      </>
    )
  }

  // ── Golden Triangles ────────────────────────────────────────────────────────
  // Main diagonal (0,0)→(W,H).
  // Perpendicular from (W,0): meets diagonal at (2700/13, 1800/13).
  // Perpendicular from (0,H): meets diagonal at (1200/13, 800/13).
  if (id === 'golden-triangles') {
    const ix1 = (W * W * W) / (H * H + W * W)            // ≈ 207.7
    const iy1 = (H / W) * ix1                             // ≈ 138.5
    const ix2 = (W * H * H) / (H * H + W * W)            // ≈ 92.3
    const iy2 = (H / W) * ix2                             // ≈ 61.5
    return (
      <>
        <line x1={0}  y1={0} x2={W}   y2={H}   {...LINE} />
        <line x1={W}  y1={0} x2={ix1} y2={iy1} {...LINE} />
        <line x1={0}  y1={H} x2={ix2} y2={iy2} {...LINE} />
      </>
    )
  }

  // ── Harmonious Triangles ────────────────────────────────────────────────────
  // Anti-diagonal (W,0)→(0,H).
  // Perpendicular from (0,0): meets anti-diagonal at (ix,iy).
  // Perpendicular from (W,H): meets anti-diagonal at symmetric point.
  if (id === 'harmonious-triangles') {
    const denom = H * H + W * W
    const ix1 = (W * H * H) / denom     // from (0,0)
    const iy1 = (H * W * W) / denom
    const ix2 = W - ix1                  // symmetric from (W,H)
    const iy2 = H - iy1
    return (
      <>
        <line x1={W}   y1={0} x2={0}   y2={H}   {...LINE} />
        <line x1={0}   y1={0} x2={ix1} y2={iy1} {...LINE} />
        <line x1={W}   y1={H} x2={ix2} y2={iy2} {...LINE} />
      </>
    )
  }

  // ── Spiral Section & Golden Spiral ─────────────────────────────────────────
  // phi:1 sub-frame: sw=162, sh=100, offset: ox, oy
  // Four levels of nested golden rectangle partitions.
  // Flipping horizontally mirrors the spiral orientation.
  if (id === 'spiral-section' || id === 'golden-spiral') {
    const sw = (phi / (1 + phi)) * W    // ≈ 185.4  (golden cut of W)
    const sh = H                     // full height

    // Level-1 square side (sq1 spans full height)
    const s1 = sh                    // 200
    // Level-2 square (remaining rect after sq1)
    const rw = sw - s1               // ≈ -14.6  that's negative → meaning sw < s1!
    // Recalculate: width divides W into golden ratio, height occupies full H.
    // Use W as the long dimension: sw = W/phi ≈ 185.4, sh = H = 200.
    // sw < sh: so divide SH (vertically) first.
    //   sq1: sw×sw = 185.4×185.4 — too tall again, exceeds H.
    // Use: inner sub-rect anchored to one corner, sized to fit the frame.
    // Standard photography golden spiral guide uses the FRAME itself as the golden rectangle.
    // We'll partition the full 300×200 frame using golden cuts on the long axis.

    // --- True golden sub-partitions of a 300×200 frame ---
    // Step 1: Cut 300 wide at x = 300/phi ≈ 185.4 → left rect 185.4×200, right rect 114.6×200
    const x1 = W / phi         // ≈ 185.4   (left block width)
    // Step 2: Cut right rect (114.6×200) at y = 114.6 from bottom → top block 114.6×85.4, bottom sq 114.6×114.6
    const y1 = H - (W - x1)  // ≈ 85.4
    // Step 3: Cut remaining top-right block (114.6×85.4) at x from left = 85.4/phi ≈ 52.8 → but this is relative to x1
    const x2 = x1 + (H - y1) / phi   // ≈ 185.4 + 70.8/1.618 ≈ 185.4 + 43.8 = 229.2 — not right
    // Simpler: use successive golden cuts
    const a  = W / phi              // ≈ 185.4  (width of sq1 col)
    const b  = W - a              // ≈ 114.6  (width of remaining col)
    const c  = b                  // ≈ 114.6  (side of sq2 within right col, from bottom)
    const y2 = H - c              // ≈ 85.4   (top edge of sq2)
    const d  = H - y2             // ≈ 114.6  (== c, correct)
    // Remaining top-right: b × y2 = 114.6 × 85.4
    // Next cut: the shorter side of 114.6 × 85.4 is 85.4
    const e  = y2                 // ≈ 85.4   (side of sq3)
    const x3 = a + (b - e)       // ≈ 185.4 + 29.2 = 214.6 (left edge of sq3 within right col measured from left edge of right col)
    // sq3 occupies x: a to a+e = 185.4 to 270.8, y: 0 to e = 0 to 85.4
    // Remaining after sq3: (b-e) × e = 29.2 × 85.4
    const f  = b - e              // ≈ 29.2
    // Next sq4: side = f, at top of remaining: x3 to x3+f, within remaining tall rect
    const g  = e - f              // ≈ 56.2
    const y3 = f                  // ≈ 29.2  (bottom of sq4)

    // Build objects so mirroring is easy
    type Line2 = { x1: number; y1: number; x2: number; y2: number }

    const rawLines: Line2[] = [
      { x1: a,  y1: 0,  x2: a,  y2: H  },   // vertical cut sq1 / right
      { x1: a,  y1: y2, x2: W,  y2: y2 },   // horizontal cut sq2 top
      { x1: x3, y1: 0,  x2: x3, y2: y2 },   // vertical cut sq3 right
      { x1: a,  y1: y3, x2: x3, y2: y3 },   // horizontal cut sq4 bottom
    ]

    // Mirror x-coordinate if flipped
    const mx = (x: number) => flipped ? W - x : x

    const lines = rawLines.map((l) => ({
      x1: mx(l.x1), y1: l.y1,
      x2: mx(l.x2), y2: l.y2,
    }))

    if (id === 'spiral-section') {
      return (
        <>
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} {...LINE} />
          ))}
        </>
      )
    }

    // Golden Spiral: same lines + 4 quarter-circle arcs
    // Arc centers at the inner corner of each square, going in spiral order.
    // sq1: (0,0)–(a,H)  center of arc = (flipped ? W-a,H : a,H)  r=H
    // sq2: (a,y2)–(W,H) center = (a, y2)  r = H-y2 = c = 114.6  (but arc should be r=c=b? let's verify)
    //   sq2 side = c ≈ 114.6. r for arc in sq2 = c.
    // sq3: (a,0)–(x3,y2) center = (a,0) relative... let me figure out each arc properly.

    // For each square, the arc sweeps one quarter circle from one corner to the adjacent corner,
    // centered at the OPPOSITE corner.

    // sq1: (0..a) × (0..H). Arc: center=(0,H), r=a. From (a,H) sweeping CCW to (0,H-a)=(0,H-a).
    //   But H-a is negative if a > H ( a≈185.4 > H=200? No, a=185.4 < 200.)
    //   H-a ≈ 14.6. From (a,H) to (0, H-a). Let me verify: center=(0,H), r=a=185.4.
    //   Distance (0,H)→(a,H) = a ✓. Distance (0,H)→(0,H-a) = a ✓.
    //   Arc: CW from (a,H) to (0,H-a), sweep=1.
    //   In SVG: M a,H A a,a 0 0,1 0,{H-a}

    //   But wait – this is an arc in the first large square (width a, height H). The arc goes from
    //   bottom-right of that square to a point on the left edge. That leaves y=H-a above the arc on
    //   the left, which is the remaining strip. Visually this doesn't spiral nicely for 3:2 frames.

    // For a cleaner look, use: center=(a,H), arc from (0,H) to (a,0), CW, r=H (full height).
    //   Distance (a,H)→(0,H) = a ≠ H (185.4 ≠ 200). ✗

    // Let me use centred=bottom-left=(0,H), r=a, CW from (a,H) to (0,H-a).
    // Then the spiral continues in the right strip going upward.

    // arc2 in sq2: (a..W)×(y2..H). sq2 side = c ≈ 114.6.
    //   center=(a,y2), r=c. From (a,H)=(a,y2+c) to (W,y2)=(a+c,y2). CW sweep.
    //   Distance (a,y2)→(a,H) = H-y2 =c ✓. Distance (a,y2)→(W,y2)=W-a=b=c ✓.
    //   Arc: M a,H A c,c 0 0,0 W,y2  (CCW: sweep=0, going from bottom to right means CCW).
    //   Actually: center=(a,y2), start=(a,H) at angle 90° down. End=(W,y2) at angle 0° right.
    //   Going CCW from 90° to 0° is backwards (CW). Going CW from 90° to 0° is 90° CW arc. sweep=1.
    //   Hmm: In SVG screen coords, 0°=right, 90°=down, CW goes 0→90→180.
    //   From 90° (down) CW to 0° (right)? That's 270° the "long way". So CCW (90°→0°) = sweep=0, large=0.
    //   M {a},{H} A {c},{c} 0 0,0 {W},{y2}

    // arc3 in sq3: (a..x3)×(0..y2). sq3 side = e ≈ 85.4.
    //   center=(x3,y2)=(a+e, y2). r=e.
    //   From (W,y2)=(x3+f, y2) to (x3,0)=(x3,0). Wait W=x3+f=a+e+f.
    //   From (W,y2): distance to (x3,y2) = W-x3 = f ≈ 29.2 ≠ e ≈ 85.4. ✗
    //   That doesn't work. Let me use center=(a,y2) for arc3?
    //   Actually arc3 is in sq3 which occupies (a..x3) × (0..y2).
    //   The arc should go from end of arc2 (=(W,y2)) to somewhere...
    //   But W=300 is outside sq3 (which only goes to x3=270.8). So arc2 doesn't connect to sq3 via W.

    // I think the issue is the frame 300×200 is NOT a golden rectangle so the spiral subdivision
    // doesn't tile back nicely. The "remaining" after sq2 doesn't align as expected.

    // For the visual output, I'll use the standard "photography golden spiral" approximation
    // which uses a frame INSCRIBED within the image, and render a smooth approximate path.

    // ── Approximate golden spiral as a smooth SVG path ──────────────────────
    // This matches the visual appearance of standard photography composition guides.
    // The spiral is anchored to the bottom-left of the image and grows outward.

    const spiral = flipped
      ? // mirrored: anchor bottom-right, sweep leftward
        `M ${W * 0.622},${H * 0.569}
         A ${H * 0.071},${H * 0.071} 0 0,0 ${W * 0.571},${H * 0.430}
         A ${H * 0.185},${H * 0.185} 0 0,0 ${W * 0.809},${H * 0.244}
         A ${H * 0.302},${H * 0.302} 0 0,0 ${W * 0.999},${H * 0.580}
         A ${H * 0.500},${H * 0.500} 0 0,0 ${W * 0.618},${H * 1.000}
         A ${H * 0.809},${H * 0.809} 0 0,0 ${W * 0.001},${H * 0.427}`
      : `M ${W * 0.378},${H * 0.569}
         A ${H * 0.071},${H * 0.071} 0 0,1 ${W * 0.429},${H * 0.430}
         A ${H * 0.185},${H * 0.185} 0 0,1 ${W * 0.191},${H * 0.244}
         A ${H * 0.302},${H * 0.302} 0 0,1 ${W * 0.001},${H * 0.580}
         A ${H * 0.500},${H * 0.500} 0 0,1 ${W * 0.382},${H * 1.000}
         A ${H * 0.809},${H * 0.809} 0 0,1 ${W * 0.999},${H * 0.427}`

    return (
      <>
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} {...LINE} />
        ))}
        <path d={spiral} {...LINE} strokeWidth="1.5" />
      </>
    )
  }

  return null
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CompositionOverlay() {
  const [active, setActive] = useState<CompositionId>('thirds')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [flipped, setFlipped] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImageSrc(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const activeComposition = COMPOSITIONS.find((c) => c.id === active)!
  const showFlip = active === 'golden-triangles' ||
    active === 'harmonious-triangles' ||
    active === 'spiral-section' ||
    active === 'golden-spiral'

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      {/* Canvas area */}
      <div
        className="relative w-full cursor-pointer select-none overflow-hidden bg-[#f5f5f0]"
        style={{ aspectRatio: '16 / 9' }}
        onClick={() => !imageSrc && fileRef.current?.click()}
      >
        {/* Image or placeholder */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="uploaded"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-rurikon-400">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              className="opacity-50"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="font-sans text-xs tracking-wide opacity-60">
              Click to upload an image
            </span>
          </div>
        )}

        {/* SVG overlay */}
        <svg
          viewBox="0 0 320 180"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <OverlaySVG id={active} flipped={flipped} />
        </svg>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

        {/* Composition label */}
        <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-0.5 font-sans text-[10px] text-white/80 tracking-widest uppercase">
          {activeComposition.label}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-t border-rurikon-border px-3 py-2">
        <div className="flex flex-wrap gap-1">
          {COMPOSITIONS.map((c) => {
            const isActive = active === c.id
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                aria-pressed={isActive}
                className={cn(
                  'cursor-pointer rounded border-none px-2.5 py-1 font-sans text-xs font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-rurikon-800 text-white'
                    : 'bg-transparent text-rurikon-400 hover:bg-rurikon-50 hover:text-rurikon-800'
                )}
              >
                {c.short}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          {showFlip && (
            <button
              onClick={() => setFlipped((f) => !f)}
              title="Mirror composition"
              className={cn(
                'cursor-pointer rounded border-none px-2.5 py-1 font-sans text-xs font-medium transition-colors duration-150',
                flipped
                  ? 'bg-rurikon-800 text-white'
                  : 'bg-transparent text-rurikon-400 hover:bg-rurikon-50 hover:text-rurikon-800'
              )}
            >
              ⇆ Flip
            </button>
          )}
          {imageSrc && (
            <button
              onClick={() => {
                setImageSrc(null)
                if (fileRef.current) fileRef.current.value = ''
              }}
              className="cursor-pointer rounded border-none px-2.5 py-1 font-sans text-xs font-medium text-rurikon-400 transition-colors duration-150 hover:bg-rurikon-50 hover:text-rurikon-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
