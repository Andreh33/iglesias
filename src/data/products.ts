import type { Product } from "@/types";

// Catálogo demo bilingüe de la tienda. Sustituye por productos reales con
// imágenes definitivas; los precios están en EUR.
export const products: Product[] = [
  // ── Biblias ────────────────────────────────────────────────────────────────
  {
    slug: "biblia-reina-valera-1960-tapa-dura",
    name: {
      es: "Biblia Reina-Valera 1960 tapa dura",
      en: "Reina-Valera 1960 Bible, hardcover",
    },
    category: "biblias",
    price: 24.9,
    images: ["/images/product-1.svg"],
    shortDescription: {
      es: "El texto clásico que ha acompañado a generaciones, en una edición resistente.",
      en: "The classic text that has accompanied generations, in a durable edition.",
    },
    description: {
      es: "La versión Reina-Valera 1960 sigue siendo la más leída del mundo hispanohablante. Esta edición de tapa dura, con papel biblia y referencias cruzadas, está pensada para acompañarte cada día. Un regalo que perdura.",
      en: "The Reina-Valera 1960 version remains the most read in the Spanish-speaking world. This hardcover edition, with Bible paper and cross-references, is made to accompany you every day. A gift that lasts.",
    },
    options: [
      {
        name: { es: "Color", en: "Color" },
        values: ["Azul", "Burdeos", "Negro"],
      },
    ],
    stock: 32,
    badges: ["mas-vendido"],
    rating: 4.9,
  },
  {
    slug: "biblia-de-estudio",
    name: {
      es: "Biblia de Estudio anotada",
      en: "Annotated Study Bible",
    },
    category: "biblias",
    price: 42.5,
    compareAt: 49.9,
    images: ["/images/product-2.svg"],
    shortDescription: {
      es: "Miles de notas, mapas e introducciones para profundizar en cada pasaje.",
      en: "Thousands of notes, maps and introductions to dig deeper into every passage.",
    },
    description: {
      es: "Una herramienta completa para quien quiere ir más allá de la lectura. Incluye comentarios versículo a versículo, mapas a color, líneas de tiempo y artículos temáticos. Ideal para grupos pequeños y estudio personal.",
      en: "A complete tool for those who want to go beyond reading. It includes verse-by-verse commentary, color maps, timelines and thematic articles. Ideal for small groups and personal study.",
    },
    options: [
      {
        name: { es: "Versión", en: "Version" },
        values: ["RVR60", "NVI", "LBLA"],
      },
    ],
    stock: 18,
    badges: ["oferta"],
    rating: 4.8,
  },
  {
    slug: "biblia-juvenil",
    name: {
      es: "Biblia Juvenil ilustrada",
      en: "Illustrated Youth Bible",
    },
    category: "biblias",
    price: 19.9,
    images: ["/images/product-3.svg"],
    shortDescription: {
      es: "Diseño fresco, retos diarios y devocionales pensados para adolescentes.",
      en: "Fresh design, daily challenges and devotionals made for teenagers.",
    },
    description: {
      es: "Hablar de fe a los jóvenes empieza por darles herramientas que les hablen su idioma. Esta edición combina el texto bíblico con secciones interactivas, preguntas reales y un diseño vibrante. Para descubrir que la Palabra está viva.",
      en: "Talking about faith with young people starts by giving them tools that speak their language. This edition combines the biblical text with interactive sections, real questions and a vibrant design. To discover that the Word is alive.",
    },
    options: [
      {
        name: { es: "Versión", en: "Version" },
        values: ["NVI", "RVR60"],
      },
    ],
    stock: 27,
    badges: ["nuevo"],
    rating: 4.7,
  },
  {
    slug: "biblia-nvi-letra-grande",
    name: {
      es: "Biblia NVI letra grande",
      en: "NIV Large-Print Bible",
    },
    category: "biblias",
    price: 29.9,
    images: ["/images/product-4.svg"],
    shortDescription: {
      es: "Tipografía amplia y clara para una lectura cómoda y sin esfuerzo.",
      en: "Wide, clear typography for comfortable, effortless reading.",
    },
    description: {
      es: "Una edición pensada para que nadie quede fuera de la lectura. La letra grande y el papel de alto contraste cuidan la vista sin renunciar a un formato manejable. La Palabra, accesible para todos.",
      en: "An edition designed so no one is left out of reading. The large print and high-contrast paper care for your eyes without sacrificing a manageable format. The Word, accessible to all.",
    },
    stock: 0,
    rating: 4.6,
  },
  {
    slug: "biblia-bilingue-es-en",
    name: {
      es: "Biblia bilingüe español-inglés",
      en: "Bilingual Spanish-English Bible",
    },
    category: "biblias",
    price: 34.9,
    images: ["/images/product-5.svg"],
    shortDescription: {
      es: "El texto en dos columnas paralelas, perfecta para familias y estudio.",
      en: "The text in two parallel columns, perfect for families and study.",
    },
    description: {
      es: "Una sola Biblia para una comunidad de dos idiomas. Las columnas paralelas en español e inglés facilitan el estudio, la enseñanza y el acompañamiento de quien aprende un nuevo idioma. Un puente entre culturas y generaciones.",
      en: "One single Bible for a community of two languages. The parallel Spanish and English columns make study, teaching and supporting language learners easier. A bridge between cultures and generations.",
    },
    options: [
      {
        name: { es: "Versión", en: "Version" },
        values: ["RVR60 / NIV", "NVI / NLT"],
      },
    ],
    stock: 14,
    rating: 4.8,
  },

  // ── Joyería ────────────────────────────────────────────────────────────────
  {
    slug: "colgante-cruz-plata",
    name: {
      es: "Colgante cruz de plata",
      en: "Silver cross pendant",
    },
    category: "joyeria",
    price: 39.0,
    compareAt: 45.0,
    images: ["/images/product-6.svg"],
    shortDescription: {
      es: "Plata de ley 925 con acabado pulido, en una cruz sobria y atemporal.",
      en: "Sterling 925 silver with a polished finish, in a sober, timeless cross.",
    },
    description: {
      es: "Una cruz para llevar cerca del corazón. Elaborada en plata de ley 925 con un diseño limpio que combina con cualquier estilo. Incluye cadena de 45 cm y estuche de regalo. Un recordatorio diario de la esperanza.",
      en: "A cross to wear close to the heart. Crafted in sterling 925 silver with a clean design that pairs with any style. Includes a 45 cm chain and a gift box. A daily reminder of hope.",
    },
    stock: 21,
    badges: ["oferta"],
    rating: 4.7,
  },
  {
    slug: "pulsera-versiculo-grabado",
    name: {
      es: "Pulsera con versículo grabado",
      en: "Bracelet with engraved verse",
    },
    category: "joyeria",
    price: 22.5,
    images: ["/images/product-7.svg"],
    shortDescription: {
      es: "Brazalete ajustable con un versículo grabado a láser por dentro.",
      en: "Adjustable cuff with a verse laser-engraved on the inside.",
    },
    description: {
      es: "Lleva una promesa contigo allá donde vayas. Esta pulsera ajustable de acero inoxidable lleva grabado «Todo lo puedo en Cristo» (Filipenses 4:13) en su cara interior. Discreta, resistente y llena de significado.",
      en: "Carry a promise wherever you go. This adjustable stainless-steel bracelet is engraved with “I can do all things through Christ” (Philippians 4:13) on its inner face. Discreet, durable and full of meaning.",
    },
    stock: 40,
    badges: ["mas-vendido"],
    rating: 4.6,
  },
  {
    slug: "anillo-fe",
    name: {
      es: "Anillo «Fe»",
      en: "“Faith” ring",
    },
    category: "joyeria",
    price: 18.0,
    images: ["/images/product-8.svg"],
    shortDescription: {
      es: "Anillo minimalista con la palabra «Fe» grabada en relieve.",
      en: "Minimalist ring with the word “Faith” engraved in relief.",
    },
    description: {
      es: "Pequeño en tamaño, grande en mensaje. Este anillo de acero hipoalergénico lleva grabada la palabra «Fe» como recordatorio constante. Disponible en varias tallas para que sea solo tuyo.",
      en: "Small in size, big in message. This hypoallergenic steel ring is engraved with the word “Faith” as a constant reminder. Available in several sizes so it's truly yours.",
    },
    options: [
      {
        name: { es: "Talla", en: "Size" },
        values: ["12", "14", "16", "18"],
      },
    ],
    stock: 33,
    badges: ["nuevo"],
    rating: 4.5,
  },
  {
    slug: "pendientes-paloma",
    name: {
      es: "Pendientes paloma",
      en: "Dove earrings",
    },
    category: "joyeria",
    price: 16.9,
    images: ["/images/product-9.svg"],
    shortDescription: {
      es: "Delicados pendientes con la silueta de la paloma de la paz.",
      en: "Delicate earrings shaped like the dove of peace.",
    },
    description: {
      es: "La paloma, símbolo del Espíritu y de la paz, en un par de pendientes ligeros y elegantes. Acabados en baño de plata e ideales para el uso diario. Un detalle que habla sin palabras.",
      en: "The dove, symbol of the Spirit and of peace, in a pair of light, elegant earrings. Finished in silver plating and ideal for everyday wear. A detail that speaks without words.",
    },
    stock: 24,
    rating: 4.4,
  },

  // ── Ropa ───────────────────────────────────────────────────────────────────
  {
    slug: "camiseta-fe-esperanza-amor",
    name: {
      es: "Camiseta «Fe, Esperanza, Amor»",
      en: "“Faith, Hope, Love” T-shirt",
    },
    category: "ropa",
    price: 21.9,
    images: ["/images/product-10.svg"],
    shortDescription: {
      es: "Algodón orgánico con una tipografía serena en tres palabras clave.",
      en: "Organic cotton with serene typography in three key words.",
    },
    description: {
      es: "Tres palabras que resumen el evangelio, impresas con tinta de base agua sobre algodón orgánico de tacto suave. Corte unisex y costuras reforzadas para que dure tantos lavados como conversaciones genere.",
      en: "Three words that sum up the gospel, printed with water-based ink on soft organic cotton. Unisex cut and reinforced seams so it lasts as many washes as the conversations it sparks.",
    },
    options: [
      {
        name: { es: "Talla", en: "Size" },
        values: ["S", "M", "L", "XL"],
      },
      {
        name: { es: "Color", en: "Color" },
        values: ["Celeste", "Blanco", "Arena"],
      },
    ],
    stock: 48,
    badges: ["mas-vendido"],
    rating: 4.8,
  },
  {
    slug: "sudadera-con-versiculo",
    name: {
      es: "Sudadera con versículo",
      en: "Hoodie with verse",
    },
    category: "ropa",
    price: 39.9,
    compareAt: 46.0,
    images: ["/images/product-11.svg"],
    shortDescription: {
      es: "Felpa cálida con «El Señor es mi luz» bordado en el pecho.",
      en: "Warm fleece with “The Lord is my light” embroidered on the chest.",
    },
    description: {
      es: "Una sudadera para los domingos de invierno y las noches de alabanza. Interior de felpa cálida y bordado discreto de «El Señor es mi luz» (Salmo 27). Comodidad y testimonio en una sola prenda.",
      en: "A hoodie for winter Sundays and worship nights. Warm fleece lining and a discreet embroidery of “The Lord is my light” (Psalm 27). Comfort and testimony in a single garment.",
    },
    options: [
      {
        name: { es: "Talla", en: "Size" },
        values: ["S", "M", "L", "XL"],
      },
      {
        name: { es: "Color", en: "Color" },
        values: ["Gris jaspe", "Azul noche"],
      },
    ],
    stock: 19,
    badges: ["oferta"],
    rating: 4.7,
  },
  {
    slug: "gorra-bordada",
    name: {
      es: "Gorra bordada",
      en: "Embroidered cap",
    },
    category: "ropa",
    price: 15.5,
    images: ["/images/product-12.svg"],
    shortDescription: {
      es: "Gorra de algodón con el logotipo de la iglesia bordado al frente.",
      en: "Cotton cap with the church logo embroidered on the front.",
    },
    description: {
      es: "Para los campamentos, las jornadas de servicio o el día a día. Gorra de algodón con cierre ajustable y logotipo bordado. Ligera, cómoda y lista para cualquier salida de la comunidad.",
      en: "For camps, service days or everyday life. Cotton cap with an adjustable strap and an embroidered logo. Light, comfortable and ready for any community outing.",
    },
    options: [
      {
        name: { es: "Color", en: "Color" },
        values: ["Celeste", "Beige", "Negro"],
      },
    ],
    stock: 0,
    rating: 4.3,
  },
  {
    slug: "tote-bag-algodon",
    name: {
      es: "Tote bag de algodón",
      en: "Cotton tote bag",
    },
    category: "ropa",
    price: 11.9,
    images: ["/images/product-13.svg"],
    shortDescription: {
      es: "Bolsa reutilizable con un versículo ilustrado, perfecta para el día a día.",
      en: "Reusable bag with an illustrated verse, perfect for everyday use.",
    },
    description: {
      es: "Una bolsa resistente para la compra, los libros o la Biblia del domingo. Algodón grueso, asas largas y una ilustración serena de «Lámpara es a mis pies tu palabra». Reutilizable y con mensaje.",
      en: "A sturdy bag for groceries, books or your Sunday Bible. Thick cotton, long handles and a serene illustration of “Your word is a lamp to my feet”. Reusable and with a message.",
    },
    stock: 60,
    badges: ["nuevo"],
    rating: 4.5,
  },

  // ── Libros / música / regalos ────────────────────────────────────────────────
  {
    slug: "devocional-365-dias",
    name: {
      es: "Devocional 365 días",
      en: "365-Day Devotional",
    },
    category: "libros",
    price: 17.9,
    images: ["/images/product-14.svg"],
    shortDescription: {
      es: "Una reflexión breve para cada mañana del año, con espacio para notas.",
      en: "A short reflection for every morning of the year, with space for notes.",
    },
    description: {
      es: "Empieza cada día con una pausa. Este devocional ofrece una lectura breve, un versículo y una oración para los 365 días del año, con líneas para escribir lo que Dios te hable. Un hábito que transforma la rutina.",
      en: "Start each day with a pause. This devotional offers a short reading, a verse and a prayer for all 365 days of the year, with lines to write down what God speaks to you. A habit that transforms routine.",
    },
    stock: 36,
    badges: ["mas-vendido"],
    rating: 4.9,
  },
  {
    slug: "cd-alabanza-en-vivo",
    name: {
      es: "CD de alabanza en vivo",
      en: "Live worship CD",
    },
    category: "musica",
    price: 12.9,
    images: ["/images/product-15.svg"],
    shortDescription: {
      es: "Doce canciones grabadas en directo por el equipo de adoración.",
      en: "Twelve songs recorded live by the worship team.",
    },
    description: {
      es: "La atmósfera de nuestras noches de adoración, ahora en tu coche o tu salón. Doce cantos grabados en directo durante el último retiro, con la voz de la congregación de fondo. Para seguir adorando entre semana.",
      en: "The atmosphere of our worship nights, now in your car or living room. Twelve songs recorded live during the last retreat, with the congregation's voice in the background. To keep worshiping midweek.",
    },
    stock: 22,
    rating: 4.6,
  },
  {
    slug: "taza-cada-manana-son-nuevas",
    name: {
      es: "Taza «Cada mañana son nuevas»",
      en: "“New Every Morning” mug",
    },
    category: "regalos",
    price: 13.5,
    compareAt: 16.0,
    images: ["/images/product-16.svg"],
    shortDescription: {
      es: "Cerámica con «Cada mañana son nuevas sus misericordias» para tu café diario.",
      en: "Ceramic mug with “His mercies are new every morning” for your daily coffee.",
    },
    description: {
      es: "Que el primer mensaje del día sea de esperanza. Taza de cerámica de 350 ml con la promesa de Lamentaciones 3:23 impresa a ambos lados. Apta para lavavajillas y microondas. Un regalo cálido y cotidiano.",
      en: "Let the first message of the day be one of hope. A 350 ml ceramic mug with the promise of Lamentations 3:23 printed on both sides. Dishwasher and microwave safe. A warm, everyday gift.",
    },
    stock: 44,
    badges: ["oferta"],
    rating: 4.7,
  },
  {
    slug: "marcapaginas-set",
    name: {
      es: "Set de marcapáginas",
      en: "Bookmark set",
    },
    category: "regalos",
    price: 6.9,
    images: ["/images/product-17.svg"],
    shortDescription: {
      es: "Cuatro marcapáginas ilustrados con versículos de aliento.",
      en: "Four illustrated bookmarks with encouraging verses.",
    },
    description: {
      es: "Pequeños recordatorios entre las páginas de tu Biblia o tu libro. Set de cuatro marcapáginas en cartulina mate con acuarelas suaves y versículos de aliento. Un detalle ideal para regalar y compartir.",
      en: "Little reminders between the pages of your Bible or book. A set of four matte-card bookmarks with soft watercolors and encouraging verses. An ideal detail to gift and share.",
    },
    stock: 80,
    badges: ["nuevo"],
    rating: 4.4,
  },
  {
    slug: "vela-aromatica-luz",
    name: {
      es: "Vela aromática «Luz»",
      en: "“Light” scented candle",
    },
    category: "regalos",
    price: 14.9,
    images: ["/images/product-18.svg"],
    shortDescription: {
      es: "Cera de soja con aroma cálido para tus momentos de oración.",
      en: "Soy wax with a warm scent for your moments of prayer.",
    },
    description: {
      es: "Crea un rincón de quietud para orar y descansar. Vela de cera de soja natural con notas de vainilla e incienso suave y más de 30 horas de combustión. Vaso de cristal reutilizable con la inscripción «Luz».",
      en: "Create a quiet corner to pray and rest. A natural soy-wax candle with notes of vanilla and gentle incense and over 30 hours of burn time. Reusable glass jar inscribed with “Light”.",
    },
    stock: 29,
    rating: 4.6,
  },
];
