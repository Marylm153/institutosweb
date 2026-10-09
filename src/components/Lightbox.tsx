import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type LightboxImage = { src: string; alt?: string }

type State = { images: LightboxImage[]; index: number } | null

const LightboxContext = createContext<{ open: (images: LightboxImage[], index: number) => void } | null>(null)

export function useLightbox() {
  const context = useContext(LightboxContext)
  if (!context) throw new Error('useLightbox debe usarse dentro de LightboxProvider')
  return context
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const open = useCallback((images: LightboxImage[], index: number) => {
    if (!images.length) return
    lastFocus.current = document.activeElement as HTMLElement | null
    setState({ images, index: Math.min(Math.max(index, 0), images.length - 1) })
  }, [])

  const close = useCallback(() => setState(null), [])

  const go = useCallback((delta: number) => {
    setState((current) => {
      if (!current) return current
      const length = current.images.length
      return { ...current, index: (current.index + delta + length) % length }
    })
  }, [])

  useEffect(() => {
    if (!state) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      else if (event.key === 'ArrowRight') go(1)
      else if (event.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [state, close, go])

  useEffect(() => {
    if (!state && lastFocus.current) {
      lastFocus.current.focus?.()
      lastFocus.current = null
    }
  }, [state])

  const current = state?.images[state.index]
  const multiple = (state?.images.length ?? 0) > 1

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {state && current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
          onClick={(event) => { if (event.target === event.currentTarget) close() }}
          onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }}
          onTouchEnd={(event) => {
            if (!touchStart.current) return
            const dx = event.changedTouches[0].clientX - touchStart.current.x
            const dy = event.changedTouches[0].clientY - touchStart.current.y
            touchStart.current = null
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
          }}
        >
          <button ref={closeRef} type="button" className="lightbox__close" onClick={close} aria-label="Cerrar visor">
            <X size={22} />
          </button>
          {multiple && (
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Imagen anterior">
              <ChevronLeft size={24} />
            </button>
          )}
          <figure className="lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img className="lightbox__img" src={current.src} alt={current.alt ?? ''} />
          </figure>
          {multiple && (
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Imagen siguiente">
              <ChevronRight size={24} />
            </button>
          )}
          {multiple && (
            <span className="lightbox__count" aria-live="polite">{state.index + 1} / {state.images.length}</span>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  )
}

export function ZoomImage({
  src,
  alt,
  images,
  index,
  className,
  loading = 'lazy',
}: {
  src: string
  alt: string
  images: LightboxImage[]
  index: number
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const { open } = useLightbox()
  const activate = () => open(images, index)

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={`zoomable${className ? ` ${className}` : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Ampliar imagen: ${alt}`}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          activate()
        }
      }}
    />
  )
}
