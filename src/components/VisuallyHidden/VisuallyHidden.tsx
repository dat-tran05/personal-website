import type { ReactNode } from 'react'

type Props = { as?: 'h1' | 'h2' | 'span'; children: ReactNode }

/** Renders content for screen readers and search engines without showing it. */
export function VisuallyHidden({ as: Tag = 'span', children }: Props) {
  return <Tag className="visually-hidden">{children}</Tag>
}
