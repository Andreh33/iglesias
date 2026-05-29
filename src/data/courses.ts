import type { Course } from "@/types";

// ───────────────────────────────────────────────────────────────────────────
//  Cursos y escuelas de formación de la iglesia.
//  Contenido bilingüe (LocalizedText). Resuélvelo con t() de "@/lib/i18n".
//  Iconos: nombres de lucide registrados en src/components/ui/Icon.tsx.
// ───────────────────────────────────────────────────────────────────────────

export const courses: Course[] = [
  {
    key: "biblicos",
    icon: "BookOpen",
    title: {
      es: "Cursos bíblicos",
      en: "Bible courses",
    },
    tagline: {
      es: "Cimienta tu fe sobre la roca de la Palabra.",
      en: "Build your faith on the rock of the Word.",
    },
    audience: {
      es: "Nuevos creyentes y miembros que desean profundizar",
      en: "New believers and members who want to go deeper",
    },
    duration: {
      es: "12 semanas · 1 sesión semanal",
      en: "12 weeks · 1 session per week",
    },
    format: {
      es: "Presencial y online",
      en: "In person and online",
    },
    facilitator: "Pastor Daniel Herrera",
    description: {
      es: "Un recorrido sólido por los fundamentos de la fe cristiana: quién es Dios, la persona de Jesús, la obra del Espíritu Santo y cómo leer la Biblia por nosotros mismos. Estudiamos los Evangelios y las doctrinas esenciales con un lenguaje cercano, abriendo espacio para preguntas y oración.",
      en: "A solid journey through the foundations of the Christian faith: who God is, the person of Jesus, the work of the Holy Spirit and how to read the Bible for ourselves. We study the Gospels and the essential doctrines in plain language, leaving room for questions and prayer.",
    },
    modules: [
      {
        title: {
          es: "Fundamentos de la fe",
          en: "Foundations of the faith",
        },
        description: {
          es: "El carácter de Dios, la gracia, el arrepentimiento y la seguridad de la salvación.",
          en: "The character of God, grace, repentance and the assurance of salvation.",
        },
      },
      {
        title: {
          es: "Estudio de los Evangelios",
          en: "Study of the Gospels",
        },
        description: {
          es: "Recorremos la vida, las enseñanzas y los milagros de Jesús en Mateo, Marcos, Lucas y Juan.",
          en: "We walk through the life, teachings and miracles of Jesus in Matthew, Mark, Luke and John.",
        },
      },
      {
        title: {
          es: "Doctrina esencial",
          en: "Essential doctrine",
        },
        description: {
          es: "La Trinidad, la salvación, la Iglesia y la esperanza eterna explicadas con claridad.",
          en: "The Trinity, salvation, the Church and eternal hope explained clearly.",
        },
      },
      {
        title: {
          es: "Cómo estudiar la Biblia",
          en: "How to study the Bible",
        },
        description: {
          es: "Herramientas prácticas para leer, interpretar y aplicar las Escrituras en tu día a día.",
          en: "Practical tools to read, interpret and apply the Scriptures in your daily life.",
        },
      },
      {
        title: {
          es: "Vivir en comunidad",
          en: "Living in community",
        },
        description: {
          es: "El bautismo, la Cena del Señor y el lugar de cada creyente dentro del cuerpo de Cristo.",
          en: "Baptism, the Lord's Supper and the place of every believer within the body of Christ.",
        },
      },
    ],
  },
  {
    key: "jovenes",
    icon: "Sparkles",
    title: {
      es: "Escuela de jóvenes",
      en: "Youth school",
    },
    tagline: {
      es: "Una fe viva para una generación con propósito.",
      en: "A living faith for a generation with purpose.",
    },
    audience: {
      es: "Jóvenes y adolescentes de 13 a 25 años",
      en: "Teens and young adults aged 13 to 25",
    },
    duration: {
      es: "Todo el curso · encuentros semanales",
      en: "Full academic year · weekly meetings",
    },
    format: {
      es: "Presencial",
      en: "In person",
    },
    facilitator: "Lucía Ramírez",
    description: {
      es: "Un espacio dinámico donde los jóvenes encuentran amistad real, crecen en su fe y descubren el propósito de Dios para sus vidas. Combinamos encuentros con alabanza, grupos pequeños de discipulado y actividades que conectan la Palabra con los desafíos de cada etapa.",
      en: "A dynamic space where young people find real friendship, grow in their faith and discover God's purpose for their lives. We combine gatherings with worship, small discipleship groups and activities that connect the Word with the challenges of each stage.",
    },
    modules: [
      {
        title: {
          es: "Encuentros de alabanza",
          en: "Worship gatherings",
        },
        description: {
          es: "Noches de música, enseñanza inspiradora y oración pensadas para los jóvenes.",
          en: "Nights of music, inspiring teaching and prayer designed for young people.",
        },
      },
      {
        title: {
          es: "Grupos pequeños",
          en: "Small groups",
        },
        description: {
          es: "Comunidades de discipulado donde compartir la vida, las dudas y crecer juntos.",
          en: "Discipleship communities to share life, doubts and grow together.",
        },
      },
      {
        title: {
          es: "Identidad y propósito",
          en: "Identity and purpose",
        },
        description: {
          es: "Descubrir quién eres en Cristo y los dones que Dios ha puesto en ti.",
          en: "Discover who you are in Christ and the gifts God has placed in you.",
        },
      },
      {
        title: {
          es: "Actividades y servicio",
          en: "Activities and service",
        },
        description: {
          es: "Salidas, deportes, voluntariado y proyectos solidarios para vivir la fe en acción.",
          en: "Outings, sports, volunteering and solidarity projects to live out the faith in action.",
        },
      },
    ],
  },
  {
    key: "matrimonios",
    icon: "Heart",
    title: {
      es: "Curso de matrimonios",
      en: "Marriage course",
    },
    tagline: {
      es: "Construyamos juntos un hogar que perdure.",
      en: "Let's build a home that lasts, together.",
    },
    audience: {
      es: "Parejas casadas y novios comprometidos",
      en: "Married couples and engaged partners",
    },
    duration: {
      es: "8 semanas · una velada por semana",
      en: "8 weeks · one evening per week",
    },
    format: {
      es: "Presencial, en pareja",
      en: "In person, as a couple",
    },
    facilitator: "Jorge y Marta Delgado",
    description: {
      es: "Un curso pensado para fortalecer el vínculo matrimonial a la luz de la Palabra. Abordamos la comunicación, la administración de las finanzas, la resolución de conflictos y la vida espiritual en pareja, en un ambiente de confianza donde cada matrimonio avanza a su propio ritmo.",
      en: "A course designed to strengthen the marriage bond in the light of the Word. We address communication, managing finances, conflict resolution and spiritual life as a couple, in a trusting atmosphere where every marriage moves at its own pace.",
    },
    modules: [
      {
        title: {
          es: "Comunicación que une",
          en: "Communication that unites",
        },
        description: {
          es: "Aprender a escuchar, expresar necesidades y hablar la verdad en amor.",
          en: "Learning to listen, express needs and speak the truth in love.",
        },
      },
      {
        title: {
          es: "Finanzas en el hogar",
          en: "Finances at home",
        },
        description: {
          es: "Principios bíblicos para administrar juntos los recursos con sabiduría y generosidad.",
          en: "Biblical principles to manage resources together with wisdom and generosity.",
        },
      },
      {
        title: {
          es: "Resolución de conflictos",
          en: "Conflict resolution",
        },
        description: {
          es: "Herramientas para perdonar, reconciliarse y crecer a través de las diferencias.",
          en: "Tools to forgive, reconcile and grow through your differences.",
        },
      },
      {
        title: {
          es: "Espiritualidad en pareja",
          en: "Spirituality as a couple",
        },
        description: {
          es: "Orar juntos, compartir la fe y poner a Cristo en el centro del matrimonio.",
          en: "Praying together, sharing the faith and placing Christ at the center of your marriage.",
        },
      },
    ],
  },
  {
    key: "bautizos",
    icon: "Droplets",
    title: {
      es: "Preparación para el bautismo",
      en: "Baptism preparation",
    },
    tagline: {
      es: "Da el paso público de tu fe en Cristo.",
      en: "Take the public step of your faith in Christ.",
    },
    audience: {
      es: "Quienes desean bautizarse por inmersión",
      en: "Those who wish to be baptized by immersion",
    },
    duration: {
      es: "4 semanas · sesiones intensivas",
      en: "4 weeks · intensive sessions",
    },
    format: {
      es: "Presencial",
      en: "In person",
    },
    facilitator: "Pastor Esteban Molina",
    description: {
      es: "Un acompañamiento breve y profundo para entender el significado del bautismo como declaración pública de fe. Repasamos su base bíblica, los requisitos del corazón, la preparación práctica del día y compartimos las próximas fechas para celebrarlo en comunidad.",
      en: "A short, deep journey to understand the meaning of baptism as a public declaration of faith. We review its biblical basis, the requirements of the heart, the practical preparation for the day and share the upcoming dates to celebrate it as a community.",
    },
    modules: [
      {
        title: {
          es: "El significado del bautismo",
          en: "The meaning of baptism",
        },
        description: {
          es: "Qué representa morir y resucitar con Cristo, según las Escrituras.",
          en: "What it means to die and rise with Christ, according to the Scriptures.",
        },
      },
      {
        title: {
          es: "Requisitos y decisión",
          en: "Requirements and decision",
        },
        description: {
          es: "La fe personal, el arrepentimiento y el testimonio que preceden al bautismo.",
          en: "The personal faith, repentance and testimony that precede baptism.",
        },
      },
      {
        title: {
          es: "Preparación del día",
          en: "Preparing for the day",
        },
        description: {
          es: "Detalles prácticos: tu testimonio, la ceremonia y cómo invitar a tu familia.",
          en: "Practical details: your testimony, the ceremony and how to invite your family.",
        },
      },
      {
        title: {
          es: "Próximas fechas",
          en: "Upcoming dates",
        },
        description: {
          es: "Celebraciones bautismales previstas para Pentecostés y el domingo de inicio de curso.",
          en: "Baptism celebrations planned for Pentecost and the opening Sunday of the new term.",
        },
      },
    ],
  },
];
