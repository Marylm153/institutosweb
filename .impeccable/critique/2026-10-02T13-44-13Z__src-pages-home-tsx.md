---
target: homepage (src/pages/Home.tsx)
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\Yemih\\Proyects\\Institutos\\src\\pages\\Home.tsx"
target_fingerprint: "sha256:ebf673a8d319c1807163cbf2230d9e40e23a21877a4b91771492ac8cd06cd239"
target_path: "C:\\Users\\Yemih\\Proyects\\Institutos\\src\\pages\\Home.tsx"
timestamp: 2026-10-02T13-44-13Z
slug: src-pages-home-tsx
closed: true
---
# Critique — Home (`src/pages/Home.tsx`)

Method: dual-agent (A: design review subagent · B: detector subagent)

## Design Health Score

| # | Heurística | Score | Problema clave |
|---|-----------|:--:|---|
| 1 | Visibilidad del estado | 2 | El filtro activo solo cambia por clase CSS, sin `aria-pressed`; el contador "N instituciones" lleva un `ChevronDown` que sugiere un desplegable inexistente. |
| 2 | Coincidencia con el mundo real | 3 | Vocabulario es-BO correcto (sedes, malla, vitrina), pero "Guía del postulante" promete acciones que no entrega. |
| 3 | Control y libertad | 2 | El hero se randomiza en cada carga sin control; "Buscar" no ofrece retorno; no hay volver-arriba. |
| 4 | Consistencia y estándares | 3 | Coherente en general, pero `InfoCard` dibuja una flecha de interactividad sobre un `<article>` no clickeable. |
| 5 | Prevención de errores | 2 | 14 de 15 tarjetas invitan a entrar a un placeholder; no hay filtro "con información". |
| 6 | Reconocer antes que recordar | 3 | Chips de carrera y mapa ayudan, pero el buscador ignora `province` y los colores de badge no tienen leyenda. |
| 7 | Flexibilidad y eficiencia | 2 | Sin orden, sin atajos, sin poder ocultar los institutos sin contenido. |
| 8 | Estética y minimalismo | 3 | Limpio y con aire, pero gradientes decorativos y `Sparkles` no informan mientras el mapa sí. |
| 9 | Reconocer/diagnosticar/recuperar errores | 2 | Buen estado vacío del buscador, pero una URL mal escrita renderiza Home en silencio (`path="*"`). |
| 10 | Ayuda y documentación | 2 | Las FAQ solo viven dentro de 2 de Agosto y remiten a una "Zona de descargas" que no existe. |
| **Total** | | **24/40** | **Acceptable** |

## Veredicto de especificidad de diseño

Híbrido: auténtico en los datos, genérico en la composición. El esqueleto (hero + buscador → intro → grilla → banda con mapa → 3 tarjetas → callout → productos) es reciclable de cualquier landing. Auténticos: el mapa con sedes reales, el hero que rota fotos reales con enlace al instituto, y los estados honestos ("Información en preparación", "Convocatorias próximamente"). Genéricos: titular intercambiable, seis secciones repitiendo `eyebrow` + `h2` serif con una palabra en cursiva, y 8 acentos de color arbitrarios contra el compromiso rojo/blanco.

Detector: sobre `src/pages`, `src/components`, `index.html` → 0 hallazgos (exit 0). Pasada de control sobre `src` (incluye CSS) → 3 hallazgos en `src/styles.css`: `side-tab` ×2 (`styles.css:117` `.pending-box`, `styles.css:155` `.pending-inline`, ambos `border-left: 3px solid`), y `overused-font` ×1 (`styles.css:1`, `font-family: Arial`, probable falso positivo). El markup limpio indica que el detector no cubre afordancias muertas ni semántica de estado.

Overlays en navegador: no disponibles (`browser visualization skipped: no browser automation available`).

## Impresión general

Página limpia y honesta con un activo insustituible: el mapa departamental con sedes reales. Pero se presenta como plantilla. El problema más grave no es estético sino de confianza: el portal invita a postular y luego no entrega nada clickeable en el punto de mayor intención. Mayor oportunidad: que el mapa y el hero lideren y que la guía deje de fingir enlaces.

## Lo que funciona

1. Mapa departamental con datos reales (`TarijaMap`, `Home.tsx:193`): marcadores desde las sedes de los datos, enlazados al detalle.
2. Hero anclado en evidencia local (`heroSlides`, `media.ts:42`): fotos reales por carrera, enlace al instituto.
3. Comunicación honesta del estado oficial: `hasDetail`, "Información en preparación", "Convocatorias próximamente".

## Priority Issues

### [P0] Las tarjetas de "Guía del postulante" son afordancias muertas
- Qué: `InfoCard` (`Home.tsx:182`) muestra icono, texto instructivo y `circle-arrow`, sin `<Link>` ni destino.
- Por qué: es el corazón de la promesa a postulantes; enseña que lo clickeable no responde (heurísticas 2, 4, 10).
- Fix: convertir cada tarjeta en sección/estado real (aunque sea "Próximamente" honesto) o quitar la flecha y rotularlas como pendientes.
- Comando: `/impeccable harden`

