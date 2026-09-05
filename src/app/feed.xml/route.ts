import { getAllPosts } from '@/lib/posts'
import { buildRssXml } from '@/lib/rss'

export const dynamic = 'force-static'

export function GET() {
  return new Response(buildRssXml(getAllPosts()), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
