import { VerseCallout } from "@/components/ui/VerseCallout";
import { t as tr } from "@/lib/i18n";
import type { PostBlock, Locale } from "@/types";

/**
 * Renderiza el cuerpo de un artículo (bloques tipados) con tipografía
 * editorial: párrafos amplios, encabezados Fraunces, versículos en
 * VerseCallout y citas con filete. Server component.
 */
export function PostBody({
  blocks,
  locale,
}: {
  blocks: PostBlock[];
  locale: Locale;
}) {
  return (
    <div className="mx-auto flex max-w-[44rem] flex-col gap-7">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-4 font-display text-2xl font-semibold leading-tight text-sky-900 text-balance sm:text-3xl"
              >
                {tr(block.text, locale)}
              </h2>
            );

          case "verse":
            return (
              <VerseCallout
                key={i}
                className="my-4"
                text={tr(block.text, locale)}
                reference={tr(block.reference, locale)}
              />
            );

          case "quote":
            return (
              <figure
                key={i}
                className="my-2 border-l-2 border-sky-300 pl-7"
              >
                <blockquote className="font-display text-xl italic leading-relaxed text-sky-800 text-pretty">
                  {tr(block.text, locale)}
                </blockquote>
                {block.cite && (
                  <figcaption className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-600">
                    — {tr(block.cite, locale)}
                  </figcaption>
                )}
              </figure>
            );

          case "p":
          default:
            return (
              <p
                key={i}
                className="text-lg leading-[1.85] text-sky-800/90 text-pretty"
              >
                {tr(block.text, locale)}
              </p>
            );
        }
      })}
    </div>
  );
}
