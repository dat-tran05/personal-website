import type { MDXComponents } from 'mdx/types'
import { InlineLink } from '@/components/InlineLink/InlineLink'

const components: MDXComponents = {
  a: ({ href = '', children }) => <InlineLink href={href}>{children}</InlineLink>,
}

export function useMDXComponents(): MDXComponents {
  return components
}
