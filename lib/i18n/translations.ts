import type { Lang } from "./lang";

type UI = {
  nav: {
    blogs: string;
    contact: string;
    requestWebsite: string;
  };
  footer: {
    blogs: string;
    privacy: string;
    legal: string;
    cookies: string;
    pagesHeading: string;
    themeHeading: string;
    light: string;
    dark: string;
  };
  hero: {
    pill: string;
    headline: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  bridge: {
    headline: string;
    subhead: string;
    cta: string;
  };
  blogsHome: {
    eyebrow: string;
    headline: string;
    viewAll: string;
  };
  blogsIndex: {
    headline: string;
    subhead: string;
    readPost: string;
  };
  blogsPost: {
    readNext: string;
    allPosts: string;
  };
  finalCta: {
    headline: string;
    subhead: string;
  };
  leadForm: {
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    industry: string;
    industryPlaceholder: string;
    goal: string;
    goalPlaceholder: string;
    consentBefore: string;
    privacyLink: string;
    consentAfter: string;
    submit: string;
    sending: string;
    successHeadline: string;
    successBody: string;
    submitAnother: string;
    networkError: string;
    genericError: string;
  };
  unsubscribe: {
    eyebrow: string;
    headline: string;
    body: string;
    emailLabel: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    submit: string;
    submitting: string;
    successHeadline: string;
    successBody: string;
  };
  legal: {
    lastUpdated: string;
  };
  contact: {
    headline: string;
    subhead: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    plainEmailBefore: string;
    plainEmailAfter: string;
    successHeadline: string;
    successBody: string;
    successAction: string;
  };
};

const en_gb: UI = {
  nav: {
    blogs: "Blogs",
    contact: "Contact",
    requestWebsite: "Request a website",
  },
  footer: {
    blogs: "Blogs",
    privacy: "Privacy",
    legal: "Legal",
    cookies: "Cookies",
    pagesHeading: "Pages",
    themeHeading: "Theme",
    light: "Light",
    dark: "Dark",
  },
  hero: {
    pill: "Available for custom builds",
    headline: "A custom website for your business, built fast.",
    subhead: "No template feel. Clean handover, fully owned by you.",
    ctaPrimary: "Request a website",
    ctaSecondary: "Read the blogs",
  },
  bridge: {
    headline: "Built to last. Owned by you.",
    subhead:
      "No retainer. No lock-in. A clean, fast website you actually own after the build.",
    cta: "Request a website",
  },
  blogsHome: {
    eyebrow: "From the studio",
    headline: "Short reads on websites that work.",
    viewAll: "View all",
  },
  blogsIndex: {
    headline: "Notes from the studio.",
    subhead:
      "Short, opinionated reads on building websites that look serious and work properly. No filler.",
    readPost: "Read post",
  },
  blogsPost: {
    readNext: "Read next",
    allPosts: "All posts",
  },
  finalCta: {
    headline: "Start your build.",
    subhead: "Send a few details. We'll get back to you.",
  },
  leadForm: {
    name: "Name",
    email: "Email",
    phone: "Phone number (optional)",
    company: "Company name",
    website: "Current website (optional)",
    industry: "Industry",
    industryPlaceholder: "e.g. Boutique fitness studio",
    goal: "What do you need the website to achieve?",
    goalPlaceholder:
      "More booked enquiries, replace an outdated site, look credible to new clients…",
    consentBefore: "I agree to be contacted about this request. See our",
    privacyLink: "privacy policy",
    consentAfter: ".",
    submit: "Request a website",
    sending: "Sending…",
    successHeadline: "Thanks. Your request is in.",
    successBody:
      "Harry will review your request and reply by email within one business day, usually much sooner.",
    submitAnother: "Submit another request",
    networkError: "Network error. Please try again in a moment.",
    genericError: "Something went wrong. Please try again.",
  },
  unsubscribe: {
    eyebrow: "Email preferences",
    headline: "Unsubscribe from Plynos outreach.",
    body: "Add your email below to suppress all future outreach. We honour suppression immediately.",
    emailLabel: "Email",
    reasonLabel: "Reason (optional)",
    reasonPlaceholder:
      "Anything that helps us stop bothering people who don't want to hear from us.",
    submit: "Unsubscribe",
    submitting: "Submitting…",
    successHeadline: "You're unsubscribed.",
    successBody:
      "We won't contact this address again. Reply to any past email or write to harry@plynos.dev if you'd like to opt back in.",
  },
  legal: {
    lastUpdated: "Last updated",
  },
  contact: {
    headline: "Get in touch.",
    subhead:
      "Whether you're planning a new site, want to talk about a project, or have something else on your mind. Tell us a little, and we'll come back to you.",
    nameLabel: "Name",
    namePlaceholder: "Jane Operator",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us a bit about what you have in mind.",
    send: "Request a website",
    sending: "Sending…",
    plainEmailBefore: "Prefer plain email?",
    plainEmailAfter: "works too.",
    successHeadline: "Thanks. Message received.",
    successBody:
      "We'll come back to you by email within one business day, usually much sooner.",
    successAction: "Send another message",
  },
};

const en_us: UI = {
  nav: {
    blogs: "Blogs",
    contact: "Contact",
    requestWebsite: "Request a website",
  },
  footer: {
    blogs: "Blogs",
    privacy: "Privacy",
    legal: "Legal",
    cookies: "Cookies",
    pagesHeading: "Pages",
    themeHeading: "Theme",
    light: "Light",
    dark: "Dark",
  },
  hero: {
    pill: "Available for custom builds",
    headline: "A custom website for your business, built fast.",
    subhead: "No template feel. Clean handover, fully owned by you.",
    ctaPrimary: "Request a website",
    ctaSecondary: "Read the blogs",
  },
  bridge: {
    headline: "Built to last. Owned by you.",
    subhead:
      "No retainer. No lock-in. A clean, fast website you actually own after the build.",
    cta: "Request a website",
  },
  blogsHome: {
    eyebrow: "From the studio",
    headline: "Short reads on websites that work.",
    viewAll: "View all",
  },
  blogsIndex: {
    headline: "Notes from the studio.",
    subhead:
      "Short, opinionated reads on building websites that look serious and work properly. No filler.",
    readPost: "Read post",
  },
  blogsPost: {
    readNext: "Read next",
    allPosts: "All posts",
  },
  finalCta: {
    headline: "Start your build.",
    subhead: "Send a few details. We'll get back to you.",
  },
  leadForm: {
    name: "Name",
    email: "Email",
    phone: "Phone number (optional)",
    company: "Company name",
    website: "Current website (optional)",
    industry: "Industry",
    industryPlaceholder: "e.g. Boutique fitness studio",
    goal: "What do you need the website to achieve?",
    goalPlaceholder:
      "More booked inquiries, replace an outdated site, look credible to new clients…",
    consentBefore: "I agree to be contacted about this request. See our",
    privacyLink: "privacy policy",
    consentAfter: ".",
    submit: "Request a website",
    sending: "Sending…",
    successHeadline: "Thanks. Your request is in.",
    successBody:
      "Harry will review your request and reply by email within one business day, usually much sooner.",
    submitAnother: "Submit another request",
    networkError: "Network error. Please try again in a moment.",
    genericError: "Something went wrong. Please try again.",
  },
  unsubscribe: {
    eyebrow: "Email preferences",
    headline: "Unsubscribe from Plynos outreach.",
    body: "Add your email below to suppress all future outreach. We honor suppression immediately.",
    emailLabel: "Email",
    reasonLabel: "Reason (optional)",
    reasonPlaceholder:
      "Anything that helps us stop bothering people who don't want to hear from us.",
    submit: "Unsubscribe",
    submitting: "Submitting…",
    successHeadline: "You're unsubscribed.",
    successBody:
      "We won't contact this address again. Reply to any past email or write to harry@plynos.dev if you'd like to opt back in.",
  },
  legal: {
    lastUpdated: "Last updated",
  },
  contact: {
    headline: "Get in touch.",
    subhead:
      "Whether you're planning a new site, want to talk about a project, or have something else on your mind. Tell us a little, and we'll come back to you.",
    nameLabel: "Name",
    namePlaceholder: "Jane Operator",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us a bit about what you have in mind.",
    send: "Request a website",
    sending: "Sending…",
    plainEmailBefore: "Prefer plain email?",
    plainEmailAfter: "works too.",
    successHeadline: "Thanks. Message received.",
    successBody:
      "We'll come back to you by email within one business day, usually much sooner.",
    successAction: "Send another message",
  },
};

const es: UI = {
  nav: {
    blogs: "Blog",
    contact: "Contacto",
    requestWebsite: "Solicitar una web",
  },
  footer: {
    blogs: "Blog",
    privacy: "Privacidad",
    legal: "Aviso legal",
    cookies: "Cookies",
    pagesHeading: "Páginas",
    themeHeading: "Tema",
    light: "Claro",
    dark: "Oscuro",
  },
  hero: {
    pill: "Disponible para nuevos proyectos",
    headline: "Una web a medida para tu negocio, lista en tiempo récord.",
    subhead: "Sin plantillas. Entrega limpia, totalmente tuya.",
    ctaPrimary: "Solicitar una web",
    ctaSecondary: "Leer los artículos",
  },
  bridge: {
    headline: "Pensada para durar. Tuya desde el día uno.",
    subhead:
      "Sin cuotas mensuales. Sin ataduras. Una web rápida y limpia que es realmente tuya tras la entrega.",
    cta: "Solicitar una web",
  },
  blogsHome: {
    eyebrow: "Desde el estudio",
    headline: "Lecturas breves sobre webs que funcionan.",
    viewAll: "Ver todos",
  },
  blogsIndex: {
    headline: "Notas del estudio.",
    subhead:
      "Lecturas breves y directas sobre cómo construir webs serias y que funcionan. Sin paja.",
    readPost: "Leer artículo",
  },
  blogsPost: {
    readNext: "Leer siguiente",
    allPosts: "Todos los artículos",
  },
  finalCta: {
    headline: "Empieza tu proyecto.",
    subhead: "Cuéntanos lo esencial. Te responderemos pronto.",
  },
  leadForm: {
    name: "Nombre",
    email: "Email",
    phone: "Teléfono (opcional)",
    company: "Empresa",
    website: "Web actual (opcional)",
    industry: "Sector",
    industryPlaceholder: "p. ej. Estudio de fitness boutique",
    goal: "¿Qué necesitas que consiga la web?",
    goalPlaceholder:
      "Más solicitudes de presupuesto, reemplazar una web desactualizada, parecer creíble ante nuevos clientes…",
    consentBefore: "Acepto ser contactado sobre esta solicitud. Consulta nuestra",
    privacyLink: "política de privacidad",
    consentAfter: ".",
    submit: "Solicitar una web",
    sending: "Enviando…",
    successHeadline: "Gracias. Tu solicitud está en camino.",
    successBody:
      "Harry revisará tu solicitud y responderá por email en menos de un día laborable, normalmente mucho antes.",
    submitAnother: "Enviar otra solicitud",
    networkError: "Error de red. Inténtalo de nuevo en un momento.",
    genericError: "Algo ha fallado. Inténtalo de nuevo.",
  },
  unsubscribe: {
    eyebrow: "Preferencias de email",
    headline: "Date de baja del contacto de Plynos.",
    body: "Añade tu email a continuación para suprimir todo contacto futuro. Aplicamos las bajas de inmediato.",
    emailLabel: "Email",
    reasonLabel: "Motivo (opcional)",
    reasonPlaceholder:
      "Cualquier cosa que nos ayude a no molestar a quienes no quieran saber de nosotros.",
    submit: "Darme de baja",
    submitting: "Enviando…",
    successHeadline: "Estás dado de baja.",
    successBody:
      "No volveremos a contactar con esta dirección. Responde a cualquier email anterior o escribe a harry@plynos.dev si quieres volver a recibirnos.",
  },
  legal: {
    lastUpdated: "Última actualización",
  },
  contact: {
    headline: "Hablemos.",
    subhead:
      "Tanto si estás planeando una web nueva, quieres comentar un proyecto, o tienes cualquier otra cosa en mente. Cuéntanos un poco y te respondemos.",
    nameLabel: "Nombre",
    namePlaceholder: "Jane Operator",
    emailLabel: "Email",
    emailPlaceholder: "tu@empresa.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos un poco sobre lo que tienes en mente.",
    send: "Solicitar una web",
    sending: "Enviando…",
    plainEmailBefore: "¿Prefieres email directo?",
    plainEmailAfter: "también vale.",
    successHeadline: "Gracias. Mensaje recibido.",
    successBody:
      "Te responderemos por email en menos de un día laborable, normalmente mucho antes.",
    successAction: "Enviar otro mensaje",
  },
};

const fr: UI = {
  nav: {
    blogs: "Articles",
    contact: "Contact",
    requestWebsite: "Demander un site",
  },
  footer: {
    blogs: "Articles",
    privacy: "Confidentialité",
    legal: "Mentions légales",
    cookies: "Cookies",
    pagesHeading: "Pages",
    themeHeading: "Thème",
    light: "Clair",
    dark: "Sombre",
  },
  hero: {
    pill: "Disponible pour de nouveaux projets",
    headline: "Un site sur mesure pour votre entreprise, livré rapidement.",
    subhead: "Aucun rendu template. Livraison propre, entièrement à vous.",
    ctaPrimary: "Demander un site",
    ctaSecondary: "Lire les articles",
  },
  bridge: {
    headline: "Conçu pour durer. À vous, dès le départ.",
    subhead:
      "Pas d'abonnement. Pas d'engagement. Un site rapide et propre qui vous appartient vraiment après la livraison.",
    cta: "Demander un site",
  },
  blogsHome: {
    eyebrow: "Depuis le studio",
    headline: "Lectures brèves sur les sites qui fonctionnent.",
    viewAll: "Tout voir",
  },
  blogsIndex: {
    headline: "Notes du studio.",
    subhead:
      "Articles courts et directs sur la création de sites sérieux et performants. Sans superflu.",
    readPost: "Lire l'article",
  },
  blogsPost: {
    readNext: "Lire la suite",
    allPosts: "Tous les articles",
  },
  finalCta: {
    headline: "Démarrer le projet.",
    subhead: "Quelques détails suffisent. Nous reviendrons vers vous.",
  },
  leadForm: {
    name: "Nom",
    email: "Email",
    phone: "Téléphone (facultatif)",
    company: "Entreprise",
    website: "Site actuel (facultatif)",
    industry: "Secteur",
    industryPlaceholder: "p. ex. Studio de fitness haut de gamme",
    goal: "Que doit accomplir le site ?",
    goalPlaceholder:
      "Plus de demandes de devis, remplacer un site dépassé, paraître crédible auprès de nouveaux clients…",
    consentBefore: "J'accepte d'être contacté au sujet de cette demande. Consultez notre",
    privacyLink: "politique de confidentialité",
    consentAfter: ".",
    submit: "Demander un site",
    sending: "Envoi…",
    successHeadline: "Merci. Votre demande est bien reçue.",
    successBody:
      "Harry examinera votre demande et répondra par email dans la journée ouvrable, le plus souvent bien plus tôt.",
    submitAnother: "Envoyer une autre demande",
    networkError: "Erreur réseau. Veuillez réessayer dans un instant.",
    genericError: "Une erreur est survenue. Veuillez réessayer.",
  },
  unsubscribe: {
    eyebrow: "Préférences email",
    headline: "Se désabonner des emails de Plynos.",
    body: "Indiquez votre email ci-dessous pour bloquer tout contact futur. Nous appliquons les désabonnements immédiatement.",
    emailLabel: "Email",
    reasonLabel: "Motif (facultatif)",
    reasonPlaceholder:
      "Tout ce qui nous aide à ne plus déranger les personnes qui ne veulent plus de nous.",
    submit: "Me désabonner",
    submitting: "Envoi…",
    successHeadline: "Vous êtes désabonné.",
    successBody:
      "Nous ne contacterons plus cette adresse. Répondez à un email précédent ou écrivez à harry@plynos.dev pour vous réabonner.",
  },
  legal: {
    lastUpdated: "Dernière mise à jour",
  },
  contact: {
    headline: "Parlons-en.",
    subhead:
      "Que vous prépariez un nouveau site, vouliez discuter d'un projet ou ayez autre chose en tête. Donnez-nous quelques détails, et nous reviendrons vers vous.",
    nameLabel: "Nom",
    namePlaceholder: "Jane Operator",
    emailLabel: "Email",
    emailPlaceholder: "vous@entreprise.com",
    messageLabel: "Message",
    messagePlaceholder: "Dites-nous un peu ce que vous avez en tête.",
    send: "Demander un site",
    sending: "Envoi…",
    plainEmailBefore: "Vous préférez l'email simple ?",
    plainEmailAfter: "fonctionne aussi.",
    successHeadline: "Merci. Message reçu.",
    successBody:
      "Nous vous répondrons par email dans la journée ouvrable, le plus souvent bien plus tôt.",
    successAction: "Envoyer un autre message",
  },
};

const nl: UI = {
  nav: {
    blogs: "Blogs",
    contact: "Contact",
    requestWebsite: "Website aanvragen",
  },
  footer: {
    blogs: "Blogs",
    privacy: "Privacy",
    legal: "Juridisch",
    cookies: "Cookies",
    pagesHeading: "Pagina's",
    themeHeading: "Thema",
    light: "Licht",
    dark: "Donker",
  },
  hero: {
    pill: "Beschikbaar voor nieuwe projecten",
    headline: "Een maatwerkwebsite voor je bedrijf, snel opgeleverd.",
    subhead: "Geen templategevoel. Schone overdracht, volledig van jou.",
    ctaPrimary: "Website aanvragen",
    ctaSecondary: "Lees de blogs",
  },
  bridge: {
    headline: "Gebouwd om te blijven. Volledig van jou.",
    subhead:
      "Geen abonnement. Geen lock-in. Een snelle, schone website die echt van jou is na de oplevering.",
    cta: "Website aanvragen",
  },
  blogsHome: {
    eyebrow: "Vanuit de studio",
    headline: "Korte stukken over websites die werken.",
    viewAll: "Bekijk alles",
  },
  blogsIndex: {
    headline: "Notities uit de studio.",
    subhead:
      "Korte, scherpe stukken over het bouwen van serieuze websites die echt werken. Zonder vulling.",
    readPost: "Lees artikel",
  },
  blogsPost: {
    readNext: "Volgende lezen",
    allPosts: "Alle artikelen",
  },
  finalCta: {
    headline: "Start je project.",
    subhead: "Stuur een paar details. Wij nemen contact op.",
  },
  leadForm: {
    name: "Naam",
    email: "Email",
    phone: "Telefoonnummer (optioneel)",
    company: "Bedrijfsnaam",
    website: "Huidige website (optioneel)",
    industry: "Branche",
    industryPlaceholder: "bijv. Boutique fitnessstudio",
    goal: "Wat moet de website bereiken?",
    goalPlaceholder:
      "Meer aanvragen, een verouderde site vervangen, geloofwaardiger overkomen bij nieuwe klanten…",
    consentBefore: "Ik ga ermee akkoord dat er over deze aanvraag contact met mij wordt opgenomen. Zie ons",
    privacyLink: "privacybeleid",
    consentAfter: ".",
    submit: "Website aanvragen",
    sending: "Versturen…",
    successHeadline: "Bedankt. Je aanvraag is binnen.",
    successBody:
      "Harry bekijkt je aanvraag en reageert binnen één werkdag per email, meestal veel sneller.",
    submitAnother: "Nog een aanvraag indienen",
    networkError: "Netwerkfout. Probeer het zo opnieuw.",
    genericError: "Er ging iets mis. Probeer het opnieuw.",
  },
  unsubscribe: {
    eyebrow: "E-mailvoorkeuren",
    headline: "Uitschrijven uit Plynos contact.",
    body: "Vul hieronder je email in om alle toekomstige berichten te blokkeren. Uitschrijvingen worden direct verwerkt.",
    emailLabel: "Email",
    reasonLabel: "Reden (optioneel)",
    reasonPlaceholder:
      "Alles wat ons helpt om mensen die niets willen horen niet meer lastig te vallen.",
    submit: "Uitschrijven",
    submitting: "Versturen…",
    successHeadline: "Je bent uitgeschreven.",
    successBody:
      "We nemen geen contact meer op met dit adres. Reageer op een eerdere email of schrijf naar harry@plynos.dev om je weer aan te melden.",
  },
  legal: {
    lastUpdated: "Laatst bijgewerkt",
  },
  contact: {
    headline: "Neem contact op.",
    subhead:
      "Of je nu een nieuwe site plant, een project wilt bespreken of iets anders in gedachten hebt. Vertel ons iets, en we komen bij je terug.",
    nameLabel: "Naam",
    namePlaceholder: "Jane Operator",
    emailLabel: "Email",
    emailPlaceholder: "jij@bedrijf.com",
    messageLabel: "Bericht",
    messagePlaceholder: "Vertel ons een beetje wat je in gedachten hebt.",
    send: "Website aanvragen",
    sending: "Versturen…",
    plainEmailBefore: "Liever gewoon email?",
    plainEmailAfter: "werkt ook.",
    successHeadline: "Bedankt. Bericht ontvangen.",
    successBody:
      "We komen binnen één werkdag per email bij je terug, meestal veel sneller.",
    successAction: "Stuur nog een bericht",
  },
};

const de: UI = {
  nav: {
    blogs: "Blog",
    contact: "Kontakt",
    requestWebsite: "Website anfragen",
  },
  footer: {
    blogs: "Blog",
    privacy: "Datenschutz",
    legal: "Impressum",
    cookies: "Cookies",
    pagesHeading: "Seiten",
    themeHeading: "Design",
    light: "Hell",
    dark: "Dunkel",
  },
  hero: {
    pill: "Verfügbar für neue Projekte",
    headline: "Eine maßgeschneiderte Website für Ihr Unternehmen, schnell gebaut.",
    subhead: "Kein Template-Gefühl. Saubere Übergabe, vollständig in Ihrem Besitz.",
    ctaPrimary: "Website anfragen",
    ctaSecondary: "Zum Blog",
  },
  bridge: {
    headline: "Gebaut, um zu bleiben. Ihnen gehört es.",
    subhead:
      "Keine Abogebühr. Keine Bindung. Eine schnelle, saubere Website, die nach der Übergabe wirklich Ihnen gehört.",
    cta: "Website anfragen",
  },
  blogsHome: {
    eyebrow: "Aus dem Studio",
    headline: "Kurze Beiträge zu Websites, die funktionieren.",
    viewAll: "Alle ansehen",
  },
  blogsIndex: {
    headline: "Notizen aus dem Studio.",
    subhead:
      "Kurze, klare Beiträge zum Bau seriöser, funktionierender Websites. Ohne Füllmaterial.",
    readPost: "Beitrag lesen",
  },
  blogsPost: {
    readNext: "Weiterlesen",
    allPosts: "Alle Beiträge",
  },
  finalCta: {
    headline: "Projekt starten.",
    subhead: "Schicken Sie ein paar Eckdaten. Wir melden uns.",
  },
  leadForm: {
    name: "Name",
    email: "E-Mail",
    phone: "Telefon (optional)",
    company: "Firma",
    website: "Aktuelle Website (optional)",
    industry: "Branche",
    industryPlaceholder: "z. B. Boutique-Fitnessstudio",
    goal: "Was soll die Website erreichen?",
    goalPlaceholder:
      "Mehr Anfragen, eine veraltete Seite ersetzen, vor neuen Kunden seriös wirken…",
    consentBefore: "Ich willige ein, zu dieser Anfrage kontaktiert zu werden. Siehe unsere",
    privacyLink: "Datenschutzerklärung",
    consentAfter: ".",
    submit: "Website anfragen",
    sending: "Wird gesendet…",
    successHeadline: "Danke. Ihre Anfrage ist da.",
    successBody:
      "Harry prüft Ihre Anfrage und antwortet per E-Mail innerhalb eines Werktags, in der Regel deutlich schneller.",
    submitAnother: "Weitere Anfrage senden",
    networkError: "Netzwerkfehler. Bitte versuchen Sie es gleich erneut.",
    genericError: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
  },
  unsubscribe: {
    eyebrow: "E-Mail-Einstellungen",
    headline: "Vom Plynos-Kontakt abmelden.",
    body: "Tragen Sie unten Ihre E-Mail ein, um künftige Kontakte zu unterbinden. Abmeldungen werden sofort umgesetzt.",
    emailLabel: "E-Mail",
    reasonLabel: "Grund (optional)",
    reasonPlaceholder:
      "Alles, was uns hilft, niemanden zu kontaktieren, der nichts hören möchte.",
    submit: "Abmelden",
    submitting: "Wird gesendet…",
    successHeadline: "Sie sind abgemeldet.",
    successBody:
      "Wir kontaktieren diese Adresse nicht mehr. Antworten Sie auf eine frühere E-Mail oder schreiben Sie an harry@plynos.dev, um sich wieder anzumelden.",
  },
  legal: {
    lastUpdated: "Zuletzt aktualisiert",
  },
  contact: {
    headline: "Sprechen wir.",
    subhead:
      "Ob Sie eine neue Website planen, ein Projekt besprechen möchten oder etwas anderes im Kopf haben. Schreiben Sie kurz, wir melden uns.",
    nameLabel: "Name",
    namePlaceholder: "Jane Operator",
    emailLabel: "E-Mail",
    emailPlaceholder: "sie@firma.com",
    messageLabel: "Nachricht",
    messagePlaceholder: "Erzählen Sie kurz, was Sie im Sinn haben.",
    send: "Website anfragen",
    sending: "Wird gesendet…",
    plainEmailBefore: "Lieber per einfacher E-Mail?",
    plainEmailAfter: "geht auch.",
    successHeadline: "Danke. Nachricht erhalten.",
    successBody:
      "Wir antworten per E-Mail innerhalb eines Werktags, in der Regel deutlich schneller.",
    successAction: "Weitere Nachricht senden",
  },
};

export const dict: Record<Lang, UI> = { en_us, en_gb, es, fr, nl, de };

export function t(lang: Lang): UI {
  return dict[lang];
}
