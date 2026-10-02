import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { id: 'institutos', label: 'Institutos' },
  { id: 'postulante', label: 'Guía del postulante' },
  { id: 'vitrina', label: 'Vitrina productiva' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (id: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 90)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goHome = () => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span>Gobierno Autónomo Departamental de Tarija</span>
          <span className="topline-message">Educación que transforma territorios</span>
        </div>
      </div>

      <header className="header container">
        <button className="brand" onClick={goHome} aria-label="Volver al inicio">
          <span className="brand-mark">T</span>
          <span>
            <strong>Institutos</strong>
            <small>Tarija</small>
          </span>
        </button>
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-principal"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="menu-principal" className={open ? 'nav nav-open' : 'nav'} aria-label="Navegación principal">
          {links.map((link) => (
            <button key={link.id} onClick={() => goTo(link.id)}>
              {link.label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => goTo('convocatorias')}>
            Convocatorias <ArrowUpRight size={16} />
          </button>
        </nav>
      </header>
    </>
  )
}