### [P0] Semántica de estado ausente (falla WCAG AA)
- Qué: filtros sin `aria-pressed` (`Home.tsx:67`); menú móvil con `aria-label="Abrir menú"` fijo y sin `aria-expanded` (`SiteHeader.tsx:52`); `hero-shuffle` anuncia solo "01 / 06".
- Por qué: un lector de pantalla no sabe qué filtro está activo ni si el menú está abierto (4.1.2, 2.4.6). Bloqueante para AA.
- Fix: `aria-pressed`/`role="tab"` en filtros, `aria-expanded` + label dinámico en el menú, `aria-label` en el shuffle.
- Comando: `/impeccable audit`

### [P1] El catálogo sobrepromete: 14 de 15 tarjetas llevan a un placeholder
- Qué: todas las tarjetas son `Link` a `/instituto/:slug` (`Home.tsx:169`), pero solo 2 de Agosto tiene detalle.
- Por qué: anticlímax serial que erosiona la confianza (heurísticas 5, 7).
- Fix: chip "Con información disponible" y/o degradar visualmente las tarjetas sin detalle, destacando 2 de Agosto.
- Comando: `/impeccable clarify`

### [P1] Sin skip-link, sin gestión de foco; el mapa es inaccesible
- Qué: no hay skip-to-content; `ScrollToTop` (`App.tsx:8`) solo hace scroll, no mueve foco; el mapa es un `div` con `aria-label`, no focusable, con popups solo por ratón.
- Por qué: en una SPA el lector de pantalla no percibe el cambio de página; el mapa es inalcanzable (2.4.1, 1.1.1).
- Fix: skip link al `<main>`, foco al `h1` en cada ruta, lista textual de sedes bajo el mapa.
- Comando: `/impeccable audit`

### [P2] Composición genérica y paleta que diluye la identidad
- Qué: patrón repetido `eyebrow`+`h2` con `<em>` en cursiva; 8 acentos de badge sin leyenda (`styles.css:61`); voz tipográfica Arial de sistema; bordes `border-left` de 3px (detector `side-tab` ×2).
- Por qué: contradice el compromiso rojo/blanco y hace sentir el sitio como plantilla.
- Fix: reducir a rojo/blanco + un acento por tipo; romper el patrón de encabezados; quitar los bordes laterales; elegir una voz tipográfica con carácter.
- Comando: `/impeccable bolder` + `/impeccable colorize`

## Persona Red Flags

- **Jordan (primerizo)**: "Técnico Superior" y el filtro Técnicos/Artísticos se asumen; "Calendario", "Requisitos" y "Preguntas" no responden; casi todos los institutos llevan a "Información en preparación"; iniciales/colores sin explicación.
- **Casey (móvil, distraída)**: hero de 595px antes del contenido; `.filter-tabs { overflow: auto }` esconde "Artísticos" sin indicador; el mapa captura el gesto táctil; foto de hero como `background-image` (vacío en 2G); `ChevronDown` del contador sin respuesta.
- **Sam (lector de pantalla/teclado)**: filtros sin estado accesible; menú sin `aria-expanded`; shuffle sin nombre; mapa sin rol/foco ni alternativa textual; sin skip-link ni movimiento de foco al cambiar de ruta; `gallery-filters` y `career-tab` sin `aria-pressed`/`aria-controls`.
- **Riley (edge-case)**: URL desconocida renderiza Home sin aviso (`App.tsx:24`); buscar "Méndez" o "Arce" no da resultados (el buscador omite `province`); coordenadas de Cercado repetidas apilan marcadores; `initials: 'EM'` duplicado; `InstitutePage` hardcodea highlights en vez de usar `detail.highlights`.

## Observaciones menores

- "Contacto" del footer apunta a `instituto2deagosto@gmail.com` para todo el portal.
- "Vinos y singanis" enlaza a `/instituto/uriondo`, que es placeholder (`data/index.ts:21`).
- CSS muerto del mapa decorativo anterior: `.map-lines`, `.map-pin`, `.map-label`, `.map-card`, `.product-info button` (`styles.css:78-84`).
- `index.html` sin Open Graph/Twitter, sin favicon y con `description` genérica.
- Texto pequeño/bajo contraste: `.footer-bottom` (10px `#827472` sobre `#21191a`), `.product-info p` (11px), `.topline` (11px).
- `scroll-behavior: smooth` y transiciones sin `prefers-reduced-motion`.
- Imágenes sin `width/height` → riesgo de CLS.
- "Técnicos" (filtro) vs "Técnico" (tarjeta): inconsistencia de copy.

## Questions to Consider

1. Si el mapa es la joya del sitio, ¿por qué está tercero, pequeño y es lo menos accesible? ¿Y si fuera la homepage?
2. Los 14 institutos sin información, ¿deben verse como tarjetas completas que parecen listas, o como un listado discreto "en camino"?
3. ¿El mensaje honesto "convocatorias próximamente" debería estar en el hero en vez de una promesa de postulación que la página no puede cumplir?
4. ¿Cómo se ve la homepage para un estudiante en 2G sin foto de fondo? ¿Sobrevive la jerarquía sin imagen?
5. ¿Qué se gana con 8 acentos y qué se pierde frente a la identidad rojo/blanco de la Gobernación?
