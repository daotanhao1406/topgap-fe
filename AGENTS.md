# Topgap Project Guidelines

## App-wide UI Design References

- From now on, use all images in `public/images/references/` as the shared visual reference for the entire app, including every page, feature, and shared UI component.
- Before creating or modifying UI, inspect the full set of reference images, including images added to this directory later. Derive a consistent design direction from the complete set and apply the most relevant reference patterns to the affected screen.
- Follow the references for layout, visual hierarchy, typography, colors, spacing, surfaces, borders, imagery treatment, and component styling. Keep the design consistent across the app while adapting it to each feature's content and responsive needs.
- Implement the reference designs using suitable HeroUI components and supported customization APIs. Preserve accessibility, light/dark theme support, Vietnamese/English localization, and the SEO requirements below.
- These references guide all UI work going forward; update existing screens when they fall within the current task's scope.

## UI Components

- Follow this implementation priority when creating or modifying UI: first use the raw components and primitives provided by `@heroui/react`; then style and compose them with Tailwind CSS utility classes; only use separate CSS files, CSS Modules, or custom CSS when HeroUI and Tailwind CSS cannot reasonably express the required behavior or design.
- Prefer components from `@heroui/react` whenever the library provides a suitable component. Start from the closest raw HeroUI component before building an equivalent custom component.
- Customize HeroUI components through supported APIs and Tailwind CSS utility classes. Reuse existing theme tokens and shared Tailwind patterns before adding custom CSS rules.
- Limit imports of external CSS files and avoid creating component-specific stylesheet files by default. When custom CSS is technically necessary, keep it narrowly scoped and document the limitation that prevents a HeroUI-plus-Tailwind implementation.
- Use plain HTML elements or custom components only when HeroUI has no suitable component or a specific technical limitation prevents its use. Semantic HTML elements for page layout may still be used as usual.
- Preserve accessibility, light/dark theme support, and Vietnamese/English localization when integrating components.
- These guidelines apply to work from this point forward. Do not automatically replace existing UI unless it falls within the scope of the current task.

## SEO Requirements for Generated and Modified Code

- Treat SEO as part of implementation acceptance criteria whenever creating or modifying public pages, routing, metadata, content, or shared rendering infrastructure.
- Apply these requirements to the affected scope. Do not rewrite unrelated pages or introduce a new framework solely for SEO.
- Inspect the existing framework, routing, localization, and metadata conventions first. Reuse framework-supported APIs and shared helpers rather than creating competing implementations.
- Apply indexability requirements to public pages intended for search. Keep account, admin, private, internal search, and other non-search pages out of the index as appropriate; authentication must protect private content, since robots directives are not access controls.

### Crawlability, Rendering, and URLs

- Give each public content page a stable, descriptive URL that works when loaded directly.
- Prefer server rendering or static generation for indexable pages where supported. Make primary content, headings, metadata, and navigation available in the initial HTML where feasible; do not make essential content depend on user interaction or client-only effects.
- Use real links with valid `href` attributes for navigation, including framework and HeroUI link components that render crawlable anchors. Use buttons for actions.
- Link important pages from other discoverable pages; avoid orphan pages. Add relevant contextual internal links and breadcrumbs when the site hierarchy warrants them.
- Return correct HTTP status codes: successful pages use 200, missing pages use 404 or 410, and permanently moved pages use 301 or 308. Avoid soft 404s and unnecessary redirect chains.
- Do not accidentally block intended search pages or rendering resources through `robots.txt`, `noindex`, authentication, or deployment settings. Keep staging indexing restrictions separate from production.
- When excluding a public page with `noindex`, allow crawling so crawlers can read that directive. Do not treat `robots.txt` as a reliable way to remove a URL from search results.

### Metadata and Duplicate Content

- Provide a descriptive, unique title and useful meta description for each indexable page and locale. Derive dynamic metadata from actual page data and provide deliberate fallbacks; never ship placeholder titles or descriptions.
- Set an absolute canonical URL using the configured production origin. Keep canonical URLs, redirects, internal links, and sitemap entries consistent with the chosen URL convention.
- Handle duplicate parameter, filter, sort, and pagination URLs deliberately. Do not canonicalize distinct content or every pagination page to the first page by default.
- Provide appropriate Open Graph and social sharing metadata for shareable pages, reusing existing conventions. Treat these as sharing enhancements, not a guarantee of search rankings.
- Never use keyword stuffing, hidden SEO text, or the obsolete `meta keywords` tag.

### Content, Semantics, and Accessibility

- Give each page a clear primary topic and a descriptive main heading. Use a logical heading hierarchy and semantic landmarks such as `main`, `nav`, `article`, and `footer` where appropriate.
- Keep meaningful text in HTML rather than only in images, canvas, CSS-generated content, or animations.
- Write content that answers the page's intended user need. Avoid thin duplicate pages, fabricated facts, invented reviews, and automatically generated filler added solely for keywords.
- Give informative images meaningful localized alt text; use empty alt text for decorative images. Use descriptive link text and preserve keyboard navigation, accessible names, and readable contrast.

