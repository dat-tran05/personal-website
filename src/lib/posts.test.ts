import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { formatPostDate, getAllPosts, getPostBySlug } from './posts'

const FIXTURES = path.join(__dirname, '__fixtures__', 'posts')
const BAD_FIXTURES = path.join(__dirname, '__fixtures__', 'bad-posts')

describe('getAllPosts', () => {
  it('returns posts newest first with slugs from filenames', () => {
    const posts = getAllPosts(FIXTURES)
    expect(posts.map((p) => p.slug)).toEqual(['newer', 'older'])
    expect(posts[0]).toEqual({
      slug: 'newer',
      title: 'newer post',
      date: '2026-03-20',
      description: 'the newer one.',
    })
  })

  it('throws a descriptive error when frontmatter is incomplete', () => {
    expect(() => getAllPosts(BAD_FIXTURES)).toThrow(/missing-title\.mdx.*title/)
  })
})

describe('getPostBySlug', () => {
  it('finds a post by slug', () => {
    expect(getPostBySlug('older', FIXTURES)?.title).toBe('older post')
  })
  it('returns undefined for unknown slugs', () => {
    expect(getPostBySlug('nope', FIXTURES)).toBeUndefined()
  })
})

describe('formatPostDate', () => {
  it('formats as lowercase "mon yyyy"', () => {
    expect(formatPostDate('2026-08-14')).toBe('aug 2026')
    expect(formatPostDate('2026-01-08')).toBe('jan 2026')
  })
})
