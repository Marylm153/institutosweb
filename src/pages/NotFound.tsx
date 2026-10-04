import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap notfound">
        <h1>No encontramos esta página</h1>
        <p>Puede que el enlace esté mal escrito o que la sección haya cambiado de dirección.</p>
        <Link className="btn btn--primary" to="/">Volver al inicio <ArrowLeft size={16} /></Link>
      </div>
    </main>
  )
}
