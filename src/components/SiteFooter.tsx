import { Link } from 'react-router-dom'
import logo from '../../Assets/images/logo-lockup.png'
import { useScrollTo } from '../hooks/useScrollTo'

export default function SiteFooter() {
  const scrollTo = useScrollTo()

  const go = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    scrollTo(id)
  }

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src={logo} alt="Gobierno Autónomo Departamental de Tarija" />
            <p>Plataforma informativa de los institutos de formación del departamento de Tarija.</p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <strong>Explora</strong>
              <a href="#institutos" onClick={go('institutos')}>Institutos</a>
              <a href="#postulante" onClick={go('postulante')}>Guía del postulante</a>
              <a href="#vitrina" onClick={go('vitrina')}>Vitrina productiva</a>
            </div>
            <div className="footer__col">
              <strong>Información</strong>
              <a href="#convocatorias" onClick={go('convocatorias')}>Convocatorias</a>
              <a href="#ubicaciones" onClick={go('ubicaciones')}>Ubicaciones</a>
              <Link to="/instituto/2-de-agosto">Instituto 2 de Agosto</Link>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Gobierno Autónomo Departamental de Tarija</span>
          <span>Proyecto de código abierto</span>
        </div>
      </div>
    </footer>
  )
}
