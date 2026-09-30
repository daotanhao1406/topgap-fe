# Matchup design studies

Two directly accessible localized routes:

- `/vi/matchup-arena`, `/en/matchup-arena`: warm bronze Arena concept, loading-screen duel stage, layered portrait frames, central VS crest, illustrated ability/spell slots and framed tactical panels.
- `/vi/matchup-reference`, `/en/matchup-reference`: Legends concept based on all five images in `public/images/references`, with navy surfaces, gold borders, champion artwork and interactive lane plans.

All variants share the original matchup fixture through `src/components/matchup-pocs/data.ts`. Gameplay values are supplied POC data, not verified current-patch advice. In Arena, swapping only changes the perspective and hides unavailable reverse advice. Ignite changes the wave instruction; TP restores the default. The new pages have server-generated localized metadata with `noindex, follow` and are intentionally excluded from indexing.

## Skill application

The requested taste-skill and gpt-tasteskill informed the composition, typography, motion, and visual audit. The dashboard's existing 30-second reading requirement takes precedence over marketing-page spacing, mandatory testimonials, and scroll-gated content. HeroUI remains the component foundation.

The initial POCs used Python RNG seed 175 (request character count). The user subsequently chose Arena's palette and requested a stronger League-inspired game interface. Arena now uses a dedicated duel-stage component, Cinzel display typography, bronze frame details, a wave sequence, real spell/ability icons and a static crest divider in place of the marquee. The power-spike carousel contains actual fixture data, not invented testimonials. The first quick card is never animated out of view. GSAP is loaded separately, scoped to the component, reverted on updates/unmount, and only enabled on desktop without reduced-motion preference.

## Assets

- `public/images/matchup/fiora.webp`, `aatrox.webp`: previously downloaded Riot Games Data Dragon champion portraits. Source: https://developer.riotgames.com/docs/lol#data-dragon
- `public/images/matchup/arena-environment.webp`: generated with the built-in ImageGen tool, then resized to 1440 × 960 WebP (95,634 bytes). Original retained at `C:/Users/Admin/.codex/generated_images/01a0e33a-9852-7331-9149-61506fe8ac5e/exec-97a53e01-8c01-4b9a-ab15-588a0af72cc5.png`.
- `public/fonts/cabinet-grotesk-800.woff2`: Cabinet Grotesk 800 from Fontshare's official CSS endpoint: https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800&display=swap. Loaded using next/font/local with swap.
- Geist body text uses locally bundled `@fontsource-variable/geist`, including Vietnamese glyph coverage.
- Arena display text uses locally bundled `@fontsource/cinzel/600.css`, with system-serif/Geist glyph fallbacks.
- `public/images/matchup/abilities/`: Riot Data Dragon icons pinned to asset version `16.17.1`: `FioraW.png`, `AatroxQ.png`, `AatroxW.png`, `SummonerTeleport.png`, `SummonerDot.png`. Converted to WebP, 9,970 bytes total. Pinning asset artwork does not certify the supplied gameplay fixture against that patch.

### Final image-generation prompt

Use case: stylized-concept. Create a single wide 1536x1024 cinematic environment artwork for a League of Legends inspired top-lane matchup web dashboard. An ancient stone arena at the edge of a misty fantasy forest, broken immense dark stone arches on the right, restrained ember red light along the right edge, cool teal moonlight from the left, a distant narrow bridge and river valley, painterly high-end fantasy game loading screen quality. No characters, no text, no logos, no symbols, no UI. Composition: center and left half quiet nearly black blue negative space for HTML heading, interesting detailed architecture mainly on far right and bottom; atmospheric subtle light. Deep charcoal, desaturated teal, worn bronze, small red embers. Not a photograph, not neon cyberpunk. Full bleed landscape background intended to sit under actual HTML content. Save image for use as project asset.

## Verification

- Production build, strict TypeScript and lint passed.
- Both new routes in both locales: prerendered content, one H1, page title/description, noindex, design-switch links and locale-switch links checked.
- Home page links to both designs in both locales checked.
- Foreground color tokens checked against each card surface in both themes (WCAG AA text contrast).
- No connected browser was available. Visual mobile QA, click interactions, GSAP scroll behavior and Lighthouse remain to be verified in a browser. Build success is not a field performance measurement.
