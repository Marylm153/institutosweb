import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  Search,
} from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import portada from '../../Assets/images/portada.webp'
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
    'Vinos y singanis': galleryFor('uriondo', 'viticultura')[0]?.src,
  }
  const featureIndex = featuredProducts.findIndex((product) => productImages[product.title])
  const feature = featuredProducts[featureIndex >= 0 ? featureIndex : 0]
  const featureImage = productImages[feature.title] ?? portada
  const otherProducts = featuredProducts.filter((product) => product !== feature)

  return (
    <main id="main-content" tabIndex={-1}>
      <Hero onSearch={() => scrollTo('institutos')} query={query} setQuery={setQuery} />

      <section className="section">
        <div className="wrap intro">
          <h2>Una educación conectada con nuestra <em>tierra.</em></h2>
          <div className="intro__note">
            <p>Formación práctica y pertinente para las vocaciones productivas, culturales y tecnológicas de cada provincia.</p>
            <a className="link-arrow" href="#institutos" onClick={(event) => { event.preventDefault(); scrollTo('institutos') }}>
              Explorar instituciones <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section divider" id="institutos">
        <div className="wrap">
          <div className="catalog__head">
            <h2>Elige dónde <em>comenzar.</em></h2>
            <span className="count" aria-live="polite">
              {filteredInstitutes.length === 1 ? '1 institución' : `${filteredInstitutes.length} instituciones`}
            </span>
          </div>
          <div className="filters" role="group" aria-label="Filtrar institutos por tipo">
            {typeFilters.map((filter) => (
              <button
                className={`chip${activeType === filter ? ' is-active' : ''}`}
                aria-pressed={activeType === filter}
                key={filter}
                onClick={() => setActiveType(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="institutes" style={{ marginTop: 18 }}>
            {filteredInstitutes.map((institute) => <InstituteRow institute={institute} key={institute.slug} />)}
          </div>
          {filteredInstitutes.length === 0 && (
            <div className="empty">
              <p>No encontramos institutos para esa búsqueda. Prueba con otra carrera, municipio o provincia.</p>
              <button className="btn btn--ghost btn--sm" onClick={() => { setQuery(''); setActiveType('Todos') }}>Limpiar búsqueda</button>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="ubicaciones">
        <div className="wrap">
          <div className="map">
            <div className="map__copy">
              <h2>La formación está <em>cerca.</em></h2>
              <p>Explora las oportunidades que existen en los municipios y provincias de Tarija.</p>
              <button className="btn btn--ghost btn--sm" onClick={() => scrollTo('institutos')}>Volver al catálogo <ArrowRight size={15} /></button>
            </div>
            <div>
              <TarijaMap />
              <details className="map__list" style={{ marginTop: 12 }}>
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
        </div>
      </section>

      <section className="section divider" id="postulante">
        <div className="wrap">
          <div className="section-head">
            <h2>Cómo <em>postular.</em></h2>
            <p className="lede">Tres pasos para empezar. Puedes hacer los primeros hoy mismo con el Instituto Tecnológico 2 de Agosto.</p>
          </div>
          <ol className="steps">
            <StepCard
              index={1}
              icon={<GraduationCap />}
              title="Elige tu carrera"
              text="Agropecuaria en Iscayachi o Industria de Alimentos en El Puente."
              action={<Link className="link-arrow" to="/instituto/2-de-agosto">Ver las carreras <ArrowUpRight size={15} /></Link>}
            />
            <StepCard
              index={2}
              icon={<MessageCircle />}
              title="Pide la convocatoria"
              text="Escríbenos para recibir la convocatoria vigente y confirmar los requisitos."
              action={<a className="link-arrow" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">Escribir por WhatsApp <ArrowUpRight size={15} /></a>}
            />
            <StepCard
              index={3}
              icon={<MapPin />}
              title="Visita una sede"
              text="Iscayachi por la mañana y El Puente por la tarde. Coordina tu visita."
              action={<button className="link-arrow" onClick={() => scrollTo('ubicaciones')}>Ver ubicaciones <ArrowUpRight size={15} /></button>}
            />
          </ol>
          <p className="guide-contact"><Mail size={16} /> ¿Prefieres correo? <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
      </section>

      <section className="cta" id="convocatorias">
        <div className="wrap">
          <h2>Tu futuro no puede <em>esperar.</em></h2>
          <p>Consulta la información del Instituto Tecnológico 2 de Agosto y conoce sus carreras, sedes y contacto.</p>
          <Link className="btn btn--light" to="/instituto/2-de-agosto">Conocer el instituto <ArrowUpRight size={17} /></Link>
        </div>
      </section>

      <section className="section" id="vitrina">
        <div className="wrap">
          <div className="section-head">
            <h2>Lo que aprendemos, lo <em>compartimos.</em></h2>
            <p className="lede">Productos y servicios que nacen del trabajo de nuestros institutos.</p>
          </div>
          <div className="vitrina">
            <article className="vitrina__feature">
              <img src={featureImage} alt={`${feature.title} — ${feature.institute}`} loading="lazy" />
              <div className="vitrina__feature-info">
                <span className="tag tag--tec">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.institute}</p>
                {getInstitute(feature.slug)?.hasDetail && (
                  <Link className="link-arrow" to={`/instituto/${feature.slug}`}>Conocer el instituto <ArrowUpRight size={15} /></Link>
                )}
              </div>
            </article>
            <ul className="vitrina__list">
              {otherProducts.map((product) => {
                const target = getInstitute(product.slug)
                const image = productImages[product.title]
                return (
                  <li className="vitrina__item" key={product.title}>
                    {image && <img src={image} alt={`${product.title} — ${product.institute}`} loading="lazy" />}
                    <div>
                      <span className="tag tag--tec">{product.tag}</span>
                      <h3>{product.title}</h3>
                      <p>{product.institute}</p>
                    </div>
                    {target?.hasDetail
                      ? <Link className="vitrina__go" to={`/instituto/${product.slug}`} aria-label={`Conocer ${product.institute}`}><ArrowUpRight size={18} /></Link>
                      : <span className="status status--soon">En preparación</span>}
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

  return (
    <section className="hero" id="inicio" style={{ backgroundImage: `url(${slide?.image ?? portada})` }}>
      <div className="hero__scrim" />
      <div className="wrap hero__inner">
        {slide && (
          <Link className="hero__tag" to={`/instituto/${slide.slug}`}>
            <span className="hero__tag-label">Ahora</span>
            <strong>{slide.name}</strong>
            <em>{slide.program}</em>
          </Link>
        )}
        <h1 className="hero__title">Estudia en los institutos <em>que construyen Tarija.</em></h1>
        <p className="hero__lede">Técnicos, tecnológicos y artísticos. Encuentra tu carrera y conoce cada instituto.</p>
        <form className="search" role="search" onSubmit={(event) => { event.preventDefault(); onSearch() }}>
          <Search className="search__icon" size={20} aria-hidden="true" />
          <input
            className="search__input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="¿Qué quieres estudiar?"
            aria-label="Buscar carreras e institutos"
            enterKeyHint="search"
          />
          <button className="search__btn" type="submit">Buscar <ArrowRight size={17} /></button>
        </form>
        <div className="hero__meta">
          <span>Departamento de Tarija · Bolivia</span>
          {slides.length > 1 && (
            <button
              className="hero__shuffle"
              onClick={next}
              aria-label={`Mostrar otra institución destacada. Diapositiva ${index + 1} de ${slides.length}`}
            >
              <RefreshCw size={13} /> {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function InstituteRow({ institute }: { institute: Institute }) {
  const cover = galleryFor(institute.slug)[0]?.src
  const body = (
    <>
      <div className={`institute__media${cover ? '' : ' institute__media--initials'}`}>
        {cover ? <img src={cover} alt="" loading="lazy" /> : <span aria-hidden="true">{institute.initials}</span>}
      </div>
      <div className="institute__body">
        <span className={`tag ${institute.type === 'Artístico' ? 'tag--art' : 'tag--tec'}`}>{institute.type}</span>
        <h3 className="institute__name">{institute.name}</h3>
        <p className="institute__place"><MapPin size={13} aria-hidden="true" /> {institute.location}</p>
        <div className="institute__progs">{institute.programs.slice(0, 2).map((program) => <span key={program}>{program}</span>)}</div>
        {institute.hasDetail
          ? <span className="institute__cta">Ver ficha <ArrowUpRight size={15} /></span>
          : <span className="status status--soon" style={{ marginTop: 11 }}>Ficha en preparación</span>}
      </div>
    </>
  )
  return institute.hasDetail
    ? <Link className="institute" to={`/instituto/${institute.slug}`}>{body}</Link>
    : <article className="institute institute--pending">{body}</article>
}

function StepCard({ index, icon, title, text, action }: { index: number; icon: React.ReactNode; title: string; text: string; action: React.ReactNode }) {
  return (
    <li className="step">
      <span className="step__no" aria-hidden="true">{String(index).padStart(2, '0')}</span>
      <span className="step__icon">{icon}</span>
      <h3 className="step__title">{title}</h3>
      <p className="step__text">{text}</p>
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

    const points: { name: string; position: L.LatLngExpression; slug: string; art: boolean }[] = institutes
      .filter((institute) => institute.coordinates)
      .map((institute) => ({
        name: institute.name,
        position: [institute.coordinates!.lat, institute.coordinates!.lng] as L.LatLngExpression,
        slug: institute.slug,
        art: institute.type === 'Artístico',
      }))

    institutes.forEach((institute) => {
      getInstituteDetail(institute.slug)?.sedes.forEach((sede) => {
        points.push({ name: `${institute.name} – ${sede.name}`, position: [sede.coordinates.lat, sede.coordinates.lng], slug: institute.slug, art: institute.type === 'Artístico' })
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

    spread.forEach(({ name, position, slug, art }) => {
      L.marker(position, { icon: markerIcon(art), title: name })
        .addTo(map)
        .bindPopup(`<strong>${name}</strong><br><a href="#/instituto/${slug}">Conocer el instituto</a>`)
    })

    return () => {
      map.remove()
    }
  }, [])

  return <div className="map__frame" ref={mapElement} role="region" aria-label="Mapa de la presencia de institutos en Tarija" aria-describedby="map-sedes-list" tabIndex={0} />
}

function markerIcon(art: boolean) {
  const color = art ? '#8a5a2b' : '#9f1720'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="34" viewBox="0 0 26 34"><path d="M13 0C5.82 0 0 5.82 0 13c0 9.9 13 21 13 21s13-11.1 13-21C26 5.82 20.18 0 13 0z" fill="${color}"/><circle cx="13" cy="13" r="4.6" fill="#fff"/></svg>`
  return L.divIcon({
    className: 'map-marker',
    html: svg,
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -30],
  })
}
