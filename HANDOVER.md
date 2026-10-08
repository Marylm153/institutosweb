# HANDOVER — Portal de Institutos de Tarija

Documento de traspaso de contexto. Léelo antes de continuar el proyecto en una sesión nueva.
Complementa a `AGENTS.md` (convenciones técnicas) y `README.md` (uso). Este archivo describe **qué está hecho, cómo funciona y cómo ampliarlo sin romper lo construido**.

---

## 1. Qué es

Sitio web estático (React 18 + TypeScript + Vite) que centraliza la oferta académica de los institutos
técnicos, tecnológicos y artísticos dependientes del **Gobierno Autónomo Departamental de Tarija**.
No tiene backend, ni base de datos, ni formularios propios. Todo el contenido son **datos estáticos** en
`src/data/` que se compilan en el bundle. UI en español (es-BO).

Objetivo de producto: dar a conocer los institutos para que la gente se postule; cada instituto tiene su
propia página.

---

## 2. Repositorios y despliegue (estado actual)

- **GitHub (único remoto)**: `github` → `https://github.com/Marylm153/institutosweb.git`
- **Render** (autodeploy en cada push a `main`): https://institutosweb.onrender.com/
- **GitHub Pages** (GitHub Actions, `.github/workflows/deploy.yml`): https://marylm153.github.io/institutosweb/
- **Codeberg ya NO se usa** (se eliminaron remoto, `.forgejo/`, `scripts/publish-pages.ps1` y rama `pages`).

Flujo de publicación:
```powershell
git add -A
git commit -m "mensaje"
git push github main      # dispara Render (autodeploy) y GitHub Actions (Pages)
```

Comandos:
- `npm install`
- `npm run dev` — servidor local
- `npm run build` — `tsc -b && vite build`. **Es la ÚNICA verificación** (no hay tests ni lint). Ejecútalo tras cada cambio.
- `npm run preview` — sirve el build
- `python scripts/to-webp.py` — convierte fotos nuevas a WebP (requiere `pip install pillow`)

Regla crítica: `vite.config.ts` **debe mantener `base: './'`**. Un valor como `'./institutosweb/'` rompe los assets.

---

## 3. Arquitectura de archivos

```
src/
  main.tsx            # monta <HashRouter>, importa la fuente Archivo y styles.css
  App.tsx             # rutas: "/" Home, "/instituto/:slug" InstitutePage, "*" NotFound
                      #   + skip-link, foco en cambio de ruta, MobileNav (se oculta en la ficha)
  components/
    SiteHeader.tsx    # header con logo oficial; auto-oculta al bajar en móvil
    SiteFooter.tsx    # footer oscuro
    MobileNav.tsx     # barra inferior fija en móvil
  hooks/useScrollTo.ts
  pages/
    Home.tsx          # portada (hero, catálogo, mapa, guía, CTA, vitrina)
    InstitutePage.tsx # ficha individual de cada instituto (todas las secciones)
    NotFound.tsx
  data/
    types.ts          # todos los tipos del dominio
    institutes.ts     # LISTADO resumen (tarjetas de la home). Debe incluir slug + hasDetail
    institutes/<slug>.ts  # DETALLE completo de un instituto
    index.ts          # registra detalles; exporta getInstitute, getInstituteDetail,
                      #   publishedInstitutes, featuredProducts, institutes
    media.ts          # import.meta.glob de fotos, galleryFor, heroSlides, CAREER_LABELS
  styles.css          # ÚNICO stylesheet global (tokens en :root + componentes). Mobile-first
Assets/
  images/institutos/<slug>/<carrera>/*.webp   # fotos (globbed por media.ts)
  images/portada.webp, logo.png, logo-lockup.png, logo gobernacion.png
  documentos/*.pdf    # PDFs descargables (importados con ?url)
scripts/to-webp.py
Docs/                 # material fuente de cada instituto (IGNORADO por git)
```

