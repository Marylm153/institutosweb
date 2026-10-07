import type { InstituteDetail } from '../types'

export const uriondo: InstituteDetail = {
  slug: 'uriondo',
  officialName: 'Instituto Tecnológico “Uriondo”',
  type: 'Técnico',
  municipality: 'Uriondo',
  province: 'Avilés',
  founded: '2015',
  mission:
    'Promover una formación Técnica y Tecnológica profesional integral, altamente competitiva, mediante la implementación y ejecución de políticas y estrategias inclusivas, equitativas y científicas de calidad, articulando las potencialidades y oportunidades productivas de la región para contribuir al desarrollo del Municipio.',
  vision:
    'El Instituto Tecnológico Uriondo es una institución de educación técnica y tecnológica productiva comunitaria que se constituye en un instrumento de integración con el sector productivo de la región, con una pertinencia académica sociocultural, contribuyendo a la innovación productiva e industrial para el desarrollo de nuestra sociedad en armonía con la naturaleza para el vivir bien.',
  summary:
    'El Instituto Tecnológico “Uriondo” es una institución de educación técnica y tecnológica productiva que forma Técnicos Superiores en Viticultura y Enología, articulando la formación con el sector productivo vitivinícola del municipio de Uriondo. Funciona en la comunidad de Calamuchita y fue creado mediante Resolución Ministerial N.º 244/2015.',
  about:
    'Institución de educación técnica y tecnológica productiva que forma Técnicos Superiores en Viticultura y Enología, articulada con la cadena vitivinícola del municipio de Uriondo. Funciona en la comunidad de Calamuchita.',
  sedes: [
    {
      name: 'Sede Calamuchita',
      address: 'Comunidad de Calamuchita, municipio de Uriondo',
      reference: 'A 400 metros de la carretera principal de Calamuchita',
      coordinates: { lat: -21.7077137, lng: -64.6232565 },
      whatsapp: '71893753',
      schedule: '13:30 – 18:30',
      mapUrl: 'https://maps.app.goo.gl/zGUFJrjjMeAogf49A',
    },
  ],
  carreras: [
    {
      name: 'Viticultura y Enología',
      mediaKey: 'viticultura',
      sede: 'Calamuchita, Uriondo',
      level: 'Técnico Superior',
      duration: '3 años',
      regime: 'Anual',
      modality: 'Presencial',
      degree: 'Técnico Superior en Viticultura y Enología',
      profile: [
        'Gestionar las operaciones de producción: evaluar, dirigir, planificar, organizar, controlar, manejar costos y registrar.',
        'Asegurar y garantizar la calidad de la producción (uvas, vinos, singanis y productos derivados) según normativa nacional e internacional.',
        'Planificar, gestionar, administrar y desarrollar proyectos de producción, innovación y emprendimientos.',
        'Brindar asistencia técnica especializada.',
        'Aplicar conocimientos de seguridad industrial y protección del medio ambiente.',
        'Optimizar los procesos de preparación de suelos, plantación, fertilización, riego, manejo integrado de plagas y enfermedades, podas y sistemas de conducción del viñedo.',
        'Diseñar y organizar el viñedo de acuerdo con especificaciones técnicas.',
        'Elaborar bebidas fermentadas y no fermentadas a partir de la uva: vinos, singanis, jugos, conservas y otros derivados.',
        'Realizar análisis y controlar los procesos de elaboración y calidad de vinos, singanis y productos derivados.',
        'Manejar la maquinaria, equipos, herramientas y utensilios de la industria vitícola y enológica.',
      ],
      workField: [],
      infrastructure: [
        'Módulo productivo bajo cubierta: 2 invernaderos de producción de uva.',
        'Invernadero de producción de portainjertos y plantines de vid.',
        'Área enológica.',
      ],
      curriculum: [
        {
          year: 'Primer año',
          subjects: [
            { code: 'CSM-101', name: 'Calidad, Seguridad Laboral y Medio Ambiente', hours: 4 },
            { code: 'INT-102', name: 'Inglés Técnico', hours: 2 },
            { code: 'MAT-103', name: 'Matemática Aplicada', hours: 2 },
            { code: 'QMC-104', name: 'Química Aplicada', hours: 4 },
            { code: 'VIT-105', name: 'Viticultura I', hours: 4 },
            { code: 'MIV-106', name: 'Microbiología Vitivinícola', hours: 4 },
            { code: 'ENB-107', name: 'Enología Básica', hours: 4 },
            { code: 'EDA-108', name: 'Edafología Vitícola', hours: 4 },
            { code: 'BFB-109', name: 'Botánica y Fisiología Vitícola', hours: 2 },
          ],
        },
        {
          year: 'Segundo año',
          subjects: [
            { code: 'VIT-201', name: 'Viticultura II y Maquinaria Vitícola', hours: 4, prerequisite: 'VIT-105' },
            { code: 'EME-202', name: 'Enología I y Maquinaria Enológica', hours: 4 },
            { code: 'MVI-203', name: 'Manejo de Viñedos y Poscosecha', hours: 4 },
            { code: 'SIR-204', name: 'Sistemas de Riegos', hours: 2 },
            { code: 'IPB-205', name: 'Insumos Enológicos y Prácticas Bodegueras', hours: 4 },
            { code: 'TEA-206', name: 'Tecnología Agroindustrial', hours: 4, prerequisite: 'CSM-101' },
            { code: 'CEP-207', name: 'Climatología, Enfermedades y Plagas de la Vid', hours: 4 },
            { code: 'EMP-208', name: 'Emprendimiento Productivo', hours: 4 },
          ],
        },
        {
          year: 'Tercer año',
          subjects: [
            { code: 'VIT-301', name: 'Viticultura III', hours: 4, prerequisite: 'VIT-201' },
            { code: 'ENO-302', name: 'Enología II', hours: 6, prerequisite: 'EME-202' },
            { code: 'CCV-303', name: 'Análisis y Control de Calidad de Vinos y Singanis', hours: 6 },
            { code: 'MAU-304', name: 'Manejo de Uva de Mesa, Vinificación y de Pasas', hours: 4, prerequisite: 'MVI-203' },
            { code: 'MIP-305', name: 'Manejo Integrado de Plagas y Enfermedades', hours: 4 },
            { code: 'FOV-306', name: 'Formación y Organización Vitivinícola', hours: 2 },
            { code: 'TMG-307', name: 'Taller de Modalidad de Graduación', hours: 4 },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: '¿Hay examen de admisión?',
      answer: 'No. El ingreso es directo, sin examen de admisión.',
    },
    {
      question: '¿Qué carrera ofrece el instituto?',
      answer: 'Viticultura y Enología, con nivel Técnico Superior y una duración de 3 años en régimen anual.',
    },
    {
      question: '¿Qué requisitos necesito para inscribirme?',
      answer: 'Diploma de Bachiller, Cédula de Identidad vigente y Certificado de Nacimiento (original y fotocopia de cada uno).',
    },
    {
      question: '¿Cuál es el horario de clases?',
      answer: 'De 13:30 a 18:30.',
    },
    {
      question: '¿Cuándo inician las clases?',
      answer: 'Las fechas se definen por Resolución Ministerial en cada gestión.',
    },
  ],
  contact: {
    whatsapp: '71893753',
    phones: ['79257679'],
    hours: '13:30 – 18:30',
  },
  products: [
    { title: 'Vinos', description: 'Vino blanco varietal, rosado, tinto varietal y tinto bivarietal.' },
    { title: 'Singani', description: 'Singani y singani macerado con roble francés.' },
    { title: 'Jugo de uva y subproductos', description: 'Jugo de uva y subproductos derivados de la uva.' },
    { title: 'Uva de mesa', description: 'Variedades Victoria, Arra 15, Arra 30, Matilde, Candy Cotton y Centennial Seedless.' },
    { title: 'Plantines de vid', description: 'Variedades Tannat, Syrah, Red Globe, Italia, Moscatel de Alejandría y otras.' },
  ],
}
