'use client'

import { useSyncExternalStore } from 'react'
import { applyTheme, readDocumentTheme, subscribeToTheme, type Theme } from '@/lib/theme'
import styles from './ThemeToggle.module.css'

const ICONS: Record<Theme, string> = { light: '☀', dark: '☾' }

function getServerTheme(): Theme {
  return 'light'
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, readDocumentTheme, getServerTheme)

  function toggle() {
    applyTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-label="toggle theme"
      title="toggle theme"
    >
      {ICONS[theme]}
    </button>
  )
}
