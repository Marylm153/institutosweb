import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import portada from '../../Assets/images/portada.jpg'
import { galleryFor, getInstitute, getInstituteDetail } from '../data'
import type { Carrera } from '../data'

export default function InstitutePage() {
  const { slug } = useParams<{ slug: string }>()
  const institute = getInstitute(slug)
  const detail = getInstituteDetail(slug)

  if (!institute) {
    return (
      <main id="main-content" tabIndex={-1} className="detail-main">
        <div className="container detail-missing">
          <h1>No encontramos este instituto</h1>
          <p>Es posible que el enlace haya cambiado. Vuelve al inicio para ver toda la oferta.</p>
          <Link className="solid-button" to="/">Volver al inicio <ArrowRight size={16} /></Link>
        </div>
      </main>
    )
  }

  if (!detail) {
    return (
      <main id="main-content" tabIndex={-1} className="detail-main">
        <section className="detail-hero detail-hero-placeholder">
          <div className="container">
            <Link className="back-link" to="/"><ArrowLeft size={16} /> Volver al inicio</Link>
            <span className="detail-type">{institute.type}</span>
            <h1>{institute.name}</h1>
            <p className="detail-location"><MapPin size={16} /> {institute.location} · {institute.province}</p>
            <p className="detail-lead">{institute.description}</p>
            <div className="pending-box">
              <strong>Ficha en preparación</strong>
              <p>Todavía no recibimos la información de este instituto. Estamos coordinando con sus autoridades para publicar aquí sus carreras, sedes y datos de contacto.</p>
            </div>
            <Link className="white-button" to="/">Volver a todos los institutos <ArrowUpRight size={17} /></Link>
          </div>
        </section>
      </main>
    )
  }

  const cover = galleryFor(detail.slug)[0]?.src ?? portada

  return (
    <main id="main-content" tabIndex={-1} className="detail-main">
      <section className="detail-hero" style={{ backgroundImage: `url(${cover})` }}>
        <div className="detail-hero-wash" />
        <div className="container detail-hero-content">
          <Link className="back-link" to="/"><ArrowLeft size={16} /> Volver al inicio</Link>
          <span className="detail-type">{detail.type} · {detail.province}</span>
          <h1>{detail.officialName}</h1>
          <p className="detail-location"><MapPin size={16} /> {detail.municipality} · {detail.province}</p>
          <p className="detail-lead">{detail.summary}</p>
          <div className="detail-actions">
            <a className="white-button" href={`https://wa.me/591${detail.contact.whatsapp}`} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> Escribir por WhatsApp
            </a>
            <a className="ghost-button" href={`mailto:${detail.contact.email}`}>
              <Mail size={17} /> {detail.contact.email}
            </a>
          </div>
        </div>
      </section>

      <section className="detail-highlights">
        <div className="container detail-highlight-grid">
          <Highlight icon={<GraduationCap />} label="Nivel" value={detail.carreras[0]?.level ?? 'Técnico Superior'} />
          <Highlight icon={<Building2 />} label="Sedes" value={`${detail.sedes.length} ${detail.sedes.length === 1 ? 'sede' : 'sedes'}`} />
          <Highlight icon={<Users />} label="Estudiantes" value={detail.studentCount ?? '—'} />
          <Highlight icon={<Award />} label="Fundado" value={detail.founded} />
        </div>
      </section>

      <section className="container detail-block">
        <div className="detail-two-col">
          <article className="panel">
            <h2>Misión</h2>
            <p>{detail.mission}</p>
          </article>
          <article className="panel">
            <h2>Visión</h2>
            <p>{detail.vision}</p>
          </article>
        </div>
        {detail.authority && (
          <div className="authority">
            <Award size={18} />
            <span><strong>{detail.authorityRole}:</strong> {detail.authority}</span>
          </div>
        )}
      </section>

      <section className="detail-block detail-block-tint">
        <div className="container">
          <div className="section-heading compact">
            <div><h2>Conoce nuestras <em>carreras.</em></h2></div>
            <p className="section-description">Formación Técnico Superior con pertinencia productiva y título del Ministerio de Educación.</p>
          </div>
          <CareerSection slug={detail.slug} carreras={detail.carreras} />
        </div>
      </section>

      <section className="container detail-block">
        <div className="section-heading compact">
          <div><h2>Nuestras <em>sedes.</em></h2></div>
          <p className="section-description">Visítanos o escríbenos para recibir orientación sobre la carrera que te interesa.</p>
        </div>
        <div className="sede-grid">
          {detail.sedes.map((sede) => (
            <article className="sede-card" key={sede.name}>
              <div className="sede-card-top">
                <MapPin size={18} />
                <h3>{sede.name}</h3>
              </div>
              <p className="sede-address">{sede.address}</p>
              {sede.reference && <p className="sede-reference">Referencia: {sede.reference}</p>}
              <ul className="sede-meta">
                {sede.schedule && <li><Clock size={15} /> {sede.schedule}</li>}
                {sede.whatsapp && <li><MessageCircle size={15} /> {sede.whatsapp}</li>}
              </ul>
              <div className="sede-actions">
                {sede.mapUrl && <a className="text-link" href={sede.mapUrl} target="_blank" rel="noreferrer">Ver en el mapa <ArrowUpRight size={15} /></a>}
                {sede.whatsapp && <a className="text-link" href={`https://wa.me/591${sede.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} /></a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Gallery slug={detail.slug} carreras={detail.carreras} />

      <section className="detail-block detail-block-tint">
        <div className="container detail-two-col">
          <article className="panel">
            <h2>Lo que produce <em>nuestro instituto.</em></h2>
            <p>Productos y servicios generados en las actividades académicas y productivas, sujetos a la producción efectiva y disponibilidad institucional.</p>
          </article>
          <div className="product-mini-grid">
            {detail.products.map((product) => (
              <div className="product-mini" key={product.title}>
                <Sparkles size={17} />
                <strong>{product.title}</strong>
                <span>{product.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container detail-block">
        <div className="detail-two-col wide-left">
          <article>
            <h2>Una institución que <em>crece.</em></h2>
            <div className="history-list">
              {detail.history.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
          <aside className="achievements">
            <h3>Logros institucionales</h3>
            <ul>
              {detail.achievements.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="detail-block detail-block-tint">
        <div className="container faq-layout">
          <div>
            <h2>Dudas de <em>postulantes.</em></h2>
          </div>
          <div className="faq-list">
            {detail.faqs.map((faq) => (
              <details key={faq.question}>
                <summary><BookOpen size={16} /> {faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-contact">
        <div className="container detail-contact-inner">
          <div>
            <h2>¿Listo para <em>postular?</em></h2>
            <p className="detail-contact-note">Escríbenos para recibir orientación sobre requisitos, inscripciones y visitas.</p>
          </div>
          <div className="detail-contact-card">
            <a href={`https://wa.me/591${detail.contact.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp {detail.contact.whatsapp}</a>
            <a href={`mailto:${detail.contact.email}`}><Mail size={17} /> {detail.contact.email}</a>
            {detail.contact.facebook && (
              <a href={`https://www.facebook.com/search/top?q=${encodeURIComponent(detail.contact.facebook)}`} target="_blank" rel="noreferrer">
                <Target size={17} /> {detail.contact.facebook}
              </a>
            )}
            {detail.contact.hours && <span><Clock size={17} /> Atención: {detail.contact.hours}</span>}
          </div>
        </div>
      </section>
    </main>
  )
}

function Highlight({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="highlight">
      <span className="highlight-icon">{icon}</span>
      <span className="highlight-label">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function CareerSection({ slug, carreras }: { slug: string; carreras: Carrera[] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const carrera = carreras[active]
  const images = galleryFor(slug, carrera.mediaKey).slice(0, 3)

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = carreras.length - 1
    let next = index
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="career-detail">
      <div className="career-tabbar" role="tablist" aria-label="Carreras del instituto">
        {carreras.map((item, index) => (
          <button
            key={item.name}
            ref={(element) => { tabRefs.current[index] = element }}
            id={`tab-${slug}-${index}`}
            role="tab"
            aria-selected={index === active}
            aria-controls={`panel-${slug}-${index}`}
            tabIndex={index === active ? 0 : -1}
            className={index === active ? 'career-tab active' : 'career-tab'}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="career-panel" role="tabpanel" id={`panel-${slug}-${active}`} aria-labelledby={`tab-${slug}-${active}`} tabIndex={0}>
        <div className="career-panel-head">
          <div>
            <h3>{carrera.name}</h3>
            <p className="career-sede"><MapPin size={14} /> {carrera.sede}</p>
          </div>
          <div className="career-facts">
            <span>{carrera.level}</span>
            <span>{carrera.duration}</span>
            <span>{carrera.regime}</span>
            <span>{carrera.modality}</span>
          </div>
        </div>

        <div className="career-columns">
          <div>
            <h4>Perfil profesional</h4>
            <ul>{carrera.profile.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h4>Campo laboral</h4>
            <ul>{carrera.workField.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h4>Infraestructura y práctica</h4>
            <ul>{carrera.infrastructure.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <div className="career-curriculum">
          <h4>Malla curricular</h4>
          {carrera.curriculum ? (
            <div className="curriculum-grid">
              {carrera.curriculum.map((year) => (
                <div className="curriculum-year" key={year.year}>
                  <strong>{year.year}</strong>
                  <ul>{year.subjects.map((subject) => <li key={subject}>{subject}</li>)}</ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="pending-inline">{carrera.curriculumNote ?? 'Malla curricular pendiente de publicación.'}</p>
          )}
        </div>

        <p className="career-degree"><GraduationCap size={15} /> {carrera.degree}</p>
      </div>

      {images.length > 0 && (
        <div className="career-gallery">
          {images.map((image) => <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />)}
        </div>
      )}
    </div>
  )
}

function Gallery({ slug, carreras }: { slug: string; carreras: Carrera[] }) {
  const [filter, setFilter] = useState<string>('todas')
  const images = filter === 'todas' ? galleryFor(slug) : galleryFor(slug, filter)

  return (
    <section className="detail-block">
      <div className="container">
        <div className="section-heading compact">
          <div><h2>Así se aprende <em>en el instituto.</em></h2></div>
          <p className="section-description">Prácticas de campo, laboratorio y actividades productivas de nuestros estudiantes.</p>
        </div>
        <div className="gallery-filters" role="group" aria-label="Filtrar la galería por carrera">
          <button className={filter === 'todas' ? 'active' : ''} aria-pressed={filter === 'todas'} onClick={() => setFilter('todas')}>Todas</button>
          {carreras.map((carrera) => (
            <button key={carrera.mediaKey} className={filter === carrera.mediaKey ? 'active' : ''} aria-pressed={filter === carrera.mediaKey} onClick={() => setFilter(carrera.mediaKey)}>{carrera.name}</button>
          ))}
        </div>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <img key={image.src} src={image.src} alt={image.alt} loading="lazy" className={index % 7 === 0 ? 'tall' : ''} />
          ))}
        </div>
      </div>
    </section>
  )
}
