/**
 * https://json-ld.org/
 * https://www.npmjs.com/package/jsonld
 */

export interface CollegeOrUniversity {
  "@type": "CollegeOrUniversity"
  name: string
  sameAs: string
}

export interface Person {
  "@context": "http://schema.org"
  "@type": "Person"
  "@id": string
  givenName: string
  familyName: string
  additionalName: string
  gender: string
  birthPlace: string
  nationality: string
  alumniOf: CollegeOrUniversity[]
  jobTitle: string
  skills: string
  image: string
  url: string
  sameAs: string[]
}

export interface JsonLdHtml {
  __html: string
}
