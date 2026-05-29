import type { Facility } from "@/types";

/** Instalaciones de la iglesia. */
export const facilities: Facility[] = [
  {
    id: "auditorio",
    name: {
      es: "Auditorio principal",
      en: "Main Auditorium",
    },
    description: {
      es: "Nuestro templo principal, un espacio amplio y luminoso donde la congregación se reúne para adorar cada semana.",
      en: "Our main sanctuary, a spacious and bright space where the congregation gathers to worship each week.",
    },
    image: "/images/facility-1.svg",
    details: [
      { es: "Aforo para 800 personas", en: "Seating for 800 people" },
      { es: "Sonido e iluminación profesionales", en: "Professional sound and lighting" },
      { es: "Acceso para sillas de ruedas", en: "Wheelchair accessible" },
    ],
  },
  {
    id: "cafeteria",
    name: {
      es: "Cafetería",
      en: "Café",
    },
    description: {
      es: "Un punto de encuentro acogedor para compartir un café, conversar y crear comunidad antes y después de los servicios.",
      en: "A cozy meeting point to share a coffee, talk and build community before and after services.",
    },
    image: "/images/facility-2.svg",
    details: [
      { es: "Abierta los domingos de 9:00 a 14:00", en: "Open Sundays from 9:00 to 14:00" },
      { es: "Opciones veganas y sin gluten", en: "Vegan and gluten-free options" },
      { es: "Terraza exterior con vistas", en: "Outdoor terrace with views" },
    ],
    highlight: true,
  },
  {
    id: "aula-infantil",
    name: {
      es: "Aula infantil",
      en: "Children's Room",
    },
    description: {
      es: "Un espacio seguro, colorido y pensado para que los más pequeños aprendan sobre Dios mientras juegan.",
      en: "A safe, colorful space designed for little ones to learn about God while they play.",
    },
    image: "/images/facility-3.svg",
    details: [
      { es: "Para niños de 0 a 11 años", en: "For children aged 0 to 11" },
      { es: "Personal formado y voluntarios verificados", en: "Trained staff and screened volunteers" },
      { es: "Zona de juego y biblioteca infantil", en: "Play area and children's library" },
    ],
  },
  {
    id: "salas-cursos",
    name: {
      es: "Salas de cursos",
      en: "Course Rooms",
    },
    description: {
      es: "Salas versátiles equipadas para grupos pequeños, estudios bíblicos, talleres y cursos de formación.",
      en: "Versatile rooms equipped for small groups, Bible studies, workshops and training courses.",
    },
    image: "/images/facility-4.svg",
    details: [
      { es: "Cuatro salas de 15 a 40 personas", en: "Four rooms for 15 to 40 people" },
      { es: "Proyector y pizarra en cada sala", en: "Projector and whiteboard in each room" },
      { es: "Reservables durante la semana", en: "Bookable during the week" },
    ],
  },
  {
    id: "libreria",
    name: {
      es: "Librería y tienda",
      en: "Bookshop & Store",
    },
    description: {
      es: "Tienda física donde encontrar biblias, libros, música y regalos cristianos seleccionados con cariño.",
      en: "A physical store offering Bibles, books, music and Christian gifts carefully selected with care.",
    },
    image: "/images/facility-5.svg",
    details: [
      { es: "Abierta tras cada servicio", en: "Open after every service" },
      { es: "Pedidos por encargo disponibles", en: "Special orders available" },
      { es: "Recogida de compras online", en: "Online order pickup" },
    ],
  },
  {
    id: "estudio",
    name: {
      es: "Estudio de radio y TV",
      en: "Radio & TV Studio",
    },
    description: {
      es: "Estudio profesional desde donde producimos y emitimos nuestros programas de radio y televisión.",
      en: "A professional studio from which we produce and broadcast our radio and television programs.",
    },
    image: "/images/facility-6.svg",
    details: [
      { es: "Emisión en directo y bajo demanda", en: "Live and on-demand broadcasting" },
      { es: "Cabina de locución insonorizada", en: "Soundproof broadcasting booth" },
      { es: "Visitas guiadas con cita previa", en: "Guided tours by appointment" },
    ],
  },
  {
    id: "aparcamiento",
    name: {
      es: "Aparcamiento",
      en: "Parking",
    },
    description: {
      es: "Amplio aparcamiento gratuito para que tu visita sea cómoda desde el primer momento.",
      en: "A large free parking area so your visit is comfortable from the very first moment.",
    },
    image: "/images/facility-7.svg",
    details: [
      { es: "120 plazas gratuitas", en: "120 free spaces" },
      { es: "Plazas reservadas para movilidad reducida", en: "Reserved spaces for reduced mobility" },
      { es: "Bien iluminado y videovigilado", en: "Well-lit and under video surveillance" },
    ],
  },
];
