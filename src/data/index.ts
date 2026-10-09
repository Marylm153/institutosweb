import { institutes } from './institutes'
import { dosDeAgosto } from './institutes/2-de-agosto'
import { uriondo } from './institutes/uriondo'
import { capacitacionMusical } from './institutes/capacitacion-musical'
import { emborozu } from './institutes/emborozu'
import { bermejo } from './institutes/bermejo'
import { sanIgnacio } from './institutes/san-ignacio'
import { incosTarija } from './institutes/incos-tarija'
import { sanAndres } from './institutes/san-andres'
import type { InstituteDetail, InstituteType } from './types'

const details: Record<string, InstituteDetail> = {
  [dosDeAgosto.slug]: dosDeAgosto,
  [uriondo.slug]: uriondo,
  [capacitacionMusical.slug]: capacitacionMusical,
  [emborozu.slug]: emborozu,
  [bermejo.slug]: bermejo,
  [sanIgnacio.slug]: sanIgnacio,
  [incosTarija.slug]: incosTarija,
  [sanAndres.slug]: sanAndres,
}

export const publishedInstitutes = institutes.filter((institute) => institute.hasDetail)

export function getInstitute(slug?: string) {
  return institutes.find((institute) => institute.slug === slug)
}

export type SearchEntry = {
  id: string
  kind: 'instituto' | 'carrera'
  label: string
  sublabel: string
  type: InstituteType
  slug: string
  career?: string
}

export function searchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []
  publishedInstitutes.forEach((institute) => {
    entries.push({
      id: `instituto:${institute.slug}`,
      kind: 'instituto',
      label: institute.name,
      sublabel: `${institute.location} · ${institute.province}`,
      type: institute.type,
      slug: institute.slug,
    })
    const seen = new Set<string>()
    getInstituteDetail(institute.slug)?.carreras?.forEach((carrera) => {
      if (seen.has(carrera.name)) return
      seen.add(carrera.name)
      entries.push({
        id: `carrera:${institute.slug}:${carrera.mediaKey}`,
        kind: 'carrera',
        label: carrera.name,
        sublabel: institute.shortName,
        type: institute.type,
        slug: institute.slug,
        career: carrera.name,
      })
    })
  })
  return entries
}

export function getInstituteDetail(slug?: string) {
  if (!slug) return undefined
  return details[slug]
}

export const featuredProducts = [
  { title: 'Producción agrícola', institute: 'Instituto Tecnológico 2 de Agosto', tag: 'Agropecuaria', slug: '2-de-agosto' },
  { title: 'Panificación y lácteos', institute: 'Instituto Tecnológico 2 de Agosto', tag: 'Alimentos', slug: '2-de-agosto' },
  { title: 'Vinos y singanis', institute: 'Instituto Tecnológico Uriondo', tag: 'Viticultura', slug: 'uriondo' },
  { title: 'Mermeladas y conservas', institute: 'Instituto Tecnológico Eustaquio Méndez', tag: 'Alimentos', slug: 'eustaquio-mendez' },
]

export { institutes }
export { gallery, galleryFor, galleryCareers, heroSlides } from './media'
export * from './types'
