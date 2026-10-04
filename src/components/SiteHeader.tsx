import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import logo from '../../Assets/images/logo-lockup.png'
import { useScrollTo } from '../hooks/useScrollTo'

const links = [
  { id: 'institutos', label: 'Institutos' },
  { id: 'postulante', label: 'Guía del postulante' },
  { id: 'vitrina', label: 'Vitrina productiva' },
]

export default function SiteHeader() {
  const scrollTo = useScrollTo()
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 959px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mobile.matches || reduceMotion.matches) return

    lastY.current = window.scrollY
    const update = () => {
      ticking.current = false
      const y = window.scrollY
      const delta = y - lastY.current
      if (y <= 8) setHidden(false)
      else if (delta > 6 && y > 140) setHidden(true)
      else if (delta < -6) setHidden(false)
      lastY.current = y
    }
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        window.requestAnimationFrame(update)
      }
    }
    const onFocusIn = () => setHidden(false)

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('focusin', onFocusIn)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('header-hidden', hidden)
    return () => document.documentElement.classList.remove('header-hidden')
  }, [hidden])

  const go = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    scrollTo(id)
  }

  return (
    <header className={`site-header${hidden ? ' site-header--hidden' : ''}`}>
      <div className="wrap site-header__inner">
        <Link className="brand" to="/" aria-label="Ir al inicio">
          <img className="brand__logo" src={logo} alt="Gobierno Autónomo Departamental de Tarija" />
        </Link>
        <nav className="nav" aria-label="Navegación principal">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={go(link.id)}>{link.label}</a>
          ))}
          <a className="nav__cta" href="#convocatorias" onClick={go('convocatorias')}>
            Convocatorias <ArrowUpRight size={15} />
          </a>
        </nav>
      </div>
    </header>
  )
}
