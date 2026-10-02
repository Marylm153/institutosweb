import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="detail-main">
      <div className="container detail-missing">
        <h1>No encontramos esta página</h1>
        <p>Puede que el enlace esté mal escrito o que la sección haya cambiado de dirección.</p>
        <Link className="solid-button" to="/">Volver al inicio <ArrowLeft size={16} /></Link>
      </div>
    </main>
  )
}
