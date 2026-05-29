import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Aplica a todas las rutas salvo API, internos de Next y archivos estáticos.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
