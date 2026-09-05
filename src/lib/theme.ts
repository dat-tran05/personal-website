export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'dt-theme'

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

/** Stored preference wins; otherwise follow the system; otherwise light. */
export function resolveInitialTheme(stored: string | null, prefersDark: boolean): Theme {
  if (isTheme(stored)) return stored
  return prefersDark ? 'dark' : 'light'
}

/**
 * Inline script run before first paint so the page never flashes the wrong theme.
 * Mirrors `resolveInitialTheme`; keep the two in sync.
 */
export const themeBootScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='light'||s==='dark')?s:(d?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

export function readDocumentTheme(): Theme {
  const current = document.documentElement.getAttribute('data-theme')
  return isTheme(current) ? current : 'light'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage may be unavailable (private mode); the theme still applies for this page.
  }
}

/** Subscribe to `data-theme` changes on <html>; used with useSyncExternalStore. */
export function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
