import type { Lang } from "./i18n/lang";

export type I18nString = {
  en_us: string;
  en_gb: string;
  es: string;
  fr: string;
  nl: string;
  de: string;
};

export type BlogBlock =
  | { type: "p"; text: I18nString }
  | { type: "h2"; text: I18nString };

export type BlogPost = {
  slug: string;
  image: string;
  tag: I18nString;
  title: I18nString;
  excerpt: I18nString;
  read: I18nString;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-stripe-linear-and-apple-taught-us-about-websites",
    image: "/concepts/concept-4.svg",
    tag: {
      en_us: "Lessons",
      en_gb: "Lessons",
      es: "Lecciones",
      fr: "Leçons",
      nl: "Lessen",
      de: "Lektionen",
    },
    title: {
      en_us: "What Stripe, Linear and Apple taught us about websites",
      en_gb: "What Stripe, Linear and Apple taught us about websites",
      es: "Lo que Stripe, Linear y Apple nos enseñaron sobre webs",
      fr: "Ce que Stripe, Linear et Apple nous ont appris sur les sites web",
      nl: "Wat Stripe, Linear en Apple ons leerden over websites",
      de: "Was Stripe, Linear und Apple uns über Websites gelehrt haben",
    },
    excerpt: {
      en_us: 'Most "best website" lists are useless. Here are three brands worth actually studying — and the one thing each one does that you can steal.',
      en_gb: 'Most "best website" lists are useless. Here are three brands worth actually studying — and the one thing each one does that you can steal.',
      es: 'La mayoría de listas de "mejores webs" son inútiles. Aquí tienes tres marcas que vale la pena estudiar — y la única cosa que cada una hace que puedes copiar.',
      fr: 'La plupart des listes des "meilleurs sites" sont inutiles. Voici trois marques qui méritent vraiment d\'être étudiées — et la seule chose que chacune fait que vous pouvez reprendre.',
      nl: 'De meeste "beste website"-lijstjes zijn nutteloos. Hier zijn drie merken die het écht waard zijn om te bestuderen — en het ene ding dat elk doet dat je kunt overnemen.',
      de: 'Die meisten "Best-Website"-Listen sind nutzlos. Hier sind drei Marken, die es wirklich wert sind, studiert zu werden — und das eine, was jede tut, das du übernehmen kannst.',
    },
    read: {
      en_us: "5 min read",
      en_gb: "5 min read",
      es: "5 min de lectura",
      fr: "5 min de lecture",
      nl: "5 min leestijd",
      de: "5 Min. Lesezeit",
    },
    body: [
      {
        type: "p",
        text: {
          en_us: 'Most "best website" lists are useless. They list whatever has been viral on Twitter recently. Here are three companies whose websites are worth studying properly — and the one specific thing each one does that you can steal.',
          en_gb: 'Most "best website" lists are useless. They list whatever has been viral on Twitter recently. Here are three companies whose websites are worth studying properly — and the one specific thing each one does that you can steal.',
          es: 'La mayoría de listas de "mejores webs" son inútiles. Listan lo que sea que haya sido viral en Twitter recientemente. Aquí tienes tres empresas cuyas webs vale la pena estudiar con calma — y la única cosa concreta que cada una hace que puedes copiar.',
          fr: 'La plupart des listes des "meilleurs sites" sont inutiles. Elles reprennent ce qui a été viral sur Twitter récemment. Voici trois entreprises dont les sites valent vraiment la peine d\'être étudiés — et la chose précise que chacune fait que vous pouvez reprendre.',
          nl: 'De meeste "beste website"-lijstjes zijn nutteloos. Ze noemen alles wat recent viral ging op Twitter. Hier zijn drie bedrijven waarvan de website het waard is om écht te bestuderen — en het ene specifieke ding dat elk doet dat je kunt overnemen.',
          de: 'Die meisten "Best-Website"-Listen sind nutzlos. Sie listen einfach das auf, was zuletzt auf Twitter viral ging. Hier sind drei Unternehmen, deren Websites es wirklich wert sind, gründlich studiert zu werden — und die eine konkrete Sache, die jede tut, die du übernehmen kannst.',
        },
      },
      {
        type: "h2",
        text: {
          en_us: "Stripe: density without clutter",
          en_gb: "Stripe: density without clutter",
          es: "Stripe: densidad sin desorden",
          fr: "Stripe : la densité sans le désordre",
          nl: "Stripe: dichtheid zonder rommel",
          de: "Stripe: Dichte ohne Unordnung",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Stripe's homepage is doing more work than it looks like it is. There's a hero, a developer pitch, a customer-logo marquee, a product map — six or seven distinct sections — and yet nothing feels crowded.",
          en_gb: "Stripe's homepage is doing more work than it looks like it is. There's a hero, a developer pitch, a customer-logo marquee, a product map — six or seven distinct sections — and yet nothing feels crowded.",
          es: "La página principal de Stripe hace más trabajo del que parece. Hay un hero, un pitch para desarrolladores, un carrusel de logos de clientes, un mapa de productos — seis o siete secciones distintas — y aun así nada se siente abarrotado.",
          fr: "La page d'accueil de Stripe fait plus de travail qu'il n'y paraît. Il y a un hero, un pitch développeur, un carrousel de logos clients, une cartographie produit — six ou sept sections distinctes — et pourtant rien ne paraît surchargé.",
          nl: "De homepage van Stripe doet meer dan het lijkt. Er staat een hero, een developer-pitch, een klantenlogo-carrousel, een productoverzicht — zes of zeven duidelijk verschillende secties — en toch voelt niets vol.",
          de: "Die Startseite von Stripe leistet mehr, als es scheint. Es gibt einen Hero, einen Entwickler-Pitch, eine Kundenlogo-Leiste, eine Produktübersicht — sechs oder sieben unterschiedliche Abschnitte — und doch wirkt nichts überladen.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "The trick is rhythm. Stripe never lets two adjacent sections share a layout. A wide visual is followed by a tight type block. A dark section is followed by white. A code-snippet area is followed by an illustration. Every section gets a different hat, so the eye is never bored and never overwhelmed.",
          en_gb: "The trick is rhythm. Stripe never lets two adjacent sections share a layout. A wide visual is followed by a tight type block. A dark section is followed by white. A code-snippet area is followed by an illustration. Every section gets a different hat, so the eye is never bored and never overwhelmed.",
          es: "El truco es el ritmo. Stripe nunca deja que dos secciones contiguas compartan composición. A un visual amplio le sigue un bloque tipográfico compacto. A una sección oscura le sigue una blanca. A una zona con código le sigue una ilustración. Cada sección lleva un sombrero distinto, así que el ojo no se aburre ni se satura.",
          fr: "L'astuce, c'est le rythme. Stripe ne laisse jamais deux sections voisines partager la même mise en page. Un visuel large est suivi d'un bloc typographique serré. Une section sombre est suivie d'une blanche. Une zone de code est suivie d'une illustration. Chaque section porte un chapeau différent, l'œil n'est donc jamais ennuyé ni saturé.",
          nl: "De truc is ritme. Stripe laat nooit twee opeenvolgende secties dezelfde indeling delen. Een breed beeld wordt gevolgd door een compact tekstblok. Een donkere sectie wordt gevolgd door een witte. Een codeblok wordt gevolgd door een illustratie. Elke sectie krijgt een andere jas, dus het oog raakt nooit verveeld en nooit overweldigd.",
          de: "Der Trick ist Rhythmus. Stripe lässt nie zwei aufeinanderfolgende Abschnitte das gleiche Layout teilen. Auf eine breite Bildfläche folgt ein dichter Typoblock. Auf einen dunklen Abschnitt folgt ein weißer. Auf einen Codebereich folgt eine Illustration. Jeder Abschnitt trägt einen anderen Hut, sodass das Auge weder gelangweilt noch überfordert ist.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "For a small business: vary your sections. Don't put three two-column-text sections in a row. Alternate.",
          en_gb: "For a small business: vary your sections. Don't put three two-column-text sections in a row. Alternate.",
          es: "Para una pequeña empresa: varía tus secciones. No pongas tres secciones de texto a dos columnas seguidas. Alterna.",
          fr: "Pour une petite entreprise : variez vos sections. Ne mettez pas trois sections de texte sur deux colonnes à la suite. Alternez.",
          nl: "Voor een klein bedrijf: varieer je secties. Plaats geen drie tekstsecties met twee kolommen achter elkaar. Wissel af.",
          de: "Für ein kleines Unternehmen: Variiere deine Abschnitte. Setze nicht drei zweispaltige Textabschnitte hintereinander. Wechsle ab.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "Linear: speed as a feature",
          en_gb: "Linear: speed as a feature",
          es: "Linear: la velocidad como característica",
          fr: "Linear : la vitesse comme fonctionnalité",
          nl: "Linear: snelheid als feature",
          de: "Linear: Geschwindigkeit als Feature",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Linear's website feels different in a way that's hard to articulate. It loads instantly. Nothing flashes. The fonts arrive without flicker. Animation is fast — under 200ms. The whole site behaves like their product: snappy, deliberate, never indulgent.",
          en_gb: "Linear's website feels different in a way that's hard to articulate. It loads instantly. Nothing flashes. The fonts arrive without flicker. Animation is fast — under 200ms. The whole site behaves like their product: snappy, deliberate, never indulgent.",
          es: "La web de Linear se siente diferente de un modo difícil de explicar. Carga al instante. Nada parpadea. Las fuentes llegan sin flicker. Las animaciones son rápidas — por debajo de 200 ms. Toda la web se comporta como su producto: ágil, deliberada, nunca complaciente.",
          fr: "Le site de Linear procure une sensation différente, difficile à expliquer. Il charge instantanément. Rien ne clignote. Les polices arrivent sans flicker. L'animation est rapide — sous les 200 ms. Tout le site se comporte comme leur produit : vif, intentionnel, jamais complaisant.",
          nl: "De website van Linear voelt anders op een manier die lastig te benoemen is. Hij laadt direct. Niets flitst. De fonts komen zonder flikkering binnen. Animaties zijn snel — onder de 200 ms. De hele site gedraagt zich als hun product: kwiek, doelbewust, nooit overdadig.",
          de: "Die Website von Linear fühlt sich auf eine schwer zu beschreibende Art anders an. Sie lädt sofort. Nichts blitzt. Die Schriften erscheinen ohne Flackern. Animationen sind schnell — unter 200 ms. Die gesamte Seite verhält sich wie ihr Produkt: zackig, bewusst, nie ausschweifend.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "That feel is engineered. They self-host fonts. They preload critical CSS. They ship images through proper image components. And they refuse to ship slow components. The result: the site itself becomes proof that they ship fast software.",
          en_gb: "That feel is engineered. They self-host fonts. They preload critical CSS. They ship images through proper image components. And they refuse to ship slow components. The result: the site itself becomes proof that they ship fast software.",
          es: "Esa sensación está diseñada. Alojan las fuentes ellos mismos. Precargan el CSS crítico. Sirven las imágenes con componentes adecuados. Y se niegan a publicar componentes lentos. El resultado: la propia web se convierte en la prueba de que envían software rápido.",
          fr: "Cette sensation est construite. Ils hébergent eux-mêmes leurs polices. Ils préchargent le CSS critique. Ils diffusent les images via des composants images dédiés. Et ils refusent d'expédier des composants lents. Résultat : le site devient lui-même la preuve qu'ils livrent un logiciel rapide.",
          nl: "Dat gevoel is bewust ontworpen. Ze hosten hun fonts zelf. Ze pre-loaden kritieke CSS. Ze laden beelden via fatsoenlijke image-componenten. En ze weigeren langzame componenten op te leveren. Het resultaat: de site zelf is het bewijs dat ze snelle software maken.",
          de: "Dieses Gefühl ist gewollt. Sie hosten Schriften selbst. Sie laden kritisches CSS vor. Sie liefern Bilder über ordentliche Image-Komponenten aus. Und sie weigern sich, langsame Komponenten auszuliefern. Das Ergebnis: Die Seite selbst ist der Beweis, dass sie schnelle Software liefern.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "For a small business: speed isn't a developer concern. It's a brand concern. A two-second load tells the visitor what they're about to deal with.",
          en_gb: "For a small business: speed isn't a developer concern. It's a brand concern. A two-second load tells the visitor what they're about to deal with.",
          es: "Para una pequeña empresa: la velocidad no es un asunto de desarrolladores. Es un asunto de marca. Una carga de dos segundos le dice al visitante con qué se va a encontrar.",
          fr: "Pour une petite entreprise : la vitesse n'est pas un problème de développeur. C'est un problème de marque. Un temps de chargement de deux secondes annonce au visiteur ce qui l'attend.",
          nl: "Voor een klein bedrijf: snelheid is geen developer-zorg. Het is een merkzorg. Een laadtijd van twee seconden vertelt de bezoeker waar hij aan toe is.",
          de: "Für ein kleines Unternehmen: Geschwindigkeit ist keine Entwicklerangelegenheit. Sie ist eine Markenangelegenheit. Zwei Sekunden Ladezeit sagen dem Besucher, womit er es zu tun hat.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "Apple: one idea per scroll",
          en_gb: "Apple: one idea per scroll",
          es: "Apple: una idea por pantalla",
          fr: "Apple : une idée par scroll",
          nl: "Apple: één idee per scroll",
          de: "Apple: eine Idee pro Scroll",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Apple's product pages aren't busy. Open one and you'll find one idea, then scroll, then another single idea, then scroll. A photograph. A single sentence. Maybe a number. Then more whitespace than any other website would dare leave.",
          en_gb: "Apple's product pages aren't busy. Open one and you'll find one idea, then scroll, then another single idea, then scroll. A photograph. A single sentence. Maybe a number. Then more whitespace than any other website would dare leave.",
          es: "Las páginas de producto de Apple no están saturadas. Abre una y encontrarás una idea, luego scroll, luego otra idea suelta, luego scroll. Una fotografía. Una sola frase. Quizá un número. Y luego más espacio en blanco del que cualquier otra web se atrevería a dejar.",
          fr: "Les pages produits d'Apple ne sont pas chargées. Ouvrez-en une : une idée, puis scroll, puis une autre idée seule, puis scroll. Une photo. Une seule phrase. Peut-être un chiffre. Puis plus d'espace blanc qu'aucun autre site n'oserait laisser.",
          nl: "De productpagina's van Apple zijn niet druk. Open er één en je vindt één idee, dan scrollen, dan weer een enkel idee, dan scrollen. Een foto. Eén zin. Misschien een getal. En dan meer witruimte dan welke andere website ook zou durven laten.",
          de: "Apples Produktseiten sind nicht überladen. Öffne eine und du findest eine Idee, dann Scrollen, dann eine weitere einzelne Idee, dann Scrollen. Ein Foto. Ein einziger Satz. Vielleicht eine Zahl. Dann mehr Weißraum, als es sich irgendeine andere Website trauen würde.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "It works because Apple trusts the buyer. They don't pile every reason-to-buy into the hero. They believe one well-staged idea will land harder than seven competing ones.",
          en_gb: "It works because Apple trusts the buyer. They don't pile every reason-to-buy into the hero. They believe one well-staged idea will land harder than seven competing ones.",
          es: "Funciona porque Apple confía en el comprador. No amontonan todas las razones para comprar en el hero. Creen que una idea bien presentada cala más hondo que siete compitiendo entre sí.",
          fr: "Ça marche parce qu'Apple fait confiance à l'acheteur. Ils n'entassent pas toutes les raisons d'acheter dans le hero. Ils croient qu'une idée bien mise en scène frappe plus fort que sept idées concurrentes.",
          nl: "Het werkt omdat Apple de koper vertrouwt. Ze stapelen niet elke koopreden in de hero. Ze geloven dat één goed in scène gezet idee harder aankomt dan zeven die met elkaar concurreren.",
          de: "Es funktioniert, weil Apple dem Käufer vertraut. Sie packen nicht jeden Kaufgrund in den Hero. Sie glauben, dass eine gut inszenierte Idee härter einschlägt als sieben konkurrierende.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "For a small business: stop trying to close the sale on the hero. Let the hero set the tone. Save the closing arguments for further down the page.",
          en_gb: "For a small business: stop trying to close the sale on the hero. Let the hero set the tone. Save the closing arguments for further down the page.",
          es: "Para una pequeña empresa: deja de intentar cerrar la venta en el hero. Que el hero marque el tono. Guarda los argumentos de cierre para más abajo en la página.",
          fr: "Pour une petite entreprise : arrêtez d'essayer de conclure la vente dans le hero. Laissez le hero poser le ton. Gardez les arguments de clôture pour plus bas dans la page.",
          nl: "Voor een klein bedrijf: stop met proberen de verkoop in de hero rond te krijgen. Laat de hero de toon zetten. Bewaar de afsluitende argumenten voor verderop op de pagina.",
          de: "Für ein kleines Unternehmen: Hör auf, den Verkauf im Hero abschließen zu wollen. Lass den Hero den Ton setzen. Heb dir die Abschlussargumente für weiter unten auf der Seite auf.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "And what Ahrefs got right that nobody talks about",
          en_gb: "And what Ahrefs got right that nobody talks about",
          es: "Y lo que Ahrefs ha hecho bien y de lo que nadie habla",
          fr: "Et ce qu'Ahrefs a réussi et dont personne ne parle",
          nl: "En wat Ahrefs goed deed waar niemand het over heeft",
          de: "Und was Ahrefs richtig gemacht hat, worüber niemand spricht",
        },
      },
      {
        type: "p",
        text: {
          en_us: 'A bonus. Ahrefs is not on most "beautiful website" lists, but their site converts brilliantly because every page answers a search query directly. They invested in content for a decade while their competitors invested in funnels. Their homepage is, in a sense, a sitemap of their best blog posts.',
          en_gb: 'A bonus. Ahrefs is not on most "beautiful website" lists, but their site converts brilliantly because every page answers a search query directly. They invested in content for a decade while their competitors invested in funnels. Their homepage is, in a sense, a sitemap of their best blog posts.',
          es: 'Un extra. Ahrefs no aparece en la mayoría de listas de "webs bonitas", pero su web convierte de maravilla porque cada página responde directamente a una búsqueda. Invirtieron en contenido durante una década mientras sus competidores invertían en embudos. Su home es, en cierto modo, un sitemap de sus mejores artículos.',
          fr: 'En bonus. Ahrefs n\'apparaît pas sur la plupart des listes de "beaux sites", mais leur site convertit à merveille parce que chaque page répond directement à une requête de recherche. Ils ont investi dans le contenu pendant dix ans pendant que leurs concurrents investissaient dans des tunnels. Leur page d\'accueil est, en un sens, un plan de site de leurs meilleurs articles.',
          nl: 'Een bonus. Ahrefs staat op de meeste "mooie website"-lijstjes niet, maar hun site converteert briljant omdat elke pagina een zoekopdracht direct beantwoordt. Ze investeerden tien jaar lang in content terwijl hun concurrenten in funnels investeerden. Hun homepage is in zekere zin een sitemap van hun beste blogposts.',
          de: 'Ein Bonus. Ahrefs taucht in den meisten "Schönste-Website"-Listen nicht auf, aber ihre Seite konvertiert großartig, weil jede Seite direkt eine Suchanfrage beantwortet. Sie haben ein Jahrzehnt lang in Inhalte investiert, während ihre Konkurrenten in Funnel investierten. Ihre Startseite ist im Grunde eine Sitemap ihrer besten Blogbeiträge.',
        },
      },
      {
        type: "p",
        text: {
          en_us: "For a small business: one well-written, well-positioned article can outrank a competitor's entire marketing budget. Build the site light. Then write.",
          en_gb: "For a small business: one well-written, well-positioned article can outrank a competitor's entire marketing budget. Build the site light. Then write.",
          es: "Para una pequeña empresa: un solo artículo bien escrito y bien posicionado puede superar todo el presupuesto de marketing de un competidor. Construye una web ligera. Y luego escribe.",
          fr: "Pour une petite entreprise : un seul article bien écrit et bien positionné peut dépasser tout le budget marketing d'un concurrent. Construisez le site léger. Puis écrivez.",
          nl: "Voor een klein bedrijf: één goed geschreven, goed gepositioneerd artikel kan het volledige marketingbudget van een concurrent verslaan. Bouw de site licht. En schrijf dan.",
          de: "Für ein kleines Unternehmen: Ein einziger gut geschriebener, gut positionierter Artikel kann das gesamte Marketingbudget eines Konkurrenten übertreffen. Baue die Seite leicht. Dann schreibe.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "The pattern across all four",
          en_gb: "The pattern across all four",
          es: "El patrón común a las cuatro",
          fr: "Le motif commun aux quatre",
          nl: "Het patroon bij alle vier",
          de: "Das Muster bei allen vieren",
        },
      },
      {
        type: "p",
        text: {
          en_us: "What Stripe, Linear and Apple share — and what Ahrefs proves another way — is that the website is the product. None of them treat the site as marketing. They treat it as the first version of the experience. Slow site, slow company. Cluttered site, cluttered company. Restrained site, serious company.",
          en_gb: "What Stripe, Linear and Apple share — and what Ahrefs proves another way — is that the website is the product. None of them treat the site as marketing. They treat it as the first version of the experience. Slow site, slow company. Cluttered site, cluttered company. Restrained site, serious company.",
          es: "Lo que comparten Stripe, Linear y Apple — y lo que Ahrefs demuestra de otra manera — es que la web es el producto. Ninguna trata la web como marketing. La tratan como la primera versión de la experiencia. Web lenta, empresa lenta. Web saturada, empresa saturada. Web contenida, empresa seria.",
          fr: "Ce que Stripe, Linear et Apple ont en commun — et ce qu'Ahrefs démontre autrement — c'est que le site est le produit. Aucune ne traite le site comme du marketing. Elles le traitent comme la première version de l'expérience. Site lent, entreprise lente. Site surchargé, entreprise surchargée. Site retenu, entreprise sérieuse.",
          nl: "Wat Stripe, Linear en Apple gemeen hebben — en wat Ahrefs op een andere manier bewijst — is dat de website het product is. Geen van hen behandelt de site als marketing. Ze behandelen hem als de eerste versie van de ervaring. Trage site, traag bedrijf. Volle site, vol bedrijf. Ingetogen site, serieus bedrijf.",
          de: "Was Stripe, Linear und Apple verbindet — und was Ahrefs auf andere Weise belegt — ist, dass die Website das Produkt ist. Keine von ihnen behandelt die Seite als Marketing. Sie behandeln sie als die erste Version der Erfahrung. Langsame Seite, langsames Unternehmen. Überladene Seite, überladenes Unternehmen. Zurückhaltende Seite, ernsthaftes Unternehmen.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "That's the lesson worth taking. Build the site like you'd build the product.",
          en_gb: "That's the lesson worth taking. Build the site like you'd build the product.",
          es: "Esa es la lección que merece la pena llevarse. Construye la web como construirías el producto.",
          fr: "Voilà la leçon à retenir. Construisez le site comme vous construiriez le produit.",
          nl: "Dat is de les die telt. Bouw de site zoals je het product zou bouwen.",
          de: "Das ist die Lektion, die zählt. Baue die Seite, wie du das Produkt bauen würdest.",
        },
      },
    ],
  },
  {
    slug: "why-every-small-business-needs-a-custom-website",
    image: "/concepts/concept-1.svg",
    tag: {
      en_us: "Strategy",
      en_gb: "Strategy",
      es: "Estrategia",
      fr: "Stratégie",
      nl: "Strategie",
      de: "Strategie",
    },
    title: {
      en_us: "Why every small business needs a custom website",
      en_gb: "Why every small business needs a custom website",
      es: "Por qué toda pequeña empresa necesita una web a medida",
      fr: "Pourquoi chaque petite entreprise a besoin d'un site sur-mesure",
      nl: "Waarom elk klein bedrijf een maatwerk-website nodig heeft",
      de: "Warum jedes kleine Unternehmen eine maßgeschneiderte Website braucht",
    },
    excerpt: {
      en_us: "Templates feel cheap. A custom site signals seriousness from the first second a prospect lands.",
      en_gb: "Templates feel cheap. A custom site signals seriousness from the first second a prospect lands.",
      es: "Las plantillas se notan baratas. Una web a medida transmite seriedad desde el primer segundo en que un cliente potencial entra.",
      fr: "Les templates font cheap. Un site sur-mesure communique du sérieux dès la première seconde où un prospect arrive.",
      nl: "Templates voelen goedkoop. Een maatwerk-site straalt vanaf de eerste seconde dat een prospect binnenkomt serieusheid uit.",
      de: "Templates wirken billig. Eine maßgeschneiderte Seite signalisiert Ernsthaftigkeit ab der ersten Sekunde, in der ein Interessent landet.",
    },
    read: {
      en_us: "3 min read",
      en_gb: "3 min read",
      es: "3 min de lectura",
      fr: "3 min de lecture",
      nl: "3 min leestijd",
      de: "3 Min. Lesezeit",
    },
    body: [
      {
        type: "p",
        text: {
          en_us: "Most small businesses still treat their website as a tick-box exercise. They buy a template, drop in a logo, and never look at it again. That worked ten years ago. It doesn't anymore.",
          en_gb: "Most small businesses still treat their website as a tick-box exercise. They buy a template, drop in a logo, and never look at it again. That worked ten years ago. It doesn't anymore.",
          es: "La mayoría de pequeñas empresas siguen tratando su web como un trámite. Compran una plantilla, meten su logo y no vuelven a mirarla. Hace diez años eso funcionaba. Ya no.",
          fr: "La plupart des petites entreprises traitent encore leur site web comme une case à cocher. Elles achètent un template, glissent un logo, et ne le regardent plus jamais. Ça marchait il y a dix ans. Plus aujourd'hui.",
          nl: "De meeste kleine bedrijven behandelen hun website nog steeds als een vinkje op een lijst. Ze kopen een template, plakken er een logo op en kijken er nooit meer naar. Tien jaar geleden werkte dat. Nu niet meer.",
          de: "Die meisten kleinen Unternehmen behandeln ihre Website immer noch wie eine lästige Pflichtaufgabe. Sie kaufen ein Template, klatschen ein Logo drauf und schauen es nie wieder an. Vor zehn Jahren hat das funktioniert. Heute nicht mehr.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Your website isn't a brochure. It's the first room your customer ever walks into. They form an opinion in under a second — about whether you take your business seriously, whether you'll take their money seriously, whether you'll actually deliver. A tired template signals a tired operation. It doesn't matter how good the work is.",
          en_gb: "Your website isn't a brochure. It's the first room your customer ever walks into. They form an opinion in under a second — about whether you take your business seriously, whether you'll take their money seriously, whether you'll actually deliver. A tired template signals a tired operation. It doesn't matter how good the work is.",
          es: "Tu web no es un folleto. Es la primera habitación en la que entra tu cliente. Se forman una opinión en menos de un segundo — sobre si te tomas tu negocio en serio, si te vas a tomar su dinero en serio, si vas a entregar. Una plantilla cansada transmite una operación cansada. No importa lo bueno que sea el trabajo.",
          fr: "Votre site n'est pas une brochure. C'est la première pièce dans laquelle entre votre client. Il se forme un avis en moins d'une seconde — sur le sérieux de votre business, sur celui que vous accorderez à son argent, sur votre capacité à livrer. Un template fatigué traduit une activité fatiguée. Peu importe la qualité du travail.",
          nl: "Je website is geen folder. Het is de eerste ruimte die je klant binnenstapt. Hij vormt een mening in minder dan een seconde — over of jij je bedrijf serieus neemt, of jij zijn geld serieus neemt, of jij echt gaat leveren. Een vermoeid template signaleert een vermoeide operatie. Hoe goed het werk ook is.",
          de: "Deine Website ist keine Broschüre. Sie ist der erste Raum, den dein Kunde betritt. Er bildet sich in unter einer Sekunde eine Meinung — ob du dein Geschäft ernst nimmst, ob du sein Geld ernst nimmst, ob du tatsächlich lieferst. Ein müdes Template signalisiert einen müden Betrieb. Egal, wie gut die Arbeit ist.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "Templates are optimized for nobody",
          en_gb: "Templates are optimised for nobody",
          es: "Las plantillas no están optimizadas para nadie",
          fr: "Les templates ne sont optimisés pour personne",
          nl: "Templates zijn voor niemand geoptimaliseerd",
          de: "Templates sind für niemanden optimiert",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Templates have one fatal flaw: they were built for everyone, which means they're optimized for no one. The hero looks the same as a thousand competitors. The structure was designed for a generic SaaS landing page, not your bespoke joinery business or your strength coaching practice. The copy is filler. The result is a site that looks fine and converts nothing.",
          en_gb: "Templates have one fatal flaw: they were built for everyone, which means they're optimised for no one. The hero looks the same as a thousand competitors. The structure was designed for a generic SaaS landing page, not your bespoke joinery business or your strength coaching practice. The copy is filler. The result is a site that looks fine and converts nothing.",
          es: "Las plantillas tienen un fallo fatal: se construyeron para todo el mundo, lo que significa que no están optimizadas para nadie. El hero se ve igual que el de mil competidores. La estructura se diseñó para una landing genérica de SaaS, no para tu carpintería a medida ni para tu consulta de coaching de fuerza. Los textos son relleno. El resultado es una web que se ve bien y no convierte nada.",
          fr: "Les templates ont un défaut fatal : ils ont été pensés pour tout le monde, ce qui veut dire qu'ils ne sont optimisés pour personne. Le hero ressemble à celui de mille concurrents. La structure a été conçue pour une landing SaaS générique, pas pour votre menuiserie sur-mesure ou votre cabinet de coaching de force. Les textes sont du remplissage. Le résultat : un site qui passe bien à l'œil et ne convertit rien.",
          nl: "Templates hebben één fatale fout: ze zijn voor iedereen gemaakt, wat betekent dat ze voor niemand geoptimaliseerd zijn. De hero ziet er hetzelfde uit als bij duizend concurrenten. De structuur is ontworpen voor een generieke SaaS-landingspagina, niet voor jouw maatwerk-timmerbedrijf of jouw kracht-coaching-praktijk. De copy is opvulling. Het resultaat: een site die er prima uitziet en niets converteert.",
          de: "Templates haben einen fatalen Fehler: Sie wurden für alle gebaut, was bedeutet, dass sie für niemanden optimiert sind. Der Hero sieht aus wie bei tausend Konkurrenten. Die Struktur wurde für eine generische SaaS-Landingpage entworfen, nicht für deinen maßgeschneiderten Tischlereibetrieb oder deine Krafttraining-Praxis. Die Texte sind Füllmaterial. Das Ergebnis: eine Seite, die okay aussieht und nichts konvertiert.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "A custom site does the opposite. The structure is mapped to how your customers actually decide. The copy is in your voice, not a designer's placeholder. The visuals are tuned to your work. Every detail is intentional, because every detail was a decision someone made for your business specifically.",
          en_gb: "A custom site does the opposite. The structure is mapped to how your customers actually decide. The copy is in your voice, not a designer's placeholder. The visuals are tuned to your work. Every detail is intentional, because every detail was a decision someone made for your business specifically.",
          es: "Una web a medida hace lo contrario. La estructura se ajusta a cómo deciden realmente tus clientes. Los textos están en tu voz, no en el placeholder de un diseñador. Los visuales están afinados a tu trabajo. Cada detalle es intencional, porque cada detalle fue una decisión que alguien tomó pensando concretamente en tu negocio.",
          fr: "Un site sur-mesure fait l'inverse. La structure suit la façon dont vos clients décident réellement. Les textes sont dans votre voix, pas dans le placeholder d'un designer. Les visuels sont calés sur votre travail. Chaque détail est intentionnel, parce que chaque détail a été une décision prise spécifiquement pour votre entreprise.",
          nl: "Een maatwerk-site doet het tegenovergestelde. De structuur sluit aan bij hoe jouw klanten daadwerkelijk beslissen. De copy is in jouw stem, niet de placeholder van een designer. De beelden zijn afgestemd op jouw werk. Elk detail is bedoeld, omdat elk detail een beslissing was die iemand specifiek voor jouw bedrijf nam.",
          de: "Eine maßgeschneiderte Seite macht das Gegenteil. Die Struktur folgt dem, wie deine Kunden tatsächlich entscheiden. Die Texte sind in deiner Stimme, nicht im Platzhalter eines Designers. Die Visuals sind auf deine Arbeit abgestimmt. Jedes Detail ist beabsichtigt, weil jedes Detail eine Entscheidung war, die jemand speziell für dein Unternehmen getroffen hat.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "The premium signal is restraint",
          en_gb: "The premium signal is restraint",
          es: "La señal de premium es la contención",
          fr: "Le signal premium, c'est la retenue",
          nl: "Het premium signaal is ingetogenheid",
          de: "Das Premium-Signal ist Zurückhaltung",
        },
      },
      {
        type: "p",
        text: {
          en_us: "The premium signal isn't a fancy animation or a clever hover effect. It's the absence of template patterns. The font choice is yours. The button style is yours. The way your services are explained is yours. Visitors can't always articulate why a custom site feels different, but they always feel it.",
          en_gb: "The premium signal isn't a fancy animation or a clever hover effect. It's the absence of template patterns. The font choice is yours. The button style is yours. The way your services are explained is yours. Visitors can't always articulate why a custom site feels different, but they always feel it.",
          es: "La señal de premium no es una animación llamativa ni un efecto hover ingenioso. Es la ausencia de patrones de plantilla. La tipografía es tuya. El estilo de los botones es tuyo. La forma de explicar tus servicios es tuya. Los visitantes no siempre saben articular por qué una web a medida se siente diferente, pero siempre lo perciben.",
          fr: "Le signal premium n'est pas une animation tape-à-l'œil ni un effet hover malin. C'est l'absence de motifs de template. Le choix de la police est le vôtre. Le style des boutons est le vôtre. La façon d'expliquer vos services est la vôtre. Les visiteurs ne savent pas toujours formuler pourquoi un site sur-mesure semble différent, mais ils le ressentent toujours.",
          nl: "Het premium signaal is geen flitsende animatie of slim hover-effect. Het is de afwezigheid van template-patronen. De fontkeuze is van jou. De knopstijl is van jou. De manier waarop je diensten worden uitgelegd is van jou. Bezoekers kunnen niet altijd benoemen waarom een maatwerk-site anders voelt, maar ze voelen het wel.",
          de: "Das Premium-Signal ist keine schicke Animation oder ein cleverer Hover-Effekt. Es ist das Fehlen von Template-Mustern. Die Schriftwahl ist deine. Der Buttonstil ist deiner. Die Art, wie deine Leistungen erklärt werden, ist deine. Besucher können nicht immer sagen, warum sich eine maßgeschneiderte Seite anders anfühlt, aber sie spüren es immer.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "If you're sending serious prospects to a generic template, you're losing trust before the conversation starts. A custom site closes that gap before you say a word.",
          en_gb: "If you're sending serious prospects to a generic template, you're losing trust before the conversation starts. A custom site closes that gap before you say a word.",
          es: "Si estás enviando a clientes potenciales serios a una plantilla genérica, estás perdiendo confianza antes de empezar la conversación. Una web a medida cierra esa brecha antes de que digas una palabra.",
          fr: "Si vous envoyez des prospects sérieux vers un template générique, vous perdez la confiance avant même que la conversation ne commence. Un site sur-mesure comble ce fossé avant que vous ne disiez un mot.",
          nl: "Als je serieuze prospects naar een generiek template stuurt, verlies je vertrouwen nog voor het gesprek begint. Een maatwerk-site sluit dat gat voordat je een woord hebt gezegd.",
          de: "Wenn du ernsthafte Interessenten zu einem generischen Template schickst, verlierst du Vertrauen, bevor das Gespräch beginnt. Eine maßgeschneiderte Seite schließt diese Lücke, bevor du ein Wort gesagt hast.",
        },
      },
    ],
  },
  {
    slug: "why-we-never-lock-clients-into-hosting",
    image: "/concepts/concept-3.svg",
    tag: {
      en_us: "Principles",
      en_gb: "Principles",
      es: "Principios",
      fr: "Principes",
      nl: "Principes",
      de: "Prinzipien",
    },
    title: {
      en_us: "Why we never lock clients into hosting",
      en_gb: "Why we never lock clients into hosting",
      es: "Por qué nunca atamos a los clientes al hosting",
      fr: "Pourquoi nous n'enfermons jamais les clients dans l'hébergement",
      nl: "Waarom we klanten nooit aan hosting binden",
      de: "Warum wir Kunden niemals an Hosting binden",
    },
    excerpt: {
      en_us: "Vendor lock-in serves the vendor. Plynos hands the keys back at launch.",
      en_gb: "Vendor lock-in serves the vendor. Plynos hands the keys back at launch.",
      es: "El bloqueo del proveedor sirve al proveedor. Plynos te entrega las llaves al lanzamiento.",
      fr: "L'enfermement fournisseur sert le fournisseur. Plynos rend les clés au lancement.",
      nl: "Vendor lock-in dient de leverancier. Plynos geeft bij de lancering de sleutels terug.",
      de: "Vendor Lock-in dient dem Anbieter. Plynos übergibt die Schlüssel beim Launch zurück.",
    },
    read: {
      en_us: "2 min read",
      en_gb: "2 min read",
      es: "2 min de lectura",
      fr: "2 min de lecture",
      nl: "2 min leestijd",
      de: "2 Min. Lesezeit",
    },
    body: [
      {
        type: "p",
        text: {
          en_us: 'There\'s a quiet pattern in the agency world: you pay them once to build the site, and then forever to host it. The hosting fee is dressed up as "maintenance" or "support" or "the platform." Cancel it and the site goes dark.',
          en_gb: 'There\'s a quiet pattern in the agency world: you pay them once to build the site, and then forever to host it. The hosting fee is dressed up as "maintenance" or "support" or "the platform." Cancel it and the site goes dark.',
          es: 'Hay un patrón silencioso en el mundo de las agencias: les pagas una vez por construir la web y luego para siempre por alojarla. La cuota de hosting se disfraza de "mantenimiento", "soporte" o "la plataforma". La cancelas y la web se apaga.',
          fr: 'Il y a un schéma discret dans le monde des agences : on les paie une fois pour construire le site, puis à vie pour l\'héberger. Les frais d\'hébergement sont déguisés en "maintenance", "support" ou "la plateforme". Vous annulez, le site s\'éteint.',
          nl: 'Er bestaat een stil patroon in de agency-wereld: je betaalt ze eenmalig om de site te bouwen en daarna voor altijd om hem te hosten. De hostingfee wordt vermomd als "onderhoud", "support" of "het platform". Je zegt op en de site gaat op zwart.',
          de: 'Es gibt ein stilles Muster in der Agenturwelt: Du zahlst sie einmal für den Bau der Seite und dann für immer für das Hosting. Die Hostinggebühr wird als "Wartung", "Support" oder "die Plattform" verkleidet. Kündige sie und die Seite geht aus.',
        },
      },
      {
        type: "p",
        text: {
          en_us: "This is vendor lock-in. It serves the vendor, not you.",
          en_gb: "This is vendor lock-in. It serves the vendor, not you.",
          es: "Eso es bloqueo del proveedor. Sirve al proveedor, no a ti.",
          fr: "C'est de l'enfermement fournisseur. Ça sert le fournisseur, pas vous.",
          nl: "Dit is vendor lock-in. Het dient de leverancier, niet jou.",
          de: "Das ist Vendor Lock-in. Es dient dem Anbieter, nicht dir.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "How we do it instead",
          en_gb: "How we do it instead",
          es: "Cómo lo hacemos nosotros",
          fr: "Comment nous procédons",
          nl: "Hoe wij het doen",
          de: "Wie wir es stattdessen machen",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Plynos doesn't work that way. Every client owns their domain in their own name, with their own registrar. Every client has their own hosting account, billed in their own name, on their own card. Every client gets the source code at handover. If you wanted to walk away from us tomorrow and move to another developer, you could — without permission, without delay, without a transition fee.",
          en_gb: "Plynos doesn't work that way. Every client owns their domain in their own name, with their own registrar. Every client has their own hosting account, billed in their own name, on their own card. Every client gets the source code at handover. If you wanted to walk away from us tomorrow and move to another developer, you could — without permission, without delay, without a transition fee.",
          es: "Plynos no funciona así. Cada cliente posee su dominio a su nombre, en su propio registrador. Cada cliente tiene su propia cuenta de hosting, facturada a su nombre, en su propia tarjeta. Cada cliente recibe el código fuente en la entrega. Si quisieras dejarnos mañana e irte a otro desarrollador, podrías — sin permiso, sin demoras, sin tarifa de transición.",
          fr: "Plynos ne fonctionne pas comme ça. Chaque client possède son domaine en son nom, chez son propre registrar. Chaque client a son propre compte d'hébergement, facturé à son nom, sur sa propre carte. Chaque client reçoit le code source à la livraison. Si vous vouliez partir demain pour un autre développeur, vous le pourriez — sans permission, sans délai, sans frais de transition.",
          nl: "Plynos werkt niet zo. Elke klant bezit het domein op eigen naam, bij zijn eigen registrar. Elke klant heeft een eigen hostingaccount, gefactureerd op eigen naam, op eigen kaart. Elke klant krijgt bij de oplevering de broncode. Als je morgen bij ons wilt vertrekken en naar een andere developer wilt verhuizen, kan dat — zonder toestemming, zonder vertraging, zonder transitiekosten.",
          de: "Plynos funktioniert nicht so. Jeder Kunde besitzt seine Domain auf eigenen Namen, bei seinem eigenen Registrar. Jeder Kunde hat sein eigenes Hosting-Konto, abgerechnet auf seinen Namen, auf seiner eigenen Karte. Jeder Kunde erhält bei der Übergabe den Quellcode. Wenn du morgen zu einem anderen Entwickler wechseln wolltest, könntest du — ohne Erlaubnis, ohne Verzögerung, ohne Transfergebühr.",
        },
      },
      {
        type: "h2",
        text: {
          en_us: "Three reasons",
          en_gb: "Three reasons",
          es: "Tres razones",
          fr: "Trois raisons",
          nl: "Drie redenen",
          de: "Drei Gründe",
        },
      },
      {
        type: "p",
        text: {
          en_us: "First, it's the right thing. You paid for a website. You should own a website. Anything less is a rental, and you should know it's a rental before you sign.",
          en_gb: "First, it's the right thing. You paid for a website. You should own a website. Anything less is a rental, and you should know it's a rental before you sign.",
          es: "Primero, es lo correcto. Pagaste por una web. Deberías ser dueño de una web. Cualquier cosa menos que eso es un alquiler, y deberías saber que es un alquiler antes de firmar.",
          fr: "Premièrement, c'est la chose juste. Vous avez payé pour un site web. Vous devriez posséder un site web. Tout le reste est une location, et vous devriez savoir que c'est une location avant de signer.",
          nl: "Ten eerste, het is gewoon eerlijk. Je hebt voor een website betaald. Je hoort een website te bezitten. Alles minder is huur, en dat moet je weten voordat je tekent.",
          de: "Erstens, es ist das Richtige. Du hast für eine Website bezahlt. Du solltest eine Website besitzen. Alles andere ist Miete, und das solltest du wissen, bevor du unterschreibst.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Second, it forces us to be better. We don't get to relax because the recurring fee is locked in. The relationship has to renew on its merits — we have to be worth calling back, not worth being stuck with.",
          en_gb: "Second, it forces us to be better. We don't get to relax because the recurring fee is locked in. The relationship has to renew on its merits — we have to be worth calling back, not worth being stuck with.",
          es: "Segundo, nos obliga a ser mejores. No podemos relajarnos porque tengamos una cuota recurrente atada. La relación tiene que renovarse por sus propios méritos — tenemos que merecer que nos vuelvas a llamar, no merecer que estés atrapado con nosotros.",
          fr: "Deuxièmement, ça nous oblige à être meilleurs. On ne peut pas se relâcher parce que des frais récurrents sont verrouillés. La relation doit se renouveler par mérite — il faut qu'on mérite que vous nous rappeliez, pas que vous soyez coincés avec nous.",
          nl: "Ten tweede, het dwingt ons om beter te zijn. We kunnen niet achteroverleunen omdat een terugkerende fee vaststaat. De relatie moet zich op eigen kracht vernieuwen — we moeten het waard zijn om opnieuw gebeld te worden, niet om aan vast te zitten.",
          de: "Zweitens, es zwingt uns, besser zu sein. Wir können uns nicht zurücklehnen, weil eine wiederkehrende Gebühr fix ist. Die Beziehung muss sich aus eigenem Verdienst erneuern — wir müssen es wert sein, zurückgerufen zu werden, nicht es wert sein, dass man an uns hängt.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "Third, it changes how the site itself gets built. When you know the client is going to take this code somewhere else one day, you write code worth taking. You use clean dependencies. You document things. You don't bury secrets in proprietary tools.",
          en_gb: "Third, it changes how the site itself gets built. When you know the client is going to take this code somewhere else one day, you write code worth taking. You use clean dependencies. You document things. You don't bury secrets in proprietary tools.",
          es: "Tercero, cambia cómo se construye la propia web. Cuando sabes que el cliente se va a llevar este código a otro sitio algún día, escribes código que merezca la pena llevarse. Usas dependencias limpias. Documentas las cosas. No entierras secretos en herramientas propietarias.",
          fr: "Troisièmement, ça change la manière dont le site lui-même est construit. Quand on sait que le client emportera ce code ailleurs un jour, on écrit du code qui vaut la peine d'être emporté. On utilise des dépendances propres. On documente. On n'enterre pas de secrets dans des outils propriétaires.",
          nl: "Ten derde, het verandert hoe de site zelf wordt gebouwd. Als je weet dat de klant deze code op een dag ergens anders mee naartoe neemt, schrijf je code die het waard is om mee te nemen. Je gebruikt schone dependencies. Je documenteert dingen. Je begraaft geen geheimen in proprietary tools.",
          de: "Drittens, es verändert, wie die Seite selbst gebaut wird. Wenn du weißt, dass der Kunde diesen Code eines Tages woanders hinmitnimmt, schreibst du Code, der mitgenommen zu werden verdient. Du verwendest saubere Abhängigkeiten. Du dokumentierst. Du vergräbst keine Geheimnisse in proprietären Werkzeugen.",
        },
      },
      {
        type: "p",
        text: {
          en_us: "The whole industry doesn't have to operate this way. We just think yours should.",
          en_gb: "The whole industry doesn't have to operate this way. We just think yours should.",
          es: "Todo el sector no tiene por qué funcionar así. Solo pensamos que el tuyo debería.",
          fr: "L'industrie entière n'a pas à fonctionner comme ça. Nous pensons simplement que la vôtre devrait.",
          nl: "De hele branche hoeft het niet zo te doen. Wij vinden alleen dat de jouwe het zo zou moeten doen.",
          de: "Die ganze Branche muss nicht so arbeiten. Wir finden nur, deine sollte es.",
        },
      },
    ],
  },
];

export function findPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function localize(field: I18nString, lang: Lang): string {
  return field[lang];
}
