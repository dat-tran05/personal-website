import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  options: {
    // Plugin names as strings so the config stays serializable for Turbopack.
    remarkPlugins: ['remark-frontmatter'],
  },
})

export default withMDX(nextConfig)
