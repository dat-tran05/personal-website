import { describe, expect, it } from 'vitest'
import { blogPostingJsonLd, PERSON_ID, personJsonLd, websiteJsonLd } from './jsonld'
import { site } from '@/content/site'

describe('personJsonLd', () => {
  it('describes dat with job title, profiles and affiliation', () => {
    const person = personJsonLd()
    expect(person).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': PERSON_ID,
      name: site.legalName,
      jobTitle: site.headline,
      url: site.url,
      email: `mailto:${site.email}`,
    })
    expect(person.sameAs).toEqual([
      site.social.github,
      site.social.linkedin,
      site.social.x,
    ])
    expect(person.affiliation).toMatchObject({ '@type': 'CollegeOrUniversity' })
  })
})

describe('websiteJsonLd', () => {
  it('links the site to its author', () => {
    expect(websiteJsonLd()).toMatchObject({
      '@type': 'WebSite',
      url: site.url,
      name: site.name,
      author: { '@id': PERSON_ID },
    })
  })
})

describe('blogPostingJsonLd', () => {
  it('builds a posting with absolute url and author reference', () => {
    const posting = blogPostingJsonLd({
      slug: 'hello',
      title: 'hello',
      date: '2026-08-14',
      description: 'd',
    })
    expect(posting).toMatchObject({
      '@type': 'BlogPosting',
      headline: 'hello',
      datePublished: '2026-08-14',
      description: 'd',
      url: `${site.url}/blog/hello`,
      author: { '@id': PERSON_ID },
    })
    expect(posting.mainEntityOfPage).toBe(`${site.url}/blog/hello`)
  })
})
