# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Dat Tran's four-page portfolio (about, experience, projects, blog + MDX posts) in Next.js 16 with high design fidelity and strong SEO/AEO.

**Architecture:** Statically generated App Router site. Content lives in typed files under `src/content`; pages are thin server components that render presentational components; the only client code is the theme toggle and the nav active-link helper. Tokens are CSS variables switched by `data-theme` on `<html>`.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, pnpm, `@next/mdx` + `gray-matter`, `next/font/google` (Karla), CSS Modules, ESLint (`eslint-config-next`), Prettier, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-05-portfolio-site-design.md`

## Global Constraints

- Next.js 16, React 19, TypeScript `strict: true`, pnpm.
- All copy lowercase as authored (no `text-transform`). Copy from spec is final.
- Tokens exactly: light bg `#faf6ef` fg `#1f1c19` mute `#7a736b` line `#e6dfd3` acc `#b4482b` accLine `#e5b9ab` accHover `#8e3620`; dark bg `#181614` fg `#e9e4dc` mute `#9a9289` line `#332e29` acc `#e08a6a` accLine `#7a4a38` accHover `#eaa285`.
- Karla 400/600 + italic 400; body 16px/1.75; small 14px. No radius (except timeline dot), shadows, cards, or animations beyond the .2s theme transition.
- Site URL `https://datct.com`. Email `datt@mit.edu`. GitHub `https://github.com/dat-tran05`, LinkedIn `https://www.linkedin.com/in/dat-tran05/`, X `https://x.com/datctran`.
- Every route static; `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test` must pass with no warnings.
- Commit after each task.

---

### Task 1: Scaffold, tooling, tokens, layout shell

**Files:**

- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc`, `vitest.config.ts`, `.gitignore`, `next-env.d.ts` (generated), `mdx-components.tsx`
- Create: `src/styles/tokens.css`, `src/styles/globals.css`
- Create: `src/content/site.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx` (temporary "hi")

**Interfaces:**

- Produces `site` from `src/content/site.ts`:
  ```ts
  export const site = {
    name: 'dat tran',
    legalName: 'Dat Tran',
    headline: 'CS Student at MIT',
    url: 'https://datct.com',
    description:
      'dat tran is a cs student at mit exploring ai safety and research. previously at netic, horus health, amplitude, and aws.',
    email: 'datt@mit.edu',
    social: {
      github: 'https://github.com/dat-tran05',
      linkedin: 'https://www.linkedin.com/in/dat-tran05/',
      x: 'https://x.com/datctran',
    },
  } as const
  ```
- Produces CSS variables `--bg --fg --mute --line --acc --acc-line --acc-hover` and class `.column` (560px column).

- [ ] Step 1: `pnpm create next-app@latest . --ts --app --src-dir --no-tailwind --eslint --import-alias "@/*" --use-pnpm --turbopack` (accept overwriting into the empty dir; keep docs/ and .git). Remove boilerplate CSS/page content.
- [ ] Step 2: Add deps: `pnpm add @next/mdx @mdx-js/loader @mdx-js/react gray-matter` and `pnpm add -D @types/mdx vitest prettier`.
- [ ] Step 3: Scripts in package.json: `dev`, `build`, `start`, `lint: eslint .`, `typecheck: tsc --noEmit`, `test: vitest run`, `format: prettier --write .`.
- [ ] Step 4: `next.config.ts` wraps with `createMDX({})` and sets `pageExtensions: ['ts','tsx','md','mdx']`.
- [ ] Step 5: Write `tokens.css` (`:root` light, `:root[data-theme="dark"]` dark, plus `color-scheme`), `globals.css` (reset, body bg/fg/font vars, `a` colors + hover, `.column`, `.visually-hidden`).
- [ ] Step 6: `layout.tsx`: Karla via `next/font/google` (`weight: ['400','600'], style: ['normal','italic']`), `<html lang="en" suppressHydrationWarning>`, body with `.column` wrapper and `<main>`. Temporary page prints "hi".
- [ ] Step 7: Run `pnpm build && pnpm lint && pnpm typecheck`. Expected: pass.
- [ ] Step 8: Commit `chore: scaffold next.js 16 app with tokens and layout shell`.

### Task 2: Theme (boot script + toggle)

**Files:**

- Create: `src/lib/theme.ts`, `src/lib/theme.test.ts`, `src/components/ThemeToggle/ThemeToggle.tsx`, `src/components/ThemeToggle/ThemeToggle.module.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**

