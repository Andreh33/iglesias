import { site } from "./site.config";

/**
 * Convierte los colores de `site.theme` en variables CSS en línea para `:root`.
 * Se inyecta desde el layout, de modo que cambiar los hex en config recolorea
 * todo el sitio sin tocar Tailwind ni globals.css.
 */
export function themeCssVars(): React.CSSProperties {
  const { primary, primaryDeep, accent, surface, ink } = site.theme;
  return {
    "--color-celeste": primary,
    "--color-celeste-deep": primaryDeep,
    "--color-gold": accent,
    "--color-surface": surface,
    "--color-ink": ink,
  } as React.CSSProperties;
}
