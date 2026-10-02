export type InstituteType = 'Técnico' | 'Artístico'

export type Coordinates = { lat: number; lng: number }

export type Sede = {
  name: string
  address: string
  reference?: string
  coordinates: Coordinates
  whatsapp?: string
  schedule?: string
  mapUrl?: string
}

export type CurriculumYear = { year: string; subjects: string[] }

export type Carrera = {
  name: string
  mediaKey: string
  sede: string
  level: string
  duration: string
  regime: string
  modality: string
  degree: string
  profile: string[]
  workField: string[]
  infrastructure: string[]
  curriculum: CurriculumYear[] | null
  curriculumNote?: string
}

export type Faq = { question: string; answer: string }

export type InstituteContact = {
  whatsapp?: string
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
  founded: string
  studentCount?: string
  authority?: string
  authorityRole?: string
  mission: string
  vision: string
  summary: string
  history: string[]
  achievements: string[]
  sedes: Sede[]
  carreras: Carrera[]
  faqs: Faq[]
  contact: InstituteContact
  products: { title: string; description: string }[]
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
  alt: string
}

export type HeroSlide = {
  slug: string
  name: string
  program: string
  image: string
}
