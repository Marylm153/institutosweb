import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  Search,
} from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import portada from '../../Assets/images/portada.jpg'
import {
  featuredProducts,
  galleryFor,
  getInstitute,
  getInstituteDetail,
  heroSlides,
  institutes,
  type Institute,
} from '../data'
import { useScrollTo } from '../hooks/useScrollTo'

const typeFilters = ['Todos', 'Técnicos', 'Artísticos']
const WHATSAPP = '59172975420'
const EMAIL = 'instituto2deagosto@gmail.com'

export default function Home() {
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState('Todos')
  const scrollTo = useScrollTo()

  const filteredInstitutes = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase('es')
    return institutes.filter((institute) => {
      const matchesType = activeType === 'Todos' || institute.type === activeType.slice(0, -1)
      const searchableText = [institute.name, institute.location, institute.province, institute.focus, ...institute.programs]
        .join(' ')
        .toLocaleLowerCase('es')
      return matchesType && searchableText.includes(normalizedQuery)
    })
  }, [activeType, query])

  const productImages: Record<string, string | undefined> = {
    'Producción agrícola': galleryFor('2-de-agosto', 'agropecuaria')[0]?.src,
    'Panificación y lácteos': galleryFor('2-de-agosto', 'industria-alimentos')[0]?.src,
  }
  const featureIndex = featuredProducts.findIndex((product) => productImages[product.title])
  const feature = featuredProducts[featureIndex >= 0 ? featureIndex : 0]
  const featureImage = productImages[feature.title] ?? portada
  const otherProducts = featuredProducts.filter((product) => product !== feature)

  return (
    <main id="main-content" tabIndex={-1}>
      <Hero onSearch={() => scrollTo('institutos')} query={query} setQuery={setQuery} />

      <section className="intro container">
        <div>
          <h2>Una educación conectada con nuestra <em>tierra.</em></h2>
        </div>
        <div className="intro-note">
          <p>Formación práctica y pertinente para las vocaciones productivas, culturales y tecnológicas de cada provincia.</p>
          <button className="text-link" onClick={() => scrollTo('institutos')}>Explorar instituciones <ArrowUpRight size={17} /></button>
        </div>
      </section>

      <section className="catalog section-space" id="institutos">
        <div className="container">
          <div className="section-heading">
            <div><h2>Elige dónde <em>comenzar.</em></h2></div>
            <p className="section-description">Institutos públicos que abren oportunidades de formación superior en Tarija.</p>
          </div>
          <div className="filter-row">
            <div className="filter-tabs" role="group" aria-label="Filtrar institutos por tipo">
              {typeFilters.map((filter) => (
                <button
                  className={activeType === filter ? 'active' : ''}
                  aria-pressed={activeType === filter}
                  key={filter}
                  onClick={() => setActiveType(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="result-count" aria-live="polite">
              {filteredInstitutes.length === 1 ? '1 institución' : `${filteredInstitutes.length} instituciones`}
            </div>
          </div>
          <div className="institute-grid">
            {filteredInstitutes.map((institute) => <InstituteCard institute={institute} key={institute.slug} />)}
          </div>
          {filteredInstitutes.length === 0 && (
            <div className="empty-state">
              <p>No encontramos institutos para esa búsqueda. Prueba con otra carrera, municipio o provincia.</p>
              <button className="text-link" onClick={() => { setQuery(''); setActiveType('Todos') }}>Limpiar búsqueda <ArrowRight size={16} /></button>
            </div>
          )}
        </div>
      </section>

      <section className="map-section section-space" id="ubicaciones">
        <div className="container map-layout">
          <div className="map-copy"><h2>La formación está <em>cerca.</em></h2><p>Explora las oportunidades que existen en los municipios y provincias de Tarija.</p><button className="outline-button" onClick={() => scrollTo('institutos')}>Volver al catálogo <ArrowRight size={17} /></button></div>
          <div className="map-panel">
            <TarijaMap />
            <details className="map-sedes">
              <summary>Ver todas las sedes en texto</summary>
              <ul id="map-sedes-list">
                {institutes.map((institute) => (
                  <li key={institute.slug}>
                    <Link to={`/instituto/${institute.slug}`}>{institute.shortName}</Link>
                    <span>{institute.location} · {institute.province}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </section>

      <section className="quick-section container section-space" id="postulante">
        <div className="section-heading compact">
          <div><h2>Cómo <em>postular.</em></h2></div>
          <p className="section-description">Tres pasos para empezar. Puedes hacer los primeros hoy mismo con el Instituto Tecnológico 2 de Agosto.</p>
        </div>
        <ol className="steps-grid">
          <StepCard
            index={1}
            icon={<GraduationCap />}
            title="Elige tu carrera"
            text="Agropecuaria en Iscayachi o Industria de Alimentos en El Puente."
            action={<Link className="text-link" to="/instituto/2-de-agosto">Ver las carreras <ArrowUpRight size={16} /></Link>}
          />
          <StepCard
            index={2}
            icon={<MessageCircle />}
            title="Pide la convocatoria"
            text="Escríbenos para recibir la convocatoria vigente y confirmar los requisitos."
            action={<a className="text-link" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">Escribir por WhatsApp <ArrowUpRight size={16} /></a>}
          />
          <StepCard
            index={3}
            icon={<MapPin />}
            title="Visita una sede"
            text="Iscayachi por la mañana y El Puente por la tarde. Coordina tu visita."
            action={<button className="text-link" onClick={() => scrollTo('ubicaciones')}>Ver ubicaciones <ArrowUpRight size={16} /></button>}
          />
        </ol>
        <p className="postulante-contact"><Mail size={16} /> ¿Prefieres correo? <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </section>

      <section className="callout" id="convocatorias">
        <div className="container callout-inner">
          <div><h2>Tu futuro no puede <em>esperar.</em></h2></div>
          <div className="callout-action">
            <p>Consulta la información del Instituto Tecnológico 2 de Agosto y conoce sus carreras, sedes y contacto.</p>
            <Link className="white-button" to="/instituto/2-de-agosto">Conocer el instituto <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="products section-space" id="vitrina">
        <div className="container">
          <div className="section-heading compact">
            <div><h2>Lo que aprendemos, lo <em>compartimos.</em></h2></div>
            <p className="section-description">Productos y servicios que nacen del trabajo de nuestros institutos.</p>
          </div>
          <div className="vitrina-layout">
            <article className="vitrina-feature">
              <img src={featureImage} alt={`${feature.title} — ${feature.institute}`} loading="lazy" />
              <div className="vitrina-feature-info">
                <span>{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.institute}</p>
                {getInstitute(feature.slug)?.hasDetail && (
                  <Link className="text-link" to={`/instituto/${feature.slug}`}>Conocer el instituto <ArrowUpRight size={16} /></Link>
                )}
              </div>
            </article>
            <ul className="vitrina-list">
              {otherProducts.map((product) => {
                const target = getInstitute(product.slug)
                const image = productImages[product.title]
                return (
                  <li key={product.title}>
                    {image && <img src={image} alt={`${product.title} — ${product.institute}`} loading="lazy" />}
                    <div>
                      <span>{product.tag}</span>
                      <h3>{product.title}</h3>
                      <p>{product.institute}</p>
                    </div>
                    {target?.hasDetail
                      ? <Link className="vitrina-link" to={`/instituto/${product.slug}`} aria-label={`Conocer ${product.institute}`}><ArrowUpRight size={18} /></Link>
                      : <span className="product-status">Ficha en preparación</span>}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

function Hero({ query, setQuery, onSearch }: { query: string; setQuery: (value: string) => void; onSearch: () => void }) {
  const slides = useMemo(() => heroSlides(), [])
  const [index, setIndex] = useState(() => (slides.length ? Math.floor(Math.random() * slides.length) : 0))
  const slide = slides[index]

  const next = () => setIndex((current) => (slides.length ? (current + 1) % slides.length : 0))
  const institute = institutes.find((item) => item.slug === slide?.slug)

  return (
    <section className="hero" id="inicio" style={{ backgroundImage: `url(${slide?.image ?? portada})` }}>
      <div className="hero-wash" />
      {institute && <span className="hero-initials" aria-hidden="true">{institute.initials}</span>}
      <div className="container hero-content">
        {slide && (
          <Link className="hero-tag" to={`/instituto/${slide.slug}`}>
            <span className="hero-tag-label">Ahora en portada</span>
            <strong>{slide.name}</strong>
            <em>{slide.program}</em>
          </Link>
        )}
        <h1>Estudia en los institutos<br /><em>que construyen Tarija.</em></h1>
        <p className="hero-copy">Técnicos, tecnológicos y artísticos. Encuentra tu carrera y conoce cada instituto.</p>
        <form className="hero-search" role="search" onSubmit={(event) => { event.preventDefault(); onSearch() }}>
          <Search size={21} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="¿Qué quieres estudiar hoy?"
            aria-label="Buscar carreras e institutos"
            enterKeyHint="search"
          />
          <button type="submit">Buscar <ArrowRight size={18} /></button>
        </form>
        <div className="hero-links">
          <button onClick={onSearch}><CalendarDays size={17} /> Ver toda la oferta</button>
        </div>
      </div>
      <div className="hero-caption container">
        <span>Departamento de Tarija · Bolivia</span>
        {slides.length > 1 && (
          <button
            className="hero-shuffle"
            onClick={next}
            aria-label={`Mostrar otra institución destacada. Diapositiva ${index + 1} de ${slides.length}`}
          >
            <RefreshCw size={13} /> {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </button>
        )}
      </div>
    </section>
  )
}

function InstituteCard({ institute }: { institute: Institute }) {
  const body = (
    <>
      <div className="institute-badge"><span>{institute.initials}</span><small>{institute.type}</small></div>
      <div className="institute-info">
        <div className="location"><MapPin size={14} /> {institute.location}</div>
        <span className={`institute-status ${institute.hasDetail ? 'published' : 'pending'}`}>
          {institute.hasDetail ? 'Ficha publicada' : 'Ficha en preparación'}
        </span>
        <h3>{institute.name}</h3>
        <p>{institute.focus}</p>
        <div className="program-list">{institute.programs.slice(0, 2).map((program) => <span key={program}>{program}</span>)}</div>
        {institute.hasDetail && <span className="card-link">Conocer el instituto <ArrowUpRight size={16} /></span>}
      </div>
    </>
  )
  const className = `institute-card ${institute.type === 'Artístico' ? 'art' : 'tec'}${institute.hasDetail ? '' : ' is-pending'}`
  return institute.hasDetail
    ? <Link className={className} to={`/instituto/${institute.slug}`}>{body}</Link>
    : <article className={className}>{body}</article>
}

function StepCard({ index, icon, title, text, action }: { index: number; icon: React.ReactNode; title: string; text: string; action: React.ReactNode }) {
  return (
    <li className="step-card">
      <span className="step-index" aria-hidden="true">{String(index).padStart(2, '0')}</span>
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </li>
  )
}

function TarijaMap() {
  const mapElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapElement.current) return
    const map = L.map(mapElement.current, { scrollWheelZoom: false }).setView([-21.6, -64.7], 8)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    const points: { name: string; position: L.LatLngExpression; slug: string }[] = institutes
      .filter((institute) => institute.coordinates)
      .map((institute) => ({
        name: institute.name,
        position: [institute.coordinates!.lat, institute.coordinates!.lng] as L.LatLngExpression,
        slug: institute.slug,
      }))

    institutes.forEach((institute) => {
      getInstituteDetail(institute.slug)?.sedes.forEach((sede) => {
        points.push({ name: `${institute.name} – ${sede.name}`, position: [sede.coordinates.lat, sede.coordinates.lng], slug: institute.slug })
      })
    })

    const seen = new Map<string, number>()
    const spread = points.map((point) => {
      const [lat, lng] = point.position as [number, number]
      const key = `${lat.toFixed(4)},${lng.toFixed(4)}`
      const count = seen.get(key) ?? 0
      seen.set(key, count + 1)
      if (count === 0) return point
      const angle = (count * 137.5 * Math.PI) / 180
      const radius = 0.008 * Math.ceil(count / 2)
      return {
        ...point,
        position: [lat + Math.cos(angle) * radius, lng + Math.sin(angle) * radius] as L.LatLngExpression,
      }
    })

    spread.forEach(({ name, position, slug }) => {
      L.marker(position)
        .addTo(map)
        .bindPopup(`<strong>${name}</strong><br><a href="#/instituto/${slug}">Conocer el instituto</a>`)
    })

    return () => {
      map.remove()
    }
  }, [])

  return <div className="map-visual real-map" ref={mapElement} role="region" aria-label="Mapa de la presencia de institutos en Tarija" aria-describedby="map-sedes-list" tabIndex={0} />
}
