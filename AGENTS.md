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
- `src/pages/Home.tsx` (cover + catalog + map + vitrina) and `src/pages/InstitutePage.tsx` (single institute detail). Shared `src/components/SiteHeader.tsx` / `SiteFooter.tsx`; `src/hooks/useScrollTo.ts`.
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
- `Assets/colors/colors.txt` is a reference SCSS map NOT read by code. Live palette variables (`--red`, `--deep-red`) are in `src/styles.css`.
- Leaflet uses public OpenStreetMap tiles; keep the attribution.
- Environment is Windows + PowerShell; quote paths that contain spaces.

## Deploy (Codeberg Pages)
- `.forgejo/workflows/deploy.yml` runs on push to `main`: `npm ci` → `npm run build` → copy to `_site/` → publish via `codeberg.org/git-pages/action@v2`.
- The publish URL embeds `forge.repository_name`; it must match the real Codeberg repo name.
- `dist/`, `node_modules/` are gitignored; `_site/` is a CI-only artifact.
