---
target: homepage (src/pages/Home.tsx)
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\Yemih\\Proyects\\Institutos\\src\\pages\\Home.tsx"
target_fingerprint: "sha256:8210669b12bc45efada4b08ac1fb22dc3ee6f3d7e2c4537d35334a9334965a54"
target_path: "C:\\Users\\Yemih\\Proyects\\Institutos\\src\\pages\\Home.tsx"
timestamp: 2026-10-02T14-31-25Z
slug: src-pages-home-tsx
---
# Critique — Home (`src/pages/Home.tsx`)

Method: dual-agent (A: design review subagent · B: detector subagent)

## Design Health Score

| # | Heurística | Score | Problema clave |
|---|-----------|:--:|---|
| 1 | Visibilidad del estado | 3 | El buscador filtra en vivo pero el resultado (`result-count`) vive fuera de pantalla; "Buscar" solo hace scroll. |
| 2 | Lenguaje del mundo real | 3 | Terminología correcta, pero "Ahora en portada" es jerga de broadcast y la vitrina muestra productos sin procedencia. |
| 3 | Control y libertad | 3 | Sin "limpiar" visible cuando hay resultados ni filtro activo; el mapa no permite deseleccionar. |
| 4 | Consistencia y estándares | 2 | Doble estándar: tarjetas de instituto siempre son enlace (a fichas vacías), pero los productos sin detalle ya son `<article>`; Facebook es texto no clicable. |
| 5 | Prevención de errores | 3 | Búsqueda tolerante y buen estado vacío; el usuario puede "entrar" a una ficha vacía creyendo que hay contenido. |
| 6 | Reconocimiento antes que recuerdo | 3 | Filtros visibles, pero el hero pide teclear carreras sin sugerencias ni chips. |
| 7 | Flexibilidad y eficiencia | 3 | Tablist de carreras teclable; el mapa no tiene operación de teclado real. |
| 8 | Estético y minimalista | 2 | Paleta limpia, pero intro y catálogo repiten el mismo mensaje, 4 CTA llevan al mismo instituto y una sección la sostiene "Próximamente". |
| 9 | Reconocer/recuperar errores | 3 | Buen 404 y buen estado vacío; el buscador no explica qué se puede buscar al dar 0. |
| 10 | Ayuda y documentación | 1 | La "Guía del postulante" son dos "Próximamente" y una FAQ; para el trabajo central (cómo postular) no hay documentación real. |
| **Total** | | **26/40** | **Acceptable** |

## Veredicto de especificidad de diseño

Híbrido: firma narrativa propia, estructura intercambiable. La firma: el titular, la marca de agua de iniciales (conecta hero y badges) y la etiqueta "Ahora en portada". Lo genérico: la plantilla de secciones y el tratamiento `eyebrow + h2(em) + descripción` repetido 6 veces, que aplana la jerarquía; y la vitrina productiva, el diferenciador más fuerte del producto, resuelta con degradados y `Sparkles` sin producto, foto ni procedencia, teniendo 35 fotos reales. El header no usa el logotipo oficial (solo el footer).

Detector: markup (`src/pages`, `src/components`, `index.html`) → 0 hallazgos (exit 0). Scan de `src` → 1 hallazgo: `overused-font` en `styles.css:1` (`font-family: Arial`). Arial sí está en el matcher interno del binario (no es falso positivo), aunque la descripción lo omite. Los `side-tab` de la pasada anterior ya no aparecen.

Overlays en navegador: no disponibles (`browser visualization skipped: no browser automation available`).

## Impresión general

El hero dejó de ser genérico y ahora es la firma de marca. Pero la página se cae después: repite el mismo mensaje y su trabajo central —cómo postular— está ocupado por dos placeholders. El mayor activo (35 fotos + la vitrina) está escondido tras un enlace o reducido a degradados.

## Lo que funciona

1. El hero como firma: titular con peso, iniciales translúcidas y etiqueta de procedencia; el motivo de iniciales se reutiliza con los badges.
2. Honestidad institucional: "Próximamente" / "Ficha en preparación" respetan el principio de no inventar datos.
3. Accesibilidad inusual para un sitio estático: skip link, foco en cambio de ruta, 404 real, tablist con roving tabindex y flechas, `aria-live`, fallback textual del mapa y `prefers-reduced-motion`.

## Priority Issues