Tecnologías: React 18, React Router 6 (HashRouter), Vite 6, TypeScript 5, Leaflet 1.9,
lucide-react (iconos), `@fontsource-variable/archivo` (fuente). CSS propio, sin Tailwind.

---

## 4. Estado de los institutos

**Publicados (8)** — aparecen en la home y tienen ficha (`hasDetail: true`):
`2-de-agosto`, `uriondo`, `capacitacion-musical`, `emborozu`, `bermejo`, `san-ignacio`, `incos-tarija`, `san-andres`.

**Ocultos (7)** — existen en `institutes.ts` pero **no** aparecen en la home (`hasDetail: false`), a la espera de información:
`tarija`, `oconnor`, `yunchara`, `eustaquio-mendez`, `mario-estenssoro`, `orquesta-juvenil`, `artes-plasticas`.

> La home muestra solo `publishedInstitutes` (`institutes.filter(i => i.hasDetail)`), también en el mapa.
> Nota: `emborozu-inte-p` se **fusionó** dentro de `emborozu` (Veterinaria y Zootecnia como Sub Sede) y ya no existe.

---

## 5. Cómo AGREGAR un instituto nuevo

1. **Fotos**: cópialas a `Assets/images/institutos/<slug>/<carrera>/` (o `/general/` si no son por carrera).
   Nombra la portada `00-portada.*` (se ordena primero y se usa como carátula).
2. **Convertir a WebP** (borra los originales):
   ```powershell
   python scripts/to-webp.py Assets/images/institutos/<slug>
   ```
3. **Crear el detalle**: `src/data/institutes/<slug>.ts` exportando un objeto `InstituteDetail`
   (usa uno existente como plantilla, p. ej. `bermejo.ts` para simple o `san-ignacio.ts` para completo).
4. **Registrar** en `src/data/index.ts`:
   ```ts
   import { miInstituto } from './institutes/<slug>'
   // ...y añádelo al mapa:
   const details: Record<string, InstituteDetail> = { /* ... */ [miInstituto.slug]: miInstituto }
   ```
5. **Marcar en el listado**: en `src/data/institutes.ts`, la entrada del instituto debe tener
   `hasDetail: true` (y estar presente con su `slug`).
6. **Etiquetas de fotos**: si usas carpetas de carrera nuevas, añade su nombre legible en
   `CAREER_LABELS` de `src/data/media.ts` (el `mediaKey` de la carrera = nombre de la carpeta).
7. **PDFs (opcional)**: cópialos a `Assets/documentos/`, impórtalos con `?url` y agrégalos a `documents`.
8. **Verificar y publicar**: `npm run build` → commit → `git push github main`.

### Cómo OCULTAR un instituto
- Pon `hasDetail: false` en `src/data/institutes.ts`. Desaparece de la home y del mapa, pero conserva
  datos, fotos y su URL `/instituto/<slug>` (muestra "Ficha en preparación"). No borres nada.

### Cómo ELIMINAR un instituto
- Quita su entrada de `institutes.ts`, borra `src/data/institutes/<slug>.ts`, quita el registro en
  `index.ts` y borra `Assets/images/institutos/<slug>/`.

---

## 6. Modelo de datos (resumen de `src/data/types.ts`)

`InstituteDetail` (la mayoría de campos opcionales se **ocultan** si no existen):
- `slug`, `officialName`, `type` ('Técnico' | 'Artístico'), `municipality`, `province`
- `founded?`, `studentCount?`, `authority?`, `authorityRole?`
- `mission?`, `vision?` (opcionales: si faltan, se oculta el bloque)
- `summary` (se muestra como texto del hero), `about?` (párrafo breve al inicio de "Resumen")
- `logo?`, `history?[]`, `achievements?[]`
- `oferta?: { title; items[] }[]` (bloques: valores, objetivos, servicios, etc.)
- `vitrina?: { title; note?; items: { name; presentation?; description? }[] }[]`
- `authorities?: { role; name }[]`, `convenios?: string[]`, `documents?: { label; file }[]`
- `sedes: Sede[]`, `carreras?: Carrera[]`, `faqs: { question; answer }[]`, `contact`, `products?`

