import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
}

export const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts')

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

/** "2026-08-14" → "aug 2026". Parses the string directly to avoid timezone drift. */
export function formatPostDate(isoDate: string): string {
  const [year, month] = isoDate.split('-')
  const index = Number(month) - 1
  const name = MONTHS[index]
  if (!name || !year) throw new Error(`invalid post date: ${isoDate}`)
  return `${name} ${year}`
}

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`post ${file} is missing required frontmatter field "${field}"`)
  }
  return value
}

/** gray-matter parses unquoted YAML dates into Date objects; normalize to YYYY-MM-DD. */
function normalizeDate(value: unknown, file: string): string {
  const raw = value instanceof Date ? value.toISOString().slice(0, 10) : value
  const date = requireString(raw, 'date', file)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`post ${file} has an invalid date "${date}" (expected YYYY-MM-DD)`)
  }
  return date
}

function readPost(dir: string, file: string): PostMeta {
  const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: requireString(data.title, 'title', file),
    date: normalizeDate(data.date, file),
    description: requireString(data.description, 'description', file),
  }
}

/** All posts, newest first. */
export function getAllPosts(dir: string = POSTS_DIR): PostMeta[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => readPost(dir, file))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(
  slug: string,
  dir: string = POSTS_DIR,
): PostMeta | undefined {
  return getAllPosts(dir).find((post) => post.slug === slug)
}
