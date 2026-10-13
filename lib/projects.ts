export const PROJECTS = [
  ['1chooo.com', 'https://1chooo.com', 'A personal site built with Next.js and Tailwind CSS.'],
  ['JustHold', 'https://justhold.1chooo.com', 'Independent market research for long-term thinkers.'],
  ['Tawny', 'https://tawny.1chooo.com', 'A collection of handcrafted web designs and reusable UI components.'],
  ['PowLaw', 'https://github.com/powlaw', 'A project about the power law of self-growth.'],
  ['VCard', 'https://github.com/1chooo/portfolio', 'An open-source portfolio template.'],
] as const

export function projectsMarkdown(): string {
  const lines = ['# Projects', '']
  for (const [name, href, description] of PROJECTS) {
    lines.push(`## [${name}](${href})`, '', description, '')
  }
  return lines.join('\n').trimEnd()
}