### Vietnamese and English Localization

- Preserve separate, directly accessible URLs for indexable Vietnamese and English versions, following the existing locale routing convention. Do not expose translations only through client state or cookies.
- Set the document language correctly and localize titles, descriptions, headings, alt text, and relevant structured data along with visible content.
- For equivalent translated pages, add valid, reciprocal `hreflang` annotations including each page itself. Use `vi` and `en` unless a regional variant is actually intended; add `x-default` only where appropriate.
- Canonicalize each translated page to its own preferred URL, not to another language. Only reference language versions that exist, and keep the language switcher crawlable.

### Performance and Mobile Experience

- Preserve responsive layouts and equivalent primary content on mobile. Avoid overlays that obstruct access to the content.
- Optimize image formats, responsive sizes, fonts, and JavaScript delivery. Reserve dimensions or aspect ratios for images, embeds, and other asynchronous content to prevent layout shifts.
- Lazy-load below-the-fold media, but do not lazy-load the likely LCP image. Prioritize critical assets deliberately and avoid excessive preloading, unnecessary client components, and heavy dependencies.
- Target good Core Web Vitals at the 75th percentile of real user visits: LCP <= 2.5 seconds, INP <= 200 milliseconds, and CLS <= 0.1. Treat laboratory measurements as diagnostics, not proof of field performance or ranking guarantees.

### Sitemaps and Structured Data

- Maintain sitemap coverage when adding, removing, or changing indexable routes. Include only preferred, indexable, successful production URLs; exclude redirects, missing pages, private pages, and `noindex` pages. Use accurate modification dates when available rather than resetting every date on every build.
- Keep `robots.txt` consistent with the intended indexing policy and reference the production sitemap where applicable.
- Add supported structured data only when relevant to the page, using the existing implementation pattern and safely serialized JSON-LD where appropriate. Markup must match visible, verifiable content; never invent ratings, prices, availability, or business details.
- Validate structured data when changed. Do not promise rich results or higher rankings merely because markup is present.

### Verification Before Completion

- Run the existing build, type, and lint checks appropriate to the change. Inspect representative affected routes, including both locales when applicable.
- Verify rendered HTML for primary content, title, description, canonical URL, language annotations, semantic headings, and crawlable links. Check HTTP status codes and indexing directives when routing or rendering changes.
- Check sitemap and robots behavior when affected, and validate changed structured data with an appropriate validator such as Google's Rich Results Test.
- For substantial public UI changes, check mobile layout and performance with available tooling such as Lighthouse or PageSpeed Insights. Use Search Console URL Inspection and field Core Web Vitals data when deployment access is available.
- Reuse existing SEO checks or add focused automated checks when shared routing or metadata logic warrants them. Do not add brittle tests that only mirror static markup.
- Report what was verified and any checks that could not be run. Do not claim successful indexing, field performance, or ranking improvements without evidence; identify any post-deployment verification still needed.

## Project Summary

A high-performance full-stack web application designed for League of Legends top lane players. Unlike traditional stat aggregators, it delivers actionable, micro-level 1v1 matchup guidance that can be read and applied within a 30-second loading screen.

## Core Value Proposition

- **30-Second Quick-Card View:** 3-block mobile-first summary (Matchup Rhythm, 3 Dos, 3 Don'ts/Enemy Gotchas).
- **Practical Micro-Tactics:** Rank 1 enemy cooldowns, Wave 1–3 management tied to Jungle gank timers (2:45 ward / 3:15 gank), and 4 power spike checkpoints (Lv 1–3, Lv 6, First Base, 1st Completed Item).
- **Dynamic Adaptations:** 1-click champion swap (`/a-vs-b` ⇄ `/b-vs-a`), enemy summoner spell toggle (Ignite/Ghost vs TP), and draft-phase counter-picks with execution rationale ("The Why").

## Tech Stack & Architecture

- **Frontend (Next.js App Router):** TypeScript, Tailwind CSS, SSR/SSG for sub-1s load times and automated SEO per matchup URL (`/[my-champ]-vs-[enemy-champ]`).
- **Backend (NestJS):** Modular clean architecture (Controllers, Services, DTOs, Entities), RESTful API, PostgreSQL with Prisma ORM.
- **External Integration:** Riot Data Dragon CDN for assets (icons, abilities, items) separated from internal tactical matchup metadata.

## Development Priorities

1. **Phase 1 (MVP):** Data schema, 10 hot matchups mock seed, `/champ-a-vs-champ-b` dynamic route, 30s Quick-Card UI, 1-click swap.
2. **Phase 2 (Micro Execution):** Wave & Jungle timer widgets, 4-tier power spikes, summoner spell toggle.
3. **Phase 3 (Scale & Automation):** Data Dragon asset sync, dynamic SEO metadata + sitemap generation, draft counter-pick advisor.

## Coding Directives for AI

- Keep responses strict, type-safe (TypeScript strict mode), and modular.
- Do not hardcode image assets; reference Riot Data Dragon formats.
- Preserve mobile-first responsiveness and instant load performance for all UI components.
