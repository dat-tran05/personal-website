export type NavItem = { href: string; label: string }

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', label: 'about' },
  { href: '/experience', label: 'experience' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
]

/** Exact match for the home route; section match (including children) for everything else. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
