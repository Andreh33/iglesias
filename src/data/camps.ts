import type { Camp } from "@/types";

// ───────────────────────────────────────────────────────────────────────────
//  Campamentos y retiros de la iglesia.
//  Contenido bilingüe (LocalizedText). Resuélvelo con t() de "@/lib/i18n".
//  price en EUR (formatPrice de "@/lib/format"). image en /public/images.
// ───────────────────────────────────────────────────────────────────────────

export const camps: Camp[] = [
  {
    slug: "campamento-infantil",
    title: {
      es: "Campamento infantil",
      en: "Children's camp",
    },
    ages: {
      es: "De 6 a 11 años",
      en: "Ages 6 to 11",
    },
    dates: {
      es: "Del 6 al 10 de julio de 2026",
      en: "July 6 to 10, 2026",
    },
    place: {
      es: "Granja-escuela El Encinar, Sierra de Madrid",
      en: "El Encinar farm school, Sierra de Madrid",
    },
    price: 145,
    spots: 60,
    image: "/images/camp-1.svg",
    description: {
      es: "Cinco días de aventura, juegos y naturaleza donde los más pequeños descubren el amor de Dios a través de historias, manualidades y muchas risas. Un equipo de monitores formados cuida cada detalle para que vivan una experiencia segura e inolvidable.",
      en: "Five days of adventure, games and nature where the little ones discover God's love through stories, crafts and plenty of laughter. A team of trained leaders looks after every detail so they enjoy a safe and unforgettable experience.",
    },
  },
  {
    slug: "campamento-juvenil",
    title: {
      es: "Campamento juvenil",
      en: "Youth camp",
    },
    ages: {
      es: "De 12 a 17 años",
      en: "Ages 12 to 17",
    },
    dates: {
      es: "Del 20 al 26 de julio de 2026",
      en: "July 20 to 26, 2026",
    },
    place: {
      es: "Albergue Costa Brava, Girona",
      en: "Costa Brava lodge, Girona",
    },
    price: 235,
    spots: 80,
    image: "/images/camp-2.svg",
    description: {
      es: "Una semana intensa de fe, amistad y aventura junto al mar. Combinamos encuentros de alabanza, deportes, talleres y noches temáticas para que cada adolescente crezca, conecte con otros jóvenes y encuentre su propósito en Cristo.",
      en: "An intense week of faith, friendship and adventure by the sea. We combine worship gatherings, sports, workshops and themed nights so every teenager can grow, connect with other young people and find their purpose in Christ.",
    },
  },
  {
    slug: "campamento-familiar",
    title: {
      es: "Campamento familiar",
      en: "Family camp",
    },
    ages: {
      es: "Todas las edades · familias completas",
      en: "All ages · whole families",
    },
    dates: {
      es: "Del 14 al 17 de agosto de 2026",
      en: "August 14 to 17, 2026",
    },
    place: {
      es: "Complejo rural Valle del Tiétar, Ávila",
      en: "Valle del Tiétar rural resort, Ávila",
    },
    price: 110,
    spots: 120,
    image: "/images/camp-3.svg",
    description: {
      es: "Un fin de semana largo para desconectar de la rutina y reconectar como familia y como iglesia. Hay actividades para todas las edades, tiempos de adoración para grandes y pequeños, y espacios de descanso para disfrutar juntos en la naturaleza.",
      en: "A long weekend to unplug from routine and reconnect as a family and as a church. There are activities for all ages, worship times for both grown-ups and children, and restful spaces to enjoy together in nature.",
    },
  },
  {
    slug: "retiro-de-mujeres",
    title: {
      es: "Retiro de mujeres",
      en: "Women's retreat",
    },
    ages: {
      es: "Mujeres a partir de 18 años",
      en: "Women aged 18 and over",
    },
    dates: {
      es: "Del 13 al 15 de febrero de 2026",
      en: "February 13 to 15, 2026",
    },
    place: {
      es: "Casa de retiros Monte Tabor, Toledo",
      en: "Monte Tabor retreat house, Toledo",
    },
    price: 130,
    spots: 50,
    image: "/images/camp-4.svg",
    description: {
      es: "Un retiro de invierno para descansar en la presencia de Dios, profundizar en su Palabra y fortalecer la amistad entre hermanas. Tres días de enseñanza, oración, talleres y momentos de calma para volver renovadas y con el corazón lleno.",
      en: "A winter retreat to rest in God's presence, dig deeper into His Word and strengthen friendship among sisters. Three days of teaching, prayer, workshops and quiet moments to return renewed and with a full heart.",
    },
  },
];