- `src/lib/theme.ts`:
  ```ts
  export type Theme = 'light' | 'dark'
  export const THEME_STORAGE_KEY = 'dt-theme'
  export function resolveInitialTheme(stored: string | null, prefersDark: boolean): Theme
  export const themeBootScript: string // IIFE string that sets document.documentElement.dataset.theme
  ```
- `ThemeToggle` client component, no props; renders `<button aria-label="toggle theme">` showing `☀` when light and `☾` when dark; flips `data-theme` and writes localStorage.

- [ ] Step 1: Test `resolveInitialTheme`: `('dark', false) → 'dark'`, `('light', true) → 'light'`, `(null, true) → 'dark'`, `(null, false) → 'light'`, `('junk', true) → 'dark'`.
- [ ] Step 2: Run `pnpm test` — fails (module missing).
- [ ] Step 3: Implement `theme.ts`; `themeBootScript` inlines the same logic as a string (keep in sync by deriving both from one tiny function body where practical).
- [ ] Step 4: Tests pass.
- [ ] Step 5: Implement `ThemeToggle` (`'use client'`; `useState<Theme>` initialised in `useEffect` from `document.documentElement.dataset.theme`; renders nothing-different until mounted to avoid mismatch — render `☀` by default).
- [ ] Step 6: Inject `<script dangerouslySetInnerHTML={{ __html: themeBootScript }} />` in `<head>` of layout. Add `<meta name="color-scheme" content="light dark">`.
- [ ] Step 7: Build, lint, typecheck. Commit `feat: light/dark theme with no-flash boot script`.

### Task 3: Nav

**Files:**

- Create: `src/components/Nav/Nav.tsx`, `Nav.module.css`, `src/components/Nav/NavLink.tsx` (client, uses `usePathname`)
- Modify: `src/app/layout.tsx`

**Interfaces:**

- `Nav` server component renders brand + `NAV_ITEMS = [{href:'/',label:'about'},{href:'/experience',label:'experience'},{href:'/projects',label:'projects'},{href:'/blog',label:'blog'}]` + `ThemeToggle`.
- `NavLink({href,label})`: active when `pathname === href` or (`href !== '/'` and `pathname.startsWith(href + '/')`). Active class sets `color: var(--fg)`, otherwise `var(--mute)`.

- [ ] Step 1: Implement styles per spec (flex, space-between, wrap, gap 16, 14px; right group gap 18).
- [ ] Step 2: Mount `<Nav />` in layout above `<main>`; column is flex column gap 44.
- [ ] Step 3: Build/lint/typecheck. Commit `feat: site nav with active link and theme toggle`.

### Task 4: Shared presentational pieces

**Files:**

- Create: `src/components/VisuallyHidden/VisuallyHidden.tsx`, `src/components/InlineLink/InlineLink.tsx` + `.module.css`, `src/components/PageIntro/PageIntro.tsx` + `.module.css`, `src/components/JsonLd/JsonLd.tsx`

**Interfaces:**

- `VisuallyHidden({as?: 'h1'|'span', children})` → element with `.visually-hidden` class.
- `InlineLink({href, children, external?})` → `next/link` for internal, `<a target="_blank" rel="noopener noreferrer">` for external (auto-detected by `href.startsWith('http')`). Styles: `color: var(--acc); text-decoration-color: var(--acc-line)`; hover `var(--acc-hover)`.
- `PageIntro({title, children})` → hidden h1 + `<p class="intro">` (margin 0). Wrapper `<section>` with `gap: 36px` flex column for page content.
- `JsonLd({data: Record<string, unknown>})` → `<script type="application/ld+json">` with `JSON.stringify(data)`.

- [ ] Step 1: Implement each. Commit `feat: shared link, intro, hidden heading and json-ld components`.

### Task 5: About page

**Files:**

