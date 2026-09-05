import { InlineLink } from '@/components/InlineLink/InlineLink'
import type { ExperienceEntry } from '@/content/experience'
import styles from './Timeline.module.css'

type Props = { entries: readonly ExperienceEntry[] }

export function Timeline({ entries }: Props) {
  return (
    <ol className={styles.list}>
      {entries.map((entry) => (
        <li key={`${entry.org}-${entry.when}`} className={styles.row}>
          <span className={styles.when}>{entry.when}</span>
          <span className={styles.rail} aria-hidden>
            <span className={styles.dot} />
            <span className={styles.line} />
          </span>
          <div className={styles.body}>
            <div className={styles.org}>{entry.org}</div>
            <div className={styles.role}>{entry.role}</div>
            <div>
              {entry.link ? (
                <InlineLink href={entry.link.href}>{entry.what}</InlineLink>
              ) : (
                entry.what
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
