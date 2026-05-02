import type { Lang } from "./i18n/lang";

export type I18nString = { en: string; es: string };

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
    tag: { en: "Lessons", es: "Lecciones" },
    title: {
      en: "What Stripe, Linear and Apple taught us about websites",
      es: "Lo que Stripe, Linear y Apple nos enseñaron sobre webs",
    },
    excerpt: {
      en: 'Most "best website" lists are useless. Here are three brands worth actually studying — and the one thing each one does that you can steal.',
      es: 'La mayoría de listas de "mejores webs" son inútiles. Aquí tienes tres marcas que vale la pena estudiar — y la única cosa que cada una hace que puedes copiar.',
    },
    read: { en: "5 min read", es: "5 min de lectura" },
    body: [
      {
        type: "p",
        text: {
          en: 'Most "best website" lists are useless. They list whatever has been viral on Twitter recently. Here are three companies whose websites are worth studying properly — and the one specific thing each one does that you can steal.',
          es: 'La mayoría de listas de "mejores webs" son inútiles. Listan lo que sea que haya sido viral en Twitter recientemente. Aquí tienes tres empresas cuyas webs vale la pena estudiar con calma — y la única cosa concreta que cada una hace que puedes copiar.',
        },
      },
      { type: "h2", text: { en: "Stripe: density without clutter", es: "Stripe: densidad sin desorden" } },
      {
        type: "p",
        text: {
          en: "Stripe's homepage is doing more work than it looks like it is. There's a hero, a developer pitch, a customer-logo marquee, a product map — six or seven distinct sections — and yet nothing feels crowded.",
          es: "La página principal de Stripe hace más trabajo del que parece. Hay un hero, un pitch para desarrolladores, un carrusel de logos de clientes, un mapa de productos — seis o siete secciones distintas — y aun así nada se siente abarrotado.",
        },
      },
      {
        type: "p",
        text: {
          en: "The trick is rhythm. Stripe never lets two adjacent sections share a layout. A wide visual is followed by a tight type block. A dark section is followed by white. A code-snippet area is followed by an illustration. Every section gets a different hat, so the eye is never bored and never overwhelmed.",
          es: "El truco es el ritmo. Stripe nunca deja que dos secciones contiguas compartan composición. A un visual amplio le sigue un bloque tipográfico compacto. A una sección oscura le sigue una blanca. A una zona con código le sigue una ilustración. Cada sección lleva un sombrero distinto, así que el ojo no se aburre ni se satura.",
        },
      },
      {
        type: "p",
        text: {
          en: "For a small business: vary your sections. Don't put three two-column-text sections in a row. Alternate.",
          es: "Para una pequeña empresa: varía tus secciones. No pongas tres secciones de texto a dos columnas seguidas. Alterna.",
        },
      },
      { type: "h2", text: { en: "Linear: speed as a feature", es: "Linear: la velocidad como característica" } },
      {
        type: "p",
        text: {
          en: "Linear's website feels different in a way that's hard to articulate. It loads instantly. Nothing flashes. The fonts arrive without flicker. Animation is fast — under 200ms. The whole site behaves like their product: snappy, deliberate, never indulgent.",
          es: "La web de Linear se siente diferente de un modo difícil de explicar. Carga al instante. Nada parpadea. Las fuentes llegan sin flicker. Las animaciones son rápidas — por debajo de 200 ms. Toda la web se comporta como su producto: ágil, deliberada, nunca complaciente.",
        },
      },
      {
        type: "p",
        text: {
          en: "That feel is engineered. They self-host fonts. They preload critical CSS. They ship images through proper image components. And they refuse to ship slow components. The result: the site itself becomes proof that they ship fast software.",
          es: "Esa sensación está diseñada. Alojan las fuentes ellos mismos. Precargan el CSS crítico. Sirven las imágenes con componentes adecuados. Y se niegan a publicar componentes lentos. El resultado: la propia web se convierte en la prueba de que envían software rápido.",
        },
      },
      {
        type: "p",
        text: {
          en: "For a small business: speed isn't a developer concern. It's a brand concern. A two-second load tells the visitor what they're about to deal with.",
          es: "Para una pequeña empresa: la velocidad no es un asunto de desarrolladores. Es un asunto de marca. Una carga de dos segundos le dice al visitante con qué se va a encontrar.",
        },
      },
      { type: "h2", text: { en: "Apple: one idea per scroll", es: "Apple: una idea por pantalla" } },
      {
        type: "p",
        text: {
          en: "Apple's product pages aren't busy. Open one and you'll find one idea, then scroll, then another single idea, then scroll. A photograph. A single sentence. Maybe a number. Then more whitespace than any other website would dare leave.",
          es: "Las páginas de producto de Apple no están saturadas. Abre una y encontrarás una idea, luego scroll, luego otra idea suelta, luego scroll. Una fotografía. Una sola frase. Quizá un número. Y luego más espacio en blanco del que cualquier otra web se atrevería a dejar.",
        },
      },
      {
        type: "p",
        text: {
          en: "It works because Apple trusts the buyer. They don't pile every reason-to-buy into the hero. They believe one well-staged idea will land harder than seven competing ones.",
          es: "Funciona porque Apple confía en el comprador. No amontonan todas las razones para comprar en el hero. Creen que una idea bien presentada cala más hondo que siete compitiendo entre sí.",
        },
      },
      {
        type: "p",
        text: {
          en: "For a small business: stop trying to close the sale on the hero. Let the hero set the tone. Save the closing arguments for further down the page.",
          es: "Para una pequeña empresa: deja de intentar cerrar la venta en el hero. Que el hero marque el tono. Guarda los argumentos de cierre para más abajo en la página.",
        },
      },
      { type: "h2", text: { en: "And what Ahrefs got right that nobody talks about", es: "Y lo que Ahrefs ha hecho bien y de lo que nadie habla" } },
      {
        type: "p",
        text: {
          en: 'A bonus. Ahrefs is not on most "beautiful website" lists, but their site converts brilliantly because every page answers a search query directly. They invested in content for a decade while their competitors invested in funnels. Their homepage is, in a sense, a sitemap of their best blog posts.',
          es: 'Un extra. Ahrefs no aparece en la mayoría de listas de "webs bonitas", pero su web convierte de maravilla porque cada página responde directamente a una búsqueda. Invirtieron en contenido durante una década mientras sus competidores invertían en embudos. Su home es, en cierto modo, un sitemap de sus mejores artículos.',
        },
      },
      {
        type: "p",
        text: {
          en: "For a small business: one well-written, well-positioned article can outrank a competitor's entire marketing budget. Build the site light. Then write.",
          es: "Para una pequeña empresa: un solo artículo bien escrito y bien posicionado puede superar todo el presupuesto de marketing de un competidor. Construye una web ligera. Y luego escribe.",
        },
      },
      { type: "h2", text: { en: "The pattern across all four", es: "El patrón común a las cuatro" } },
      {
        type: "p",
        text: {
          en: "What Stripe, Linear and Apple share — and what Ahrefs proves another way — is that the website is the product. None of them treat the site as marketing. They treat it as the first version of the experience. Slow site, slow company. Cluttered site, cluttered company. Restrained site, serious company.",
          es: "Lo que comparten Stripe, Linear y Apple — y lo que Ahrefs demuestra de otra manera — es que la web es el producto. Ninguna trata la web como marketing. La tratan como la primera versión de la experiencia. Web lenta, empresa lenta. Web saturada, empresa saturada. Web contenida, empresa seria.",
        },
      },
      {
        type: "p",
        text: {
          en: "That's the lesson worth taking. Build the site like you'd build the product.",
          es: "Esa es la lección que merece la pena llevarse. Construye la web como construirías el producto.",
        },
      },
    ],
  },
  {
    slug: "why-every-small-business-needs-a-custom-website",
    image: "/concepts/concept-1.svg",
    tag: { en: "Strategy", es: "Estrategia" },
    title: {
      en: "Why every small business needs a custom website",
      es: "Por qué toda pequeña empresa necesita una web a medida",
    },
    excerpt: {
      en: "Templates feel cheap. A custom site signals seriousness from the first second a prospect lands.",
      es: "Las plantillas se notan baratas. Una web a medida transmite seriedad desde el primer segundo en que un cliente potencial entra.",
    },
    read: { en: "3 min read", es: "3 min de lectura" },
    body: [
      {
        type: "p",
        text: {
          en: "Most small businesses still treat their website as a tick-box exercise. They buy a template, drop in a logo, and never look at it again. That worked ten years ago. It doesn't anymore.",
          es: "La mayoría de pequeñas empresas siguen tratando su web como un trámite. Compran una plantilla, meten su logo y no vuelven a mirarla. Hace diez años eso funcionaba. Ya no.",
        },
      },
      {
        type: "p",
        text: {
          en: "Your website isn't a brochure. It's the first room your customer ever walks into. They form an opinion in under a second — about whether you take your business seriously, whether you'll take their money seriously, whether you'll actually deliver. A tired template signals a tired operation. It doesn't matter how good the work is.",
          es: "Tu web no es un folleto. Es la primera habitación en la que entra tu cliente. Se forman una opinión en menos de un segundo — sobre si te tomas tu negocio en serio, si te vas a tomar su dinero en serio, si vas a entregar. Una plantilla cansada transmite una operación cansada. No importa lo bueno que sea el trabajo.",
        },
      },
      { type: "h2", text: { en: "Templates are optimised for nobody", es: "Las plantillas no están optimizadas para nadie" } },
      {
        type: "p",
        text: {
          en: "Templates have one fatal flaw: they were built for everyone, which means they're optimised for no one. The hero looks the same as a thousand competitors. The structure was designed for a generic SaaS landing page, not your bespoke joinery business or your strength coaching practice. The copy is filler. The result is a site that looks fine and converts nothing.",
          es: "Las plantillas tienen un fallo fatal: se construyeron para todo el mundo, lo que significa que no están optimizadas para nadie. El hero se ve igual que el de mil competidores. La estructura se diseñó para una landing genérica de SaaS, no para tu carpintería a medida ni para tu consulta de coaching de fuerza. Los textos son relleno. El resultado es una web que se ve bien y no convierte nada.",
        },
      },
      {
        type: "p",
        text: {
          en: "A custom site does the opposite. The structure is mapped to how your customers actually decide. The copy is in your voice, not a designer's placeholder. The visuals are tuned to your work. Every detail is intentional, because every detail was a decision someone made for your business specifically.",
          es: "Una web a medida hace lo contrario. La estructura se ajusta a cómo deciden realmente tus clientes. Los textos están en tu voz, no en el placeholder de un diseñador. Los visuales están afinados a tu trabajo. Cada detalle es intencional, porque cada detalle fue una decisión que alguien tomó pensando concretamente en tu negocio.",
        },
      },
      { type: "h2", text: { en: "The premium signal is restraint", es: "La señal de premium es la contención" } },
      {
        type: "p",
        text: {
          en: "The premium signal isn't a fancy animation or a clever hover effect. It's the absence of template patterns. The font choice is yours. The button style is yours. The way your services are explained is yours. Visitors can't always articulate why a custom site feels different, but they always feel it.",
          es: "La señal de premium no es una animación llamativa ni un efecto hover ingenioso. Es la ausencia de patrones de plantilla. La tipografía es tuya. El estilo de los botones es tuyo. La forma de explicar tus servicios es tuya. Los visitantes no siempre saben articular por qué una web a medida se siente diferente, pero siempre lo perciben.",
        },
      },
      {
        type: "p",
        text: {
          en: "If you're sending serious prospects to a generic template, you're losing trust before the conversation starts. A custom site closes that gap before you say a word.",
          es: "Si estás enviando a clientes potenciales serios a una plantilla genérica, estás perdiendo confianza antes de empezar la conversación. Una web a medida cierra esa brecha antes de que digas una palabra.",
        },
      },
    ],
  },
  {
    slug: "why-we-never-lock-clients-into-hosting",
    image: "/concepts/concept-3.svg",
    tag: { en: "Principles", es: "Principios" },
    title: {
      en: "Why we never lock clients into hosting",
      es: "Por qué nunca atamos a los clientes al hosting",
    },
    excerpt: {
      en: "Vendor lock-in serves the vendor. Plynos hands the keys back at launch.",
      es: "El bloqueo del proveedor sirve al proveedor. Plynos te entrega las llaves al lanzamiento.",
    },
    read: { en: "2 min read", es: "2 min de lectura" },
    body: [
      {
        type: "p",
        text: {
          en: 'There\'s a quiet pattern in the agency world: you pay them once to build the site, and then forever to host it. The hosting fee is dressed up as "maintenance" or "support" or "the platform." Cancel it and the site goes dark.',
          es: 'Hay un patrón silencioso en el mundo de las agencias: les pagas una vez por construir la web y luego para siempre por alojarla. La cuota de hosting se disfraza de "mantenimiento", "soporte" o "la plataforma". La cancelas y la web se apaga.',
        },
      },
      {
        type: "p",
        text: {
          en: "This is vendor lock-in. It serves the vendor, not you.",
          es: "Eso es bloqueo del proveedor. Sirve al proveedor, no a ti.",
        },
      },
      { type: "h2", text: { en: "How we do it instead", es: "Cómo lo hacemos nosotros" } },
      {
        type: "p",
        text: {
          en: "Plynos doesn't work that way. Every client owns their domain in their own name, with their own registrar. Every client has their own hosting account, billed in their own name, on their own card. Every client gets the source code at handover. If you wanted to walk away from us tomorrow and move to another developer, you could — without permission, without delay, without a transition fee.",
          es: "Plynos no funciona así. Cada cliente posee su dominio a su nombre, en su propio registrador. Cada cliente tiene su propia cuenta de hosting, facturada a su nombre, en su propia tarjeta. Cada cliente recibe el código fuente en la entrega. Si quisieras dejarnos mañana e irte a otro desarrollador, podrías — sin permiso, sin demoras, sin tarifa de transición.",
        },
      },
      { type: "h2", text: { en: "Three reasons", es: "Tres razones" } },
      {
        type: "p",
        text: {
          en: "First, it's the right thing. You paid for a website. You should own a website. Anything less is a rental, and you should know it's a rental before you sign.",
          es: "Primero, es lo correcto. Pagaste por una web. Deberías ser dueño de una web. Cualquier cosa menos que eso es un alquiler, y deberías saber que es un alquiler antes de firmar.",
        },
      },
      {
        type: "p",
        text: {
          en: "Second, it forces us to be better. We don't get to relax because the recurring fee is locked in. The relationship has to renew on its merits — we have to be worth calling back, not worth being stuck with.",
          es: "Segundo, nos obliga a ser mejores. No podemos relajarnos porque tengamos una cuota recurrente atada. La relación tiene que renovarse por sus propios méritos — tenemos que merecer que nos vuelvas a llamar, no merecer que estés atrapado con nosotros.",
        },
      },
      {
        type: "p",
        text: {
          en: "Third, it changes how the site itself gets built. When you know the client is going to take this code somewhere else one day, you write code worth taking. You use clean dependencies. You document things. You don't bury secrets in proprietary tools.",
          es: "Tercero, cambia cómo se construye la propia web. Cuando sabes que el cliente se va a llevar este código a otro sitio algún día, escribes código que merezca la pena llevarse. Usas dependencias limpias. Documentas las cosas. No entierras secretos en herramientas propietarias.",
        },
      },
      {
        type: "p",
        text: {
          en: "The whole industry doesn't have to operate this way. We just think yours should.",
          es: "Todo el sector no tiene por qué funcionar así. Solo pensamos que el tuyo debería.",
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
