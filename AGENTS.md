# AGENTS.md

## Overview
Static React 18 + TypeScript + Vite SPA: portal of Tarija's technical and artistic institutes.
No backend, no CMS. All content is hardcoded data compiled into the bundle. UI copy is Spanish (es-BO).

## Commands
- `npm install` — may warn about the esbuild `allowScripts` script; the build still works.
- `npm run dev` — Vite dev server.
- `npm run build` — runs `tsc -b && vite build`. This is the ONLY verification; there are no test or lint scripts. Run it after every change.
- `npm run preview` — serve the production build locally.
- `powershell -File scripts/optimize-images.ps1` — resize/recompress institute JPEGs before committing new photos.

## Architecture
- `src/main.tsx` mounts `<HashRouter>`; `src/App.tsx` defines routes `/` (Home), `/instituto/:slug` (InstitutePage) and `*` (NotFound). It also renders the skip-link and moves focus to `#main-content` on route change.
- `src/pages/Home.tsx` (hero + catalog + map + guide + vitrina) and `src/pages/InstitutePage.tsx` (single institute detail). Shared `src/components/SiteHeader.tsx` / `SiteFooter.tsx` / `MobileNav.tsx` (fixed bottom bar on mobile); `src/hooks/useScrollTo.ts`.
- Design system lives in `src/styles.css` (`:root` tokens). Font is `Archivo Variable`, self-hosted via `@fontsource-variable/archivo` imported in `main.tsx`.
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
- The official logos (`Assets/images/logo.png`, `logo gobernacion.png`) are white artwork on transparent. `Assets/images/logo-lockup.png` is the trimmed white lockup used on the red header chip and the dark footer; do not place the white logo on a light surface.
- Leaflet uses public OpenStreetMap tiles; keep the attribution.
- Environment is Windows + PowerShell; quote paths that contain spaces.

## Remotes
- `origin` → Codeberg (`https://codeberg.org/yemih/institutosweb.git`); `github` → `https://github.com/Marylm153/institutosweb.git`. Push `main` to both to keep the mirror in sync.

## Deploy (Codeberg Pages)
- Live at `https://yemih.codeberg.page/institutosweb/`; the `pages` branch is served as-is by the Codeberg Pages webhook. That branch must contain ONLY the built site (`dist/`), never the source.
- Publish/update with `powershell -File scripts/publish-pages.ps1` (builds, copies `dist/` to a `pages` worktree, pushes). Idempotent.
- `.forgejo/workflows/deploy.yml` is the alternative CI method: on push to `main` it builds to `_site/` and publishes via `codeberg.org/git-pages/action@v2` (requires Forgejo Actions enabled).
- `vite.config.ts` `base` MUST stay `'./'` for the `/institutosweb/` subpath; `'./institutosweb/'` breaks asset URLs.
- `dist/`, `node_modules/` are gitignored; `_site/` is a CI-only artifact.

## Deploy (GitHub Pages)
- `.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on push to `main` (uses GitHub Actions, not the `pages` branch).
- Public URL: `https://marylm153.github.io/institutosweb/`; planned custom domain `https://institutos-tarija.is-a.dev/` (set in repo Settings → Pages → Custom domain).
- `base: './'` also works at the custom-domain root, so no Vite change is needed.
