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

const en: UI = {
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

export const dict: Record<Lang, UI> = { en, es };

export function t(lang: Lang): UI {
  return dict[lang];
}
