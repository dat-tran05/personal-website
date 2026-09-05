import { site } from '@/content/site'
import type { PostMeta } from '@/lib/posts'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** "2026-08-14" → "Fri, 14 Aug 2026 00:00:00 GMT" (RFC 822, as RSS requires). */
function toRfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString()
}

function itemXml(post: PostMeta): string {
  const url = `${site.url}/blog/${post.slug}`
  return [
    '    <item>',
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${toRfc822(post.date)}</pubDate>`,
    `      <description>${escapeXml(post.description)}</description>`,
    '    </item>',
  ].join('\n')
}

/** RSS 2.0 feed for the blog. `posts` should already be sorted newest first. */
export function buildRssXml(posts: readonly PostMeta[]): string {
  const lastBuild = posts[0] ? toRfc822(posts[0].date) : new Date(0).toUTCString()
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(site.name)}</title>`,
    `    <link>${site.url}</link>`,
    `    <description>${escapeXml(site.description)}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...posts.map(itemXml),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
