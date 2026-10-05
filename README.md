# Institutos Tarija

Sitio web público para consultar la oferta académica de los institutos técnicos, tecnológicos y artísticos del departamento de Tarija.

## Stack

- React + TypeScript + Vite
- React Router (HashRouter) para que cada instituto tenga su propia URL
- Leaflet + OpenStreetMap para el mapa
- CSS propio, sin dependencias propietarias
- Datos estáticos editables en `src/data/`

## Estructura

- `src/data/types.ts`: tipos del dominio (institutos, carreras, sedes, FAQ).
- `src/data/institutes.ts`: listado de instituciones para la portada.
- `src/data/institutes/<slug>.ts`: detalle completo de cada instituto.
- `src/data/media.ts`: carga automática de fotografías con `import.meta.glob`.
- `src/pages/Home.tsx`: portada con buscador, mapa y vitrina.
- `src/pages/InstitutePage.tsx`: página individual de cada instituto.
- `Assets/images/institutos/<slug>/<carrera>/`: fotografías por instituto y carrera.

## Desarrollo local

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

La salida se genera en `dist/` y puede publicarse en Codeberg Pages. El sitio usa `base: './'` para funcionar en la ruta del repositorio sin configuración adicional.

## Publicación en Codeberg Pages

El sitio queda disponible en:

`https://USUARIO.codeberg.page/NOMBRE-DEL-REPOSITORIO/`

Hay dos formas de publicar. El branch de Pages debe contener **solo el sitio compilado** (el contenido de `dist/`), nunca el código fuente.

### Método por webhook (branch `pages`)

Si configuraste el webhook de Forgejo apuntando al branch `pages`, publica el build con:

```powershell
powershell -File scripts/publish-pages.ps1
```

El script compila, copia `dist/` al branch `pages` en un worktree temporal y lo empuja a `origin`. Es seguro repetirlo: si no hay cambios, no crea commit.

Si el branch `pages` alguna vez contiene `src/` o un `index.html` que carga `/src/main.tsx`, la página se verá en blanco con un error 404 de `main.tsx`. Eso significa que se publicó el fuente en vez del build.

### Método por Forgejo Actions

El archivo `.forgejo/workflows/deploy.yml` compila y publica automáticamente cada push a `main` usando `codeberg.org/git-pages/action@v2`. Requiere tener Actions habilitado en el repositorio.

### Base de rutas

`vite.config.ts` debe mantener `base: './'` para que los assets funcionen bajo el subdirectorio `/institutosweb/`. Un valor como `'./institutosweb/'` rompe las rutas de los assets.

La capa cartográfica usa Leaflet y OpenStreetMap con la atribución correspondiente.

## Espejo en GitHub + GitHub Pages

Además de Codeberg, el repositorio se espeja a GitHub y publica la demo con GitHub Actions.

- Repositorio: `https://github.com/Marylm153/institutosweb`
- Demo: `https://marylm153.github.io/institutosweb/`

El workflow `.github/workflows/deploy.yml` compila (`npm ci && npm run build`) y publica `dist/` en cada push a `main`. Para publicar en ambos remotos:

```powershell
git push origin main
git push github main
```

`vite.config.ts` mantiene `base: './'`, que funciona tanto en el subdirectorio de Codeberg como en la página de proyecto de GitHub.

## Actualizar contenido

La primera versión no tiene backend. El administrador actualiza los registros de `src/data/`, copia las fotografías a `Assets/images/institutos/<slug>/<carrera>/`, confirma el cambio en el repositorio y vuelve a generar el sitio.

Para habilitar el detalle de un instituto basta con crear su archivo en `src/data/institutes/<slug>.ts`, registrarlo en `src/data/index.ts` y marcar `hasDetail: true` en `src/data/institutes.ts`.

## Optimizar imágenes

Antes de subir fotografías nuevas, reducir su peso:

```powershell
powershell -File scripts/optimize-images.ps1
```

El script redimensiona a un máximo de 1400 px y recomprime en JPEG. Es seguro volver a ejecutarlo.

## Licencia

El código se distribuye bajo MIT. Los logotipos, fotografías y contenidos institucionales conservan sus derechos correspondientes.
