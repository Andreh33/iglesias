import type { ScheduleSlot, VideoItem } from "@/types";

/** Parrilla semanal de la radio. */
export const radioSchedule: ScheduleSlot[] = [
  {
    day: { es: "Lunes", en: "Monday" },
    time: "07:00",
    title: { es: "Despertar con esperanza", en: "Wake Up with Hope" },
    kind: { es: "Devocional", en: "Devotional" },
  },
  {
    day: { es: "Lunes", en: "Monday" },
    time: "20:00",
    title: { es: "Verdades de la Palabra", en: "Truths from the Word" },
    kind: { es: "Predicación", en: "Preaching" },
  },
  {
    day: { es: "Martes", en: "Tuesday" },
    time: "18:00",
    title: { es: "Alabanza sin fin", en: "Endless Praise" },
    kind: { es: "Alabanza", en: "Worship" },
  },
  {
    day: { es: "Miércoles", en: "Wednesday" },
    time: "21:00",
    title: { es: "Generación viva", en: "Living Generation" },
    kind: { es: "Programa juvenil", en: "Youth program" },
  },
  {
    day: { es: "Jueves", en: "Thursday" },
    time: "12:00",
    title: { es: "Música para el alma", en: "Music for the Soul" },
    kind: { es: "Música", en: "Music" },
  },
  {
    day: { es: "Viernes", en: "Friday" },
    time: "19:30",
    title: { es: "Café y testimonio", en: "Coffee & Testimony" },
    kind: { es: "Testimonios", en: "Testimonies" },
  },
  {
    day: { es: "Sábado", en: "Saturday" },
    time: "10:00",
    title: { es: "Familia en casa", en: "Family at Home" },
    kind: { es: "Familia", en: "Family" },
  },
  {
    day: { es: "Sábado", en: "Saturday" },
    time: "22:00",
    title: { es: "Noche de adoración", en: "Worship Night" },
    kind: { es: "Alabanza", en: "Worship" },
  },
  {
    day: { es: "Domingo", en: "Sunday" },
    time: "11:00",
    title: { es: "Culto en directo", en: "Live Service" },
    kind: { es: "Predicación", en: "Preaching" },
  },
  {
    day: { es: "Domingo", en: "Sunday" },
    time: "18:00",
    title: { es: "Reflexión del día", en: "Reflection of the Day" },
    kind: { es: "Devocional", en: "Devotional" },
  },
];

/** Parrilla semanal de la televisión. */
export const tvSchedule: ScheduleSlot[] = [
  {
    day: { es: "Lunes", en: "Monday" },
    time: "21:00",
    title: { es: "Palabra que transforma", en: "The Word That Transforms" },
    kind: { es: "Predicación", en: "Preaching" },
  },
  {
    day: { es: "Miércoles", en: "Wednesday" },
    time: "20:00",
    title: { es: "Conciertos en vivo", en: "Live Concerts" },
    kind: { es: "Música", en: "Music" },
  },
  {
    day: { es: "Jueves", en: "Thursday" },
    time: "22:00",
    title: { es: "Historias de fe", en: "Stories of Faith" },
    kind: { es: "Testimonios", en: "Testimonies" },
  },
  {
    day: { es: "Viernes", en: "Friday" },
    time: "21:30",
    title: { es: "Jóvenes en acción", en: "Youth in Action" },
    kind: { es: "Programa juvenil", en: "Youth program" },
  },
  {
    day: { es: "Sábado", en: "Saturday" },
    time: "19:00",
    title: { es: "Tiempo en familia", en: "Family Time" },
    kind: { es: "Familia", en: "Family" },
  },
  {
    day: { es: "Domingo", en: "Sunday" },
    time: "11:00",
    title: { es: "Culto dominical en directo", en: "Live Sunday Service" },
    kind: { es: "Culto", en: "Service" },
  },
  {
    day: { es: "Domingo", en: "Sunday" },
    time: "18:30",
    title: { es: "Devocional de cierre", en: "Closing Devotional" },
    kind: { es: "Devocional", en: "Devotional" },
  },
];

/** Servicios anteriores disponibles bajo demanda. */
export const pastServices: VideoItem[] = [
  {
    id: "v1",
    title: {
      es: "La gracia que nos sostiene",
      en: "The Grace That Sustains Us",
    },
    thumbnail: "/images/video-1.jpg",
    duration: "1:12:30",
    date: "2026-05-24",
  },
  {
    id: "v2",
    title: {
      es: "Un corazón agradecido",
      en: "A Grateful Heart",
    },
    thumbnail: "/images/video-2.jpg",
    duration: "58:14",
    date: "2026-05-17",
  },
  {
    id: "v3",
    title: {
      es: "Caminando en fe",
      en: "Walking in Faith",
    },
    thumbnail: "/images/video-3.jpg",
    duration: "1:05:48",
    date: "2026-05-10",
  },
  {
    id: "v4",
    title: {
      es: "El poder del perdón",
      en: "The Power of Forgiveness",
    },
    thumbnail: "/images/video-4.jpg",
    duration: "1:21:02",
    date: "2026-05-03",
  },
  {
    id: "v5",
    title: {
      es: "Esperanza en medio de la tormenta",
      en: "Hope in the Midst of the Storm",
    },
    thumbnail: "/images/video-5.jpg",
    duration: "49:37",
    date: "2026-04-26",
  },
  {
    id: "v6",
    title: {
      es: "Llamados a servir",
      en: "Called to Serve",
    },
    thumbnail: "/images/video-6.jpg",
    duration: "1:03:19",
    date: "2026-04-19",
  },
];
