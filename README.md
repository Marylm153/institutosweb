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

La salida se genera en `dist/`. El sitio usa `base: './'` para funcionar en la ruta del repositorio sin configuración adicional.

## Publicación (GitHub + Render)

El repositorio vive en GitHub y Render hace **autodeploy** en cada push a `main`.

- Repositorio: `https://github.com/Marylm153/institutosweb`
- Demo en GitHub Pages: `https://marylm153.github.io/institutosweb/`
- Demo en Render: `https://institutosweb.onrender.com/`

Para publicar, empuja a `main`:

```powershell
git push github main
```

- **Render**: conectado al repositorio de GitHub; despliega automáticamente cada commit (build `npm install && npm run build`, publish `dist/`).
- **GitHub Pages** (opcional): el workflow `.github/workflows/deploy.yml` compila y publica `dist/` en cada push a `main`.

`vite.config.ts` mantiene `base: './'`, que funciona en la página de proyecto de GitHub y en Render. La capa cartográfica usa Leaflet y OpenStreetMap con la atribución correspondiente.

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
