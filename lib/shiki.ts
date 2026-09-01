import { createHighlighter, createCssVariablesTheme } from 'shiki'

export const cssVariablesTheme = createCssVariablesTheme({})

// Singleton highlighter pre-warmed with all languages used across MDX content.
// Imported by both instrumentation.ts (server startup) and mdx-components.tsx (render).
// Node.js module caching ensures both share the exact same instance and promise.
let _highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null

export const highlighterPromise = createHighlighter({
  themes: [cssVariablesTheme],
  langs: ['jsx', 'js', 'ts', 'tsx', 'css', 'html', 'cpp', 'markdown', 'mdx', 'json', 'java', 'bash'],
}).then((h) => {
  _highlighter = h
  return h
})

export function getHighlighter() {
  return _highlighter
}
