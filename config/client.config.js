// Destura Template — Home Services: per-client config.
// This is the ONE file that changes between clients. Fill this in
// with a real business's details, then run `node scripts/apply-config.js`
// to regenerate index.html, css/client-tokens.css, and api/knowledge.js.
//
// Currently filled with placeholder content: Ridgeline Home Services,
// a fictional Fraser Valley HVAC/plumbing/electrical company — not a
// real business. Fully fleshed out on purpose (not "Lorem Ipsum" /
// "Your Company Name Here") since this doubles as a live demo.

export default {
  business: {
    name: "Ridgeline Home Services",
    heroHeadline: "Trusted HVAC, plumbing & electrical for the Fraser Valley.",
    tagline: "Heating, cooling, plumbing & electrical — done right the first time.",
    phone: "(604) 555-0142",
    phoneHref: "+16045550142",
    email: "hello@ridgelinehomeservices.ca",
    foundedYear: "2009",
    serviceArea: ["Abbotsford", "Chilliwack", "Mission", "Langley", "Surrey", "Maple Ridge"],
    licenseNote: "Fully licensed, bonded & insured across all trades.",
  },

  brand: {
    accent: "#b8863c",
    accentDark: "#8f6428",
    accentTint: "#f1e4cc",
  },

  services: [
    {
      name: "Heating & Cooling",
      blurb: "Furnace repair, AC installs, heat pumps, and seasonal maintenance plans that keep small problems from becoming expensive ones.",
    },
    {
      name: "Plumbing",
      blurb: "Leak repair, drain cleaning, water heater installs, and fixture work — done clean, done once.",
    },
    {
      name: "Electrical",
      blurb: "Panel upgrades, rewiring, EV charger installs, and lighting — licensed electricians, not handymen.",
    },
  ],

  proof: {
    rating: "4.9",
    reviewCount: "310",
    badges: ["Licensed & Insured", "Bonded", "Family-Owned Since 2009"],
    jobs: [
      {
        title: "Full Furnace Replacement",
        location: "Abbotsford, BC",
        caption: "High-efficiency furnace swap, new ductwork sealed, completed in one day.",
        beforeImg: "images/job-furnace.jpg",
      },
      {
        title: "Electrical Panel Upgrade",
        location: "Chilliwack, BC",
        caption: "100A to 200A service upgrade to support a new EV charger and home addition.",
        beforeImg: "images/job-panel.jpg",
      },
      {
        title: "Tankless Water Heater Install",
        location: "Langley, BC",
        caption: "Converted from a failing tank unit — endless hot water, smaller footprint.",
        beforeImg: "images/job-waterheater.jpg",
      },
    ],
  },

  financing: {
    blurb: "Big-ticket jobs shouldn't wait on a bank transfer. Flexible financing is available on system installs and replacements, with same-day approval in most cases.",
    badges: ["0% Financing Available", "Same-Day Approval", "Flexible Terms"],
  },

  faq: [
    {
      q: "Do you offer emergency service?",
      a: "Yes — we're available 24/7 for no-heat, no-cool, active leaks, and electrical emergencies. Call anytime.",
    },
    {
      q: "Are you licensed and insured?",
      a: "Yes, fully licensed, bonded, and insured across HVAC, plumbing, and electrical work.",
    },
    {
      q: "What areas do you serve?",
      a: "Abbotsford, Chilliwack, Mission, Langley, Surrey, and Maple Ridge — reach out if you're just outside this area, we may still be able to help.",
    },
    {
      q: "Do you offer financing for big jobs?",
      a: "Yes, flexible financing is available on system installs and replacements, with same-day approval in most cases.",
    },
    {
      q: "How do I book a service call?",
      a: "Call us directly for anything urgent, or use the chat on this site to get a quote and find a time that works.",
    },
  ],
};