`Carrera`: `name`, `mediaKey` (carpeta de fotos), `sede`, `level`, `duration`, `regime`, `modality`,
`schedule?` (turnos), `degree`, `profile[]`, `workField[]`, `infrastructure[]`,
`curriculum: CurriculumYear[] | null`, `curriculumNote?`, `curriculumImage?`.

`CurriculumYear = { year; subjects: CurriculumSubject[] }` y
`CurriculumSubject = { code; name; hours; prerequisite? }`.

`Sede`: `name`, `address`, `reference?`, `coordinates {lat,lng}`, `whatsapp?`, `schedule?`,
`days?`, `ages?`, `teacher?`, `instruments?[]`, `mapUrl?`.

`contact`: `whatsapp?`, `phones?[]`, `email?`, `facebook?`, `hours?`.

`Institute` (listado): `slug`, `name`, `shortName`, `type`, `location`, `province`, `focus`, `initials`,
`programs[]`, `description`, `hasDetail`, `coordinates?`.

---

## 7. Cómo funciona la home (`src/pages/Home.tsx`)

- **Hero**: elige al azar una foto entre las galerías de los institutos (`heroSlides()`), muestra la
  etiqueta "Ahora" con el instituto + carrera (enlace a su ficha), titular, buscador (`<form role="search">`)
  y un control para cambiar de foto.
- **Catálogo**: solo `publishedInstitutes`; filtros Todos/Técnicos/Artísticos; buscador por nombre,
  ubicación, provincia, enfoque y carreras; cada tarjeta enlaza a `/instituto/<slug>`.
- **Mapa**: Leaflet + OpenStreetMap con marcadores SVG (`markerIcon`, rojo=técnico / ocre=artístico) desde
  las coordenadas del instituto y sus sedes; incluye lista textual de sedes.
- **Cómo postular**: 3 pasos con acciones reales (WhatsApp/correo del 2 de Agosto).
- **CTA** y **Vitrina** (`featuredProducts` en `src/data/index.ts`).

## 8. Cómo funciona la ficha (`src/pages/InstitutePage.tsx`)

Secciones condicionales (aparecen solo si hay datos) + subnavegación sticky con scrollspy:
`Resumen` (about + misión/visión + autoridades) · `Oferta` · `Carreras` · `Vitrina` · `Convenios` ·
`Sedes` · `Galería` · `Descargas` · `FAQ` · `Contacto`. En móvil hay barra inferior de acciones
(WhatsApp / Llamar / Cómo llegar). El logo del instituto (si existe) va sobre chip blanco.

---

## 9. Cómo cambiar el diseño / elementos visuales

- **Colores y tokens**: todo en `:root` de `src/styles.css`
  (`--red #9f1720`, `--ochre #8a5a2b`, `--ink`, `--ink-2`, `--ink-3`, `--line`, `--surface`, `--surface-2`,
  `--r-sm/md/lg/full`, sombras). Cambia ahí para repintar el sitio.
- **Tipografía**: se carga en `src/main.tsx` con `import '@fontsource-variable/archivo'`. Para cambiarla,
  instala otro `@fontsource-variable/<fuente>`, cambia el import y `font-family` en `:root`.
- **Layout**: mobile-first; media queries en `720px`, `960px`, `1100px` dentro de `styles.css`.
- **Componentes**: se estilan por clase en `styles.css` (no CSS modules). Clases clave:
  `site-header`, `mobile-nav`, `hero`, `institute*`, `vitrina*`, `sede*`, `career*`, `gallery*`, `detail*`, `convenios`, `downloads`.
