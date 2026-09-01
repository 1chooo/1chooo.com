import type { ComponentType, ReactNode } from 'react'

type ChartTheme = 'light' | 'dark'

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode
    icon?: ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<ChartTheme, string> }
  )
}
