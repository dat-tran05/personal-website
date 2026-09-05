# datctran.com

personal portfolio for dat tran. four pages (about, experience, projects, blog) built with next.js 16, statically generated, with light/dark themes and full seo/aeo metadata.

## develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (all routes prerendered)
pnpm start      # serve the production build
pnpm lint
pnpm typecheck
pnpm test       # vitest
pnpm format
```

## editing content

everything editable lives in `src/content`:

| what                                                          | where                          |
| ------------------------------------------------------------- | ------------------------------ |
| name, headline, domain, email, social links, meta description | `src/content/site.ts`          |
| experience timeline                                           | `src/content/experience.ts`    |
| projects list                                                 | `src/content/projects.ts`      |
| blog posts                                                    | `src/content/posts/<slug>.mdx` |
| about page copy                                               | `src/app/page.tsx`             |

### adding a blog post

create `src/content/posts/my-post.mdx`:

```mdx
---
title: my post
date: 2026-09-05
description: one sentence used for meta tags, rss, and structured data.
---

body in markdown. headings start at `##`.
```

the slug is the filename. posts are sorted newest first and appear in the index, sitemap, rss feed, and get `BlogPosting` structured data automatically. all copy is lowercase by convention.

## design tokens

colors and spacing are css variables in `src/styles/tokens.css`, switched by `data-theme` on `<html>`. the theme boot script in `src/lib/theme.ts` runs before first paint so there is no flash. the toggle persists to `localStorage` under `dt-theme`; first visit follows `prefers-color-scheme`.

## seo / aeo

- per-page titles, descriptions, canonicals, open graph and twitter cards via `src/lib/metadata.ts`
- json-ld `Person` + `WebSite` on every page, `BlogPosting` on posts, via `src/lib/jsonld.ts`
- `/sitemap.xml`, `/robots.txt`, `/feed.xml`
- `/opengraph-image` is generated at build from `src/app/opengraph-image.tsx` using instrument serif (ofl, in `assets/`)
- one visually hidden `h1` per page keeps the design heading-free while staying crawlable

## deploy

push to a git remote and import into vercel; no configuration needed. the canonical url is set in `src/content/site.ts`.

## layout

```
src/app          routes, metadata files, layout
src/components   presentational components (css modules alongside)
src/content      editable data and mdx posts
src/lib          pure helpers with tests (posts, metadata, json-ld, rss, theme)
src/styles       tokens and global css
docs/superpowers design spec and implementation plan
```
