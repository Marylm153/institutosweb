import type { InstituteDetail } from '../types'

export const capacitacionMusical: InstituteDetail = {
  slug: 'capacitacion-musical',
  officialName: 'Programa de Capacitación Musical Niños, Niñas y Adolescentes – Orquesta Sinfónica Departamental de Tarija',
  type: 'Artístico',
  municipality: 'Cercado',
  province: 'Cercado',
  mission:
    'Brindar formación musical a niños, niñas y adolescentes mediante procesos de enseñanza instrumental y práctica orquestal, promoviendo el desarrollo artístico, personal y social de los estudiantes.',
  vision:
    'Consolidarse como un programa de formación musical reconocido a nivel departamental, ampliando el acceso a la educación musical y fortaleciendo su presencia en diferentes zonas del departamento de Tarija.',
  summary:
    'El Programa de Capacitación Musical de Niños, Niñas y Adolescentes de la Orquesta Sinfónica Departamental de Tarija promueve la prevención social a través de la música y acerca la formación instrumental y la práctica orquestal a distintos barrios de la ciudad, con el propósito de contribuir a la reducción de la delincuencia, el consumo de alcohol y el analfabetismo cultural y musical.',
  history: [
    '“La música puede convertirse en una oportunidad de formación, integración y crecimiento para niños y jóvenes, sin importar el lugar donde vivan.” Con ese enfoque, el Programa de Capacitación Musical de la Dirección de Educación, Ciencia y Tecnología (Secretaría de Desarrollo Humano del G.A.D.T.) utiliza la música como herramienta de prevención social.',
    'El programa crea núcleos o sedes de formación musical dirigidos a niños, niñas y adolescentes, especialmente en situación de vulnerabilidad, con el fin de brindar una nueva oportunidad de vida, fomentar valores fundamentales y promover su integración social y cultural.',
    'La Orquesta Sinfónica Departamental es el eje central del programa: un espacio de formación artística y humana donde la música se convierte en una vía para el desarrollo integral, el rescate de talentos y la mejora de la calidad de vida de los participantes, fortaleciendo su autoestima, disciplina y sentido de pertenencia.',
  ],
  achievements: [
    '2013: primer lugar en un concurso juvenil realizado en la ciudad de Santa Cruz, representando a Tarija.',
    '2016: estreno mundial de la Sinfonía N.º 40 de Pedro Ximénez de Abril y Tirado, en el marco del XI Festival Internacional de Música Renacentista y Barroca Americana "Misiones de Chiquitos", bajo la dirección del maestro Luiz do Amaral.',
    '2022: apertura de la primera sede en el barrio Santa Rosa, primer núcleo de formación musical fuera de la sede central.',
    '2023: concierto benéfico en el Teatro de la Cultura junto a Taricanto, Cantares, Mariachi Sol de México y Erick Claros.',
    '2025: apertura de la sede Lourdes (Proyecto Moto Méndez), incorporando piano, guitarra y canto.',
    '2026: traslado de las actividades de la sede Santa Rosa al barrio El Constructor.',
  ],
  oferta: [
    { title: 'Instrumentos musicales', items: ['Piano', 'Guitarra', 'Canto', 'Violín', 'Viola', 'Cello', 'Contrabajo'] },
    { title: 'Formación', items: ['Enseñanza instrumental', 'Práctica orquestal', 'Integración social y cultural'] },
  ],
  sedes: [
    {
      name: 'Sede Lourdes – Proyecto Moto Méndez',
      address: 'Av. 11 de Febrero casi esquina Colón, barrio Lourdes, Tarija',
      reference: 'Proyecto Moto Méndez',
      coordinates: { lat: -21.5286, lng: -64.7229 },
      whatsapp: '77170398',
      schedule: '15:00 – 18:00 (a coordinar por instrumento)',
      days: 'Lunes a viernes',
      ages: '8 – 16 años',
      teacher: 'Prof. Carlos Horacio Gareca Cardozo',
      instruments: ['Piano', 'Guitarra', 'Canto', 'Violín', 'Viola', 'Cello', 'Contrabajo'],
      mapUrl: 'https://maps.app.goo.gl/uzQwNDkXSbVptFhW6',
    },
    {
      name: 'Sede El Constructor',
      address: 'Calle Aguayrenda y Av. Sanandita, sede del barrio El Constructor, Tarija',
      coordinates: { lat: -21.5225, lng: -64.7049 },
      whatsapp: '72969214',
      schedule: '15:00 – 18:00 (a coordinar por instrumento)',
      days: 'Lunes a viernes',
      ages: '8 – 16 años',
      teacher: 'Prof. Felipe Adrián Nuñez',
      instruments: ['Violín', 'Viola', 'Cello', 'Contrabajo'],
      mapUrl: 'https://maps.app.goo.gl/Moj39URyPZMRjrPJ9',
    },
  ],
  faqs: [
    { question: '¿Quiénes pueden participar?', answer: 'Niños, niñas y adolescentes de 8 a 16 años.' },
    { question: '¿Qué instrumentos puedo aprender?', answer: 'Piano, guitarra, canto, violín, viola, cello y contrabajo, según la sede.' },
    { question: '¿Qué días y horarios hay?', answer: 'De lunes a viernes, de 15:00 a 18:00, a coordinar por instrumento.' },
    { question: '¿Dónde funcionan las sedes?', answer: 'En el barrio Lourdes (Proyecto Moto Méndez) y en el barrio El Constructor, en la ciudad de Tarija.' },
    { question: '¿Cómo me inscribo o consulto?', answer: 'Contacta a las sedes: 77170398 (Lourdes) y 72969214 (El Constructor).' },
  ],
  contact: {
    whatsapp: '77170398',
    phones: ['72969214'],
    hours: '15:00 – 18:00 (lunes a viernes)',
  },
}
