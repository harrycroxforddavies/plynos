export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  tag: string;
  image: string;
  excerpt: string;
  read: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-blue-collar-businesses-cant-skip-a-website",
    title: "Why blue-collar businesses can't skip a website anymore",
    tag: "Trades",
    image: "/blogs/blue-collar.jpg",
    excerpt:
      "Word-of-mouth still works. But customers Google your business before they call you, and a missing website costs more jobs than ever.",
    read: "4 min read",
    body: [
      {
        type: "p",
        text: "Word-of-mouth has always been the lifeblood of trades, contractors and small operators. A friend recommends a plumber, you call the plumber, the job gets done. For decades, that pipeline was enough.",
      },
      { type: "p", text: "It isn't anymore." },
      { type: "h2", text: "Customers Google before they call" },
      {
        type: "p",
        text: "Before someone picks up the phone, they search. They search the recommended business name. They search \"plumbers near me.\" They check three results, glance at each website, and make a quick call about who looks credible. If you don't show up — or you show up with no website at all, or a Facebook page from 2017 — you've lost the lead before they ever heard your voice.",
      },
      {
        type: "p",
        text: "This isn't speculation. The pattern is now near-universal across every consumer trade. The customer types your name into Google and judges what comes back. No website, no shot.",
      },
      { type: "h2", text: "The \"I don't need one\" trap" },
      {
        type: "p",
        text: "A common pushback: \"I'm too busy already, I don't need more leads.\" Fair. But a website isn't only about leads. It's about which leads you keep. The ones who already have your number and got a recommendation are still going to look you up. If your online presence looks tired, those warm referrals turn cold quickly. The customer hesitates. They check the next quote.",
      },
      {
        type: "p",
        text: "A clean, simple site doesn't bring you new business. It stops you losing the business you already had.",
      },
      { type: "h2", text: "What a trade website actually needs" },
      {
        type: "p",
        text: "Forget the bloat. A blue-collar business needs five things on its site, and nothing else: who you are and what you do in one sentence; the areas you cover; the kinds of jobs you take on (and the ones you don't); a phone number that works; photos of recent work.",
      },
      {
        type: "p",
        text: "That's the entire site. No \"Our Process\" page. No mission statement. No newsletter. Just a credibility check and a phone number.",
      },
      { type: "h2", text: "The local SEO advantage" },
      {
        type: "p",
        text: "Here's the bonus most trades miss: every search a customer does is local. \"Joiner Cork.\" \"Electrician Limerick.\" \"Plasterer near me.\" These are searches with thin competition compared to the generic terms big companies fight over. A well-built local trade website with the area named, the services listed, and a Google Business profile attached can rank in days, not months.",
      },
      {
        type: "p",
        text: "You don't need to outspend the directory sites. You need to out-class the half-finished site three doors down.",
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "The trades that will win the next decade aren't the loudest. They're the ones that look serious when a stranger first checks them out online. A website is the cheapest, fastest way to look serious. There's no good reason left to skip it.",
      },
    ],
  },
  {
    slug: "what-stripe-linear-and-apple-taught-us-about-websites",
    title: "What Stripe, Linear and Apple taught us about websites",
    tag: "Lessons",
    image: "/concepts/concept-4.svg",
    excerpt:
      "Most \"best website\" lists are useless. Here are three brands worth actually studying — and the one thing each one does that you can steal.",
    read: "5 min read",
    body: [
      {
        type: "p",
        text: "Most \"best website\" lists are useless. They list whatever has been viral on Twitter recently. Here are three companies whose websites are worth studying properly — and the one specific thing each one does that you can steal.",
      },
      { type: "h2", text: "Stripe: density without clutter" },
      {
        type: "p",
        text: "Stripe's homepage is doing more work than it looks like it is. There's a hero, a developer pitch, a customer-logo marquee, a product map — six or seven distinct sections — and yet nothing feels crowded.",
      },
      {
        type: "p",
        text: "The trick is rhythm. Stripe never lets two adjacent sections share a layout. A wide visual is followed by a tight type block. A dark section is followed by white. A code-snippet area is followed by an illustration. Every section gets a different hat, so the eye is never bored and never overwhelmed.",
      },
      {
        type: "p",
        text: "For a small business: vary your sections. Don't put three two-column-text sections in a row. Alternate.",
      },
      { type: "h2", text: "Linear: speed as a feature" },
      {
        type: "p",
        text: "Linear's website feels different in a way that's hard to articulate. It loads instantly. Nothing flashes. The fonts arrive without flicker. Animation is fast — under 200ms. The whole site behaves like their product: snappy, deliberate, never indulgent.",
      },
      {
        type: "p",
        text: "That feel is engineered. They self-host fonts. They preload critical CSS. They ship images through proper image components. And they refuse to ship slow components. The result: the site itself becomes proof that they ship fast software.",
      },
      {
        type: "p",
        text: "For a small business: speed isn't a developer concern. It's a brand concern. A two-second load tells the visitor what they're about to deal with.",
      },
      { type: "h2", text: "Apple: one idea per scroll" },
      {
        type: "p",
        text: "Apple's product pages aren't busy. Open one and you'll find one idea, then scroll, then another single idea, then scroll. A photograph. A single sentence. Maybe a number. Then more whitespace than any other website would dare leave.",
      },
      {
        type: "p",
        text: "It works because Apple trusts the buyer. They don't pile every reason-to-buy into the hero. They believe one well-staged idea will land harder than seven competing ones.",
      },
      {
        type: "p",
        text: "For a small business: stop trying to close the sale on the hero. Let the hero set the tone. Save the closing arguments for further down the page.",
      },
      { type: "h2", text: "And what Ahrefs got right that nobody talks about" },
      {
        type: "p",
        text: "A bonus. Ahrefs is not on most \"beautiful website\" lists, but their site converts brilliantly because every page answers a search query directly. They invested in content for a decade while their competitors invested in funnels. Their homepage is, in a sense, a sitemap of their best blog posts.",
      },
      {
        type: "p",
        text: "For a small business: one well-written, well-positioned article can outrank a competitor's entire marketing budget. Build the site light. Then write.",
      },
      { type: "h2", text: "The pattern across all four" },
      {
        type: "p",
        text: "What Stripe, Linear and Apple share — and what Ahrefs proves another way — is that the website is the product. None of them treat the site as marketing. They treat it as the first version of the experience. Slow site, slow company. Cluttered site, cluttered company. Restrained site, serious company.",
      },
      {
        type: "p",
        text: "That's the lesson worth taking. Build the site like you'd build the product.",
      },
    ],
  },
  {
    slug: "why-every-small-business-needs-a-custom-website",
    title: "Why every small business needs a custom website",
    tag: "Strategy",
    image: "/concepts/concept-1.svg",
    excerpt:
      "Templates feel cheap. A custom site signals seriousness from the first second a prospect lands.",
    read: "3 min read",
    body: [
      {
        type: "p",
        text: "Most small businesses still treat their website as a tick-box exercise. They buy a template, drop in a logo, and never look at it again. That worked ten years ago. It doesn't anymore.",
      },
      {
        type: "p",
        text: "Your website isn't a brochure. It's the first room your customer ever walks into. They form an opinion in under a second — about whether you take your business seriously, whether you'll take their money seriously, whether you'll actually deliver. A tired template signals a tired operation. It doesn't matter how good the work is.",
      },
      { type: "h2", text: "Templates are optimised for nobody" },
      {
        type: "p",
        text: "Templates have one fatal flaw: they were built for everyone, which means they're optimised for no one. The hero looks the same as a thousand competitors. The structure was designed for a generic SaaS landing page, not your bespoke joinery business or your strength coaching practice. The copy is filler. The result is a site that looks fine and converts nothing.",
      },
      {
        type: "p",
        text: "A custom site does the opposite. The structure is mapped to how your customers actually decide. The copy is in your voice, not a designer's placeholder. The visuals are tuned to your work. Every detail is intentional, because every detail was a decision someone made for your business specifically.",
      },
      { type: "h2", text: "The premium signal is restraint" },
      {
        type: "p",
        text: "The premium signal isn't a fancy animation or a clever hover effect. It's the absence of template patterns. The font choice is yours. The button style is yours. The way your services are explained is yours. Visitors can't always articulate why a custom site feels different, but they always feel it.",
      },
      {
        type: "p",
        text: "If you're sending serious prospects to a generic template, you're losing trust before the conversation starts. A custom site closes that gap before you say a word.",
      },
    ],
  },
  {
    slug: "five-pages-a-service-business-actually-needs",
    title: "The five pages a service business actually needs",
    tag: "Playbook",
    image: "/concepts/concept-2.svg",
    excerpt:
      "Cut the bloat. The minimum content map that converts visitors into enquiries.",
    read: "4 min read",
    body: [
      {
        type: "p",
        text: "Most service businesses overbuild their websites. They map a sitemap with twenty pages, half of which never get read, half of which never get finished. The result is a slow, sprawling, half-empty site that nobody uses.",
      },
      {
        type: "p",
        text: "Here's the actual minimum.",
      },
      { type: "h2", text: "1. Home" },
      {
        type: "p",
        text: "One hero that explains who you are, what you do and who it's for. One primary call to action. That's it. The home page is not a sitemap — it's an introduction.",
      },
      { type: "h2", text: "2. About" },
      {
        type: "p",
        text: "A short, honest page about you and the business. Why you started it, who you've helped, what you actually believe. Not a corporate \"Our Story\" page. A real one.",
      },
      { type: "h2", text: "3. Services" },
      {
        type: "p",
        text: "A clear list of what you sell. Not features — outcomes. Not a brochure — a menu. Each service should answer a single question for the visitor: is this for me?",
      },
      { type: "h2", text: "4. Work or case studies" },
      {
        type: "p",
        text: "Proof. Even one case study beats none. If you don't have client work yet, sample concepts work — clearly labelled. The point is showing the standard you operate at.",
      },
      { type: "h2", text: "5. Contact" },
      {
        type: "p",
        text: "A clean form, an email address, and one or two ways to reach you fast. Don't over-design this page. Make it easy to send the message.",
      },
      { type: "h2", text: "Restraint is a signal of competence" },
      {
        type: "p",
        text: "That's the whole site for 90% of service businesses. Anything beyond this — a blog, a careers page, a testimonials page — should be added because you have content that demands it, not because the template had a slot for it.",
      },
      {
        type: "p",
        text: "The trap most businesses fall into is feeling like they need to \"look bigger\" by having more pages. The opposite is true. A site with five well-built pages converts better than a site with twenty half-built ones. Sprawl signals disorganisation. Restraint signals competence.",
      },
      {
        type: "p",
        text: "Build the five. Use them well. Add a sixth only when you genuinely need it.",
      },
    ],
  },
  {
    slug: "why-we-never-lock-clients-into-hosting",
    title: "Why we never lock clients into hosting",
    tag: "Principles",
    image: "/concepts/concept-3.svg",
    excerpt:
      "Vendor lock-in serves the vendor. Plynos hands the keys back at launch.",
    read: "2 min read",
    body: [
      {
        type: "p",
        text: "There's a quiet pattern in the agency world: you pay them once to build the site, and then forever to host it. The hosting fee is dressed up as \"maintenance\" or \"support\" or \"the platform.\" Cancel it and the site goes dark.",
      },
      {
        type: "p",
        text: "This is vendor lock-in. It serves the vendor, not you.",
      },
      { type: "h2", text: "How we do it instead" },
      {
        type: "p",
        text: "Plynos doesn't work that way. Every client owns their domain in their own name, with their own registrar. Every client has their own hosting account, billed in their own name, on their own card. Every client gets the source code at handover. If you wanted to walk away from us tomorrow and move to another developer, you could — without permission, without delay, without a transition fee.",
      },
      { type: "h2", text: "Three reasons" },
      {
        type: "p",
        text: "First, it's the right thing. You paid for a website. You should own a website. Anything less is a rental, and you should know it's a rental before you sign.",
      },
      {
        type: "p",
        text: "Second, it forces us to be better. We don't get to relax because the recurring fee is locked in. The relationship has to renew on its merits — we have to be worth calling back, not worth being stuck with.",
      },
      {
        type: "p",
        text: "Third, it changes how the site itself gets built. When you know the client is going to take this code somewhere else one day, you write code worth taking. You use clean dependencies. You document things. You don't bury secrets in proprietary tools.",
      },
      {
        type: "p",
        text: "The whole industry doesn't have to operate this way. We just think yours should.",
      },
    ],
  },
];

export function findPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
