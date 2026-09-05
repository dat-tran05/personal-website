import Link from 'next/link'
import { formatPostDate, type PostMeta } from '@/lib/posts'
import styles from './PostList.module.css'

type Props = { posts: readonly PostMeta[] }

export function PostList({ posts }: Props) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug} className={styles.row}>
          <Link href={`/blog/${post.slug}`} className={styles.title}>
            {post.title}
          </Link>
          <time dateTime={post.date} className={styles.date}>
            {formatPostDate(post.date)}
          </time>
        </li>
      ))}
    </ul>
  )
}
