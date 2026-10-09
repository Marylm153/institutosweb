import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  Clock,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Target,
  Users,
} from 'lucide-react'
import portada from '../../Assets/images/portada.webp'
import Monogram from '../components/Monogram'
import { ZoomImage, type LightboxImage } from '../components/Lightbox'
import { galleryFor, getInstitute, getInstituteDetail } from '../data'
import type { Carrera } from '../data'

const sectionIds = ['resumen', 'oferta', 'carreras', 'vitrina', 'convenios', 'sedes', 'galeria', 'contacto']
const sectionLabels: Record<string, string> = {
  resumen: 'Resumen',
  oferta: 'Oferta',
  carreras: 'Carreras',
  vitrina: 'Vitrina',
  convenios: 'Convenios',
  sedes: 'Sedes',
  galeria: 'Galería',
  contacto: 'Contacto',
}

export default function InstitutePage() {
  const { slug } = useParams<{ slug: string }>()
  const institute = getInstitute(slug)
  const detail = getInstituteDetail(slug)
  const active = useActiveSection(sectionIds)

  if (!institute) {
    return (
      <main id="main-content" tabIndex={-1}>
        <div className="wrap notfound">
          <h1>No encontramos este instituto</h1>
          <p>Es posible que el enlace haya cambiado. Vuelve al inicio para ver toda la oferta.</p>
          <Link className="btn btn--primary" to="/">Volver al inicio <ArrowRight size={16} /></Link>
        </div>
      </main>
    )
  }

  if (!detail) {
    return (
      <main id="main-content" tabIndex={-1} className="detail">
        <section className="detail__hero" style={{ background: 'linear-gradient(140deg,#7e1119,#b32229)' }}>
          <div className="detail__scrim" />
          <div className="wrap detail__inner">
            <div className="detail__top">
              <Link className="back" to="/"><ArrowLeft size={16} /> Volver al inicio</Link>
              <span className="kicker">{institute.type}</span>
            </div>
            <Monogram initials={institute.initials} type={institute.type} className="detail__monogram" />
            <h1 className="detail__title">{institute.name}</h1>
            <p className="detail__place"><MapPin size={16} /> {institute.location} · {institute.province}</p>
            <p className="detail__lede">{institute.description}</p>
            <div className="panel" style={{ marginTop: 22, maxWidth: 560 }}>
              <h3>Ficha en preparación</h3>
              <p>Todavía no recibimos la información de este instituto. Estamos coordinando con sus autoridades para publicar aquí sus carreras, sedes y datos de contacto.</p>
            </div>
            <Link className="btn btn--light" to="/" style={{ marginTop: 20 }}>Volver a todos los institutos <ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </main>
    )
  }

  const cover = galleryFor(detail.slug)[0]?.src ?? portada
  const sede = detail.sedes[0]
  const ages = detail.sedes.find((item) => item.ages)?.ages

  const goToSection = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main id="main-content" tabIndex={-1} className="detail">
      <section className="detail__hero" style={{ backgroundImage: `url(${cover})` }}>
        <div className="detail__scrim" />
        <div className="wrap detail__inner">
          <div className="detail__top">
            <Link className="back" to="/"><ArrowLeft size={16} /> Volver al inicio</Link>
            <span className="kicker">{detail.type} · {detail.province}</span>
          </div>
          {detail.logo ? (
            <span className="detail__crest"><img src={detail.logo} alt={`Escudo de ${detail.officialName}`} /></span>
          ) : (
            <Monogram initials={institute.initials} type={detail.type} className="detail__monogram" />
          )}
          <h1 className="detail__title">{detail.officialName}</h1>
          <p className="detail__place"><MapPin size={16} /> {detail.municipality} · {detail.province}</p>
          <p className="detail__lede">{detail.summary}</p>
          <div className="detail__actions">
            {detail.contact.whatsapp && (
              <a className="btn btn--light" href={`https://wa.me/591${detail.contact.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Escribir por WhatsApp</a>
            )}
            {detail.contact.email && (
              <a className="btn btn--ghost" href={`mailto:${detail.contact.email}`} style={{ color: '#fff', borderColor: 'rgba(255,255,255,.45)' }}><Mail size={17} /> Correo</a>
            )}
          </div>
        </div>
      </section>

      <div className="facts-wrap" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="facts">
            {detail.carreras?.[0]?.level && <Fact label="Nivel" value={detail.carreras[0].level} />}
            <Fact label="Sedes" value={`${detail.sedes.length} ${detail.sedes.length === 1 ? 'sede' : 'sedes'}`} />
            {ages && <Fact label="Edades" value={ages} />}
            {detail.studentCount && <Fact label="Estudiantes" value={detail.studentCount} />}
            {detail.founded && <Fact label="Fundado" value={detail.founded} />}
          </div>
        </div>
      </div>

      <nav className="subnav" aria-label="Secciones del instituto">
        <div className="subnav__inner">
          {sectionIds
            .filter((id) => (id === 'oferta' ? (detail.oferta?.length ?? 0) > 0 : id === 'carreras' ? (detail.carreras?.length ?? 0) > 0 : id === 'vitrina' ? (detail.vitrina?.length ?? 0) > 0 : id === 'convenios' ? (detail.convenios?.length ?? 0) > 0 : true))
            .map((id) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : undefined} onClick={goToSection(id)}>{sectionLabels[id]}</a>
            ))}
        </div>
      </nav>

      <section className="wrap section" id="resumen">
        <h2>Resumen</h2>
        {detail.about && <p className="lede resumen-about">{detail.about}</p>}
        {(detail.mission || detail.vision) && (
          <div className="panels" style={{ marginTop: 20 }}>
            {detail.mission && (
              <article className="panel">
                <h3>Misión</h3>
                <p>{detail.mission}</p>
              </article>
            )}
            {detail.vision && (
              <article className="panel">
                <h3>Visión</h3>
                <p>{detail.vision}</p>
              </article>
            )}
          </div>
        )}
        {detail.authorities && detail.authorities.length > 0 ? (
          <div className="authorities">
            {detail.authorities.map((authority) => (
              <p className="authority" key={authority.name}><Award size={16} /> <span><strong>{authority.role}:</strong> {authority.name}</span></p>
            ))}
          </div>
        ) : detail.authority ? (
          <p className="authority"><Award size={17} /> <span><strong>{detail.authorityRole}:</strong> {detail.authority}</span></p>
        ) : null}
      </section>

      {detail.oferta && detail.oferta.length > 0 && (
        <section className="divider" style={{ background: 'var(--surface)' }}>
          <div className="wrap section" id="oferta">
            <div className="section-head">
              <h2>Nuestra <em>oferta.</em></h2>
              <p className="lede">Especialidades y talleres disponibles para niñas, niños y adolescentes.</p>
            </div>
            <div className="panels">
              {detail.oferta.map((block) => (
                <article className="panel" key={block.title}>
                  <h3>{block.title}</h3>
                  <ul className="dotlist">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail.carreras && detail.carreras.length > 0 && (
        <section className="divider" style={{ background: 'var(--surface)' }}>
          <div className="wrap section" id="carreras">
            <div className="section-head">
              <h2>Conoce nuestras <em>carreras.</em></h2>
              <p className="lede">Formación Técnico Superior con pertinencia productiva y título del Ministerio de Educación.</p>
            </div>
            <CareerSection slug={detail.slug} carreras={detail.carreras} />
          </div>
        </section>
      )}

      {detail.vitrina && detail.vitrina.length > 0 && (
        <section className="divider" style={{ background: 'var(--surface)' }}>
          <div className="wrap section" id="vitrina">
            <div className="section-head">
              <h2>Vitrina <em>productiva.</em></h2>
              <p className="lede">Productos y servicios generados en las actividades académicas y productivas del instituto.</p>
            </div>
            <div className="vitrina-groups">
              {detail.vitrina.map((group) => (
                <div className="vitrina-group" key={group.title}>
                  <div className="vitrina-group__head">
                    <h3>{group.title}</h3>
                    {group.note && <p>{group.note}</p>}
                  </div>
                  {group.items.length > 0 && (
                    <ul className="vitrina-group__items">
                      {group.items.map((item) => {
                        const groupImages: LightboxImage[] = group.items.flatMap((entry) =>
                          entry.image ? [{ src: entry.image, alt: entry.name }] : [])
                        const imageIndex = item.image ? groupImages.findIndex((entry) => entry.src === item.image) : -1
                        return (
                          <li key={item.name}>
                            {item.image && (imageIndex >= 0
                              ? <ZoomImage className="vitrina-group__img" src={item.image} alt={item.name} images={groupImages} index={imageIndex} />
                              : <img className="vitrina-group__img" src={item.image} alt={item.name} loading="lazy" />)}
                            <div className="vitrina-group__body">
                              <strong>{item.name}</strong>
                              {item.presentation && <span className="vitrina-group__pres">{item.presentation}</span>}
                              {item.description && <span className="vitrina-group__desc">{item.description}</span>}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail.convenios && detail.convenios.length > 0 && (
        <section className="wrap section" id="convenios">
          <div className="section-head">
            <h2>Convenios y <em>prácticas.</em></h2>
            <p className="lede">Instituciones y empresas donde los estudiantes realizan prácticas y vinculación.</p>
          </div>
          <ul className="convenios">
            {detail.convenios.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      )}

      <section className="wrap section" id="sedes">
        <div className="section-head">
          <h2>Nuestras <em>sedes.</em></h2>
          <p className="lede">Visítanos o escríbenos para recibir orientación sobre la carrera que te interesa.</p>
        </div>
        <div className="sedes">
          {detail.sedes.map((item) => (
            <article className="sede" key={item.name}>
              <div className="sede__head"><MapPin size={18} /><h3>{item.name}</h3></div>
              <p className="sede__address">{item.address}</p>
              {item.reference && <p className="sede__ref">Referencia: {item.reference}</p>}
              <ul className="sede__meta">
                {item.days && <li><CalendarDays size={15} /> {item.days}</li>}
                {item.schedule && <li><Clock size={15} /> {item.schedule}</li>}
                {item.ages && <li><Users size={15} /> {item.ages}</li>}
                {item.teacher && <li><GraduationCap size={15} /> {item.teacher}</li>}
                {item.whatsapp && <li><MessageCircle size={15} /> {item.whatsapp}</li>}
              </ul>
              {item.instruments && item.instruments.length > 0 && (
                <div className="sede__instruments">
                  {item.instruments.map((instrument) => <span key={instrument}>{instrument}</span>)}
                </div>
              )}
              <div className="sede__links">
                {item.mapUrl && <a className="link-arrow" href={item.mapUrl} target="_blank" rel="noreferrer">Ver en el mapa <ArrowUpRight size={14} /></a>}
                {item.whatsapp && <a className="link-arrow" href={`https://wa.me/591${item.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Gallery slug={detail.slug} carreras={detail.carreras ?? []} />

      {detail.products && detail.products.length > 0 && (
        <section className="divider" style={{ background: 'var(--surface)' }}>
          <div className="wrap section">
            <div className="section-head">
              <h2>Lo que produce <em>nuestro instituto.</em></h2>
              <p className="lede">Productos y servicios generados en las actividades académicas y productivas, sujetos a disponibilidad institucional.</p>
            </div>
            <div className="products-mini">
              {detail.products.map((product) => (
                <div className="product-mini" key={product.title}>
                  <Award size={16} />
                  <strong>{product.title}</strong>
                  <span>{product.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {((detail.history?.length ?? 0) > 0 || (detail.achievements?.length ?? 0) > 0) && (
        <section className="wrap section">
          <div className="section-head">
            <h2>Una institución que <em>crece.</em></h2>
          </div>
          <div className="panels" style={{ gap: 20 }}>
            {detail.history && detail.history.length > 0 && (
              <div className="history">
                {detail.history.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            )}
            {detail.achievements && detail.achievements.length > 0 && (
              <aside className="achievements">
                <h3>Logros institucionales</h3>
                <ul>{detail.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
              </aside>
            )}
          </div>
        </section>
      )}

      <section className="divider" style={{ background: 'var(--surface)' }}>
        <div className="wrap section">
          <div className="section-head">
            <h2>Dudas de <em>postulantes.</em></h2>
          </div>
          <div className="faq">
            {detail.faqs.map((faq) => (
              <details key={faq.question}>
                <summary><BookOpen size={16} /> {faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {detail.documents && detail.documents.length > 0 && (
        <section className="wrap section">
          <div className="section-head">
            <h2>Documentos y <em>descargas.</em></h2>
          </div>
          <div className="downloads">
            {detail.documents.map((doc) => (
              <a className="download" key={doc.file} href={doc.file} target="_blank" rel="noreferrer">
                <Download size={18} /> {doc.label}
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="wrap section" id="contacto">
        <div className="section-head">
          <h2>¿Listo para <em>postular?</em></h2>
          <p className="lede">Escríbenos para recibir orientación sobre requisitos, inscripciones y visitas.</p>
        </div>
        <div className="contact">
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>Contacto institucional</h2>
            <p className="contact__note">Atención de lunes a viernes.</p>
          </div>
          <div className="contact__card">
            {detail.contact.whatsapp && (
              <a className="contact__row" href={`https://wa.me/591${detail.contact.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp {detail.contact.whatsapp}</a>
            )}
            {detail.contact.phones?.map((phone) => (
              <a className="contact__row" key={phone} href={`tel:+591${phone}`}><Phone size={17} /> {phone}</a>
            ))}
            {detail.contact.email && (
              <a className="contact__row" href={`mailto:${detail.contact.email}`}><Mail size={17} /> {detail.contact.email}</a>
            )}
            {detail.contact.facebook && (
              <a className="contact__row" href={`https://www.facebook.com/search/top?q=${encodeURIComponent(detail.contact.facebook)}`} target="_blank" rel="noreferrer">
                <Target size={17} /> {detail.contact.facebook}
              </a>
            )}
            {detail.contact.hours && <span className="contact__row"><Clock size={17} /> {detail.contact.hours}</span>}
          </div>
        </div>
      </section>

      <div className="actionbar">
        {detail.contact.whatsapp && (
          <a className="btn btn--primary actionbar__primary" href={`https://wa.me/591${detail.contact.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
        )}
        {(detail.contact.whatsapp || detail.contact.phones?.[0]) && (
          <a className="actionbar__icon" href={`tel:+591${detail.contact.whatsapp ?? detail.contact.phones?.[0]}`} aria-label="Llamar por teléfono"><Phone size={19} /></a>
        )}
        {sede?.mapUrl && <a className="actionbar__icon" href={sede.mapUrl} target="_blank" rel="noreferrer" aria-label="Cómo llegar"><Navigation size={19} /></a>}
      </div>
    </main>
  )
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-80px 0px -55% 0px' })
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="fact">
      <span className="fact__label">{label}</span>
      <span className="fact__value">{value}</span>
    </div>
  )
}

function CareerSection({ slug, carreras }: { slug: string; carreras: Carrera[] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const carrera = carreras[active]
  const images = galleryFor(slug, carrera.mediaKey).slice(0, 3)
  const lightboxImages: LightboxImage[] = images.map((image) => ({ src: image.src, alt: image.alt }))

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
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
    <div>
      <div className="segmented" role="tablist" aria-label="Carreras del instituto">
        {carreras.map((item, index) => (
          <button
            key={item.name}
            ref={(element) => { tabRefs.current[index] = element }}
            id={`tab-${slug}-${index}`}
            role="tab"
            aria-selected={index === active}
            aria-controls={`panel-${slug}-${index}`}
            tabIndex={index === active ? 0 : -1}
            className={index === active ? 'is-active' : undefined}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="career" role="tabpanel" id={`panel-${slug}-${active}`} aria-labelledby={`tab-${slug}-${active}`} tabIndex={0}>
        <div className="career__head">
          <h3>{carrera.name}</h3>
          <span className="career__sede"><MapPin size={14} /> {carrera.sede}</span>
          <div className="career__facts">
            <span>{carrera.level}</span>
            <span>{carrera.duration}</span>
            <span>{carrera.regime}</span>
            <span>{carrera.modality}</span>
            {carrera.schedule && <span>Turnos: {carrera.schedule}</span>}
          </div>
        </div>

        <div className="career__cols">
          {carrera.profile.length > 0 && (
            <div>
              <h4>Perfil profesional</h4>
              <ul className="dotlist">{carrera.profile.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
          {carrera.workField.length > 0 && (
            <div>
              <h4>Campo laboral</h4>
              <ul className="dotlist">{carrera.workField.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
          {carrera.infrastructure.length > 0 && (
            <div>
              <h4>Infraestructura y práctica</h4>
              <ul className="dotlist">{carrera.infrastructure.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
        </div>

        <div className="curriculum">
          <h4>Malla curricular</h4>
          {carrera.curriculum ? (
            <div className="curriculum__grid">
              {carrera.curriculum.map((year) => (
                <div className="curriculum__year" key={year.year}>
                  <strong>{year.year}</strong>
                  <ul className="curriculum__subjects">
                    {year.subjects.map((subject) => (
                      <li className="curriculum__subject" key={subject.code}>
                        <span className="curriculum__code">{subject.code}</span>
                        <span className="curriculum__name">{subject.name}</span>
                        <span className="curriculum__hours">{subject.hours} h</span>
                        {subject.prerequisite && <span className="curriculum__pre">Requiere {subject.prerequisite}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : carrera.curriculumImage ? (
            <img className="curriculum__image" src={carrera.curriculumImage} alt={`Malla curricular de ${carrera.name}`} loading="lazy" />
          ) : (
            <p className="note-inline">{carrera.curriculumNote ?? 'Malla curricular pendiente de publicación.'}</p>
          )}
        </div>

        <p className="career__degree"><GraduationCap size={15} /> {carrera.degree}</p>

        {images.length > 0 && (
          <div className="career__gallery">
            {images.map((image, index) => (
              <ZoomImage key={image.src} src={image.src} alt={image.alt} images={lightboxImages} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Gallery({ slug, carreras }: { slug: string; carreras: Carrera[] }) {
  const [filter, setFilter] = useState('todas')
  const images = filter === 'todas' ? galleryFor(slug) : galleryFor(slug, filter)
  const filterCareers = carreras.filter((carrera) => galleryFor(slug, carrera.mediaKey).length > 0)
  const lightboxImages: LightboxImage[] = images.map((image) => ({ src: image.src, alt: image.alt }))

  return (
    <section className="divider">
      <div className="wrap section" id="galeria">
        <div className="section-head">
          <h2>Así se aprende <em>en el instituto.</em></h2>
          <p className="lede">Prácticas de campo, laboratorio y actividades productivas de nuestros estudiantes.</p>
        </div>
        {filterCareers.length > 0 && (
          <div className="gallery__filters" role="group" aria-label="Filtrar la galería por carrera">
            <button className={`chip${filter === 'todas' ? ' is-active' : ''}`} aria-pressed={filter === 'todas'} onClick={() => setFilter('todas')}>Todas</button>
            {filterCareers.map((carrera) => (
              <button key={carrera.mediaKey} className={`chip${filter === carrera.mediaKey ? ' is-active' : ''}`} aria-pressed={filter === carrera.mediaKey} onClick={() => setFilter(carrera.mediaKey)}>{carrera.name}</button>
            ))}
          </div>
        )}
        <div className="gallery__grid">
          {images.map((image, index) => (
            <ZoomImage key={image.src} src={image.src} alt={image.alt} images={lightboxImages} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
