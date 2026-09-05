import type { ReactNode } from 'react'
import styles from './Prose.module.css'

/** Typographic styles for long-form MDX content. */
export function Prose({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>
}
