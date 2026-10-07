import { institutes } from './institutes'
import type { GalleryImage, HeroSlide } from './types'

const files = import.meta.glob('../../Assets/images/institutos/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const CAREER_LABELS: Record<string, string> = {
  agropecuaria: 'Agropecuaria',
  'industria-alimentos': 'Industria de Alimentos',
  viticultura: 'Viticultura y Enología',
  musica: 'Formación musical',
  turismo: 'Turismo',
  veterinaria: 'Veterinaria y Zootecnia',
  'construccion-civil': 'Construcción Civil',
  'industria-textil': 'Industria Textil y Confección',
  mecanica: 'Mecánica Automotriz',
  'quimica-industrial': 'Química Industrial',
  contaduria: 'Contaduría General',
  sistemas: 'Sistemas Informáticos',
  secretariado: 'Secretariado Ejecutivo',
  general: 'Vida institucional',
}

function labelFor(career: string) {
  return CAREER_LABELS[career] ?? career.replace(/-/g, ' ')
}

export const gallery: GalleryImage[] = Object.entries(files)
  .map(([path, src]) => {
    const parts = path.split('/')
    const index = parts.indexOf('institutos')
    const slug = parts[index + 1] ?? 'general'
    const career = parts[index + 2] ?? 'general'
    const fileName = parts[parts.length - 1] ?? ''
    return { src, slug, career, alt: `${labelFor(career)} – ${fileName.replace(/\.(jpe?g|png)$/i, '')}` }
  })
  .sort((a, b) => a.src.localeCompare(b.src))

export function galleryFor(slug: string, career?: string) {
  return gallery.filter((image) => image.slug === slug && (!career || image.career === career))
}

export function galleryCareers(slug: string) {
  const seen = new Set<string>()
  return gallery
    .filter((image) => image.slug === slug)
    .map((image) => image.career)
    .filter((career) => (seen.has(career) ? false : seen.add(career)))
}

export function heroSlides(): HeroSlide[] {
  const slides: HeroSlide[] = []
  const counts = new Map<string, number>()
  gallery.forEach((image) => {
    const key = `${image.slug}:${image.career}`
    const count = counts.get(key) ?? 0
    if (count >= 2) return
    counts.set(key, count + 1)
    const institute = institutes.find((item) => item.slug === image.slug)
    if (!institute) return
    slides.push({
      slug: image.slug,
      name: institute.shortName,
      program: labelFor(image.career),
      image: image.src,
    })
  })
  return slides
}
