import { getLocale } from "next-intl/server";
import { Marquee } from "@/components/ui/Marquee";
import { t as tr } from "@/lib/i18n";
import type { Locale, LocalizedText } from "@/types";

/**
 * Franja a ancho completo con versículos cortos en movimiento. El contenido es
 * bilingüe y se resuelve con el locale activo antes de pasarlo al <Marquee>.
 */
const verses: LocalizedText[] = [
  {
    es: "El Señor es mi pastor, nada me faltará.",
    en: "The Lord is my shepherd; I shall not want.",
  },
  {
    es: "Todo lo puedo en Cristo que me fortalece.",
    en: "I can do all things through Christ who strengthens me.",
  },
  {
    es: "Lámpara es a mis pies tu palabra.",
    en: "Your word is a lamp to my feet.",
  },
  {
    es: "El amor nunca deja de ser.",
    en: "Love never fails.",
  },
  {
    es: "En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.",
    en: "In the world you will have tribulation; but take heart, I have overcome the world.",
  },
  {
    es: "Esfuérzate y sé valiente; no temas.",
    en: "Be strong and courageous; do not be afraid.",
  },
];

export async function VerseMarquee() {
  const locale = (await getLocale()) as Locale;
  const items = verses.map((verse) => tr(verse, locale));

  return <Marquee items={items} />;
}
