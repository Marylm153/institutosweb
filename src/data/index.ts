import { institutes } from './institutes'
import { dosDeAgosto } from './institutes/2-de-agosto'
import { uriondo } from './institutes/uriondo'
import { capacitacionMusical } from './institutes/capacitacion-musical'
import { emborozu } from './institutes/emborozu'
import { bermejo } from './institutes/bermejo'
import { sanIgnacio } from './institutes/san-ignacio'
import { incosTarija } from './institutes/incos-tarija'
import type { InstituteDetail } from './types'

const details: Record<string, InstituteDetail> = {
  [dosDeAgosto.slug]: dosDeAgosto,
  [uriondo.slug]: uriondo,
  [capacitacionMusical.slug]: capacitacionMusical,
  [emborozu.slug]: emborozu,
  [bermejo.slug]: bermejo,
  [sanIgnacio.slug]: sanIgnacio,
  [incosTarija.slug]: incosTarija,
}

export function getInstitute(slug?: string) {
  return institutes.find((institute) => institute.slug === slug)
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
