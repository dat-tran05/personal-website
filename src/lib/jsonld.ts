import { site } from '@/content/site'
import type { PostMeta } from '@/lib/posts'

export type JsonLdObject = Record<string, unknown>

export const PERSON_ID = `${site.url}/#person`
export const WEBSITE_ID = `${site.url}/#website`

export function personJsonLd(): JsonLdObject & {
  sameAs: string[]
  affiliation: JsonLdObject
} {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.legalName,
    alternateName: site.name,
    jobTitle: site.headline,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    image: `${site.url}/opengraph-image`,
    sameAs: [site.social.github, site.social.linkedin, site.social.x],
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Massachusetts Institute of Technology',
      url: 'https://www.mit.edu',
    },
    knowsAbout: ['ai safety', 'alignment research', 'software engineering'],
  }
}

export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
  }
}

export function blogPostingJsonLd(
  post: PostMeta,
): JsonLdObject & { mainEntityOfPage: string } {
  const url = `${site.url}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  }
}
