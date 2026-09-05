import { InlineLink } from '@/components/InlineLink/InlineLink'
import type { Project } from '@/content/projects'
import styles from './ProjectList.module.css'

type Props = { projects: readonly Project[] }

export function ProjectList({ projects }: Props) {
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.name} className={styles.item}>
          <div className={styles.header}>
            <InlineLink href={project.url} className={styles.name}>
              {project.name}
            </InlineLink>
            <span className={styles.year}>{project.year}</span>
          </div>
          <div>{project.what}</div>
        </li>
      ))}
    </ul>
  )
}
