# Matchup design studies

Two directly accessible localized routes:

- `/vi/matchup-arena`, `/en/matchup-arena`: warm bronze Arena concept, loading-screen duel stage, layered portrait frames, central VS crest, illustrated ability/spell slots and framed tactical panels.
- `/vi/matchup-reference`, `/en/matchup-reference`: Legends concept based on all five images in `public/images/references`, with navy surfaces, gold borders, champion artwork and interactive lane plans.

All variants share the original matchup fixture through `src/features/matchup/model/sample-matchup.ts`. The route selects the localized fixture on the server. Gameplay values are supplied POC data, not verified current-patch advice. In Arena, swapping only changes the perspective and hides unavailable reverse advice. Legends adapts the wave instruction when Ignite is selected; TP restores the default. Arena currently shows rules, cooldowns and level trades; its spell picker does not display a wave plan. Both POCs have server-generated localized metadata with `noindex, follow` and are excluded from the sitemap.

## Skill application

The requested taste-skill and gpt-tasteskill informed the composition, typography, motion, and visual audit. The dashboard's existing 30-second reading requirement takes precedence over marketing-page spacing, mandatory testimonials, and scroll-gated content. HeroUI remains the component foundation.

The initial POCs used Python RNG seed 175 (request character count). The user subsequently chose Arena's palette and requested a stronger League-inspired game interface. Arena uses a dedicated duel-stage component, bronze frame details, real spell/ability icons, level-trade guidance and a static crest divider. Legends includes the wave sequence and power-spike selector. Both use Chakra Petch through the app layout. GSAP and the unused early POC styles were removed during the refactor; reduced-motion styles remain.

## Assets

- `public/images/matchup/fiora.webp`, `aatrox.webp`: previously downloaded Riot Games Data Dragon champion portraits. Source: https://developer.riotgames.com/docs/lol#data-dragon
- `public/images/matchup/arena-environment.webp`: generated with the built-in ImageGen tool, then resized to 1440 × 960 WebP (95,634 bytes). Original retained at `C:/Users/Admin/.codex/generated_images/01a0e33a-9852-7331-9149-61506fe8ac5e/exec-97a53e01-8c01-4b9a-ab15-588a0af72cc5.png`.
- `public/fonts/cabinet-grotesk-800.woff2`: Cabinet Grotesk 800 from Fontshare's official CSS endpoint: https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800&display=swap. Loaded using next/font/local with swap.
- Current app typography uses Chakra Petch with Latin and Vietnamese subsets through `next/font/google`. The earlier Geist and Cinzel packages are no longer used.
- `public/images/matchup/abilities/`: Riot Data Dragon icons pinned to asset version `16.17.1`: `FioraW.png`, `AatroxQ.png`, `AatroxW.png`, `SummonerTeleport.png`, `SummonerDot.png`. Converted to WebP, 9,970 bytes total. Pinning asset artwork does not certify the supplied gameplay fixture against that patch.

### Final image-generation prompt

Use case: stylized-concept. Create a single wide 1536x1024 cinematic environment artwork for a League of Legends inspired top-lane matchup web dashboard. An ancient stone arena at the edge of a misty fantasy forest, broken immense dark stone arches on the right, restrained ember red light along the right edge, cool teal moonlight from the left, a distant narrow bridge and river valley, painterly high-end fantasy game loading screen quality. No characters, no text, no logos, no symbols, no UI. Composition: center and left half quiet nearly black blue negative space for HTML heading, interesting detailed architecture mainly on far right and bottom; atmospheric subtle light. Deep charcoal, desaturated teal, worn bronze, small red embers. Not a photograph, not neon cyberpunk. Full bleed landscape background intended to sit under actual HTML content. Save image for use as project asset.

## Refactor verification

- Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run format:check` and `npm run build`.
- Run `npm run verify:routes` against the production server for both locales: initial HTML, H1, metadata, indexing directives, crawlable locale links, missing-page status, sitemap and robots.
- Metadata tests cover configured/unconfigured origins, invalid configuration, self canonicals and reciprocal locale URLs. Fixture tests cover locale parity and referenced asset files.
- Theme state is shared through `next-themes`, replacing page-local theme state. Existing card tokens are retained.
- No browser was connected during the refactor. Visual mobile QA, click interactions, theme appearance and Lighthouse still require browser verification. Build success is not a field performance measurement.
