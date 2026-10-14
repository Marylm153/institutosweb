# AGENTS.md

## Overview
Static React 18 + TypeScript + Vite SPA: portal of Tarija's technical and artistic institutes.
No backend, no CMS. All content is hardcoded data compiled into the bundle. UI copy is Spanish (es-BO).

## Commands
- `npm install` — may warn about the esbuild `allowScripts` script; the build still works.
- `npm run dev` — Vite dev server.
- `npm run build` — runs `tsc -b && vite build`. This is the ONLY verification; there are no test or lint scripts. Run it after every change.
- `npm run preview` — serve the production build locally.
- `python scripts/to-webp.py` — converts institute photos to WebP (needs `pip install pillow`). Run it after adding new photos; `Assets/images/institutos/**` is globbed as `{jpg,jpeg,png,webp}`.
- `python scripts/make-covers.py` — generates the uniform home-card covers (800×500, 16:10) into `Assets/images/portadas/<slug>.webp` from each institute's portada. Run it after adding an institute or changing its cover; `src/data/media.ts` globs `Assets/images/portadas/*.webp`.

## Architecture
- `src/main.tsx` mounts `<HashRouter>`; `src/App.tsx` defines routes `/` (Home), `/instituto/:slug` (InstitutePage) and `*` (NotFound). It also renders the skip-link and moves focus to `#main-content` on route change.
- `src/pages/Home.tsx` (hero + catalog + map + guide + vitrina) and `src/pages/InstitutePage.tsx` (single institute detail). Shared `src/components/SiteHeader.tsx` / `SiteFooter.tsx` / `MobileNav.tsx` (fixed bottom bar on mobile); `src/hooks/useScrollTo.ts`.
- Design system lives in `src/styles.css` (`:root` tokens). Fonts are `Montserrat Variable` (headings) and `Inter Variable` (body), self-hosted via `@fontsource-variable/montserrat` and `@fontsource-variable/inter` imported in `main.tsx`.
- Data lives in `src/data/`:
  - `institutes.ts` — summary list shown on the cover (must include `slug`, `hasDetail`).
  - `institutes/<slug>.ts` — full detail for one institute.
  - `index.ts` — registers details in `details` map and exposes `getInstitute` / `getInstituteDetail`.
  - `media.ts` — loads photos via `import.meta.glob('../../Assets/images/institutos/**')`.
- To add an institute detail: create `src/data/institutes/<slug>.ts`, register it in `src/data/index.ts`, set `hasDetail: true` in `institutes.ts`, and add photos under `Assets/images/institutos/<slug>/<career>/`.
- One global stylesheet: `src/styles.css`. No CSS modules or Tailwind.

## Gotchas
- `vite.config.ts` sets `base: './'` on purpose for the Codeberg Pages repo subpath. Do NOT change it to `/`.
- Routing must stay `HashRouter` (all pages are static, no server rewrites). Do not switch to `BrowserRouter`.
- Images are imported with relative paths / glob from `src`; the glob base is `../../Assets/...` (from `src/data/`). Assets are hashed into `dist/assets` — do NOT move them to `public/`.
- `Assets/colors/colors.txt` is a reference SCSS map NOT read by code. Live palette variables (`--red`, `--ochre`, `--ink`, `--line`, etc.) are in `src/styles.css`.
- The Gobernación logos (`Assets/images/logo.png`, `logo gobernacion.png`, `logo-lockup.png`) are white artwork on transparent; `logo-lockup.png` is the trimmed white lockup used on a red plaque in the header/footer — never place it on a light surface. The SDH logo (`Assets/images/logo-sdh.png`) is full-colour and goes on white. `src/components/GovStrip.tsx` renders the red modular strip (header top + footer close).
- Leaflet uses public OpenStreetMap tiles; keep the attribution.
- Environment is Windows + PowerShell; quote paths that contain spaces.

## Remotes
- `github` → `https://github.com/Marylm153/institutosweb.git`. Push `main` there; Render autodeploys from GitHub.

## Deploy
- **Render**: autodeploys on every push to `main` (connected to the GitHub repo). Public URL: `https://institutosweb.onrender.com/`.
- **GitHub Pages**: `.github/workflows/deploy.yml` builds and publishes `dist/` on push to `main` (GitHub Actions). Public URL: `https://marylm153.github.io/institutosweb/`.
- `vite.config.ts` `base` MUST stay `'./'`; `'./institutosweb/'` breaks asset URLs.
- `dist/`, `node_modules/` are gitignored.
