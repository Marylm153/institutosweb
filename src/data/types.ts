export type InstituteType = 'Técnico' | 'Artístico'

export type Coordinates = { lat: number; lng: number }

export type Sede = {
  name: string
  address: string
  reference?: string
  coordinates: Coordinates
  whatsapp?: string
  schedule?: string
  days?: string
  ages?: string
  teacher?: string
  instruments?: string[]
  mapUrl?: string
}

export type OfertaItem = { title: string; items: string[] }

export type VitrinaItem = { name: string; presentation?: string; description?: string; image?: string }
export type VitrinaGroup = { title: string; note?: string; items: VitrinaItem[] }
export type Authority = { name: string; role: string }
export type DocumentLink = { label: string; file: string }

export type CurriculumSubject = {
  code: string
  name: string
  hours: number
  prerequisite?: string
}

export type CurriculumYear = { year: string; subjects: CurriculumSubject[] }

export type Carrera = {
  name: string
  mediaKey: string
  sede: string
  level: string
  duration: string
  regime: string
  modality: string
  schedule?: string
  degree: string
  profile: string[]
  workField: string[]
  infrastructure: string[]
  curriculum: CurriculumYear[] | null
  curriculumNote?: string
  curriculumImage?: string
}

export type Faq = { question: string; answer: string }

export type InstituteContact = {
  whatsapp?: string
  phones?: string[]
  email?: string
  facebook?: string
  hours?: string
}

export type InstituteDetail = {
  slug: string
  officialName: string
  type: InstituteType
  municipality: string
  province: string
  founded?: string
  studentCount?: string
  authority?: string
  authorityRole?: string
  mission?: string
  vision?: string
  summary: string
  about?: string
  logo?: string
  history?: string[]
  achievements?: string[]
  oferta?: OfertaItem[]
  vitrina?: VitrinaGroup[]
  authorities?: Authority[]
  convenios?: string[]
  documents?: DocumentLink[]
  sedes: Sede[]
  carreras?: Carrera[]
  faqs: Faq[]
  contact: InstituteContact
  products?: { title: string; description: string }[]
}

export type Institute = {
  slug: string
  name: string
  shortName: string
  type: InstituteType
  location: string
  province: string
  focus: string
  initials: string
  programs: string[]
  description: string
  hasDetail: boolean
  coordinates?: Coordinates
}

export type GalleryImage = {
  src: string
  slug: string
  career: string
  file: string
  alt: string
}

export type HeroSlide = {
  slug: string
  name: string
  program: string
  image: string
}
