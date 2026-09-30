# Legends reference implementation

## Scope and source of truth

Route: `/vi/matchup-reference`, `/en/matchup-reference`. The five original screenshots in `public/images/references/` remain the primary user-supplied visual target. Arena is a separate retained POC.

- **dashboard.webp**: indigo character wallpaper, centered application, dark flat panels and shallow header strips.
- **detailed-champion-build.webp**: compact splash header, circular gold portrait frames, secondary navigation, dense multi-column content.
- **team-power-calculator.webp**: restrained serif champion names, square illustrated controls, fine gold dividers and small diamond endpoints.
- **team-power-calculator-2.webp**: interrupted gold section border, compact comparison controls and subdued gold text.
- **video-gallery.webp**: horizontal artwork, black navigation, small rounded outline filters and quiet body typography.

## Analysis and implementation decisions

The previous centered marketing-style hero, large VS, Cinzel headings, broad section gaps and large explanatory headings were removed. The replacement uses a 1120px desktop shell, 56px navigation, a 202px splash header, 48px section navigation, 16px content gutters and three columns. Panel titles are compact sans-serif labels; champion and content headings use bold Georgia. Montserrat 400/600 is self-hosted with swap and Vietnamese glyphs. Border radius is 3px on panels, round on portraits and small footer filters, square on ability images. Borders are 1px; gold rules use small diamond tips.

Dark tokens: page #0c1017, navigation #04070b, surface #151922, panel header #1d212b, text #d7d8dd, secondary text #a2a3ae, gold #b79b60, heading gold #d3b77c, gold border #77613c. Light mode has separate readable tokens. The references show only dark mode; light mode and responsive stacking are adaptations, not verified exact reproductions.

Generated UI studies were inspected before implementation. They clarified the compact header, portrait treatment and flat tactical panels. Any hallucinated statistics, build recommendations, branding and incorrect ability labels in the studies were excluded. The implementation retains the existing gameplay fixture and explicitly labels it as sample data. It does not claim current-patch accuracy.

## Assets and provenance

- `public/images/matchup/legends-wallpaper.webp`: generated with built-in ImageGen from dashboard.webp, removing the central screenshot UI while retaining the side-character composition. Exported to WebP with Sharp, quality 86.
- `public/images/matchup/fiora-splash.webp` and `aatrox-splash.webp`: official Riot Data Dragon splash art, downloaded from `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_0.jpg` and `Aatrox_0.jpg`; encoded as WebP quality 87. Displayed through Next Image with explicit sizes.
- `public/fonts/montserrat-regular.ttf`, `montserrat-semibold.ttf`: Google Fonts Montserrat 400 and 600. These are static weights; no variable-font claim. Loaded using next/font/local.
- Existing champion portraits and ability icons are reused.

Generated design studies are preview artifacts, not flattened UI used in the app. Original outputs remain under `C:/Users/Admin/.codex/generated_images/01a0f2f6-006c-7451-8f2d-3abf4d0ca385/`:

- Header study: `exec-92359503-309f-4b81-89e3-b826422f3f72.png`
- Content study: `exec-f36d9b2f-7805-4d92-9318-d7048cceb994.png`
- Wallpaper master: `exec-9d87f2b7-1741-4704-ae35-b17c2f3bab62.png`

## ImageGen prompts

Mode: built-in ImageGen. Each study used all five original images as visual references. Wallpaper extraction used dashboard.webp.

### Header / overview

Use case: ui-mockup. Produce one 1536x1024 high fidelity FRONTEND DESIGN SPECIFICATION of the HEADER and CHAMPION MATCHUP OVERVIEW portion of Topgap, based extremely faithfully on the FIVE supplied More Legends reference screenshots. These are visual style references, not edit targets. Preserve their original 2018 League companion website aesthetic. Do NOT modernize. Near-black #070b10 navigation, charcoal #12161e background, #1d212b shallow panel headers, muted antique gold #ad8b49, ivory white small UI text, hairline #34353a borders, almost square 3px corners, classical bold Georgia-style serif title case for champion names/headings (NOT decorative Cinzel all caps everywhere), geometric Montserrat-like sans body. Page floats 1100px wide over a subdued deep indigo blue fantasy character wallpaper with characters visible in both margins. Top nav 56px high: gold TOPGAP wordmark, Trang chủ, Kèo đấu, Arena, right VI/EN and sun icon. A compact 200px champion splash banner under nav: Fiora on left and Aatrox on right, small circular gold-rimmed portrait each, readable gold champion names, Fiora vs Aatrox main heading, small subtitle Đường trên, Kèo kỹ năng. Use dramatic full-width splash artwork fading into charcoal background, NOT tall portrait trading cards. Under banner a thin secondary nav with Tổng quan selected underline gold, Kế hoạch đi đường, Hồi chiêu, Ngưỡng sức mạnh. Then tight 16px gutters and a three-column tactical overview begins, thin interrupted gold rules with tiny diamond tips. No marketing slogans, giant VS, chunky borders, modern SaaS cards, bright yellow, oversized headings. Focus solely on first-screen layout and component detail so text and spacing are large enough to analyze. Preserve the original references' restrained old League website style, not a reinterpretation.

