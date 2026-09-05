import type { ReactNode } from 'react'
import { VisuallyHidden } from '@/components/VisuallyHidden/VisuallyHidden'
import styles from './PageIntro.module.css'

type Props = { title: string; intro: string; children: ReactNode }

/** Standard page shell: hidden h1, one-line intro, then the page body 36px below. */
export function PageIntro({ title, intro, children }: Props) {
  return (
    <section className={styles.page}>
      <VisuallyHidden as="h1">{title}</VisuallyHidden>
      <p>{intro}</p>
      {children}
    </section>
  )
}
