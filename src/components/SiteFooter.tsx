import { Link } from 'react-router-dom'
import logoGob from '../../Assets/images/logo-lockup.png'
import logoSdh from '../../Assets/images/logo-sdh.png'
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
            <div className="footer__logos">
              <span className="footer__gov"><img src={logoGob} alt="Gobierno Autónomo Departamental de Tarija" /></span>
              <img className="footer__sdh" src={logoSdh} alt="Secretaría de Desarrollo Humano" />
            </div>
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
          <span>© 2026 Gobierno Autónomo Departamental de Tarija · Secretaría de Desarrollo Humano</span>
          <span>Proyecto de código abierto</span>
        </div>
      </div>
    </footer>
  )
}
