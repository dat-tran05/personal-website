import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getAllPosts } from '@/lib/posts'

const STATIC_PATHS = ['/', '/experience', '/projects', '/blog'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const newestPost = posts[0]?.date

  const pages: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    ...(path === '/blog' && newestPost && { lastModified: new Date(newestPost) }),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...pages, ...postEntries]
}
