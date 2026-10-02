import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/logo.png'

export default function SiteFooter() {
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 90)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <img src={logo} alt="Gobierno Autónomo Departamental de Tarija" />
          <p>Plataforma informativa de los institutos de formación del departamento.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explora</strong>
            <button onClick={() => goTo('institutos')}>Institutos</button>
            <button onClick={() => goTo('postulante')}>Guía del postulante</button>
            <button onClick={() => goTo('vitrina')}>Vitrina productiva</button>
          </div>
          <div>
            <strong>Información</strong>
            <button onClick={() => goTo('convocatorias')}>Convocatorias</button>
            <button onClick={() => goTo('ubicaciones')}>Ubicaciones</button>
            <a href="mailto:instituto2deagosto@gmail.com">Correo del I. T. 2 de Agosto</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Gobierno Autónomo Departamental de Tarija</span>
        <span>Proyecto de código abierto</span>
      </div>
    </footer>
  )
}
