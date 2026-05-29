import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers conscientes del locale: úsalos SIEMPRE en lugar de next/link y
// next/navigation para conservar el idioma activo al navegar.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
