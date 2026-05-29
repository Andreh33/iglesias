# 🕊️ Plantilla web — Iglesia Evangélica (white-label)

Plantilla premium, reutilizable y bilingüe (🇪🇸 español / 🇬🇧 inglés) para iglesias
evangélicas. Diseño "Luz y cielo": celeste + blanco con acento dorado, tipografía
editorial (Fraunces + Hanken Grotesk), tienda online, blog, eventos, cursos,
campamentos, galería, radio y televisión en directo.

> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
> next-intl · Motion · Zustand · lucide-react.

---

## ✨ Para cambiar de iglesia, edita SOLO 3 sitios

No necesitas saber programar. Todo lo personalizable vive fuera de los componentes.

### 1️⃣ `src/config/site.config.ts` — la identidad de la iglesia

Abre este archivo y cambia los valores entre comillas:

| Qué | Dónde |
|-----|-------|
| Nombre, nombre corto y logo | `identity` |
| Teléfono, email, WhatsApp, dirección, mapa | `contact` |
| Horarios de culto | `services` |
| Redes sociales | `social` |
| URL de la radio en directo y canal de TV | `media` |
| **Colores de marca** (celeste, dorado, etc.) | `theme` |
| Activar/desactivar secciones (tienda, radio, TV, blog, campamentos, sello FEREDE…) | `features` |
| Menú de navegación y mega-menú | `nav` |
| Pie de página | `footer` |

> 🎨 **Recolorear toda la web:** cambia los hex de `theme` (p. ej. `primary`,
> `accent`). El sitio entero se recolorea solo, sin tocar nada más.

### 2️⃣ `src/data/*.ts` — el contenido

Cada archivo es una lista editable. Todo el texto es **bilingüe**: `{ es: "...", en: "..." }`.

| Archivo | Contenido |
|---------|-----------|
| `products.ts` | Productos de la tienda |
| `posts.ts` | Entradas del blog |
| `events.ts` | Eventos |
| `courses.ts` | Cursos y reuniones |
| `camps.ts` | Campamentos |
| `gallery.ts` | Galería de fotos |
| `facilities.ts` | Instalaciones |
| `team.ts` | Equipo pastoral |
| `testimonials.ts` | Testimonios |
| `schedule.ts` | Parrilla de radio/TV |
| `beliefs.ts` | Declaración de fe e historia |

### 3️⃣ `public/` — las imágenes y el logo

| Qué | Dónde |
|-----|-------|
| Logo | `public/brand/logo.svg` y `logo-light.svg` |
| Sello FEREDE | `public/brand/ferede-placeholder.svg` (ver nota legal abajo) |
| Fotos | `public/images/*` |

> Las imágenes incluidas son **placeholders** generados (SVG celeste).
> Sustitúyelas por fotos reales (`.jpg`/`.webp`) manteniendo el mismo nombre de
> archivo, o cambia las rutas en los archivos de `src/data/`.

### 🌍 Textos de la interfaz (botones, etiquetas)

Los textos fijos de la web (botones, menús, etiquetas) están en
`src/messages/es.json` y `src/messages/en.json`. Edita ambos para que el cambio
de idioma sea coherente.

---

## ▶️ Cómo arrancar

```bash
npm install
node scripts/generate-assets.mjs   # genera las imágenes placeholder
npm run dev                        # http://localhost:3000  (redirige a /es)
```

Compilar para producción:

```bash
npm run build
npm start
```

---

## 🌐 Idiomas

El sitio es bilingüe con un **toggle ES/EN** en la cabecera y el menú móvil, que
funciona en **todas las páginas, incluido el blog y las fichas dinámicas**. Las
URLs llevan prefijo de idioma (`/es/...`, `/en/...`). El idioma por defecto es
español; para cambiarlo edita `src/i18n/routing.ts`.

---

## 💳 Tienda y pagos

El **checkout es una demostración** (no cobra). Para aceptar pagos reales en
España, integra una pasarela en `src/components/shop/CheckoutForm.tsx`
(busca `// TODO: integrar pasarela`). Opciones recomendadas:

- **Redsys** — la pasarela de los bancos españoles (BBVA, Santander, CaixaBank…).
- **Stripe** — internacional, excelente experiencia de desarrollo.
- **PayPal** — cómodo para muchos usuarios.

Los formularios (contacto, oración, newsletter, inscripciones) también son demo:
busca `// TODO: conectar API/Resend` para conectarlos a un backend o a
[Resend](https://resend.com) para email.

---

## 📻 Radio y 📺 TV

- **Radio:** pon la URL del stream (Icecast/Shoutcast/Zeno) en
  `site.media.radio.streamUrl`. Hay un mini-reproductor que sigue sonando al
  navegar. Nunca arranca solo.
- **TV:** elige `provider: "youtube"` (pon el ID del vídeo/directo en
  `channelOrVideoId`) o `"iframe"` (pega el embed en `liveEmbed`). El reproductor
  se carga solo tras pulsar, por rendimiento.

---

## ⚖️ Sello FEREDE (importante)

Muchas iglesias evangélicas de España están afiliadas a **FEREDE**. La plantilla
incluye un **sello placeholder neutro** (`public/brand/ferede-placeholder.svg`),
**no** el logotipo oficial.

- Sustitúyelo por el sello/logo oficial **solo si tu iglesia está realmente
  afiliada y cuenta con autorización de uso**.
- Si no lo está, **oculta el bloque** poniendo `features.feredeBadge: false` en
  `site.config.ts`.

---

## ♿ Accesibilidad y rendimiento

- Accesibilidad AA: navegación por teclado, foco visible, `aria-*`, contraste
  cuidado (texto en azul tinta, no negro).
- `prefers-reduced-motion` respetado en toda la web.
- Imágenes optimizadas con `next/image`, fuentes con `next/font`, iframes
  diferidos. Objetivo Lighthouse ≥ 95.

---

## 📄 Páginas legales

`Aviso legal`, `Política de privacidad` y `Política de cookies` incluyen texto
**de demostración**. Sustitúyelo por tu redacción legal real antes de publicar.

---

Hecho con fe y cuidado. 🤍
