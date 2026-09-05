import { describe, expect, it } from 'vitest'
import { buildRssXml } from './rss'
import { site } from '@/content/site'

const posts = [
  { slug: 'a', title: 'first & foremost', date: '2026-08-14', description: 'one <two>' },
  { slug: 'b', title: 'second', date: '2026-01-08', description: 'two' },
]

describe('buildRssXml', () => {
  const xml = buildRssXml(posts)

  it('declares an rss 2.0 channel for the site', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain(`<title>${site.name}</title>`)
    expect(xml).toContain(`<link>${site.url}</link>`)
  })

  it('emits one item per post with an absolute link and rfc 822 date', () => {
    expect(xml.match(/<item>/g)).toHaveLength(2)
    expect(xml).toContain(`<link>${site.url}/blog/a</link>`)
    expect(xml).toContain(`<guid isPermaLink="true">${site.url}/blog/a</guid>`)
    expect(xml).toContain('<pubDate>Fri, 14 Aug 2026 00:00:00 GMT</pubDate>')
  })

  it('escapes xml special characters', () => {
    expect(xml).toContain('<title>first &amp; foremost</title>')
    expect(xml).toContain('<description>one &lt;two&gt;</description>')
  })
})
