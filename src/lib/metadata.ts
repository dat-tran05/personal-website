import type { Metadata } from 'next'
import { site } from '@/content/site'

/** Metadata applied at the root layout; pages override title/description/canonical. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: '/',
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

type PageMetadataInput = {
  /** Omit on the home page so the root default title applies. */
  title?: string
  description: string
  /** Route path starting with "/", used for canonical and Open Graph URLs. */
  path: string
  type?: 'website' | 'article'
  /** ISO date for articles. */
  publishedTime?: string
}

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
}: PageMetadataInput): Metadata {
  const displayTitle = title ?? site.name
  return {
    ...(title !== undefined && { title }),
    description,
    alternates: { canonical: path },
    openGraph:
      type === 'article'
        ? {
            type: 'article',
            url: path,
            title: displayTitle,
            description,
            publishedTime,
            authors: [site.legalName],
          }
        : { type: 'website', url: path, title: displayTitle, description },
    twitter: { card: 'summary_large_image', title: displayTitle, description },
  }
}
