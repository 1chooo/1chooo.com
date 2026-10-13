import { serializeJsonLd } from '@/lib/seo'
import type { JsonLdGraph } from '@/types/seo'

export function JsonLd({ data }: { data: JsonLdGraph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
