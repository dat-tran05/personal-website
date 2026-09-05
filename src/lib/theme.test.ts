import { describe, expect, it } from 'vitest'
import { resolveInitialTheme, themeBootScript, THEME_STORAGE_KEY } from './theme'

describe('resolveInitialTheme', () => {
  it('uses a stored dark preference over the system setting', () => {
    expect(resolveInitialTheme('dark', false)).toBe('dark')
  })
  it('uses a stored light preference over the system setting', () => {
    expect(resolveInitialTheme('light', true)).toBe('light')
  })
  it('falls back to the system setting when nothing is stored', () => {
    expect(resolveInitialTheme(null, true)).toBe('dark')
    expect(resolveInitialTheme(null, false)).toBe('light')
  })
  it('ignores unknown stored values', () => {
    expect(resolveInitialTheme('junk', true)).toBe('dark')
  })
})

describe('themeBootScript', () => {
  it('references the storage key and sets data-theme', () => {
    expect(themeBootScript).toContain(THEME_STORAGE_KEY)
    expect(themeBootScript).toContain('data-theme')
  })
})
