import { Building2, GraduationCap, Home as HomeIcon, Store } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'

const items = [
  { id: 'inicio', label: 'Inicio', Icon: HomeIcon },
  { id: 'institutos', label: 'Institutos', Icon: Building2 },
  { id: 'postulante', label: 'Guía', Icon: GraduationCap },
  { id: 'vitrina', label: 'Vitrina', Icon: Store },
]

export default function MobileNav() {
  const scrollTo = useScrollTo()

  return (
    <nav className="mobile-nav" aria-label="Navegación principal">
      {items.map(({ id, label, Icon }) => (
        <button key={id} onClick={() => scrollTo(id)}>
          <Icon size={20} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
