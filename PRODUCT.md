# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Toda la comunidad tarijeña, con foco en estudiantes y postulantes que eligen una carrera técnica, tecnológica o artística, junto con sus familias. Usan la plataforma para descubrir qué institutos existen, qué ofrecen, dónde están y cómo iniciar su postulación. También sirve a la ciudadanía que busca productos, servicios y actividades de los institutos. Éxito significa que la oferta de los institutos sea conocida y consultada.

## Product Purpose

Plataforma web oficial, accesible y centralizada que visibiliza la oferta académica de los institutos técnicos, tecnológicos y artísticos dependientes del Gobierno Autónomo Departamental de Tarija. Existe para democratizar el acceso a la información educativa, orientar a los postulantes y promocionar los productos y servicios de los institutos.

## Positioning

Es el portal institucional oficial del Gobierno Autónomo Departamental de Tarija que reúne en un solo lugar la oferta de los institutos de todo el departamento, con un espacio propio para cada uno. No es un agregador privado ni una plataforma de inscripción: es la fuente pública y verificada que da a conocer las vocaciones productivas y culturales de cada región.

## Operating Context

- La Gobernación y cada instituto aportan la información y las fotografías; la integración es progresiva porque contactar a los institutos toma tiempo.
- Los contenidos se cargan manualmente en el repositorio; quien administra actualiza datos e imágenes y el sitio se reconstruye.
- Se requiere una demostración presentable a corto plazo, empezando por el Instituto Tecnológico 2 de Agosto – Iscayachi.
- El proyecto nace con recursos cero: no hay hosting ni almacenamiento provisto por la Gobernación.
- La información de la mayoría de los institutos todavía no fue recibida.

## Capabilities and Constraints

- Sitio estático sin backend, sin base de datos, sin cuentas de usuario, sin formularios que persistan datos y sin pagos.
- Solo se publica información; no se gestionan inscripciones en línea.
- Debe costar 0 USD y usar exclusivamente software y dependencias open source.
- Se publica en un hosting estático gratuito (Codeberg Pages), con repositorio público.
- Idioma único: español (es-BO).
- Cada instituto debe tener su propio espacio con URL propia; el 2 de Agosto ya cuenta con detalle completo.
- Alcance confirmado: 15 registros (12 institutos técnicos/tecnológicos y 3 artísticos), con la Capacitación Musical como espacio independiente.
- Mientras no haya más administradores, un único usuario administrador gestiona todo el contenido.
- Datos aún pendientes: malla curricular del 2 de Agosto, y la información de los otros institutos.
- Las convocatorias oficiales aún no están disponibles y se muestran como "próximamente".

## Brand Commitments

- Identidad institucional oficial del Gobierno Autónomo Departamental de Tarija.
- Paleta rojo y blanco, coherente con la Gobernación.
- Uso de los logotipos oficiales disponibles en `Assets/images/`.
- Los colores y logotipos deben respetar los lineamientos institucionales cuando existan.

## Evidence on Hand

- `Docs/Propuesta.txt`: propuesta técnica y estructura de secciones del portal.
- `Docs/Institutos.txt`: informe con la oferta académica de la gestión 2026.
- `Docs/primer instituto/`: informe completo del Instituto 2 de Agosto y 35 fotografías reales de sus carreras.
- `Assets/images/portada.jpg`, `Assets/images/logo.png`, `Assets/images/logo gobernacion.png`.
- `Assets/colors/colors.txt`: mapa de colores de referencia.
- Ausencias que no deben inventarse: requisitos y calendario oficial confirmados, mallas curriculares, datos de los institutos restantes, videos y piezas gráficas.

## Product Principles

1. La información oficial y verificable manda; no se publican datos sin confirmar.
2. Cada instituto tiene su espacio propio y reconocible, con igual trato entre técnicos y artísticos.
3. Pensado primero para celular y conexiones lentas, porque es el dispositivo principal del estudiante.
4. Costo cero y software open source son restricciones no negociables, no preferencias.
5. La actualización de contenidos debe ser simple para el personal de la Gobernación y de cada instituto.

## Accessibility & Inclusion

- Objetivo de accesibilidad WCAG 2.2 nivel AA.
- Diseño mobile-first, usable con conexiones lentas.
- Navegación clara, textos legibles y contraste adecuado.
- Contenido en español de Bolivia (es-BO).
