export type JsonLdGraph = {
  '@context': 'https://schema.org'
  '@graph': Record<string, unknown>[]
}

export type PublicContentSection = 'thoughts' | 'notes' | 'episodes'