- **Iconos**: `lucide-react`.
- **Logo**: `Assets/images/logo-lockup.png` es el lockup **blanco** recortado; va sobre superficies
  rojas/oscuras (chip del header y footer). No lo pongas sobre fondo claro (los logos son blancos).

---

## 10. Fotos e imágenes (importante)

- Se cargan con `import.meta.glob('../../Assets/images/institutos/**/*.{jpg,jpeg,png,webp}')` en `src/data/media.ts`.
- Formato de publicación: **WebP** (reduce mucho el peso). Convierte con `python scripts/to-webp.py`.
- Nombra las imágenes para controlar el orden (la portada de cada instituto es la primera al ordenar).
- La portada general del hero por defecto es `Assets/images/portada.webp`.
- PDFs van a `Assets/documentos/` (NO a `Assets/docs`: la regla `Docs/` del `.gitignore` los ocultaría por
  insensibilidad a mayúsculas) y se importan con `?url`.

---

## 11. Cómo se procesó el material de `Docs/` (para futuras integraciones)

`Docs/` está **ignorado por git** y contiene el material fuente de cada instituto. Técnicas usadas:
- **.docx** → se extrae el texto leyendo `word/document.xml` del zip (sin dependencias). Las imágenes
  embebidas están en `word/media/*` y se extraen con PowerShell/`zipfile`.
- **PDF** → texto con `pypdf` (`python -m pip install pypdf pillow`). Las mallas suelen venir como **imagen**.
- **Imágenes** → se convierten a WebP con **Pillow** (max 1200 px, calidad 70).
- Varios institutos trajeron las **mallas transcritas** por el usuario en `.docx`/`.txt`; se transcribieron a
  `CurriculumYear[]` (código, asignatura, horas, prerrequisito). Si no hay texto, se usa `curriculum: null`
  + nota "pendiente" o `curriculumImage`.

---

## 12. Gotchas (errores a evitar)

- `npm run build` es la única verificación; córrela tras cada cambio.
- Mantén `HashRouter` (sitio estático, sin rewrites) y `base: './'`.
- No muevas assets a `public/`; se importan desde `src`/`Assets`.
- `.gitignore` ignora `Docs/`, `.opencode/`, `.impeccable/`, `node_modules/`, `dist/`.
- El workflow de GitHub Pages vive en `.github/workflows/deploy.yml`; Render despliega solo desde GitHub.
- Leaflet usa `divIcon` con SVG propio (no depende de los PNG por defecto de Leaflet).
- Render en plan gratuito puede "dormirse" y tardar unos segundos en despertar.
- Tras un push, la caché del navegador puede mostrar la versión anterior: fuerza recarga (Ctrl+F5).

---

## 13. Pendientes / ideas para seguir

- Integrar los **7 institutos ocultos** a medida que envíen información (basta con `hasDetail: true` + su ficha).
- Comprimir el **catálogo PDF de Emborozú** (~17 MB) si se quiere aligerar el repositorio.
- Posibles mejoras de diseño: tipografía con más carácter, `prefers-reduced-motion` ya incluido, afinar contraste.
- No hay tests ni lint: si se agregan, documentar los comandos en `AGENTS.md`.

---

## 14. Historial reciente (commits clave)

- Rediseño minimalista mobile-first (hero full-bleed, paleta rojo/ocre, fuente Archivo, barra inferior móvil).
- Corrección de apilamiento del mapa y header auto-oculto en móvil.
- Migración de fotos a **WebP** y script `scripts/to-webp.py`.
- Integración de institutos: 2 de Agosto, Uriondo, Capacitación Musical, Emborozú, Bermejo,
  San Ignacio de Loyola (ITSIL), INCOS Tarija y Agropecuario San Andrés (ITASA).
- Se ocultaron los institutos sin ficha y se quitó la sección de descargas con datos sensibles del INCOS
  (se conservó solo el formulario oficial de inscripción).
