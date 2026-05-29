import { getLocale } from "next-intl/server";
import { Sunrise, Utensils, Trees, Soup, Gamepad2, Flame, Moon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { t as tr } from "@/lib/i18n";
import type { Locale, LocalizedText } from "@/types";

type Slot = {
  time: string;
  title: LocalizedText;
  desc: LocalizedText;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

// Itinerario de un día tipo (bilingüe inline). Server Component.
const slots: Slot[] = [
  {
    time: "08:30",
    title: { es: "Buenos días", en: "Good morning" },
    desc: {
      es: "Despertar suave, aseo y un desayuno completo para coger fuerzas.",
      en: "A gentle wake-up, freshening up and a full breakfast to gather energy.",
    },
    icon: Sunrise,
  },
  {
    time: "09:30",
    title: { es: "Encuentro de la mañana", en: "Morning gathering" },
    desc: {
      es: "Alabanza, dinámica y una historia bíblica que marca el tema del día.",
      en: "Worship, an ice-breaker and a Bible story that sets the day's theme.",
    },
    icon: Flame,
  },
  {
    time: "11:00",
    title: { es: "Talleres y aventura", en: "Workshops and adventure" },
    desc: {
      es: "Manualidades, deportes y juegos de equipo al aire libre por grupos.",
      en: "Crafts, sports and outdoor team games organised by groups.",
    },
    icon: Trees,
  },
  {
    time: "14:00",
    title: { es: "Comida y descanso", en: "Lunch and rest" },
    desc: {
      es: "Almuerzo en el comedor y un rato de calma antes de la tarde.",
      en: "Lunch in the dining hall and a calm break before the afternoon.",
    },
    icon: Utensils,
  },
  {
    time: "16:30",
    title: { es: "Gran juego", en: "Big game" },
    desc: {
      es: "El momento más esperado: pruebas, retos y mucha risa en común.",
      en: "The most awaited moment: challenges, missions and lots of shared laughter.",
    },
    icon: Gamepad2,
  },
  {
    time: "20:00",
    title: { es: "Cena", en: "Dinner" },
    desc: {
      es: "Cenamos juntos y compartimos lo mejor del día alrededor de la mesa.",
      en: "We have dinner together and share the best of the day around the table.",
    },
    icon: Soup,
  },
  {
    time: "21:30",
    title: { es: "Fogata y buenas noches", en: "Campfire and good night" },
    desc: {
      es: "Adoración tranquila junto al fuego, testimonios y oración para cerrar.",
      en: "Quiet worship by the fire, testimonies and prayer to close the day.",
    },
    icon: Moon,
  },
];

export async function DayTimeline() {
  const locale = (await getLocale()) as Locale;

  return (
    <ol className="relative mx-auto max-w-3xl">
      <span
        aria-hidden
        className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-gradient-to-b from-sky-300 via-sky-200 to-transparent sm:left-[1.6rem]"
      />
      {slots.map((slot, i) => {
        const SlotIcon = slot.icon;
        return (
          <Reveal as="li" key={slot.time} delay={i * 70} className="relative flex gap-5 pb-9 last:pb-0">
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-sky-600 shadow-soft ring-1 ring-mist-200 sm:h-[3.3rem] sm:w-[3.3rem]">
              <SlotIcon size={20} strokeWidth={1.6} className="text-sky-600" />
            </span>
            <div className="pt-0.5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-sm font-semibold tracking-wide text-gold-600">
                  {slot.time}
                </span>
                <h3 className="font-display text-xl text-sky-900">{tr(slot.title, locale)}</h3>
              </div>
              <p className="mt-1.5 text-pretty text-mist-600">{tr(slot.desc, locale)}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