### [P0] La home no resuelve cómo postular
- Qué: "Guía del postulante" son dos tarjetas "Próximamente" y la convocatoria solo dice "próximamente" (`Home.tsx:115-122`, `:130`).
- Por qué: el usuario principal es postulante; la página entusiasma y no responde la única pregunta que decide su viaje.
- Fix: convertir el bloque en acciones de hoy: "Escríbenos para pedir la convocatoria", "Visita una sede", "Documentos base y contacto por instituto", con WhatsApp/email del 2 de Agosto como CTA.
- Comando: `/impeccable harden` o `/impeccable onboard`

### [P0] Las tarjetas sin ficha siguen siendo enlaces con flecha
- Qué: `InstituteCard` siempre renderiza `Link` + "Ficha en preparación + ArrowUpRight" (`Home.tsx:221-233`), contradiciendo el patrón aplicado a productos.
- Por qué: bait-and-switch 14 de 15 veces; rompe la confianza y perjudica a teclado/lector de pantalla.
- Fix: si `!hasDetail`, renderizar `<article>` no interactivo, sin flecha, con estado pasivo.
- Comando: `/impeccable harden`

### [P1] Monotonía estructural de encabezados
- Qué: seis secciones con idéntico `eyebrow + h2(em) + descripción derecha` y `<br />` duros.
- Por qué: aplana la jerarquía y agota el recurso italic de la firma.
- Fix: quitar `eyebrow` en 2-3 secciones, dejar fluir los `h2`, y dar a la vitrina un layout distinto.
- Comando: `/impeccable layout`

### [P1] La vitrina desperdicia el diferenciador
- Qué: 4 tarjetas con degradado y `Sparkles`, sin foto ni instituto; 2 de 4 no interactivas.
- Por qué: es lo más específico del producto y lo más genérico de la página; hay 35 fotos reales sin usar.
- Fix: una pieza destacada con foto real + lista compacta con instituto; menos tarjetas, más sustancia.
- Comando: `/impeccable bolder` (scoped a la vitrina)

### [P2] Mapa: marcadores apilados e inaccesibles
- Qué: `div role=region tabIndex=0` sin operación de teclado; varias instituciones comparten coordenadas exactas y sus pines se superponen.
- Por qué: la parada de tabulación no es operable y los pines no se distinguen.
- Fix: no enfocar el mapa si no es operable; `aria-describedby` a la lista textual; desagrupar/clusterizar marcadores.
- Comando: `/impeccable harden` o `/impeccable adapt`

## Persona Red Flags

- **Jordan (primerizo)**: busca sin conocer carreras ni tener sugerencias; casi cualquier tarjeta lleva a "Ficha en preparación"; no puede saber cómo inscribirse.
- **Casey (móvil)**: hero de 620px + catálogo de 15 tarjetas en una columna antes del mapa; sin CTA fijo; las tarjetas de producto no interactivas no dan nada al toque.
- **Sam (accesibilidad)**: el mapa es una parada de tabulación sin teclado; las tarjetas sin ficha navegan a páginas vacías anunciadas como interactivas; el foco rojo sobre fondos rojos puede no percibirse.
- **Riley (edge cases)**: coordenadas duplicadas generan pines superpuestos; `type.slice(0,-1)` se rompe con "Técnica"; el estado vacío borra búsqueda y filtro a la vez sin aviso.

## Observaciones menores

- `studentCount` ("70 estudiantes aproximadamente") desborda la lógica de un tile de estadística.
- Variable `agradecimientos` asignada a `detail.province` (`InstitutePage.tsx:62`): nombre engañoso.
- `og:image` ausente; se desaprovecha el material fotográfico al compartir.
- Gradientes de producto decorativos, ajenos al sistema rojo(técnico)/ocre(artístico).
- El botón "Ver todos los institutos" dentro del mapa hace scroll hacia arriba.
- El contador de resultados comparte fila con los filtros y puede leerse como un cuarto filtro.
- Facebook en la tarjeta de contacto es texto no clicable.

## Questions to Consider

1. Si solo un instituto tiene datos, ¿el catálogo de 15 debe parecer completo, o conviene un estado explícito "publicado vs. pendiente"?
2. Las 35 fotos reales están escondidas: ¿por qué la home no es un recorrido de lo que ya existe?
3. Si el ocre solo aparece como tinte y gradiente, ¿los institutos artísticos tienen voz propia o solo otro matiz?
4. Si hoy no hay fechas, ¿cuál es el único trabajo que la home puede cumplir con certeza: orientar y conectar?
5. La marca de agua de iniciales: ¿contenido o decoración? ¿Qué pasaría si mostrara sede/provincia/estado real?
