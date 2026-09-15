// Destura Template — Home Services: per-client config.
// This is the ONE file that changes between clients. Fill this in with a
// real business's details, then run `node scripts/apply-config.js` to
// regenerate index.html, css/client-tokens.css, and api/knowledge.js.
//
// Filled in for JD Construction and Cleaning Services.
//
// FACT DISCIPLINE — see DISCOVERY.md for the full audit:
//   (confirmed) = taken from material the client actually supplied.
//   TODO:       = realistic placeholder, must be verified before launch.
// Placeholder phone numbers use the reserved fictional 555-01XX range so a
// template leak can never dial a real stranger.

export default {
  business: {
    // (confirmed) wordmark on the client's logo
    name: "JD Construction and Cleaning Services",
    shortName: "JD",

    // The core argument (DISCOVERY.md §"The core argument"): they are both
    // trades in one company, which is the one thing competitors can't copy.
    heroHeadline: "We build it.<em>Then we clean it.</em>",
    heroLede:
      "Most contractors hand back a finished room and a layer of drywall dust. We're both trades under one roof — the renovation and the spotless handover come from the same crew.",
    tagline: "Construction and cleaning, from one crew.",
    // Worth noting: JD's own Facebook post (Sep 4) leads with "BUILT &
    // CLEAN, DONE RIGHT" — the dual-trade argument this page is built
    // around is theirs, not one we invented for them.

    // (confirmed) crossed Philippine + Canadian flags, centred in the crest
    heritageNote: "Filipino-Canadian, family-run.",

    // (confirmed) client's Facebook business page
    phone: "(587) 277-3435",
    phoneHref: "+15872773435",
    email: "jdccservices.alberta@gmail.com",
    // (confirmed) WhatsApp is an active contact channel on their FB page.
    whatsappHref: "https://wa.me/15872773435",

    // (confirmed) base of operations: Range Road 81, Brazeau County,
    // T7A 0C1 — Drayton Valley, AB.
    //
    // The street address is deliberately NOT published on the page. Range
    // Road 81 is a rural address and this reads as a home-based service
    // business; Google's own guidance for service-area businesses is to
    // hide the street address and publish the area served instead. The
    // locality/region/postcode still go into JSON-LD for local SEO. If JD
    // has a commercial yard or storefront and wants the full address shown,
    // it's a one-line change here.
    locality: "Drayton Valley",
    region: "AB",
    postalCode: "T7A 0C1",
    country: "CA",

    // Drayton Valley + surrounding Brazeau County communities.
    // TODO: confirm how far out they actually travel — this is real local
    // geography, but the radius is an assumption.
    serviceArea: ["Drayton Valley", "Brazeau County", "Breton", "Lodgepole", "Cynthia", "Buck Creek", "Rocky Rapids", "Warburg"],
    serviceAreaLabel: "Drayton Valley & Brazeau County",

    // (confirmed) their own stated tagline on Facebook.
    ownWords: "Reliable · Affordable · Quality Service",
  },

  // Every value pixel-sampled from the client's logo. See DESIGN.md for the
  // measured contrast ratios and the gold-is-conditional rule.
  brand: {
    ink: "#0a1a3a",      // derived from the logo's own shadow navy #041855
    navy: "#113472",     // sampled — 11.0% of logo artwork
    royal: "#1f4d9f",    // sampled — 3.9%
    gold: "#e9c34a",     // sampled — 2.4%. FILL ONLY on light grounds (1.57:1).
    red: "#b90025",      // sampled — 7.6%. Urgency only, never decorative.
    paper: "#f4f6f9",
    mist: "#e7ecf4",
    slate: "#5a6478",
  },

  logo: {
    src: "images/logo.png", // extracted from the client's screenshot, background keyed out
    alt: "JD Construction and Cleaning Services crest",
  },

  // The differentiator, given its own section — this is the argument the
  // whole page is built to land.
  differentiator: {
    kicker: "Why JD",
    title: "One crew, start to spotless.",
    body:
      "Hiring a contractor usually means hiring a cleaner afterwards — and chasing two companies, two schedules, two invoices. We do both. The people who built it are the people who clean it, so nothing gets blamed on the other trade.",
    points: [
      {
        title: "No second phone call",
        body: "The final clean is part of the job, not a separate contract you have to arrange while living in a construction zone.",
      },
      {
        title: "Nothing gets left for someone else",
        body: "When the same crew builds and cleans, there's no argument about whose dust it is. It just gets done.",
      },
      {
        title: "We also clean for other builders",
        body: "Contractors hire us for post-construction turnovers on jobs we didn't build. It's a service line, not an afterthought.",
      },
    ],
  },

  // Ordered by customer intent, construction-first.
  // TODO: if most revenue is commercial cleaning, flip this order.
  services: [
    {
      name: "Renovations & Construction",
      kind: "construction",
      blurb:
        "Kitchens, bathrooms, basements and full interior renovations — framing through finishing carpentry. Built properly, and handed back clean.",
      lead: true,
    },
    {
      name: "Post-Construction Cleaning",
      kind: "postconstruction",
      blurb:
        "The deep turnover clean after the trades leave: drywall dust, paint spatter, adhesive residue, window and fixture detail. Available on jobs we didn't build.",
    },
    {
      name: "Residential Cleaning",
      kind: "residential",
      blurb:
        "Recurring housekeeping, seasonal deep cleans, and move-in / move-out turnovers that actually pass an inspection.",
    },
    {
      name: "Commercial Cleaning",
      kind: "commercial",
      blurb:
        "Offices, retail units and strata common areas, scheduled around your hours instead of ours.",
    },
  ],

  // How the dual-trade promise actually plays out — reinforces the argument.
  process: [
    { title: "Walkthrough", body: "We look at the space in person and quote the build and the final clean together, in one number." },
    { title: "Build", body: "Construction runs with the site kept contained — dust barriers up, walkways protected, tools off your floors nightly." },
    { title: "Final clean", body: "The same company returns for the turnover clean. No handoff, no second contract, no waiting on another crew's calendar." },
    { title: "Handover", body: "You walk the finished space with us before we call it done. If something isn't right, we're still standing there." },
  ],

  proof: {
    // INTENTIONALLY EMPTY — and now confirmed, not just cautious: JD's
    // Facebook page reads "Not yet rated (0 reviews)". There is no rating
    // to publish, so the proof section stays out of the DOM and no
    // aggregateRating is emitted in JSON-LD. Publishing invented reviews
    // for a real, named business is deceptive advertising (Competition Act
    // s.74.01 in Canada; FTC endorsement rules in the US).
    reviews: [],

    // TODO: replace with real job photos. Strip EXIF first — camera originals
    // carry GPS, and publishing a customer's home address is a real privacy
    // problem. Until then these render as on-brand placeholder panels.
    //
    // These are work TYPES, not claimed past jobs: no city, client or date is
    // asserted, and the section carries a visible note saying the photography
    // is outstanding. Naming a specific job JD may not have done would be the
    // same fabrication problem as inventing a review.
    jobsNote: "Layout placeholder — JD's real project photography drops straight in here.",
    jobs: [
      { title: "Kitchen & bath renovations", kind: "construction" },
      { title: "Post-construction turnovers", kind: "postconstruction" },
      { title: "Basement build-outs", kind: "construction" },
    ],
  },

  faq: [
    {
      q: "Do you really do both construction and cleaning?",
      a: "Yes — that's the whole idea, and it's the name on the door. Most clients hire us for a renovation and the final clean comes with it. You can also book either one on its own.",
    },
    {
      q: "Can I book cleaning without a renovation?",
      a: "Absolutely. Recurring residential cleaning, one-off deep cleans, move-in and move-out turnovers, and commercial contracts are all standalone services.",
    },
    {
      q: "Do you do post-construction cleanup for other contractors?",
      a: "Yes. Builders and renovators hire us for turnover cleans on projects we had no part in building. Get in touch with the site details and timeline.",
    },
    {
      q: "What areas do you serve?",
      a: "Drayton Valley and the surrounding Brazeau County communities — Breton, Lodgepole, Cynthia, Buck Creek, Rocky Rapids and Warburg. If you're further out, ask — we may still be able to help.",
    },
    {
      q: "How do I get a quote?",
      a: "Call or email and we'll arrange a walkthrough. For renovations we quote the build and the final clean together, so you get one number rather than two.",
    },
  ],
};