- Create: `src/components/SocialLinks/SocialLinks.tsx`, `SocialLinks.module.css`, `src/components/SocialLinks/icons.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**

- `icons.tsx` exports `EmailIcon, GitHubIcon, LinkedInIcon, XIcon` (20×20 SVGs copied from handoff, `aria-hidden`).
- `SocialLinks()` reads `site.email` and `site.social`; renders `<ul>` flex gap 18 of `<a title aria-label style="color: var(--acc); display:flex">`.

- [ ] Step 1: Page: `<section>` flex column gap 44 → text block (flex column gap 18, `p` margin 0) with exact copy and `InlineLink`s → `<SocialLinks />`. Hidden h1 "dat tran".
- [ ] Step 2: Build; commit `feat: about page`.

### Task 6: Experience page

**Files:**

- Create: `src/content/experience.ts`, `src/components/Timeline/Timeline.tsx`, `Timeline.module.css`, `src/app/experience/page.tsx`

**Interfaces:**

- `export type ExperienceEntry = { when: string; org: string; role: string; what: string; link?: { text: string; href: string } }`; `export const experience: ExperienceEntry[]` with the five entries from the spec. For amplitude/aws, `what` is the linked text and `link.text === what`? No: keep it simple — `what: 'agent analytics and infra', link: { href: '...' }`; when `link` is present, wrap the whole `what` in `InlineLink`. So `link?: { href: string }`.
- `Timeline({entries})` renders the grid per spec; last row line still fills to bottom of its content.

- [ ] Step 1: Implement; `PageIntro title="experience"` with "where i've worked and what i did there."
- [ ] Step 2: Build; commit `feat: experience page with timeline`.

### Task 7: Projects page

**Files:**

- Create: `src/content/projects.ts`, `src/components/ProjectList/ProjectList.tsx`, `.module.css`, `src/app/projects/page.tsx`

**Interfaces:**

- `export type Project = { name: string; year: string; url: string; what: string }`, three placeholders from handoff (url `'#'` renders as plain `<a href="#">` via InlineLink).
- `ProjectList({projects})`.

- [ ] Step 1: Implement; intro "things i've built and research i've worked on."
- [ ] Step 2: Build; commit `feat: projects page`.

### Task 8: Post loading library (TDD)

**Files:**

- Create: `src/lib/posts.ts`, `src/lib/posts.test.ts`, `src/content/posts/{notes-on-alignment-research,training-for-my-first-triathlon,what-i-learned-founding-horus-health,books-i-read-last-year}.mdx`

**Interfaces:**

```ts
export type PostMeta = { slug: string; title: string; date: string; description: string }
export function getAllPosts(dir?: string): PostMeta[] // newest first, validated frontmatter
export function getPostBySlug(slug: string, dir?: string): PostMeta | undefined
export function formatPostDate(iso: string): string // '2026-08-14' → 'aug 2026'
export const POSTS_DIR: string // path.join(process.cwd(), 'src/content/posts')
```

Frontmatter: `title`, `date` (YYYY-MM-DD), `description`. Dates: aug 2026, jun 2026, mar 2026, jan 2026 (use the 1st... use 2026-08-14, 2026-06-02, 2026-03-20, 2026-01-08).

- [ ] Step 1: Tests using a fixture dir under `src/lib/__fixtures__/posts` with two mdx files (and one invalid missing title): `getAllPosts` sorts desc and throws a descriptive error on invalid frontmatter; `getPostBySlug` returns undefined for unknown; `formatPostDate('2026-08-14') === 'aug 2026'`; slug is filename without `.mdx`.
- [ ] Step 2: Run, fail. Step 3: implement with `fs.readdirSync` + `gray-matter`, manual validation (no zod). Step 4: pass.
- [ ] Step 5: Write the four placeholder MDX posts (frontmatter + 2–3 short paragraphs, one h2, marked placeholder in body).
- [ ] Step 6: Commit `feat: mdx post loader with tests and placeholder posts`.

### Task 9: Blog index and post pages

**Files:**

- Create: `src/components/PostList/PostList.tsx`, `.module.css`, `src/components/Prose/Prose.tsx`, `Prose.module.css`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/not-found.tsx`
- Modify: `mdx-components.tsx` (map `a` → `InlineLink`)

**Interfaces:**

- `PostList({posts: PostMeta[]})` rows per spec; title link `color: var(--fg); text-decoration-color: var(--line)`; `<time dateTime={date}>` shows `formatPostDate`.
- `[slug]/page.tsx`: `generateStaticParams` from `getAllPosts()`, `dynamicParams = false`, `await params`, `notFound()` if unknown, dynamic `import(`@/content/posts/${slug}.mdx`)`, renders `<article>` h1 + time + `<Prose><Post/></Prose>`.
- `Prose` wraps children in a div with descendant styles (p gap 18 via margin, h2/h3 600, code/pre, blockquote, ul/ol).

- [ ] Step 1: Implement; not-found page: intro "nothing here." with link home.
- [ ] Step 2: Build (verify 4 static post routes in output); commit `feat: blog index and mdx post pages`.

