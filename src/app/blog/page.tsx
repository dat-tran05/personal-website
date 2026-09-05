import { PageIntro } from '@/components/PageIntro/PageIntro'
import { PostList } from '@/components/PostList/PostList'
import { getAllPosts } from '@/lib/posts'

export default function BlogPage() {
  return (
    <PageIntro title="blog" intro="occasional writing.">
      <PostList posts={getAllPosts()} />
    </PageIntro>
  )
}
