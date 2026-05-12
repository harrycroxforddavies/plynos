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
  presentation: {
    pill: string;
    headline: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    whyEyebrow: string;
    whyHeadline: string;
    why: { title: string; body: string }[];
    howEyebrow: string;
    howHeadline: string;
    how: { step: string; title: string; body: string }[];
    investmentEyebrow: string;
    investmentPrice: string;
    investmentSuffix: string;
    investmentHeadline: string;
    investmentBody: string;
    investmentTerms: string;
    investmentCta: string;
    closingHeadline: string;
    closingBody: string;
    closingCta: string;
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
    headline: "A custom website for your business, built in 2 days.",
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
  presentation: {
    pill: "For trades and small operators",
    headline: "A website built for the work you do.",
    subhead:
      "Plumbers, sparks, builders, fitters, gardeners. A clean site that puts your number in front of the next job.",
    ctaPrimary: "Get in touch",
    ctaSecondary: "See how we work",
    whyEyebrow: "Why a website pays off",
    whyHeadline: "It earns its keep on day one.",
    why: [
      {
        title: "Found when they search",
        body: "Someone Googles your trade and your town. Your number comes up. No hunting for a Facebook page that hasn't been touched in two years.",
      },
      {
        title: "Looks like a proper business",
        body: "Tidy van, tidy work, tidy site. Customers decide in seconds whether to call you or the next name on the list.",
      },
      {
        title: "One tap to call you",
        body: "Phone, WhatsApp, route to the job. Big buttons on the phone, where they're already standing.",
      },
    ],
    howEyebrow: "How we work",
    howHeadline: "Four steps from brief to live.",
    how: [
      {
        step: "01",
        title: "Brief",
        body: "A short call. What you do, who you do it for, what makes you the one to call.",
      },
      {
        step: "02",
        title: "Build",
        body: "First draft within a few days. Mobile-first, written in plain language, every page nudges towards the call.",
      },
      {
        step: "03",
        title: "Tweak",
        body: "One round of changes. Get the words right, swap a photo, move a button. Sign-off when you're happy.",
      },
      {
        step: "04",
        title: "Live",
        body: "Domain sorted, site online, fully owned by you. No retainer, no lock-in.",
      },
    ],
    investmentEyebrow: "Investment",
    investmentPrice: "From €300",
    investmentSuffix: "+ VAT",
    investmentHeadline: "One page. One price. Yours when it ships.",
    investmentBody:
      "A single landing page, designed and built around the work you do and the call you want. Hosting and domain handled, fully owned by you.",
    investmentTerms: "Half to start. Half on launch.",
    investmentCta: "Start your build",
    closingHeadline: "Ready to be the one they call?",
    closingBody:
      "Send a few details. We'll come back to you the same day, usually within an hour or two.",
    closingCta: "Get in touch",
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
    headline: "A custom website for your business, built in 2 days.",
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
  presentation: {
    pill: "For trades and small operators",
    headline: "A website built for the work you do.",
    subhead:
      "Plumbers, electricians, builders, fitters, landscapers. A clean site that puts your number in front of the next job.",
    ctaPrimary: "Get in touch",
    ctaSecondary: "See how we work",
    whyEyebrow: "Why a website pays off",
    whyHeadline: "It earns its keep on day one.",
    why: [
      {
        title: "Found when they search",
        body: "Someone Googles your trade and your town. Your number comes up. No hunting for a Facebook page that hasn't been touched in two years.",
      },
      {
        title: "Looks like a real business",
        body: "Tidy truck, tidy work, tidy site. Customers decide in seconds whether to call you or the next name on the list.",
      },
      {
        title: "One tap to call you",
        body: "Phone, text, directions to the job. Big buttons on the phone, where they're already standing.",
      },
    ],
    howEyebrow: "How we work",
    howHeadline: "Four steps from brief to live.",
    how: [
      {
        step: "01",
        title: "Brief",
        body: "A short call. What you do, who you do it for, what makes you the one to call.",
      },
      {
        step: "02",
        title: "Build",
        body: "First draft within a few days. Mobile-first, written in plain language, every page nudges towards the call.",
      },
      {
        step: "03",
        title: "Tweak",
        body: "One round of changes. Get the words right, swap a photo, move a button. Sign-off when you're happy.",
      },
      {
        step: "04",
        title: "Live",
        body: "Domain sorted, site online, fully owned by you. No retainer, no lock-in.",
      },
    ],
    investmentEyebrow: "Investment",
    investmentPrice: "From €300",
    investmentSuffix: "+ VAT",
    investmentHeadline: "One page. One price. Yours when it ships.",
    investmentBody:
      "A single landing page, designed and built around the work you do and the call you want. Hosting and domain handled, fully owned by you.",
    investmentTerms: "Half to start. Half on launch.",
    investmentCta: "Start your build",
    closingHeadline: "Ready to be the one they call?",
    closingBody:
      "Send a few details. We'll come back to you the same day, usually within an hour or two.",
    closingCta: "Get in touch",
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
    headline: "Una web a medida para tu negocio, lista en 2 días.",
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
  presentation: {
    pill: "Para oficios y pequeños negocios",
    headline: "Una web hecha para el trabajo que haces.",
    subhead:
      "Fontaneros, electricistas, albañiles, instaladores, jardineros. Una web limpia que pone tu número delante del próximo cliente.",
    ctaPrimary: "Hablemos",
    ctaSecondary: "Cómo trabajamos",
    whyEyebrow: "Por qué una web vale la pena",
    whyHeadline: "Se paga sola desde el primer día.",
    why: [
      {
        title: "Te encuentran al buscar",
        body: "Alguien busca tu oficio y tu zona en Google. Aparece tu número. Sin rebuscar en una página de Facebook que nadie ha tocado en dos años.",
      },
      {
        title: "Pareces un negocio serio",
        body: "Furgoneta cuidada, trabajo cuidado, web cuidada. El cliente decide en segundos si te llama a ti o al siguiente de la lista.",
      },
      {
        title: "Un toque para llamarte",
        body: "Teléfono, WhatsApp, ruta al trabajo. Botones grandes en el móvil, justo donde están de pie.",
      },
    ],
    howEyebrow: "Cómo trabajamos",
    howHeadline: "Cuatro pasos del briefing al lanzamiento.",
    how: [
      {
        step: "01",
        title: "Briefing",
        body: "Una llamada corta. Qué haces, para quién, y qué te hace el primero al que llamar.",
      },
      {
        step: "02",
        title: "Construcción",
        body: "Primer borrador en pocos días. Pensado para móvil, escrito en lenguaje claro, cada página empuja hacia la llamada.",
      },
      {
        step: "03",
        title: "Ajustes",
        body: "Una ronda de cambios. Afinar las palabras, cambiar una foto, mover un botón. Validación cuando te encaje.",
      },
      {
        step: "04",
        title: "En vivo",
        body: "Dominio resuelto, web en línea, totalmente tuya. Sin cuotas. Sin ataduras.",
      },
    ],
    investmentEyebrow: "Inversión",
    investmentPrice: "Desde 300€",
    investmentSuffix: "+ IVA",
    investmentHeadline: "Una página. Un precio. Tuya en cuanto sale.",
    investmentBody:
      "Una landing page, diseñada y construida en torno al trabajo que haces y la llamada que quieres. Hosting y dominio gestionados, totalmente tuya.",
    investmentTerms: "Mitad para empezar. Mitad al lanzar.",
    investmentCta: "Empezar tu proyecto",
    closingHeadline: "¿Listo para ser el primero al que llamen?",
    closingBody:
      "Envíanos unos pocos datos. Te respondemos el mismo día, normalmente en una o dos horas.",
    closingCta: "Hablemos",
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
    headline: "Un site sur mesure pour votre entreprise, livré en 2 jours.",
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
  presentation: {
    pill: "Pour les artisans et petits exploitants",
    headline: "Un site pensé pour votre métier.",
    subhead:
      "Plombiers, électriciens, maçons, installateurs, paysagistes. Un site propre qui met votre numéro devant le prochain client.",
    ctaPrimary: "Nous contacter",
    ctaSecondary: "Notre méthode",
    whyEyebrow: "Pourquoi un site",
    whyHeadline: "Il est rentable dès le premier jour.",
    why: [
      {
        title: "Visible quand on vous cherche",
        body: "On tape votre métier et votre ville sur Google. Votre numéro sort. Plus besoin de fouiller une page Facebook abandonnée depuis deux ans.",
      },
      {
        title: "L'allure d'une vraie entreprise",
        body: "Camionnette propre, travail propre, site propre. Le client choisit en quelques secondes entre vous et le suivant sur la liste.",
      },
      {
        title: "Un toucher pour vous joindre",
        body: "Téléphone, WhatsApp, itinéraire jusqu'au chantier. De gros boutons sur le mobile, là où il est déjà.",
      },
    ],
    howEyebrow: "Comment on travaille",
    howHeadline: "Quatre étapes du brief à la mise en ligne.",
    how: [
      {
        step: "01",
        title: "Brief",
        body: "Un court appel. Ce que vous faites, pour qui, et ce qui fait qu'on vous appelle vous.",
      },
      {
        step: "02",
        title: "Conception",
        body: "Première maquette en quelques jours. Mobile-first, langage simple, chaque page pousse à l'appel.",
      },
      {
        step: "03",
        title: "Ajustements",
        body: "Une série de retours. On affine les mots, on change une photo, on déplace un bouton. Validation quand ça vous va.",
      },
      {
        step: "04",
        title: "En ligne",
        body: "Domaine réglé, site en ligne, entièrement à vous. Sans abonnement. Sans engagement.",
      },
    ],
    investmentEyebrow: "Investissement",
    investmentPrice: "À partir de 300€",
    investmentSuffix: "+ TVA",
    investmentHeadline: "Une page. Un prix. À vous dès la mise en ligne.",
    investmentBody:
      "Une page d'accueil, conçue autour du travail que vous faites et de l'appel que vous visez. Hébergement et domaine gérés, entièrement à vous.",
    investmentTerms: "Moitié pour démarrer. Moitié au lancement.",
    investmentCta: "Démarrer le projet",
    closingHeadline: "Prêt à être celui qu'on appelle ?",
    closingBody:
      "Envoyez quelques détails. Nous revenons vers vous dans la journée, le plus souvent en une heure ou deux.",
    closingCta: "Nous contacter",
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
    headline: "Een maatwerkwebsite voor je bedrijf, in 2 dagen opgeleverd.",
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
  presentation: {
    pill: "Voor vakmensen en kleine ondernemers",
    headline: "Een website gebouwd voor het werk dat je doet.",
    subhead:
      "Loodgieters, elektriciens, bouwers, installateurs, hoveniers. Een schone site die jouw nummer voor de volgende klus zet.",
    ctaPrimary: "Neem contact op",
    ctaSecondary: "Zo werken we",
    whyEyebrow: "Waarom een website loont",
    whyHeadline: "Vanaf dag één betaalt het zich terug.",
    why: [
      {
        title: "Te vinden als ze zoeken",
        body: "Iemand zoekt je vak en je plaats op Google. Jouw nummer komt boven. Geen gedoe met een Facebook-pagina die twee jaar stil ligt.",
      },
      {
        title: "Oogt als een echte zaak",
        body: "Schone bus, schoon werk, schone site. De klant kiest in seconden tussen jou en de volgende op de lijst.",
      },
      {
        title: "Eén tik om te bellen",
        body: "Telefoon, WhatsApp, route naar de klus. Grote knoppen op de telefoon, precies waar de klant al staat.",
      },
    ],
    howEyebrow: "Zo werken we",
    howHeadline: "Vier stappen van briefing tot live.",
    how: [
      {
        step: "01",
        title: "Briefing",
        body: "Een kort gesprek. Wat je doet, voor wie, en wat jou de eerste keuze maakt.",
      },
      {
        step: "02",
        title: "Bouwen",
        body: "Eerste opzet binnen een paar dagen. Mobiel-eerst, in gewone taal, elke pagina stuurt naar het gesprek.",
      },
      {
        step: "03",
        title: "Bijschaven",
        body: "Eén ronde aanpassingen. Woorden bijslijpen, foto wisselen, knop verplaatsen. Akkoord als jij tevreden bent.",
      },
      {
        step: "04",
        title: "Live",
        body: "Domein geregeld, site online, volledig van jou. Geen abonnement. Geen lock-in.",
      },
    ],
    investmentEyebrow: "Investering",
    investmentPrice: "Vanaf €300",
    investmentSuffix: "+ btw",
    investmentHeadline: "Eén pagina. Eén prijs. Van jou zodra hij live staat.",
    investmentBody:
      "Eén landingspagina, ontworpen rond het werk dat je doet en het gesprek dat je wilt. Hosting en domein geregeld, volledig van jou.",
    investmentTerms: "De helft om te starten. De helft bij oplevering.",
    investmentCta: "Start je project",
    closingHeadline: "Klaar om degene te zijn die ze bellen?",
    closingBody:
      "Stuur een paar details. We komen dezelfde dag bij je terug, meestal binnen één of twee uur.",
    closingCta: "Neem contact op",
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
    headline: "Eine maßgeschneiderte Website für Ihr Unternehmen, in 2 Tagen gebaut.",
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
  presentation: {
    pill: "Für Handwerk und kleine Betriebe",
    headline: "Eine Website, gebaut für Ihre Arbeit.",
    subhead:
      "Installateure, Elektriker, Bauleute, Monteure, Gärtner. Eine saubere Seite, die Ihre Nummer vor den nächsten Auftrag stellt.",
    ctaPrimary: "Kontakt aufnehmen",
    ctaSecondary: "So arbeiten wir",
    whyEyebrow: "Warum sich eine Website lohnt",
    whyHeadline: "Sie zahlt sich vom ersten Tag an aus.",
    why: [
      {
        title: "Gefunden, wenn man sucht",
        body: "Jemand googelt Ihr Gewerk und Ihren Ort. Ihre Nummer kommt oben. Kein Suchen nach einer Facebook-Seite, die seit zwei Jahren niemand angefasst hat.",
      },
      {
        title: "Wirkt wie ein echter Betrieb",
        body: "Sauberer Wagen, saubere Arbeit, saubere Seite. Der Kunde entscheidet in Sekunden zwischen Ihnen und dem Nächsten auf der Liste.",
      },
      {
        title: "Ein Tipp, und Sie sind dran",
        body: "Telefon, WhatsApp, Route zur Baustelle. Große Knöpfe auf dem Handy, dort wo der Kunde gerade steht.",
      },
    ],
    howEyebrow: "So arbeiten wir",
    howHeadline: "Vier Schritte vom Briefing bis live.",
    how: [
      {
        step: "01",
        title: "Briefing",
        body: "Ein kurzer Anruf. Was Sie tun, für wen, und warum man Sie ruft.",
      },
      {
        step: "02",
        title: "Bauen",
        body: "Erster Entwurf in wenigen Tagen. Mobile-first, klare Sprache, jede Seite führt zum Anruf.",
      },
      {
        step: "03",
        title: "Feinschliff",
        body: "Eine Runde Änderungen. Worte schärfen, Foto tauschen, Button verschieben. Freigabe, wenn es passt.",
      },
      {
        step: "04",
        title: "Live",
        body: "Domain geklärt, Seite online, vollständig in Ihrem Besitz. Keine Abogebühr. Keine Bindung.",
      },
    ],
    investmentEyebrow: "Investition",
    investmentPrice: "Ab 300€",
    investmentSuffix: "+ MwSt.",
    investmentHeadline: "Eine Seite. Ein Preis. Ihnen, sobald sie live ist.",
    investmentBody:
      "Eine Landingpage, gestaltet und gebaut rund um Ihre Arbeit und den Anruf, den Sie wollen. Hosting und Domain übernommen, vollständig Ihre.",
    investmentTerms: "Hälfte zum Start. Hälfte zum Launch.",
    investmentCta: "Projekt starten",
    closingHeadline: "Bereit, der zu sein, den man anruft?",
    closingBody:
      "Schicken Sie ein paar Eckdaten. Wir melden uns am selben Tag, meist innerhalb von ein, zwei Stunden.",
    closingCta: "Kontakt aufnehmen",
  },
};

export const dict: Record<Lang, UI> = { en_us, en_gb, es, fr, nl, de };

export function t(lang: Lang): UI {
  return dict[lang];
}
