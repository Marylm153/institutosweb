import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import MobileNav from './components/MobileNav'
import SiteFooter from './components/SiteFooter'
import { LightboxProvider } from './components/Lightbox'
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
  const { pathname } = useLocation()
  const showMobileNav = !pathname.startsWith('/instituto/')

  useEffect(() => {
    document.body.classList.toggle('has-mobile-nav', showMobileNav)
    return () => document.body.classList.remove('has-mobile-nav')
  }, [showMobileNav])

  const focusMain = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const main = document.getElementById('main-content')
    main?.focus()
    main?.scrollIntoView()
  }

  return (
    <LightboxProvider>
      <div className="shell">
        <a className="skip-link" href="#main-content" onClick={focusMain}>Saltar al contenido</a>
        <RouteFocus />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instituto/:slug" element={<InstitutePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showMobileNav && <MobileNav />}
        <SiteFooter />
      </div>
    </LightboxProvider>
  )
}
