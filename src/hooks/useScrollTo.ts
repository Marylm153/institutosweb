import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useScrollTo() {
  const location = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (id: string) => {
      if (location.pathname !== '/') {
        navigate('/')
        window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 90)
        return
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    },
    [location.pathname, navigate],
  )
}
