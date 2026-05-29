// ═══════════════════════════════════════════════════════════════════════════
//  ⭐ CONFIGURACIÓN CENTRAL DE LA IGLESIA  ⭐
//  Para revender/personalizar la plantilla, edita SOLO este archivo
//  (más /src/data/* para el contenido y /public/brand para el logo).
//  Nada de marca, color o contacto debe estar hardcodeado en componentes.
// ═══════════════════════════════════════════════════════════════════════════

export type NavLink = {
  /** Clave i18n dentro de messages → nav.* */
  labelKey: string;
  href: string;
};

export type NavItem = NavLink & {
  /** Submenú tipo mega-menú. */
  children?: (NavLink & { icon?: string; descKey?: string })[];
  /** Diseño del dropdown: columnas. */
  mega?: boolean;
};

export const site = {
  identity: {
    name: "Iglesia Evangélica Nueva Vida",
    shortName: "Nueva Vida",
    taglineKey: "identity.tagline",
    logo: { src: "/brand/logo.svg", alt: "Iglesia Evangélica Nueva Vida" },
    federationBadge: "/brand/ferede-placeholder.svg",
  },

  contact: {
    phone: "+34 600 123 456",
    email: "info@nuevavida.es",
    whatsapp: "34600123456",
    address: "Calle de la Esperanza 12, 41001 Sevilla",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-6.0%2C37.37%2C-5.96%2C37.40&layer=mapnik&marker=37.3886%2C-5.9823",
    coords: { lat: 37.3886, lng: -5.9823 },
  },

  /** Horarios de culto. day/title se traducen vía messages (services.*). */
  services: [
    { id: "domingo", dayKey: "services.sunday", time: "11:00", titleKey: "services.worship" },
    { id: "miercoles", dayKey: "services.wednesday", time: "20:00", titleKey: "services.study" },
    { id: "viernes", dayKey: "services.friday", time: "19:30", titleKey: "services.youth" },
  ],

  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
    spotify: "https://spotify.com",
  },

  media: {
    radio: {
      // Stream de demostración (HLS/Icecast público). Sustituir por el real.
      streamUrl: "https://stream.zeno.fm/0r0xa792kwzuv",
      name: "Radio Nueva Vida",
      logo: "/brand/radio-cover.svg",
    },
    tv: {
      provider: "youtube" as "youtube" | "iframe",
      // ID de vídeo/live de YouTube (demo). Sustituir por el del canal.
      channelOrVideoId: "jfKfPfyJRdk",
      liveEmbed: "",
      youtubeChannel: "https://youtube.com",
    },
  },

  /** Mapea a las variables CSS de tema (ver theme.ts y globals.css). */
  theme: {
    primary: "#3FA7E0",
    primaryDeep: "#1C5C8C",
    accent: "#D9B36A",
    surface: "#FBFCFE",
    ink: "#0E2A40",
  },

  features: {
    shop: true,
    radio: true,
    tv: true,
    blog: true,
    camps: true,
    /** Mostrar el sello "miembro de FEREDE" (solo si la iglesia está afiliada). */
    feredeBadge: true,
    announcementBar: true,
  },

  nav: [
    {
      labelKey: "nav.about",
      href: "/quienes-somos",
      mega: false,
      children: [
        { labelKey: "nav.aboutUs", href: "/quienes-somos", icon: "Users", descKey: "nav.aboutUsDesc" },
        { labelKey: "nav.facilities", href: "/instalaciones", icon: "Building2", descKey: "nav.facilitiesDesc" },
        { labelKey: "nav.gallery", href: "/galeria", icon: "Images", descKey: "nav.galleryDesc" },
      ],
    },
    {
      labelKey: "nav.community",
      href: "/eventos",
      mega: true,
      children: [
        { labelKey: "nav.events", href: "/eventos", icon: "CalendarDays", descKey: "nav.eventsDesc" },
        { labelKey: "nav.camps", href: "/campamentos", icon: "Tent", descKey: "nav.campsDesc" },
        { labelKey: "nav.coursesBiblical", href: "/cursos/biblicos", icon: "BookOpen", descKey: "nav.coursesBiblicalDesc" },
        { labelKey: "nav.coursesYouth", href: "/cursos/jovenes", icon: "Sparkles", descKey: "nav.coursesYouthDesc" },
        { labelKey: "nav.coursesCouples", href: "/cursos/matrimonios", icon: "Heart", descKey: "nav.coursesCouplesDesc" },
        { labelKey: "nav.coursesBaptism", href: "/cursos/bautizos", icon: "Droplets", descKey: "nav.coursesBaptismDesc" },
      ],
    },
    {
      labelKey: "nav.media",
      href: "/radio",
      mega: false,
      children: [
        { labelKey: "nav.radio", href: "/radio", icon: "Radio", descKey: "nav.radioDesc" },
        { labelKey: "nav.tv", href: "/tv", icon: "Tv", descKey: "nav.tvDesc" },
        { labelKey: "nav.blog", href: "/blog", icon: "Newspaper", descKey: "nav.blogDesc" },
      ],
    },
    { labelKey: "nav.shop", href: "/tienda", mega: false },
    { labelKey: "nav.contact", href: "/contacto", mega: false },
  ] satisfies NavItem[],

  footer: {
    columns: [
      {
        titleKey: "footer.church",
        links: [
          { labelKey: "nav.aboutUs", href: "/quienes-somos" },
          { labelKey: "nav.facilities", href: "/instalaciones" },
          { labelKey: "nav.gallery", href: "/galeria" },
        ],
      },
      {
        titleKey: "footer.community",
        links: [
          { labelKey: "nav.events", href: "/eventos" },
          { labelKey: "nav.courses", href: "/cursos" },
          { labelKey: "nav.camps", href: "/campamentos" },
          { labelKey: "nav.blog", href: "/blog" },
        ],
      },
      {
        titleKey: "footer.shopCol",
        links: [
          { labelKey: "nav.shop", href: "/tienda" },
          { labelKey: "footer.cart", href: "/carrito" },
        ],
      },
    ],
    legal: [
      { labelKey: "footer.legalNotice", href: "/aviso-legal" },
      { labelKey: "footer.privacy", href: "/privacidad" },
      { labelKey: "footer.cookies", href: "/cookies" },
    ],
  },
} as const;

export type SiteConfig = typeof site;
