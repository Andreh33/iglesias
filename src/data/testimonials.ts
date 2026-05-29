import type { Testimonial } from "@/types";

// Contenido demo bilingüe. Sustituye por testimonios reales (con permiso).
export const testimonials: Testimonial[] = [
  {
    id: "maria",
    name: "María Jiménez",
    role: { es: "Miembro desde 2015", en: "Member since 2015" },
    avatar: "/images/avatar-1.svg",
    quote: {
      es: "Llegué rota y encontré una familia. Aquí volví a creer que mi vida tenía propósito.",
      en: "I arrived broken and found a family. Here I came to believe again that my life had purpose.",
    },
  },
  {
    id: "david",
    name: "David Romero",
    role: { es: "Voluntario de jóvenes", en: "Youth volunteer" },
    avatar: "/images/avatar-2.svg",
    quote: {
      es: "Servir a los jóvenes me cambió a mí primero. Dios usa la comunidad para transformarnos.",
      en: "Serving the youth changed me first. God uses community to transform us.",
    },
  },
  {
    id: "lucia",
    name: "Lucía Prieto",
    role: { es: "Asiste con su familia", en: "Attends with her family" },
    avatar: "/images/avatar-3.svg",
    quote: {
      es: "Mis hijos esperan el domingo con ilusión. Es el lugar donde aprendimos a orar juntos.",
      en: "My children look forward to Sundays. It's where we learned to pray together.",
    },
  },
  {
    id: "antonio",
    name: "Antonio Fernández",
    role: { es: "Nuevo creyente", en: "New believer" },
    avatar: "/images/avatar-4.svg",
    quote: {
      es: "Nunca pensé que pisaría una iglesia. Hoy no concibo mi semana sin esta comunidad.",
      en: "I never thought I'd set foot in a church. Today I can't imagine my week without this community.",
    },
  },
  {
    id: "carmen",
    name: "Carmen Gil",
    role: { es: "Ministerio de oración", en: "Prayer ministry" },
    avatar: "/images/avatar-5.svg",
    quote: {
      es: "En los momentos más oscuros, las oraciones de esta familia me sostuvieron en pie.",
      en: "In the darkest moments, the prayers of this family kept me standing.",
    },
  },
  {
    id: "samuel",
    name: "Samuel Moreno",
    role: { es: "Equipo de alabanza", en: "Worship team" },
    avatar: "/images/avatar-6.svg",
    quote: {
      es: "Cada canción es una oración. Aquí aprendí que adorar es entregar el corazón entero.",
      en: "Every song is a prayer. Here I learned that worship means giving your whole heart.",
    },
  },
];
