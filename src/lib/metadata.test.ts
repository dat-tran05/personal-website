import { describe, expect, it } from 'vitest'
import { pageMetadata, rootMetadata } from './metadata'
import { site } from '@/content/site'

describe('rootMetadata', () => {
  it('sets metadataBase, title template and default description', () => {
    expect(String(rootMetadata.metadataBase)).toBe(`${site.url}/`)
    expect(rootMetadata.title).toEqual({
      default: site.name,
      template: `%s · ${site.name}`,
    })
    expect(rootMetadata.description).toBe(site.description)
  })
  it('advertises the rss feed', () => {
    expect(rootMetadata.alternates?.types?.['application/rss+xml']).toBe('/feed.xml')
  })
})

describe('pageMetadata', () => {
  it('builds canonical and open graph for a website page', () => {
    const meta = pageMetadata({ title: 'blog', description: 'x', path: '/blog' })
    expect(meta.title).toBe('blog')
    expect(meta.description).toBe('x')
    expect(meta.alternates?.canonical).toBe('/blog')
    expect(meta.openGraph).toMatchObject({ type: 'website', url: '/blog', title: 'blog' })
    expect(meta.openGraph).toMatchObject({ images: [{ url: '/opengraph-image' }] })
    expect(meta.twitter).toMatchObject({ images: ['/opengraph-image'] })
  })
  it('builds article metadata with a published time', () => {
    const meta = pageMetadata({
      title: 'post',
      description: 'y',
      path: '/blog/post',
      type: 'article',
      publishedTime: '2026-08-14',
    })
    expect(meta.openGraph).toMatchObject({ type: 'article', publishedTime: '2026-08-14' })
  })
  it('omits title for the home page so the default applies', () => {
    const meta = pageMetadata({ description: 'z', path: '/' })
    expect(meta.title).toBeUndefined()
    expect(meta.alternates?.canonical).toBe('/')
  })
})
