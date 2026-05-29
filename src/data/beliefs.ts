import type { LocalizedText } from "@/types";

export type Belief = {
  title: LocalizedText;
  body: LocalizedText;
};

export type Milestone = {
  year: string;
  title: LocalizedText;
  body: LocalizedText;
};

/** Declaración de fe evangélica (6 artículos). */
export const beliefs: Belief[] = [
  {
    title: {
      es: "La Biblia",
      en: "The Bible",
    },
    body: {
      es: "Creemos que la Biblia es la Palabra de Dios inspirada, fiel y suficiente, nuestra autoridad final en fe y conducta.",
      en: "We believe the Bible is the inspired, trustworthy and sufficient Word of God, our final authority in faith and conduct.",
    },
  },
  {
    title: {
      es: "Dios trino",
      en: "The Triune God",
    },
    body: {
      es: "Creemos en un solo Dios eterno que existe en tres personas: Padre, Hijo y Espíritu Santo, iguales en poder y gloria.",
      en: "We believe in one eternal God who exists in three persons: Father, Son and Holy Spirit, equal in power and glory.",
    },
  },
  {
    title: {
      es: "Jesucristo",
      en: "Jesus Christ",
    },
    body: {
      es: "Creemos que Jesucristo es el Hijo de Dios, plenamente Dios y plenamente hombre, que murió por nuestros pecados y resucitó al tercer día.",
      en: "We believe that Jesus Christ is the Son of God, fully God and fully man, who died for our sins and rose again on the third day.",
    },
  },
  {
    title: {
      es: "Salvación por gracia",
      en: "Salvation by Grace",
    },
    body: {
      es: "Creemos que la salvación es un regalo de Dios recibido por gracia mediante la fe en Jesucristo, y no por nuestras obras.",
      en: "We believe salvation is a gift from God received by grace through faith in Jesus Christ, and not by our own works.",
    },
  },
  {
    title: {
      es: "El Espíritu Santo",
      en: "The Holy Spirit",
    },
    body: {
      es: "Creemos que el Espíritu Santo habita en cada creyente, le consuela, le guía a la verdad y le capacita para vivir y servir.",
      en: "We believe the Holy Spirit dwells in every believer, comforting, guiding into truth and empowering for life and service.",
    },
  },
  {
    title: {
      es: "La Iglesia",
      en: "The Church",
    },
    body: {
      es: "Creemos que la Iglesia es la familia de los creyentes, llamada a adorar a Dios, crecer juntos y anunciar las buenas nuevas al mundo.",
      en: "We believe the Church is the family of believers, called to worship God, grow together and share the good news with the world.",
    },
  },
];

/** Hitos de la historia de la iglesia (5 hitos). */
export const history: Milestone[] = [
  {
    year: "1998",
    title: {
      es: "El comienzo",
      en: "The Beginning",
    },
    body: {
      es: "Un pequeño grupo de familias se reunió por primera vez en un salón alquilado con el sueño de servir a su ciudad.",
      en: "A small group of families gathered for the first time in a rented hall with the dream of serving their city.",
    },
  },
  {
    year: "2003",
    title: {
      es: "Nuestro primer templo",
      en: "Our First Building",
    },
    body: {
      es: "Tras años de fe y trabajo, la congregación inauguró su primer local propio, un hogar para seguir creciendo.",
      en: "After years of faith and work, the congregation opened its first own venue, a home in which to keep growing.",
    },
  },
  {
    year: "2010",
    title: {
      es: "Tiempo de crecimiento",
      en: "A Season of Growth",
    },
    body: {
      es: "Nacieron nuevos ministerios para niños, jóvenes y familias, y los grupos pequeños se extendieron por la ciudad.",
      en: "New ministries for children, youth and families were born, and small groups spread across the city.",
    },
  },
  {
    year: "2016",
    title: {
      es: "Plantación y misiones",
      en: "Church Planting & Missions",
    },
    body: {
      es: "Enviamos equipos para plantar nuevas iglesias y apoyamos proyectos misioneros en España y en el extranjero.",
      en: "We sent teams to plant new churches and supported mission projects in Spain and abroad.",
    },
  },
  {
    year: "Hoy",
    title: {
      es: "Una familia que sigue creciendo",
      en: "A Family That Keeps Growing",
    },
    body: {
      es: "Hoy somos una comunidad viva con radio, televisión y multitud de ministerios, siempre con la misma misión: acercar a las personas a Cristo.",
      en: "Today we are a vibrant community with radio, television and many ministries, always with the same mission: to draw people closer to Christ.",
    },
  },
];
