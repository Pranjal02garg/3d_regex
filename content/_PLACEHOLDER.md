# Data that must be replaced before this site goes live

Everything below is structurally correct but **not verified**. The site is
built so that filling these in is a content edit, never a code change.

`DATA_VERIFIED` in `content/site.ts` is currently `false`. While it is false the
UI captions composition and pricing as *indicative*. **Flip it to `true` only
once every item on this page has been checked.**

---

## 1. Legal and regulatory — `content/site.ts`, `content/trust.ts`

| Field | Current | Needed |
|---|---|---|
| Registered entity name | "Regex Remedies" | Name as registered |
| AYUSH manufacturing licence | `PB/AY/000000` | Real number + issuing directorate |
| GMP (Schedule T) certificate | `GMP/0000/0000` | Real number, issuer, valid-until date |
| FSSAI licence | `00000000000000` | Real 14-digit number |
| GSTIN | `00AAAAA0000A1Z0` | Real GSTIN |
| Manufacturing address | Majitha Road, Amritsar | Address exactly as on the licence |
| Grievance officer | PLACEHOLDER | Name + email (required under the IT Rules) |
| Phone / email / socials | PLACEHOLDER | Real, monitored channels |
| Domain | `regexremedies.in` | Confirm before OG tags and sitemap go out |
| Testing laboratory | PLACEHOLDER | Lab name + NABL accreditation number |

## 2. Composition quantities — `content/products.ts`

The **herb lists, pack sizes and dosage forms are taken from your physical
labels and are correct.** Every `mg` figure in `formulation` is indicative and
must be transcribed from the approved master formula for each product:

- `gasogex` — 5 rows
- `kabzraj` — 5 rows
- `livgex` — 5 rows
- `pilegex` — 5 rows
- `lucogex` — 5 rows

Also confirm the excipient lines in `formulationBase`, and whether the capsule
shells are in fact HPMC (this is asserted for Pilegex and Lucogex).

## 3. Pricing — `content/products.ts`

`price` and `mrp` on all five products are placeholders. Also confirm
`FREE_SHIPPING_OVER`, `SHIPPING_FLAT` and `SUBSCRIBE_DISCOUNT` in `site.ts`.

## 4. Batch and QC data — `content/products.ts`

`batch` (code, manufactured, expiry, tested) and every row of `qc` are
illustrative. `/verify` looks up against this data, so it must be real before
that page is truthful. The verify page is a strong trust asset and an active
liability if the numbers are invented.

## 5. Reviews — `content/reviews.ts`

**All twelve are written examples, not real customers.** Replace entirely with
genuine reviews. Do not publish invented reviews with real-sounding names —
that is a straightforward consumer-protection problem, not a grey area.
`rating` and `reviewCount` on each product must match the real data.

## 6. Practitioner note — `content/trust.ts`

`PRACTITIONER_NOTE` needs a real, consented, attributable quote with the
practitioner's registration number. **Do not publish an invented endorsement.**

## 7. Article authorship — `content/articles.ts`

Every article has `author: "PLACEHOLDER"`. Health content needs a named,
credentialed reviewer to be credible and to qualify for medical-content
treatment in search. Assign a real reviewer to each of the six.

## 8. Claims language — site-wide

The current labels carry phrases such as **"Cures Gut Pain"** (Kabzraj) and
**"Natural Relief for Piles"** (Pilegex). Under the Drugs and Magic Remedies
(Objectionable Advertisements) Act 1954 and ASCI guidance, disease-cure claims
in advertising are restricted, and several relevant conditions are named in the
Act's schedule.

All copy on this site deliberately uses *"traditionally used to support"*
framing and never *"cures"*. Before launch:

1. Have a regulatory adviser review the product copy.
2. Plan a label revision so the pack and the site agree — the article
   `reading-an-ayurvedic-label` currently acknowledges this openly, which is
   the right posture only if the revision is actually happening.

## 9. Note on metadata copy — `app/layout.tsx`

The site description currently references **"double-blind clinical
validation"**. No clinical trial data exists in this repository. Either attach
the studies (`/science/evidence` is built to display them) or soften this line —
a specific trial-design claim is exactly the kind of statement a regulator or a
sceptical practitioner will check first.

## 10. Photography

Product images are matted from the original desk photographs by
`scripts/prepare_assets.py`. They are consistent and clean, but they are phone
snapshots. A half-day studio shoot — single light source, seamless ground,
one angle per bottle plus a macro of each label panel — would lift the whole
site more than any further code. Drop new files into `public/products/` with
the same names and nothing else needs to change.
