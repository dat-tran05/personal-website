'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isActivePath, type NavItem } from './nav-items'
import styles from './Nav.module.css'

export function NavLink({ href, label }: NavItem) {
  const pathname = usePathname()
  const active = isActivePath(pathname, href)
  return (
    <Link
      href={href}
      className={active ? styles.linkActive : styles.link}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </Link>
  )
}
