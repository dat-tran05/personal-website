import Link from 'next/link'
import { site } from '@/content/site'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { NAV_ITEMS } from './nav-items'
import { NavLink } from './NavLink'
import styles from './Nav.module.css'

export function Nav() {
  return (
    <nav className={styles.nav} aria-label="primary">
      <Link href="/" className={styles.brand}>
        {site.name}
      </Link>
      <div className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
        <ThemeToggle />
      </div>
    </nav>
  )
}
