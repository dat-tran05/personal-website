# Portfolio site design

Date: 2026-09-05
Source: `~/Downloads/design_handoff_portfolio_site` (README + `Portfolio Site.dc.html`), plus owner answers.

## Goal

A four-page personal portfolio for Dat Tran (about, experience, projects, blog) that reproduces the handoff design at high fidelity, is easy to extend through content files, and is strong on SEO and answer-engine optimization (AEO).

## Stack

- Next.js 16 (App Router), React 19, TypeScript strict, pnpm.
- All routes statically generated. Deployed to Vercel. No server runtime.
- Styling: CSS variables for tokens (`styles/tokens.css`), global styles (`styles/globals.css`), CSS Modules per component. No Tailwind, no UI library.
- Font: Karla 400/600 and italic 400 via `next/font/google` (self-hosted by Next).
- Blog: MDX via `@next/mdx`, one file per post under `src/content/posts/`, frontmatter parsed with `gray-matter`.
- Tooling: ESLint (`eslint-config-next`), Prettier, Vitest.

## Directory layout

```
src/
  app/
    layout.tsx              html shell, font, theme boot script, Nav, Person + WebSite JSON-LD
    page.tsx                about  (/)
    experience/page.tsx
    projects/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx    post pages; generateStaticParams; dynamicParams=false
    opengraph-image.tsx     generated OG image
    sitemap.ts
    robots.ts
    feed.xml/route.ts       RSS 2.0
    not-found.tsx
  components/
    Nav/  ThemeToggle/  SocialLinks/  Timeline/  ProjectList/  PostList/
    Prose/  JsonLd/  VisuallyHidden/  InlineLink/
  content/
    site.ts                 name, domain, headline, description, social URLs, email
    experience.ts           timeline entries
    projects.ts             project entries
    posts/*.mdx
  lib/
    posts.ts                list posts (sorted desc by date), get post by slug, format date
    theme.ts                storage key, theme names, boot script string
    metadata.ts             helper to build per-page Metadata (title, description, canonical, OG)
    jsonld.ts               builders for Person, WebSite, BlogPosting
  styles/
    tokens.css
    globals.css
mdx-components.tsx
assets/InstrumentSerif-Italic.ttf   (OFL) used only by opengraph-image
docs/superpowers/specs/
```

## Design tokens

Light: bg `#faf6ef`, fg `#1f1c19`, mute `#7a736b`, line `#e6dfd3`, acc `#b4482b`, accLine `#e5b9ab`, accHover `#8e3620`.
Dark: bg `#181614`, fg `#e9e4dc`, mute `#9a9289`, line `#332e29`, acc `#e08a6a`, accLine `#7a4a38`, accHover: lighten acc slightly (`#eaa285`).
Type: body 16px/1.75, small 14px, weight 600 for names/org/brand. Everything lowercase (authored lowercase, not CSS-transformed, so metadata and copy stay consistent).
Spacing: 44 section gap, 36 intro to list, 26/22/18/14 list gaps, 16/12 column gaps.
No border radius (except the 6px timeline dot), no shadows, no cards. Transition `background .2s, color .2s` on theme switch. Link hover uses accHover.

## Global layout

- `body` fills viewport, tokens applied via `[data-theme]` on `<html>`.
- Content column: `max-width 560px; margin 0 auto; padding 44px 24px 80px; display flex; column; gap 44px`.
- Nav: flex row, space-between, wrap, 14px. Left brand "dat tran" (600, fg) links to `/`. Right: links about · experience · projects · blog (gap 18px), active = fg, others = mute, computed from `usePathname` in a small client component (or passed from server via a segment hook). Then ThemeToggle: unstyled button, mute, `☀` in light and `☾` in dark, `aria-label="toggle theme"`.

## Pages

### about `/`
Three paragraphs, exact copy from handoff. Inline links: netic and horus health → `/experience`; amplitude → https://amplitude.com; aws → https://aws.amazon.com. Book title in `<em>`. Then icon row: email `mailto:datt@mit.edu`, GitHub https://github.com/dat-tran05, LinkedIn https://www.linkedin.com/in/dat-tran05/, X https://x.com/datctran. 20×20 inline SVGs, color acc, each with `title` and `aria-label`. Hidden h1: "dat tran".

### experience `/experience`
Intro "where i've worked and what i did there." Timeline grid `76px 10px minmax(0,1fr)`, column gap 16px. Dot 6×6 acc with margin-top 11px; 1px line in `line` color fills remaining height. Entries:

