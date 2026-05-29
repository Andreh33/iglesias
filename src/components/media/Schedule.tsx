import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { t as tr } from "@/lib/i18n";
import type { Locale, ScheduleSlot } from "@/types";

/**
 * Parrilla semanal responsive (Server). En escritorio se muestra como tabla
 * accesible (día / hora / programa / tipo); en móvil colapsa a tarjetas.
 */
export async function Schedule({
  slots,
  locale,
}: {
  slots: ScheduleSlot[];
  locale: Locale;
}) {
  const t = await getTranslations("media");

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-semibold text-sky-900">
        {t("scheduleTitle")}
      </h2>

      {/* Tabla (>= sm) */}
      <div className="hidden overflow-hidden rounded-[var(--radius-md)] ring-1 ring-mist-200/70 sm:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t("scheduleTitle")}</caption>
          <thead>
            <tr className="bg-sky-50 text-xs font-semibold uppercase tracking-wider text-sky-700">
              <th scope="col" className="px-5 py-3.5">
                {t("dayCol")}
              </th>
              <th scope="col" className="px-5 py-3.5">
                {t("timeCol")}
              </th>
              <th scope="col" className="px-5 py-3.5">
                {t("programCol")}
              </th>
              <th scope="col" className="px-5 py-3.5">
                {t("typeCol")}
              </th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, i) => (
              <tr
                key={`${slot.time}-${i}`}
                className="border-t border-mist-200/70 bg-paper transition-colors hover:bg-sky-50/60"
              >
                <th
                  scope="row"
                  className="px-5 py-4 font-medium text-sky-900"
                >
                  {tr(slot.day, locale)}
                </th>
                <td className="px-5 py-4 tabular-nums text-mist-600">
                  {slot.time}
                </td>
                <td className="px-5 py-4 font-medium text-sky-900">
                  {tr(slot.title, locale)}
                </td>
                <td className="px-5 py-4">
                  <Badge tone="sky">{tr(slot.kind, locale)}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas (< sm) */}
      <ul className="flex flex-col gap-3 sm:hidden">
        {slots.map((slot, i) => (
          <li
            key={`${slot.time}-${i}`}
            className="rounded-[var(--radius-md)] bg-paper p-4 ring-1 ring-mist-200/70"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-sky-900">
                {tr(slot.day, locale)}
              </span>
              <span className="tabular-nums text-sm text-mist-600">
                {slot.time}
              </span>
            </div>
            <p className="mt-1 font-display text-lg text-sky-900">
              {tr(slot.title, locale)}
            </p>
            <div className="mt-2">
              <Badge tone="sky">{tr(slot.kind, locale)}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
