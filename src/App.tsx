import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Home from './pages/Home'
import InstitutePage from './pages/InstitutePage'
import NotFound from './pages/NotFound'

function RouteFocus() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}

export default function App() {
  const focusMain = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const main = document.getElementById('main-content')
    main?.focus()
    main?.scrollIntoView()
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={focusMain}>Saltar al contenido</a>
      <RouteFocus />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instituto/:slug" element={<InstitutePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </div>
  )
}
