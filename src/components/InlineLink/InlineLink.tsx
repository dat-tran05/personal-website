import type { ReactNode } from 'react'
import Link from 'next/link'
import styles from './InlineLink.module.css'

type Props = { href: string; children: ReactNode; className?: string }

function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:')
}

/** Accent-colored inline link. External hrefs open in a new tab. */
export function InlineLink({ href, children, className }: Props) {
  const classes = className ? `${styles.link} ${className}` : styles.link
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
