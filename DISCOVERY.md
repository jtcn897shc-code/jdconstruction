# Discovery — JD Construction and Cleaning Services

Status of every fact on this site: what the client actually gave us versus
what we inferred. **Nothing in the "open" column should go live unverified.**

Source material received:
1. The company logo (phone screenshot).
2. A reference screenshot of an unrelated template (HomixPro).
3. The client's **Facebook business page** — contact details, location,
   rating status and their own tagline.

---

## Confirmed facts

| Fact | Value | Source |
|---|---|---|
| Legal/trading name | JD Construction and Cleaning Services | Logo wordmark + FB page |
| Service lines | Construction **and** cleaning | Logo wordmark — both named |
| Heritage | Filipino-Canadian | Philippine + Canadian flags, crossed, centred in the crest |
| Phone | (587) 277-3435 | FB page |
| Email | jdccservices.alberta@gmail.com | FB page |
| WhatsApp | Active contact channel | FB page (WhatsApp button) |
| Messenger | Active contact channel | FB page |
| Base | Range Road 81, Brazeau County, T7A 0C1 — Drayton Valley, AB | FB page |
| Category | Home Improvement | FB page |
| Their own tagline | "Reliable · Affordable · Quality Service" | FB page |
| **Rating** | **Not yet rated — 0 reviews** | FB page |
| Brand navy | `#113472` | Pixel-sampled from logo (11.0% of artwork) |
| Brand gold | `#e9c34a` | Pixel-sampled from logo (2.4%, diamond border + stars) |
| Brand red | `#b90025` | Pixel-sampled from logo (7.6%, flag red) |
| Brand royal blue | `#1f4d9f` | Pixel-sampled from logo (3.9%, PH flag field) |

---

## The core argument

**JD does the renovation *and* the cleanup.** Most contractors hand back a
finished room full of drywall dust and leave you to book a separate cleaning
crew. JD is both trades in one company — it is literally the name on the door.

This was inferred from the logo before we saw their Facebook page. Their own
post of Sep 4 leads with **"BUILT & CLEAN, DONE RIGHT"** — so this is JD's
own argument, independently confirmed, not a positioning we invented for
them. It drives the hero headline, the full-width lead service card, and its
own section ("One crew, start to spotless").

---

## Decisions taken on the client's behalf

Flagged because they are judgement calls, each reversible in one line of
`config/client.config.js`.

- **The street address is withheld.** Range Road 81 is a rural address and
  this reads as a home-based service business. Google's guidance for
  service-area businesses is to publish the area served, not the street
  address. Locality, region and postcode still go into the JSON-LD for
  local SEO. *If JD has a commercial yard or storefront and wants the full
  address shown, say so and it goes in.*
- **Service-area radius is an assumption.** Drayton Valley and Brazeau
  County are confirmed; the surrounding communities listed (Breton,
  Lodgepole, Cynthia, Buck Creek, Rocky Rapids, Warburg) are real local
  geography but the travel radius is a guess. See open items.
- **Their tagline is used as a supporting line, not the headline.**
  "Reliable · Affordable · Quality Service" is true but says what every
  competitor says. It appears under the hero CTAs and in the final section;
  the headline carries the differentiated claim instead.

---

## Open — BLOCKING launch

- [ ] **Confirm the service radius.** Which of the listed communities do
      they actually travel to, and do they take work toward Edmonton,
      Leduc, Devon or Rocky Mountain House?
- [ ] **Licensing / insurance / WorkSafe status.** The site currently claims
      *nothing* specific here on purpose. Do not add "licensed, bonded and
      insured" until JD confirms it in writing — it is a regulated claim.
- [ ] **Confirm the address decision** above.
- [ ] **Messenger link.** They have Messenger active, but we don't have the
      page's `m.me` username, so no Messenger button was added. Send the
      page URL and it takes two minutes.
- [ ] **Which trade leads?** Services are ordered construction-first. If
      most revenue is cleaning, flip the order in the config.

## Open — nice to have

- [ ] Real job photos (see EXIF note below). The gallery currently renders
      on-brand placeholder panels with a visible note, not stock imagery.
      They have 8 Facebook posts — those photos are the obvious source.
- [ ] Business hours / emergency availability.
- [ ] Year founded.
- [ ] Do they offer free on-site estimates? Financing on larger jobs?
- [ ] Service detail: does construction mean full renos, framing, finishing
      carpentry, decks, garages?
- [ ] A custom domain. The email is a Gmail address, which is completely
      normal for a business this size but a domain would let the site,
      the email and the Facebook page all point at each other.

---

## Removed on purpose — do not restore without real data

The template this site was built from shipped with invented social proof. It
has been **stripped**, not carried over:

- `4.9★ / 310+ reviews` appeared in the hero, the trust bar, and a five-star
  block in the gallery. All removed.
- `Family-Owned Since 2009` removed.
- `Licensed & Insured` / `Bonded` badges removed.
- No `aggregateRating` is emitted in the JSON-LD.

This is no longer just caution: JD's Facebook page reads **"Not yet rated
(0 reviews)"**. There is no rating to publish. Publishing invented reviews
or ratings for a real, named business is deceptive advertising — Competition
Act s.74.01 in Canada, FTC endorsement rules in the US — and the exposure
lands on JD, not on us.

The site is designed to look complete without them. When real reviews
exist, add them to `config/client.config.js` and the proof section renders
itself; until then it stays out of the DOM entirely.

The work gallery follows the same rule: it shows work *types* on labelled
placeholder panels and asserts no specific past job, client, city or date.

## If real job photos arrive

Strip EXIF before publishing. Phone camera originals carry GPS coordinates,
and publishing a past customer's home address as a before/after photo is a
concrete privacy problem — especially in a small community where a house is
recognisable.