### Task 10: Metadata + JSON-LD (TDD)

**Files:**

- Create: `src/lib/metadata.ts`, `src/lib/metadata.test.ts`, `src/lib/jsonld.ts`, `src/lib/jsonld.test.ts`
- Modify: `src/app/layout.tsx` (root metadata + Person/WebSite JsonLd), each page (`export const metadata = pageMetadata({...})`), `[slug]/page.tsx` (`generateMetadata` + BlogPosting JsonLd)

**Interfaces:**

```ts
// metadata.ts
export function pageMetadata(o: {
  title?: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
}): Metadata
// root metadata (exported const rootMetadata: Metadata) sets metadataBase, title template `%s · dat tran` / default 'dat tran', description, openGraph siteName, twitter card, alternates.types rss
// jsonld.ts
export const PERSON_ID = `${site.url}/#person`
export function personJsonLd(): object
export function websiteJsonLd(): object
export function blogPostingJsonLd(p: PostMeta): object
```

- [ ] Step 1: Tests: `pageMetadata({description:'x', path:'/blog'})` has `alternates.canonical === '/blog'`, `openGraph.url === '/blog'`, `openGraph.type === 'website'`; article variant carries `publishedTime`. `personJsonLd()` has `@type 'Person'`, `sameAs` with the three social URLs, `jobTitle 'CS Student at MIT'`; `blogPostingJsonLd` `author['@id'] === PERSON_ID` and `url === site.url + '/blog/' + slug`.
- [ ] Step 2: fail → implement → pass.
- [ ] Step 3: Wire into layout and pages. Page descriptions: experience "where dat tran has worked: mit, netic, horus health, amplitude, and aws."; projects "things dat tran has built and research he's worked on."; blog "occasional writing by dat tran."
- [ ] Step 4: Build; view-source check for ld+json. Commit `feat: page metadata and json-ld structured data`.

### Task 11: Sitemap, robots, RSS, OG image, icons

**Files:**

- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/feed.xml/route.ts`, `src/app/opengraph-image.tsx`, `src/app/icon.svg`, `assets/InstrumentSerif-Italic.ttf`, `src/lib/rss.ts`, `src/lib/rss.test.ts`

**Interfaces:**

- `buildRssXml(posts: PostMeta[]): string` (RSS 2.0, escapes `&<>`), tested for channel title/link and one `<item>` per post with `pubDate` in RFC 822.
- `feed.xml/route.ts`: `export const dynamic = 'force-static'`, returns xml with `Content-Type: application/rss+xml`.
- `sitemap.ts`: pages + posts (`lastModified: post.date`). `robots.ts`: allow `/`, sitemap `${site.url}/sitemap.xml`.
- `opengraph-image.tsx`: `size 1200×630`, `contentType 'image/png'`, `alt 'dat tran'`; reads TTF via `readFile(join(process.cwd(),'assets/InstrumentSerif-Italic.ttf'))`; bg `#faf6ef`, "DT" 360px `#b4482b`, footer "datct.com" `#7a736b` 32px.
- `icon.svg`: 64×64, paper background, terracotta lowercase "d" (or a 6px-dot motif); simple.
- Download font: `curl -L "https://github.com/google/fonts/raw/main/ofl/instrumentserif/InstrumentSerif-Italic.ttf"`; also copy OFL.txt to `assets/`.

- [ ] Step 1: RSS test → fail → implement → pass.
- [ ] Step 2: Implement remaining files. Set `openGraph.images` handled automatically by file convention (no manual entry needed).
- [ ] Step 3: Build; `curl` `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/opengraph-image` on `pnpm start`. Commit `feat: sitemap, robots, rss feed, og image and favicon`.

### Task 12: Verification and polish

- [ ] Step 1: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all clean.
- [ ] Step 2: Browser pass on all routes, both themes, reload for flash, 375px width, post page, 404.
- [ ] Step 3: Write `README.md` (how to run, how to add a post/project/experience, where tokens live, deploy on Vercel).
- [ ] Step 4: Commit `docs: readme`.

## Self-review

- Spec coverage: layout/tokens (T1), theme (T2), nav (T3), about (T5), experience (T6), projects (T7), blog + posts (T8–9), metadata/JSON-LD (T10), sitemap/robots/RSS/OG/icons (T11), testing/verification (T12). Prose styles (T9). 404 (T9).
- Types consistent: `PostMeta`, `ExperienceEntry.link?: { href }`, `Project`, `pageMetadata`, `PERSON_ID`.
