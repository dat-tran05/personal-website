import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd/JsonLd'
import { Prose } from '@/components/Prose/Prose'
import { blogPostingJsonLd } from '@/lib/jsonld'
import { pageMetadata } from '@/lib/metadata'
import { formatPostDate, getAllPosts, getPostBySlug } from '@/lib/posts'
import styles from './page.module.css'

type Params = Promise<{ slug: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
  })
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { default: Body } = await import(`@/content/posts/${slug}.mdx`)

  return (
    <article className={styles.article}>
      <JsonLd data={blogPostingJsonLd(post)} />
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
