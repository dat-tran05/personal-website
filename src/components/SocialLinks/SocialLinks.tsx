import type { ComponentType } from 'react'
import { site } from '@/content/site'
import { EmailIcon, GitHubIcon, LinkedInIcon, XIcon } from './icons'
import styles from './SocialLinks.module.css'

type SocialLink = { label: string; href: string; Icon: ComponentType; external: boolean }

const LINKS: readonly SocialLink[] = [
  { label: 'email', href: `mailto:${site.email}`, Icon: EmailIcon, external: false },
  { label: 'github', href: site.social.github, Icon: GitHubIcon, external: true },
  { label: 'linkedin', href: site.social.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'x', href: site.social.x, Icon: XIcon, external: true },
]

export function SocialLinks() {
  return (
    <ul className={styles.list} aria-label="contact">
      {LINKS.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            className={styles.link}
            title={label}
            aria-label={label}
            {...(external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}