### Tactical content

Use case: ui-mockup. Make a fresh standalone 1536x1024 close readable UI specification of the CONTENT AREA of a Topgap Fiora versus Aatrox matchup guide. Match the supplied FIVE More Legends screenshots exactly in design system: early League website, dark near-black #0b0e14 canvas, flat #171a22 panels with #20232c header strips, subdued antique gold #ad8b49, white small Montserrat-like body and bold Georgia-like title-case serif section titles, 1px hairlines, small 3px corners. No bright gold, chunky ornaments, huge typography, big marketing hero. Layout 1100px content wide with 18px gutters. LEFT narrow 280px column: champion portrait in round thin gold rim, Fiora name, W Riposte icon with short tip 'Hold W for Q3 or the pull', summoner spell icons Teleport and Ignite as small bordered image choices. CENTER 480px column: LANE PLAN panel with gray header strip, 'Slow push' title, short readable text 'Slow push waves 1–2. Crash wave 3 at 2:45.', three small numbered wave markers joined by muted gold rule. Thin footer warning 3:15–3:30. Below, two flat adjacent DO and AVOID advice panels with small green/red square marks and three short lines each. RIGHT 300px column: COOLDOWNS panel two illustrated ability rows Q 14s and W 20s, compact description; underneath gold interrupted-border POWER SPIKES panel with four tiny outlined tabs 1–3, 6, Recall, Item; selected text. Bottom a restrained footer brand and Arena link. Important only use supplied content, no invented win rates, no rune builds, no charts with invented stats, no videos. This is dense tactical product UI not a landing page. Show precise 1px border styles and small controls. All visible text can be English for clarity. Keep the same restrained old League companion aesthetic and small-scale typography as the original images, not modern SaaS.

### Wallpaper asset

Use case: precise-object-edit / background-extraction. The input is a website screenshot. Create a clean reusable 1536x1024 BACKGROUND WALLPAPER asset from it. Remove the entire central rectangular website/application UI, every panel, navigation and all lettering. Preserve the existing blue-indigo fantasy character artwork visible at the LEFT and RIGHT margins as faithfully as possible: the pale dark-haired woman on the left and the horned purple woman on the right, same poses, placement, colors, large scale and subdued lighting. Fill the entire center where the website was with plain misty deep indigo/navy atmospheric background, dark and quiet. Match the original full background scene, not a redesign. Keep both characters mostly in the OUTER 23% at the edges, center 54% dark unobstructed. Uniformly dim blue treatment as in input. No new characters, no logo, no text, no panels, no website, no frame. This is a wallpaper, not a UI screenshot. Output landscape 1536x1024.

## Verification limits

Production build (including TypeScript) and lint passed. Both locales return HTTP 200 with one H1, localized title/description, correct document language, noindex, section anchors and reciprocal language-switch links. All rendered image URLs, the wallpaper and local font files return HTTP 200. Both font files contain the Vietnamese glyphs checked from the visible labels. Text-token contrast against panel backgrounds passes 4.5:1 in both themes (dark: body 12.36, secondary 7.02, gold 6.59; light: body 11.92, secondary 6.04, gold 5.56). This checks solid text tokens, not every image-overlay pixel.

The preview was restarted at http://127.0.0.1:3000/vi/matchup-reference and optimized images were fetched successfully. No connected browser was available in this session; screenshot comparison, interactive browser tests, mobile visual QA and Lighthouse remain unverified. Do not claim 100% pixel fidelity from screenshots with unknown original font files and layout dimensions.

