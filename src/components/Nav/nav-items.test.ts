import { describe, expect, it } from 'vitest'
import { isActivePath } from './nav-items'

describe('isActivePath', () => {
  it('matches home only exactly', () => {
    expect(isActivePath('/', '/')).toBe(true)
    expect(isActivePath('/blog', '/')).toBe(false)
  })
  it('matches a section and its children', () => {
    expect(isActivePath('/blog', '/blog')).toBe(true)
    expect(isActivePath('/blog/some-post', '/blog')).toBe(true)
    expect(isActivePath('/blogger', '/blog')).toBe(false)
  })
})
