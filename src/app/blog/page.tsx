import { PageIntro } from '@/components/PageIntro/PageIntro'
import { PostList } from '@/components/PostList/PostList'
import { getAllPosts } from '@/lib/posts'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'blog',
  description: 'occasional writing by dat tran.',
  path: '/blog',
})

export default function BlogPage() {
  return (
    <PageIntro title="blog" intro="occasional writing.">
      <PostList posts={getAllPosts()} />
    </PageIntro>
  )
}
