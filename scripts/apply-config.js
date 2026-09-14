// Destura Template — instantiate a client from config/client.config.js.
//
// Reads template/index.html (the pristine, never-overwritten source) plus
// config/client.config.js, and generates three files:
//   - index.html             (final, deployable static page)
//   - css/client-tokens.css  (brand palette, sampled from the client's logo)
//   - api/knowledge.js       (the chat concierge's knowledge base)
//
// Zero dependencies — plain Node fs/string operations, run with:
//   node scripts/apply-config.js
//
// Re-run any time client.config.js changes; template/index.html is never
// mutated, so the same template reuses cleanly for the next client.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import config from "../config/client.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Line icons, keyed by service `kind`. Stroke-only and geometric — no
// hard hats, no sparkles (see DESIGN.md §5, category clichés).
const ICONS = {
  construction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M10 21v-6h4v6"/></svg>`,
  postconstruction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 21h7l10-10a2.8 2.8 0 0 0-4-4L6 17z"/><path d="M14 5l4 4"/><path d="M5 14l4 4"/></svg>`,
  residential: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 21h16"/><path d="M6 21V10l6-4.5 6 4.5v11"/><path d="M10 14h4v7h-4z"/></svg>`,
  commercial: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 21h18"/><path d="M5 21V4h9v17"/><path d="M14 10h5v11"/><path d="M8 8h3M8 12h3M8 16h3"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14.7 6.3a4 4 0 0 1-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 1 5.6-5.6l-3-3-3 3z"/></svg>`,
};

function iconFor(service) {
  if (service.kind && ICONS[service.kind]) return ICONS[service.kind];
  const n = String(service.name || "").toLowerCase();
  if (/reno|construct|build|carpent/.test(n)) return ICONS.construction;
  if (/post-construction|turnover/.test(n)) return ICONS.postconstruction;
  if (/resid|house|home/.test(n)) return ICONS.residential;
  if (/commercial|office|strata/.test(n)) return ICONS.commercial;
  return ICONS.default;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// The hero headline is the one field allowed inline markup, and only <em>
// (the gold-highlighted clause). Everything else is escaped as normal.
function escapeAllowingEm(str) {
  return escapeHtml(str)
    .replace(/&lt;em&gt;/g, "<em>")
    .replace(/&lt;\/em&gt;/g, "</em>");
}

// Expand a <!-- REPEAT:key --> ... <!-- END:key --> block using `rows`,
// an array of { TOKEN: value } objects scoped to that block.
function expandRepeat(html, key, rows) {
  const re = new RegExp(`<!-- REPEAT:${key} -->([\\s\\S]*?)<!-- END:${key} -->`);
  const match = html.match(re);
  if (!match) return html;
  const snippet = match[1];
  const expanded = rows
    .map((row) => {
      let s = snippet;
      for (const [token, value] of Object.entries(row)) {
        s = s.split(`{{${token}}}`).join(value);
      }
      return s;
    })
    .join("");
  // Function form: content containing "$" (prices) must not be interpreted
  // as a replacement-pattern backreference.
  return html.replace(re, () => expanded);
}

// Keep or drop a <!-- IF:key --> ... <!-- END_IF:key --> block. This is how
// the reviews section stays out of the DOM entirely until real reviews
// exist, rather than rendering an empty shell.
function applyConditional(html, key, keep) {
  const re = new RegExp(`<!-- IF:${key} -->([\\s\\S]*?)<!-- END_IF:${key} -->`);
  const match = html.match(re);
  if (!match) return html;
  const body = keep ? match[1] : "";
  return html.replace(re, () => body);
}

function replaceScalar(html, tokens) {
  let out = html;
  for (const [token, value] of Object.entries(tokens)) {
    out = out.split(`{{${token}}}`).join(value);
  }
  return out;
}

// Short label shown inside a job's placeholder panel while real photos are
// still outstanding — honest "intentionally unfinished", not a broken image.
function placeholderLabel(job) {
  return job.kind === "postconstruction" ? "Turnover clean" : "Build";
}

function buildJsonLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: config.business.name,
    description: config.business.tagline,
    telephone: config.business.phone,
    email: config.business.email,
    // Locality, region and postcode only. The street address is withheld
    // on purpose: this is a service-area business operating from a rural
    // address, so the area served is the meaningful signal.
    address: {
      "@type": "PostalAddress",
      addressLocality: config.business.locality,
      addressRegion: config.business.region,
      postalCode: config.business.postalCode,
      addressCountry: config.business.country,
    },
    areaServed: config.business.serviceArea.map((c) => ({ "@type": "Place", name: c })),
    knowsAbout: config.services.map((s) => s.name),
    // NOTE: no aggregateRating and no review[] — never emit either until
    // there is a real first-party rating to back it. See DISCOVERY.md.
  };
  return JSON.stringify(ld, null, 2);
}

function buildIndexHtml() {
  let html = readFileSync(join(root, "template", "index.html"), "utf8");

  const reviews = (config.proof && config.proof.reviews) || [];
  html = applyConditional(html, "hasReviews", reviews.length > 0);

  html = expandRepeat(
    html,
    "services",
    config.services.map((s) => ({
      SERVICE_ICON: iconFor(s),
      SERVICE_NAME: escapeHtml(s.name),
      SERVICE_BLURB: escapeHtml(s.blurb),
      SERVICE_LEAD_CLASS: s.lead ? "svc--lead" : "",
    }))
  );

  html = expandRepeat(
    html,
    "diffPoints",
    config.differentiator.points.map((p) => ({
      POINT_TITLE: escapeHtml(p.title),
      POINT_BODY: escapeHtml(p.body),
    }))
  );

  html = expandRepeat(
    html,
    "process",
    config.process.map((p, i) => ({
      STEP_NUM: String(i + 1).padStart(2, "0"),
      STEP_TITLE: escapeHtml(p.title),
      STEP_BODY: escapeHtml(p.body),
    }))
  );

  html = expandRepeat(
    html,
    "jobs",
    config.proof.jobs.map((j) => ({
      JOB_TITLE: escapeHtml(j.title),
      JOB_KIND: escapeHtml(j.kind || "construction"),
      JOB_PLACEHOLDER: escapeHtml(placeholderLabel(j)),
    }))
  );

  html = expandRepeat(
    html,
    "reviews",
    reviews.map((r) => ({
      REVIEW_TEXT: escapeHtml(r.text),
      REVIEW_AUTHOR: escapeHtml(r.author),
      REVIEW_META: escapeHtml(r.meta || ""),
    }))
  );

  html = expandRepeat(
    html,
    "serviceArea",
    config.business.serviceArea.map((c) => ({ CITY: escapeHtml(c) }))
  );

  html = expandRepeat(
    html,
    "footerServices",
    config.services.map((s) => ({ SERVICE_NAME: escapeHtml(s.name) }))
  );

  html = expandRepeat(
    html,
    "faq",
    config.faq.map((f) => ({ FAQ_Q: escapeHtml(f.q), FAQ_A: escapeHtml(f.a) }))
  );

  html = replaceScalar(html, {
    BUSINESS_NAME: escapeHtml(config.business.name),
    SHORT_NAME: escapeHtml(config.business.shortName),
    TAGLINE: escapeHtml(config.business.tagline),
    HERO_HEADLINE: escapeAllowingEm(config.business.heroHeadline),
    HERO_LEDE: escapeHtml(config.business.heroLede),
    HERITAGE_NOTE: escapeHtml(config.business.heritageNote),
    PHONE: escapeHtml(config.business.phone),
    PHONE_HREF: escapeHtml(config.business.phoneHref),
    EMAIL: escapeHtml(config.business.email),
    SERVICE_AREA_INLINE: escapeHtml(config.business.serviceArea.join(" · ")),
    SERVICE_AREA_LABEL: escapeHtml(config.business.serviceAreaLabel),
    WHATSAPP_HREF: escapeHtml(config.business.whatsappHref),
    LOCALITY: escapeHtml(config.business.locality),
    REGION: escapeHtml(config.business.region),
    OWN_WORDS: escapeHtml(config.business.ownWords),
    JOBS_NOTE: escapeHtml(config.proof.jobsNote || ""),
    DIFF_KICKER: escapeHtml(config.differentiator.kicker),
    DIFF_TITLE: escapeHtml(config.differentiator.title),
    DIFF_BODY: escapeHtml(config.differentiator.body),
    LOGO_SRC: escapeHtml(config.logo.src),
    LOGO_ALT: escapeHtml(config.logo.alt),
    BRAND_INK: escapeHtml(config.brand.ink),
    JSONLD: buildJsonLd(),
    CURRENT_YEAR: String(new Date().getFullYear()),
  });

  writeFileSync(join(root, "index.html"), html);
}

function buildClientTokensCss() {
  const b = config.brand;
  const css = `/* GENERATED by scripts/apply-config.js from config/client.config.js — do not hand-edit.
   Palette pixel-sampled from the client's logo. The contrast ratios behind
   these values, and the rule governing --gold, are documented in DESIGN.md. */
:root {
  --ink: ${b.ink};
  --navy: ${b.navy};
  --royal: ${b.royal};
  --gold: ${b.gold};
  --red: ${b.red};
  --paper: ${b.paper};
  --mist: ${b.mist};
  --slate: ${b.slate};
}
`;
  writeFileSync(join(root, "css", "client-tokens.css"), css);
}

function buildKnowledgeJs() {
  const hasReviews = (config.proof.reviews || []).length > 0;
  const js = `// GENERATED by scripts/apply-config.js from config/client.config.js — do not hand-edit.
// Edit config/client.config.js and re-run the script instead.
export default {
  business: ${JSON.stringify(config.business, null, 2)},
  services: ${JSON.stringify(config.services, null, 2)},
  differentiator: ${JSON.stringify(config.differentiator, null, 2)},
  process: ${JSON.stringify(config.process, null, 2)},
  faq: ${JSON.stringify(config.faq, null, 2)},
  systemPreamble: \`You are the ${config.business.name} concierge, a chat assistant on their website. ${config.business.name} is a ${config.business.heritageNote.replace(/\.$/, "")} company offering ${config.services.map((s) => s.name).join(", ")} across ${config.business.serviceAreaLabel}.

The thing that makes them different: they are both trades in one company. The crew that builds the renovation also does the final turnover clean, quoted as one number. They also take on post-construction cleans for projects other contractors built, and standalone residential and commercial cleaning.

Your job: answer visitor questions clearly and briefly, using ONLY the facts provided in this system context. Never invent pricing, timelines, availability, or credentials.

Hard limits — these are not in your data, so never assert them: licensing, bonding, insurance or WorkSafeBC status; years in business; customer ratings, review counts, or testimonials; specific prices. If asked about any of these, say you don't want to quote it secondhand and point them to a call.
${hasReviews ? "" : "There are no published customer reviews on this site yet. If asked about reviews or ratings, say so plainly rather than describing any.\n"}
Tone: plainspoken, direct, warm but not salesy — no hype, no exclamation points, no "great question!" filler.

Scope: if asked something unrelated to ${config.business.name}, politely decline and steer back to how they can help, or to calling directly.

Booking: whenever the visitor signals they want a quote, want to book, or describe an urgent problem, end your message with the literal marker [[BOOK_CTA]] on its own at the very end. Only when it's genuinely the right next step — not on every message.

Keep replies short — a few sentences at most. This is a chat, not an essay.\`,
};
`;
  writeFileSync(join(root, "api", "knowledge.js"), js);
}

buildIndexHtml();
buildClientTokensCss();
buildKnowledgeJs();

console.log(`Applied config for "${config.business.name}":`);
console.log("  - index.html");
console.log("  - css/client-tokens.css");
console.log("  - api/knowledge.js");
