export interface GaltonBoardHandle {
  drop: (count: number) => void
  reset: () => void
  getActiveCount: () => number
}

export interface GaltonBoardProps {
  rows: number
  bias: number
  speed: number
  onBallLanded: (binIndex: number) => void
  onActiveChange?: (active: number) => void
}
