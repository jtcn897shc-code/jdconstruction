# Discovery — JD Construction and Cleaning Services

Status of every fact on this site: what the client actually gave us versus
what we invented to make the page demoable. **Nothing in the "open" column
should go live unverified.**

Source material received: the company logo (phone screenshot) and a
reference/inspiration screenshot of an unrelated template (HomixPro).
No website, phone number, address, or copy was supplied.

---

## Confirmed facts

These come from the client's own logo artwork and are used verbatim.

| Fact | Value | Source |
|---|---|---|
| Legal/trading name | JD Construction and Cleaning Services | Logo wordmark |
| Service lines | Construction **and** cleaning | Logo wordmark — both named |
| Heritage | Filipino-Canadian | Philippine + Canadian flags, crossed, centred in the crest |
| Operating country | Canada | Canadian flag in crest |
| Brand navy | `#113472` | Pixel-sampled from logo (11.0% of artwork) |
| Brand gold | `#e9c34a` | Pixel-sampled from logo (2.4%, diamond border + stars) |
| Brand red | `#b90025` | Pixel-sampled from logo (7.6%, flag red) |
| Brand royal blue | `#1f4d9f` | Pixel-sampled from logo (3.9%, PH flag field) |

The crossed flags are a deliberate identity choice, not decoration — the
site treats the Filipino-Canadian family-business angle as real positioning,
because the client put it at the dead centre of their mark.

---

## The core argument

**JD does the renovation *and* the cleanup.** Most contractors hand back a
finished room full of drywall dust and leave you to book a separate cleaning
crew. JD is both trades in one company — it is literally the name on the
door.

This is the one claim their competitors can't copy without subcontracting,
and it was sitting unexploited in the logo. It drives the hero headline, the
first and widest services card, and its own section ("One crew, start to
spotless").

---

## Open — BLOCKING launch

Do not publish until these are answered. All are currently placeholders.

- [ ] **Service area / city.** The single highest-impact gap. Currently
      placeholdered as Metro Vancouver, BC. This drives hero copy, the
      service-area list, and local SEO. *If JD operates anywhere else, every
      place-name on the page is wrong.*
- [ ] **Phone number.** Currently `(604) 555-0147` — inside the reserved
      fictional `555-01XX` range specifically so a template leak can never
      dial a real stranger. Must be replaced before launch.
- [ ] **Email address.** Currently `hello@jdconstructioncleaning.ca`
      (guessed from the business name — domain may not exist).
- [ ] **Licensing / insurance / WorkSafeBC status.** The site currently
      claims *nothing* specific here on purpose. Do not add "licensed,
      bonded and insured" until JD confirms it in writing — it is a
      regulated claim.
- [ ] **Year founded.** Omitted entirely rather than invented. "Family-owned
      since 2009" was placeholder text inherited from the template and has
      been removed.
- [ ] **Which trade leads?** Services are currently ordered
      construction-first. If most revenue is commercial/post-construction
      cleaning, that order should flip.

## Open — nice to have

- [ ] Real job photos (see note on EXIF below). Gallery currently renders
      on-brand placeholder panels, not stock imagery.
- [ ] Real customer reviews — see the warning below.
- [ ] Business hours / emergency availability.
- [ ] Service-specific detail: does construction mean full renos, framing,
      finishing carpentry, decks?
- [ ] Do they offer free on-site estimates? Financing on larger jobs?
- [ ] Social profiles for the footer.
- [ ] Any certifications worth displaying (trade tickets, bonding).

---

## Removed on purpose — do not restore without real data

The template this site was built from shipped with invented social proof.
It has been **stripped**, not carried over:

- `4.9★ / 310+ reviews` appeared in the hero, the trust bar, and a
  five-star block in the gallery. All removed.
- `Family-Owned Since 2009` removed.
- `Licensed & Insured` / `Bonded` badges removed.
- No `aggregateRating` is emitted in the JSON-LD.

Publishing invented reviews or ratings for a **real, named business** is
deceptive advertising — Competition Act s.74.01 in Canada, FTC endorsement
rules in the US. It also exposes JD, not us. The site is designed to look
complete without them; when real reviews exist, add them to
`config/client.config.js` and the proof section renders itself.

Sample testimonials, if ever wanted before real ones land, must carry a
visible "sample" badge.

## If real job photos arrive

Strip EXIF before publishing. Phone camera originals carry GPS coordinates,
and publishing a past customer's home address as a before/after photo is a
concrete privacy problem. `scripts/prepare-photo.js` handles crop + EXIF
strip.
