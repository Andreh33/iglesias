type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

/**
 * Une clases condicionalmente. Ligero y sin dependencias.
 * No deduplica como tailwind-merge: ordena tus utilidades con criterio.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) {
      v.forEach(walk);
    } else if (typeof v === "string" || typeof v === "number") {
      out.push(String(v));
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}
