import type { Post } from "@/types";

// Contenido demo bilingüe de tono pastoral. Sustituye por artículos reales.
export const posts: Post[] = [
  {
    slug: "la-gracia-que-lo-cambia-todo",
    title: {
      es: "La gracia que lo cambia todo",
      en: "The grace that changes everything",
    },
    excerpt: {
      es: "La salvación no es un premio que ganamos, sino un regalo que recibimos. Descubre por qué la gracia es el corazón del evangelio.",
      en: "Salvation is not a prize we earn but a gift we receive. Discover why grace is the heart of the gospel.",
    },
    category: "ensenanzas",
    author: "Pastor Daniel Ortega",
    date: "2026-04-12",
    readingTime: 6,
    cover: "/images/post-1.jpg",
    featured: true,
    body: [
      {
        type: "p",
        text: {
          es: "Hay una verdad tan sencilla y tan profunda que puede transformar por completo la manera en que vivimos: no tenemos que ganarnos el amor de Dios. Muchos llegamos a la fe arrastrando la idea de que primero debemos arreglarnos, mejorar y demostrar que valemos. El evangelio anuncia lo contrario.",
          en: "There is a truth so simple and so deep that it can completely transform the way we live: we do not have to earn God's love. Many of us come to faith dragging the idea that we must first fix ourselves, improve and prove our worth. The gospel proclaims the opposite.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.",
          en: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.",
        },
        reference: { es: "Efesios 2:8-9", en: "Ephesians 2:8-9" },
      },
      {
        type: "h2",
        text: {
          es: "Un regalo, no un salario",
          en: "A gift, not a wage",
        },
      },
      {
        type: "p",
        text: {
          es: "La palabra gracia significa precisamente favor inmerecido. Un salario se cobra porque se ha trabajado; un regalo se recibe con las manos abiertas. Dios nos ofrece su salvación como regalo, comprado por Cristo en la cruz y entregado a quien simplemente confía.",
          en: "The word grace means precisely unmerited favor. A wage is collected because work has been done; a gift is received with open hands. God offers us his salvation as a gift, purchased by Christ on the cross and given to whoever simply trusts.",
        },
      },
      {
        type: "p",
        text: {
          es: "Esto no nos vuelve perezosos, sino agradecidos. Cuando entendemos que somos amados antes de ser perfectos, dejamos de servir por miedo y empezamos a servir por gozo. Las buenas obras dejan de ser la raíz de nuestra fe para convertirse en su fruto natural.",
          en: "This does not make us lazy but grateful. When we understand that we are loved before we are perfect, we stop serving out of fear and begin to serve out of joy. Good works cease to be the root of our faith and become its natural fruit.",
        },
      },
      {
        type: "p",
        text: {
          es: "Si hoy te sientes cansado de intentar merecer lo que Dios ya quiere darte gratis, respira hondo. La gracia te invita a descansar en el amor que te sostiene. Recíbela con humildad y deja que ella, poco a poco, lo cambie todo.",
          en: "If today you feel tired of trying to deserve what God already wants to give you freely, take a deep breath. Grace invites you to rest in the love that holds you. Receive it with humility and let it, little by little, change everything.",
        },
      },
    ],
  },
  {
    slug: "salmo-23-explicado",
    title: {
      es: "Versículo de la semana: el Salmo 23 explicado",
      en: "Verse of the week: Psalm 23 explained",
    },
    excerpt: {
      es: "El salmo más conocido de la Biblia esconde un consuelo inmenso. Recorremos versículo a versículo el cántico del pastor.",
      en: "The best-known psalm in the Bible holds immense comfort. We walk verse by verse through the shepherd's song.",
    },
    category: "versiculos",
    author: "Ana Belén Castaño",
    date: "2026-03-08",
    readingTime: 5,
    cover: "/images/post-2.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Pocas palabras han acompañado a tantas personas en sus momentos más difíciles como las del Salmo 23. David, que fue pastor antes que rey, describe a Dios con la imagen que mejor conocía: un buen pastor que cuida de cada oveja por su nombre.",
          en: "Few words have accompanied so many people in their hardest moments as those of Psalm 23. David, who was a shepherd before he was king, describes God with the image he knew best: a good shepherd who cares for each sheep by name.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.",
          en: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.",
        },
        reference: { es: "Salmo 23:1-2", en: "Psalm 23:1-2" },
      },
      {
        type: "h2",
        text: {
          es: "Provisión, descanso y dirección",
          en: "Provision, rest and direction",
        },
      },
      {
        type: "p",
        text: {
          es: "El salmo comienza con una declaración de confianza: nada me faltará. No promete una vida sin necesidades, sino un Pastor que provee lo necesario. Los delicados pastos y las aguas de reposo hablan de un Dios que conoce nuestro límite y nos invita a descansar antes de agotarnos.",
          en: "The psalm begins with a declaration of trust: I shall not want. It does not promise a life without needs but a Shepherd who provides what is necessary. The green pastures and still waters speak of a God who knows our limits and invites us to rest before we are exhausted.",
        },
      },
      {
        type: "p",
        text: {
          es: "Más adelante, David camina por el valle de sombra de muerte y, sin embargo, no teme. La razón no es la ausencia de peligro, sino la presencia del Pastor: porque tú estarás conmigo. La fe no elimina el valle; nos da compañía dentro de él.",
          en: "Later, David walks through the valley of the shadow of death and yet fears no evil. The reason is not the absence of danger but the presence of the Shepherd: for you are with me. Faith does not remove the valley; it gives us company within it.",
        },
      },
      {
        type: "p",
        text: {
          es: "El salmo termina mirando hacia adelante: ciertamente el bien y la misericordia me seguirán todos los días de mi vida. Quien camina con este Pastor no avanza solo: el amor de Dios va detrás como una sombra fiel, recogiéndonos cada vez que tropezamos.",
          en: "The psalm ends looking ahead: surely goodness and mercy shall follow me all the days of my life. Whoever walks with this Shepherd does not go alone: God's love follows behind like a faithful shadow, picking us up every time we stumble.",
        },
      },
    ],
  },
  {
    slug: "tiempo-devocional-diario",
    title: {
      es: "Cómo empezar un tiempo devocional diario",
      en: "How to start a daily devotional time",
    },
    excerpt: {
      es: "No necesitas ser un experto ni tener horas libres. Te compartimos pasos sencillos para encontrarte con Dios cada día.",
      en: "You do not need to be an expert or have hours to spare. We share simple steps to meet with God every day.",
    },
    category: "vida-cristiana",
    author: "Raquel Montoya",
    date: "2026-02-19",
    readingTime: 5,
    cover: "/images/post-3.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Un tiempo devocional no es un examen que aprobar, sino un encuentro que disfrutar. Es ese rato del día en el que dejamos a un lado las prisas para escuchar a Dios a través de su Palabra y hablarle en oración. Empezar es más sencillo de lo que parece.",
          en: "A devotional time is not a test to pass but an encounter to enjoy. It is that moment of the day when we set aside our rush to listen to God through his Word and speak to him in prayer. Getting started is simpler than it seems.",
        },
      },
      {
        type: "h2",
        text: {
          es: "Empieza pequeño y sé constante",
          en: "Start small and be consistent",
        },
      },
      {
        type: "p",
        text: {
          es: "No intentes leer capítulos enteros el primer día. Elige un momento fijo, aunque sean diez minutos, y un lugar tranquilo. La constancia pesa más que la cantidad: vale más un rato breve cada día que una hora una vez al mes.",
          en: "Do not try to read whole chapters on the first day. Choose a fixed moment, even if it is ten minutes, and a quiet place. Consistency matters more than quantity: a short time every day is worth more than an hour once a month.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
          en: "Your word is a lamp to my feet and a light to my path.",
        },
        reference: { es: "Salmo 119:105", en: "Psalm 119:105" },
      },
      {
        type: "p",
        text: {
          es: "Un método sencillo es leer un pasaje corto y hacerse tres preguntas: ¿qué dice de Dios?, ¿qué dice de mí?, ¿qué quiero pedirle o agradecerle hoy? Anotar una frase en un cuaderno ayuda a recordar lo que el Señor te muestra.",
          en: "A simple method is to read a short passage and ask yourself three questions: what does it say about God, what does it say about me, and what do I want to ask or thank him for today? Writing one sentence in a notebook helps you remember what the Lord shows you.",
        },
      },
      {
        type: "p",
        text: {
          es: "Si un día lo olvidas, no te castigues: retoma al siguiente sin culpa. Dios no busca tu perfección, busca tu compañía. Con el tiempo, ese pequeño hábito se convertirá en el sostén más firme de tu día.",
          en: "If one day you forget, do not punish yourself: pick it up the next day without guilt. God is not after your perfection, he is after your company. In time, that small habit will become the firmest support of your day.",
        },
      },
    ],
  },
  {
    slug: "el-valor-de-la-comunidad",
    title: {
      es: "El valor de la comunidad: no fuimos hechos para vivir solos",
      en: "The value of community: we were not made to live alone",
    },
    excerpt: {
      es: "La fe cristiana se vive en compañía. Reflexionamos sobre por qué la iglesia es una familia y no solo un edificio.",
      en: "The Christian faith is lived together. We reflect on why the church is a family and not just a building.",
    },
    category: "vida-cristiana",
    author: "Pastor Daniel Ortega",
    date: "2025-11-23",
    readingTime: 6,
    cover: "/images/post-4.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Vivimos en una época que celebra la independencia, pero el corazón humano sigue anhelando pertenecer. Desde el principio, Dios dijo que no era bueno que el hombre estuviera solo. Fuimos diseñados para la relación, primero con él y luego con los demás.",
          en: "We live in an age that celebrates independence, yet the human heart still longs to belong. From the beginning, God said it was not good for man to be alone. We were designed for relationship, first with him and then with one another.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Y considerémonos unos a otros para estimularnos al amor y a las buenas obras; no dejando de congregarnos, sino exhortándonos.",
          en: "And let us consider how to stir up one another to love and good works, not neglecting to meet together, but encouraging one another.",
        },
        reference: { es: "Hebreos 10:24-25", en: "Hebrews 10:24-25" },
      },
      {
        type: "h2",
        text: {
          es: "Una familia, no un público",
          en: "A family, not an audience",
        },
      },
      {
        type: "p",
        text: {
          es: "La iglesia no es un espectáculo al que asistir como espectadores, sino una familia en la que participar. En ella aprendemos a perdonar, a llevar las cargas de otros y a dejar que otros lleven las nuestras. La fe crece mejor en compañía que en aislamiento.",
          en: "The church is not a show to attend as spectators but a family in which to take part. In it we learn to forgive, to carry one another's burdens and to let others carry ours. Faith grows better in company than in isolation.",
        },
      },
      {
        type: "p",
        text: {
          es: "Es cierto que la comunidad también incomoda: convivir con personas distintas saca a la luz nuestras asperezas. Pero precisamente ahí Dios nos pule. Como el hierro afila al hierro, nos necesitamos los unos a los otros para crecer.",
          en: "It is true that community can also be uncomfortable: living with different people brings our rough edges to light. But that is precisely where God refines us. As iron sharpens iron, we need one another in order to grow.",
        },
      },
      {
        type: "p",
        text: {
          es: "Si llevas tiempo viviendo tu fe en solitario, te animamos a dar un paso. Únete a un grupo pequeño, conversa al salir del culto, ofrécete a servir. La bendición de la comunidad no se contempla desde fuera; se recibe entrando.",
          en: "If you have been living your faith alone for a while, we encourage you to take a step. Join a small group, talk to someone after the service, offer to serve. The blessing of community is not admired from the outside; it is received by stepping in.",
        },
      },
    ],
  },
  {
    slug: "perdonar-cuando-duele",
    title: {
      es: "Perdonar cuando duele",
      en: "Forgiving when it hurts",
    },
    excerpt: {
      es: "Perdonar no significa que la herida no fue real. Hablamos de un camino difícil pero liberador a la luz del evangelio.",
      en: "Forgiving does not mean the wound was not real. We talk about a difficult but freeing path in the light of the gospel.",
    },
    category: "ensenanzas",
    author: "Pastor Esteban Lara",
    date: "2025-09-30",
    readingTime: 7,
    cover: "/images/post-5.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Pocas cosas resultan tan difíciles como perdonar a quien nos hizo daño de verdad. El perdón cristiano no minimiza la ofensa ni pretende que nada pasó; reconoce el dolor y, aun así, decide soltar la deuda. No es olvidar: es liberar.",
          en: "Few things are as hard as forgiving someone who truly hurt us. Christian forgiveness does not minimize the offense or pretend nothing happened; it acknowledges the pain and, even so, chooses to release the debt. It is not forgetting: it is letting go.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Soportándoos unos a otros, y perdonándoos unos a otros si alguno tuviere queja contra otro. De la manera que Cristo os perdonó, así también hacedlo vosotros.",
          en: "Bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive.",
        },
        reference: { es: "Colosenses 3:13", en: "Colossians 3:13" },
      },
      {
        type: "h2",
        text: {
          es: "Por qué nos cuesta tanto",
          en: "Why it is so hard for us",
        },
      },
      {
        type: "p",
        text: {
          es: "Nos cuesta perdonar porque sentimos que, al hacerlo, dejamos la injusticia sin castigo. Pero perdonar no es declarar que la otra persona tenía razón; es confiar en que Dios es el juez justo y entregarle a él lo que no nos toca cobrar.",
          en: "It is hard to forgive because we feel that by doing so we leave the injustice unpunished. But forgiving is not declaring that the other person was right; it is trusting that God is the righteous judge and handing over to him what is not ours to collect.",
        },
      },
      {
        type: "p",
        text: {
          es: "El motivo más profundo para perdonar es que nosotros también fuimos perdonados. Cristo cargó nuestra mayor deuda en la cruz. A la luz de ese perdón inmenso, las ofensas que recibimos, sin dejar de doler, encuentran su lugar.",
          en: "The deepest reason to forgive is that we too were forgiven. Christ carried our greatest debt on the cross. In the light of that immense forgiveness, the offenses we receive, while still painful, find their place.",
        },
      },
      {
        type: "p",
        text: {
          es: "Perdonar no siempre es un único acto; a veces es una decisión que repetimos cada vez que el recuerdo vuelve. Pide ayuda a Dios, busca acompañamiento si la herida es honda y recuerda que el rencor pesa más que el perdón. Soltar también es sanar.",
          en: "Forgiving is not always a single act; sometimes it is a decision we repeat each time the memory returns. Ask God for help, seek support if the wound is deep, and remember that resentment weighs more than forgiveness. Letting go is also healing.",
        },
      },
    ],
  },
  {
    slug: "guia-de-oracion-para-principiantes",
    title: {
      es: "Guía sencilla de oración para principiantes",
      en: "A simple prayer guide for beginners",
    },
    excerpt: {
      es: "Orar es hablar con Dios como con un Padre cercano. Aquí tienes una guía clara para dar tus primeros pasos sin miedo.",
      en: "Praying is talking with God as with a near Father. Here is a clear guide to take your first steps without fear.",
    },
    category: "vida-cristiana",
    author: "Raquel Montoya",
    date: "2025-08-14",
    readingTime: 4,
    cover: "/images/post-6.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Mucha gente cree que orar requiere palabras elegantes o fórmulas especiales. La verdad es más sencilla y más hermosa: orar es simplemente hablar con Dios con sinceridad, como hablaría un hijo con su padre. No hace falta impresionarle; basta con ser honesto.",
          en: "Many people think that praying requires elegant words or special formulas. The truth is simpler and more beautiful: praying is simply speaking with God honestly, as a child would speak with a father. There is no need to impress him; it is enough to be honest.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.",
          en: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
        },
        reference: { es: "Filipenses 4:6", en: "Philippians 4:6" },
      },
      {
        type: "h2",
        text: {
          es: "Un patrón fácil de recordar",
          en: "An easy pattern to remember",
        },
      },
      {
        type: "p",
        text: {
          es: "Un buen punto de partida es seguir cuatro pasos: alabar a Dios por quién es, agradecerle por lo que ha hecho, confesarle aquello en lo que hemos fallado y, por último, pedirle por nuestras necesidades y las de otros. No es una regla rígida, sino una ayuda para empezar.",
          en: "A good starting point is to follow four steps: praise God for who he is, thank him for what he has done, confess to him where we have failed, and finally ask him for our needs and the needs of others. It is not a rigid rule but a help to get started.",
        },
      },
      {
        type: "p",
        text: {
          es: "No te preocupes por los silencios ni por las distracciones; vuelve con suavidad y continúa. Dios escucha incluso la oración más torpe. Lo importante no es la perfección de las palabras, sino la sinceridad del corazón que las pronuncia.",
          en: "Do not worry about silences or distractions; gently come back and continue. God hears even the clumsiest prayer. What matters is not the perfection of the words but the sincerity of the heart that speaks them.",
        },
      },
    ],
  },
  {
    slug: "el-bautismo-que-significa",
    title: {
      es: "El bautismo: qué significa y cómo prepararte",
      en: "Baptism: what it means and how to prepare",
    },
    excerpt: {
      es: "El bautismo es un paso público de fe. Te explicamos su significado bíblico y cómo prepararte para darlo con alegría.",
      en: "Baptism is a public step of faith. We explain its biblical meaning and how to prepare to take it with joy.",
    },
    category: "ensenanzas",
    author: "Pastor Esteban Lara",
    date: "2025-07-06",
    readingTime: 6,
    cover: "/images/post-7.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "El bautismo es uno de los momentos más significativos en la vida de un creyente. No salva por sí mismo, pero es la manera que Jesús nos dejó para declarar públicamente que hemos puesto nuestra fe en él. Es una señal externa de un cambio interno.",
          en: "Baptism is one of the most meaningful moments in a believer's life. It does not save by itself, but it is the way Jesus left us to publicly declare that we have placed our faith in him. It is an outward sign of an inward change.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.",
          en: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
        },
        reference: { es: "Mateo 28:19", en: "Matthew 28:19" },
      },
      {
        type: "h2",
        text: {
          es: "Un símbolo cargado de significado",
          en: "A symbol full of meaning",
        },
      },
      {
        type: "p",
        text: {
          es: "Ser sumergido en el agua representa morir a la vieja vida; salir de ella, resucitar a una vida nueva en Cristo. Cada bautismo cuenta en silencio la misma historia: el evangelio que nos sepultó con él y nos levantó para caminar de manera diferente.",
          en: "Being immersed in the water represents dying to the old life; coming up out of it, rising to a new life in Christ. Every baptism quietly tells the same story: the gospel that buried us with him and raised us to walk in a different way.",
        },
      },
      {
        type: "p",
        text: {
          es: "Prepararte para el bautismo no requiere ser perfecto, sino tener clara tu decisión de seguir a Jesús. En nuestra iglesia ofrecemos un breve curso donde repasamos el evangelio, resolvemos dudas y compartimos lo que significa este paso.",
          en: "Preparing for baptism does not require being perfect, but having a clear decision to follow Jesus. In our church we offer a short course where we review the gospel, answer questions and share what this step means.",
        },
      },
      {
        type: "p",
        text: {
          es: "Si sientes que el Espíritu te anima a dar este paso, no lo dejes para más adelante. Habla con un pastor, comparte tu historia y prepárate para celebrar. Pocas alegrías se comparan con la de la familia de la fe rodeando a quien declara: ahora soy de Cristo.",
          en: "If you feel the Spirit prompting you to take this step, do not put it off. Talk to a pastor, share your story and get ready to celebrate. Few joys compare with that of the family of faith surrounding someone who declares: now I belong to Christ.",
        },
      },
    ],
  },
  {
    slug: "leer-la-biblia-en-un-ano",
    title: {
      es: "Leer la Biblia en un año: un plan realista",
      en: "Reading the Bible in a year: a realistic plan",
    },
    excerpt: {
      es: "Recorrer toda la Escritura en doce meses es posible y transformador. Te damos un plan flexible que de verdad puedes cumplir.",
      en: "Going through all of Scripture in twelve months is possible and transforming. We give you a flexible plan you can actually keep.",
    },
    category: "vida-cristiana",
    author: "Ana Belén Castaño",
    date: "2026-01-09",
    readingTime: 5,
    cover: "/images/post-8.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Leer la Biblia entera en un año suena ambicioso, pero es uno de los hábitos que más puede marcar tu vida espiritual. No se trata de correr para cumplir, sino de dejar que la Palabra te acompañe día tras día durante una temporada completa.",
          en: "Reading the whole Bible in a year sounds ambitious, but it is one of the habits that can most shape your spiritual life. It is not about rushing to finish, but about letting the Word accompany you day after day for a whole season.",
        },
      },
      {
        type: "verse",
        text: {
          es: "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.",
          en: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.",
        },
        reference: { es: "2 Timoteo 3:16", en: "2 Timothy 3:16" },
      },
      {
        type: "h2",
        text: {
          es: "Un ritmo amable y sostenible",
          en: "A kind and sustainable pace",
        },
      },
      {
        type: "p",
        text: {
          es: "Leer entre tres y cuatro capítulos al día basta para completar la Biblia en doce meses. Muchos encuentran útil combinar un pasaje del Antiguo Testamento, uno del Nuevo y un salmo, de modo que cada jornada sea variada y no se haga monótona.",
          en: "Reading between three and four chapters a day is enough to complete the Bible in twelve months. Many find it helpful to combine an Old Testament passage, a New Testament one and a psalm, so that each day is varied and does not become monotonous.",
        },
      },
      {
        type: "p",
        text: {
          es: "El secreto no está en no fallar nunca, sino en saber retomar. Reserva un día a la semana sin lectura nueva para ponerte al día si te has retrasado. Así, una racha interrumpida no se convierte en una excusa para abandonar todo el plan.",
          en: "The secret is not in never missing a day, but in knowing how to catch up. Set aside one day a week without new reading to get back on track if you have fallen behind. That way, a broken streak does not become an excuse to abandon the whole plan.",
        },
      },
      {
        type: "p",
        text: {
          es: "Acompaña la lectura con una oración breve: Señor, háblame hoy. No buscamos terminar capítulos, sino encontrarnos con el Autor. Al cerrar el año descubrirás que no solo leíste la Biblia: la Biblia te leyó a ti.",
          en: "Pair your reading with a short prayer: Lord, speak to me today. We are not after finishing chapters but meeting the Author. When the year closes you will discover that you did not only read the Bible: the Bible read you.",
        },
      },
    ],
  },
  {
    slug: "testimonio-una-vida-transformada",
    title: {
      es: "Testimonio: una vida transformada",
      en: "Testimony: a transformed life",
    },
    excerpt: {
      es: "Marcos llegó vacío y sin rumbo. Hoy comparte cómo el encuentro con Cristo cambió por completo el rumbo de su historia.",
      en: "Marcos arrived empty and adrift. Today he shares how his encounter with Christ completely changed the course of his story.",
    },
    category: "testimonios",
    author: "Marcos Sandoval",
    date: "2025-10-18",
    readingTime: 6,
    cover: "/images/post-9.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Durante años creí que tenerlo todo me haría feliz. Conseguí buena parte de lo que perseguía y, sin embargo, el vacío seguía allí cada noche. Llenaba mis días de ruido para no escuchar la pregunta que no me atrevía a hacerme: ¿y si todo esto no basta?",
          en: "For years I believed that having it all would make me happy. I obtained much of what I chased and yet the emptiness was still there every night. I filled my days with noise so I would not hear the question I did not dare to ask myself: what if none of this is enough?",
        },
      },
      {
        type: "h2",
        text: {
          es: "La invitación que lo cambió todo",
          en: "The invitation that changed everything",
        },
      },
      {
        type: "p",
        text: {
          es: "Un compañero de trabajo me invitó un domingo, sin presionarme. Llegué a la defensiva, esperando juicio, y encontré acogida. Por primera vez alguien me habló de un Dios que no esperaba que yo fuera perfecto para amarme, sino que me amaba tal como llegaba.",
          en: "A coworker invited me one Sunday without pressuring me. I arrived defensive, expecting judgment, and I found welcome. For the first time someone told me about a God who did not wait for me to be perfect in order to love me, but who loved me just as I came.",
        },
      },
      {
        type: "verse",
        text: {
          es: "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.",
          en: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
        },
        reference: { es: "2 Corintios 5:17", en: "2 Corinthians 5:17" },
      },
      {
        type: "p",
        text: {
          es: "No cambié de la noche a la mañana, ni mi vida se volvió de repente sencilla. Pero algo profundo se ordenó por dentro. El vacío que ningún logro había llenado empezó a colmarse con una paz que no sabía explicar y que no quería volver a perder.",
          en: "I did not change overnight, nor did my life suddenly become easy. But something deep was set in order on the inside. The emptiness that no achievement had filled began to be filled with a peace I could not explain and that I never wanted to lose again.",
        },
      },
      {
        type: "p",
        text: {
          es: "Hoy sirvo en la misma iglesia que un día me acogió. Si estás leyendo esto sintiendo ese mismo vacío, quiero decirte algo sencillo: hay esperanza. Cristo sigue haciendo nuevas todas las cosas, y tu historia también puede empezar de nuevo.",
          en: "Today I serve in the same church that once welcomed me. If you are reading this feeling that same emptiness, I want to tell you something simple: there is hope. Christ still makes all things new, and your story too can begin again.",
        },
      },
    ],
  },
  {
    slug: "fe-en-medio-de-la-tormenta",
    title: {
      es: "Fe en medio de la tormenta",
      en: "Faith in the middle of the storm",
    },
    excerpt: {
      es: "La fe no nos libra de las tormentas, pero nos sostiene dentro de ellas. Una reflexión para los días difíciles.",
      en: "Faith does not spare us from storms, but it holds us within them. A reflection for hard days.",
    },
    category: "ensenanzas",
    author: "Pastor Daniel Ortega",
    date: "2025-12-15",
    readingTime: 7,
    cover: "/images/post-10.jpg",
    body: [
      {
        type: "p",
        text: {
          es: "Tarde o temprano todos atravesamos tormentas: una enfermedad, una pérdida, una crisis que no pedimos. En esos momentos la pregunta no suele ser si Dios existe, sino dónde está. La fe no promete cielos siempre despejados, pero sí una presencia que no se va.",
          en: "Sooner or later we all go through storms: an illness, a loss, a crisis we did not ask for. In those moments the question is usually not whether God exists, but where he is. Faith does not promise ever-clear skies, but it does promise a presence that does not leave.",
        },
      },
      {
        type: "verse",
        text: {
          es: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
          en: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
        },
        reference: { es: "Isaías 41:10", en: "Isaiah 41:10" },
      },
      {
        type: "h2",
        text: {
          es: "Dios en la barca",
          en: "God in the boat",
        },
      },
      {
        type: "p",
        text: {
          es: "Los discípulos vivieron una tormenta con Jesús dormido en la barca. Asustados, le despertaron pensando que no le importaba. Él calmó el viento, pero también sus corazones. A veces Dios calma la tormenta; otras nos calma a nosotros en medio de ella.",
          en: "The disciples lived through a storm with Jesus asleep in the boat. Frightened, they woke him thinking he did not care. He calmed the wind, but he also calmed their hearts. Sometimes God calms the storm; other times he calms us in the middle of it.",
        },
      },
      {
        type: "p",
        text: {
          es: "Tener fe no significa fingir que no tenemos miedo, sino llevar ese miedo a Dios en lugar de cargarlo solos. La oración honesta, incluso entre lágrimas, es uno de los actos de fe más grandes: declarar que, aunque no entendemos, seguimos confiando.",
          en: "Having faith does not mean pretending we are not afraid, but bringing that fear to God instead of carrying it alone. Honest prayer, even through tears, is one of the greatest acts of faith: declaring that, although we do not understand, we still trust.",
        },
      },
      {
        type: "p",
        text: {
          es: "Si hoy estás en plena tormenta, no estás solo ni olvidado. Aférrate a la promesa de que él te sostiene con su diestra. Las tormentas pasan; su fidelidad permanece. Y muchas veces es justo en medio del temporal donde más profunda se vuelve nuestra fe.",
          en: "If today you are in the middle of a storm, you are neither alone nor forgotten. Hold on to the promise that he upholds you with his right hand. Storms pass; his faithfulness remains. And often it is right in the middle of the tempest that our faith grows deepest.",
        },
      },
    ],
  },
];
