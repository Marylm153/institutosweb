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

El archivo `.forgejo/workflows/deploy.yml` compila y publica automáticamente cada cambio enviado a `main`. Después de crear el repositorio público en Codeberg y subir el proyecto, la página estará disponible en:

`https://USUARIO.codeberg.page/NOMBRE-DEL-REPOSITORIO/`

La publicación usa `git-pages/action`, desarrollado para Codeberg Pages. La capa cartográfica usa Leaflet y OpenStreetMap con la atribución correspondiente.

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
