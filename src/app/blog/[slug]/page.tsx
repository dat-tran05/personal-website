import { notFound } from 'next/navigation'
import { Prose } from '@/components/Prose/Prose'
import { formatPostDate, getAllPosts, getPostBySlug } from '@/lib/posts'
import styles from './page.module.css'

type Params = Promise<{ slug: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { default: Body } = await import(`@/content/posts/${slug}.mdx`)

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <time dateTime={post.date} className={styles.date}>
          {formatPostDate(post.date)}
        </time>
      </header>
      <Prose>
        <Body />
      </Prose>
    </article>
  )
}
