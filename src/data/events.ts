import type { ChurchEvent } from "@/types";

// Contenido demo bilingüe. Sustituye por eventos reales de la agenda.
export const events: ChurchEvent[] = [
  {
    slug: "conferencia-raices-firmes",
    title: { es: "Conferencia «Raíces Firmes»", en: '"Firm Roots" Conference' },
    type: "conferencia",
    date: "2026-06-13",
    time: "10:00",
    endTime: "18:00",
    location: { es: "Auditorio principal", en: "Main auditorium" },
    image: "/images/event-1.svg",
    excerpt: {
      es: "Un día completo para afianzar tu fe en la Palabra.",
      en: "A full day to anchor your faith in the Word.",
    },
    description: {
      es: "Una jornada de enseñanza profunda con pastores invitados. Exploraremos cómo echar raíces firmes en tiempos de cambio. Habrá talleres, oración y un tiempo de comunión al mediodía.",
      en: "A day of deep teaching with guest pastors. We will explore how to put down firm roots in changing times. There will be workshops, prayer and a time of fellowship at midday.",
    },
  },
  {
    slug: "concierto-luz-y-cielo",
    title: { es: "Concierto «Luz y Cielo»", en: '"Light and Sky" Concert' },
    type: "concierto",
    date: "2026-07-04",
    time: "20:00",
    endTime: "22:00",
    location: { es: "Plaza de la iglesia", en: "Church square" },
    image: "/images/event-2.svg",
    excerpt: {
      es: "Una noche de adoración al aire libre bajo las estrellas.",
      en: "A night of open-air worship under the stars.",
    },
    description: {
      es: "Nuestro equipo de alabanza y artistas invitados nos guiarán en una velada de adoración. Será una noche para levantar la mirada y celebrar juntos. Entrada libre para toda la familia.",
      en: "Our worship team and guest artists will lead us in an evening of worship. It will be a night to lift our eyes and celebrate together. Free entry for the whole family.",
    },
  },
  {
    slug: "vigilia-clamor-de-medianoche",
    title: { es: "Vigilia «Clamor de Medianoche»", en: '"Midnight Cry" Vigil' },
    type: "vigilia",
    date: "2026-07-25",
    time: "22:00",
    endTime: "03:00",
    location: { es: "Templo central", en: "Central temple" },
    image: "/images/event-3.svg",
    excerpt: {
      es: "Una noche entregada a la oración y la intercesión.",
      en: "A night devoted to prayer and intercession.",
    },
    description: {
      es: "Nos reuniremos para clamar juntos por nuestra ciudad y nuestras familias. La vigilia incluirá momentos de alabanza, lectura bíblica y oración guiada. Trae tu manta y un corazón dispuesto.",
      en: "We will gather to cry out together for our city and our families. The vigil will include moments of praise, Scripture reading and guided prayer. Bring your blanket and a willing heart.",
    },
  },
  {
    slug: "encuentro-jovenes-sin-limites",
    title: { es: "Encuentro Jóvenes «Sin Límites»", en: '"No Limits" Youth Gathering' },
    type: "jovenes",
    date: "2026-08-22",
    time: "18:30",
    endTime: "21:30",
    location: { es: "Salón de jóvenes", en: "Youth hall" },
    image: "/images/event-4.svg",
    excerpt: {
      es: "Una tarde diseñada por y para la nueva generación.",
      en: "An evening designed by and for the new generation.",
    },
    description: {
      es: "Música, juegos, testimonios y una palabra fresca para los jóvenes. Queremos crear un espacio seguro donde puedas encontrarte con Dios y con amigos. Invita a quien quieras: todos son bienvenidos.",
      en: "Music, games, testimonies and a fresh word for young people. We want to create a safe space where you can meet God and friends. Invite whoever you like: everyone is welcome.",
    },
  },
  {
    slug: "comida-familiar-de-otono",
    title: { es: "Comida Familiar de Otoño", en: "Autumn Family Lunch" },
    type: "comida",
    date: "2026-09-27",
    time: "13:30",
    endTime: "16:30",
    location: { es: "Jardín comunitario", en: "Community garden" },
    image: "/images/event-5.svg",
    excerpt: {
      es: "Compartimos la mesa y celebramos la comunidad.",
      en: "We share the table and celebrate community.",
    },
    description: {
      es: "Un almuerzo compartido para conocernos mejor más allá del culto del domingo. Cada familia trae un plato y la iglesia pone el resto. Habrá juegos para los niños y sobremesa para los mayores.",
      en: "A shared lunch to get to know each other beyond the Sunday service. Each family brings a dish and the church provides the rest. There will be games for the children and good conversation for the grown-ups.",
    },
  },
  {
    slug: "conferencia-familias-que-perduran",
    title: { es: "Conferencia «Familias que Perduran»", en: '"Lasting Families" Conference' },
    type: "conferencia",
    date: "2026-10-17",
    time: "11:00",
    endTime: "19:00",
    location: { es: "Auditorio principal", en: "Main auditorium" },
    image: "/images/event-6.svg",
    excerpt: {
      es: "Herramientas bíblicas para fortalecer el hogar.",
      en: "Biblical tools to strengthen the home.",
    },
    description: {
      es: "Un encuentro pensado para matrimonios, padres e hijos. Trataremos la comunicación, el perdón y la fe en el día a día del hogar. Contaremos con espacios separados para parejas y para padres.",
      en: "A gathering designed for couples, parents and children. We will cover communication, forgiveness and faith in daily home life. There will be separate sessions for couples and for parents.",
    },
  },
  {
    slug: "concierto-navidad-emmanuel",
    title: { es: "Concierto de Navidad «Emmanuel»", en: '"Emmanuel" Christmas Concert' },
    type: "concierto",
    date: "2026-12-12",
    time: "19:00",
    endTime: "21:00",
    location: { es: "Templo central", en: "Central temple" },
    image: "/images/event-7.svg",
    excerpt: {
      es: "Villancicos y adoración para celebrar el nacimiento.",
      en: "Carols and worship to celebrate the nativity.",
    },
    description: {
      es: "El coro y la orquesta de la iglesia nos llevarán por la historia de la Navidad. Una noche para recordar que Dios vino a habitar entre nosotros. Te esperamos con tu familia y amigos.",
      en: "The church choir and orchestra will guide us through the Christmas story. A night to remember that God came to dwell among us. We look forward to seeing you with family and friends.",
    },
  },
  {
    slug: "vigilia-fin-de-ano",
    title: { es: "Vigilia de Fin de Año", en: "New Year's Eve Vigil" },
    type: "vigilia",
    date: "2026-12-31",
    time: "22:30",
    endTime: "00:30",
    location: { es: "Templo central", en: "Central temple" },
    image: "/images/event-8.svg",
    excerpt: {
      es: "Despedimos el año en gratitud y oración.",
      en: "We see out the year in gratitude and prayer.",
    },
    description: {
      es: "Cerramos el año dando gracias por todo lo vivido y entregando el nuevo a Dios. La noche incluirá testimonios, alabanza y la entrada al año con oración. Recibe el nuevo año rodeado de tu familia de fe.",
      en: "We close the year giving thanks for all we have lived and entrusting the new one to God. The night will include testimonies, praise and entering the year in prayer. Welcome the new year surrounded by your family of faith.",
    },
  },
];