| when | org | role | what |
|---|---|---|---|
| 2025 – | mit | student, computer science | alignment and frontier research. |
| 2024 | netic | engineer | built agent harnesses and evals for essential services businesses. |
| 2023 | horus health | founder | ai for hospital revenue teams. |
| 2022 | amplitude | software engineer intern | [agent analytics and infra](https://amplitude.com/blog/agent-analytics) |
| 2021 | aws | software engineer intern | [elastic container service enhanced observability](https://aws.amazon.com/blogs/aws/container-insights-with-enhanced-observability-now-available-in-amazon-ecs/) |

The `what` field supports an optional link (`{ text, href }`); linked text renders with the inline link style. Hidden h1: "experience".

### projects `/projects`
Intro "things i've built and research i've worked on." List gap 22px; item: header row (name link 600 acc, year mute 14px), description. Three placeholder entries from the handoff. Hidden h1: "projects".

### blog `/blog`
Intro "occasional writing." Rows gap 14px: title link (fg, underline `line`) and date (mute, 14px, `flex: none`, format `mon yyyy` lowercase). Sorted newest first. Four placeholder posts from the handoff with short placeholder bodies. Hidden h1: "blog".

### blog post `/blog/[slug]`
Not in the handoff; approved design: same column. `<article>` with h1 title (weight 600, 16px, no size change beyond weight, lowercase), `<time>` date in mute 14px, then MDX body inside `Prose`. Prose styles: paragraphs gap 18px, h2/h3 weight 600 same size, links inline style, lists, blockquote (left 1px line border), inline code and pre in a muted background using tokens. Unknown slug → 404.

## Theme

- Default light. First visit honors `prefers-color-scheme: dark`. Choice persisted in localStorage under `dt-theme` as `"light" | "dark"`.
- Inline boot script in `<head>` (rendered by layout, `suppressHydrationWarning` on `<html>`) sets `data-theme` before first paint.
- `ThemeToggle` is a client component; reads the current `data-theme`, flips it, writes localStorage. Only client components: `ThemeToggle` and the nav active-link helper.

## Navigation
Real routes via `next/link`. Next scrolls to top by default on navigation. No animations.

## SEO / AEO

- `metadataBase = https://datct.com`. Per-page `title` (template `%s · dat tran`, home is `dat tran`), `description`, `alternates.canonical`, `openGraph` (type website / article), `twitter` summary_large_image.
- Default description: "dat tran is a cs student at mit exploring ai safety and research. previously at netic, horus health, amplitude, and aws." Per-page descriptions for experience, projects, blog; posts use frontmatter description.
- Semantic HTML: `nav`, `main`, `article`, `time datetime`, visually hidden h1 per page, h2+ in posts.
- JSON-LD (via `<script type="application/ld+json">`):
  - Every page: `Person` (name "Dat Tran", jobTitle "CS Student at MIT", url, email, sameAs = the four profile URLs, affiliation MIT) and `WebSite` (name, url).
  - Posts: `BlogPosting` (headline, datePublished, description, url, author → Person by `@id`).
- `sitemap.ts`: the four pages plus all posts, with lastModified. `robots.ts`: allow all, sitemap URL.
- RSS at `/feed.xml`, linked from `<head>` via `alternates.types`.
- OG image `opengraph-image.tsx`: 1200×630, bg `#faf6ef`, "DT" in Instrument Serif Italic colored `#b4482b`, small "datct.com" in Karla mute at the bottom. Generated at build.
- Icons: `icon.svg` (terracotta "d" mark on paper) and `apple-icon` generated.
- `lang="en"` on html, viewport meta, `color-scheme` meta matching theme.

## Content model

```ts
// site.ts
export const site = { name, legalName: 'Dat Tran', headline: 'CS Student at MIT', url: 'https://datct.com', description, email, social: { github, linkedin, x } }
// experience.ts
type ExperienceEntry = { when: string; org: string; role: string; what: string; link?: { text: string; href: string } }
// projects.ts
type Project = { name: string; year: string; url: string; what: string }
// posts frontmatter
{ title: string; date: string (YYYY-MM-DD); description: string }
```

## Testing

- Vitest unit tests: `lib/posts.ts` (sorting, slug lookup, missing slug, date formatting), `lib/jsonld.ts` builders, `lib/metadata.ts` output shape.
- `pnpm build` must succeed with no warnings; `pnpm lint` and `pnpm typecheck` clean.
- Manual verification in browser: all routes in both themes, no theme flash on reload, narrow viewport nav wrap, view-source shows JSON-LD, `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/opengraph-image` render.

## Out of scope

Analytics, contact form, comments, i18n, search, tags, pagination. Real project and blog copy (placeholders ship).
