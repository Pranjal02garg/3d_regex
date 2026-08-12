/** Certifications, manufacturing process, FAQs and practitioner notes. */

export type Certification = {
  name: string;
  issuer: string;
  reference: string;
  scope: string;
};

/** All reference numbers are PLACEHOLDER. See content/_PLACEHOLDER.md. */
export const certifications: Certification[] = [
  {
    name: "GMP — Schedule T",
    issuer: "Directorate of Ayurveda, Government of Punjab",
    reference: "GMP/0000/0000",
    scope: "Manufacture of Ayurvedic proprietary medicines — tablets and capsules",
  },
  {
    name: "AYUSH manufacturing licence",
    issuer: "Ministry of Ayush, Government of India",
    reference: "PB/AY/000000",
    scope: "Licensed manufacture of the five formulations listed on this site",
  },
  {
    name: "FSSAI",
    issuer: "Food Safety and Standards Authority of India",
    reference: "00000000000000",
    scope: "Storage and distribution",
  },
  {
    name: "NABL-accredited testing",
    issuer: "PLACEHOLDER — laboratory name, accreditation number",
    reference: "TC-0000",
    scope: "Heavy metals, microbial limits, aflatoxin, assay — per batch",
  },
];

export const MANUFACTURING_STEPS = [
  {
    n: "01",
    title: "Sourcing",
    body: "Each botanical comes from a named growing region rather than an open market. Kutki and Ashoka are cultivated only — both species are under collection pressure in the wild.",
  },
  {
    n: "02",
    title: "Identity check",
    body: "Incoming material is checked against a reference specimen before it is accepted. Substitution is the quiet problem of the botanical trade and it is not always deliberate.",
  },
  {
    n: "03",
    title: "Cleaning and drying",
    body: "Material is cleaned, graded and dried to a controlled moisture level. Too wet invites mould; too dry drives off volatile oils.",
  },
  {
    n: "04",
    title: "Processing",
    body: "Where a classical method exists it is followed — Surana is processed to reduce raphides, Hing is tempered in fat before use. These steps are not optional flourishes.",
  },
  {
    n: "05",
    title: "Blending and compression",
    body: "Weighed against the master formula, blended to uniformity, then compressed or encapsulated. Blend uniformity is verified before the batch proceeds.",
  },
  {
    n: "06",
    title: "Batch release",
    body: "Nothing leaves without a certificate of analysis for that batch. The batch code on your bottle resolves to that certificate at the verify page.",
  },
] as const;

export const HOME_FAQS = [
  {
    q: "Are these safe to take with prescription medicine?",
    a: "Often, but not always, and the honest answer depends on which medicine. Every product page lists known interactions in plain language. As a general rule leave a two-hour gap, and if you take anticoagulants, immunosuppressants or hormonal medication, check with your doctor before starting.",
  },
  {
    q: "Can I take these while pregnant or breastfeeding?",
    a: "No. None of our current formulations are suitable during pregnancy or breastfeeding, and each product page says so specifically. This is not a precaution we have added to cover ourselves — several of these herbs have documented reasons for the restriction.",
  },
  {
    q: "What are the side effects?",
    a: "They differ by product and are listed on each product page rather than pooled into a vague paragraph. The most common across the range are mild digestive effects in the first few days.",
  },
  {
    q: "How long before I notice anything?",
    a: "Also product-specific. Kabzraj usually works overnight; Livgex is measured in weeks. Each page carries a week-by-week expectation timeline so you can judge whether something is working before you have spent three months on it.",
  },
  {
    q: "Are your products approved by a regulator?",
    a: "They are manufactured under an AYUSH licence in a Schedule T certified facility, which governs how they are made. That is not the same as the clinical approval a pharmaceutical goes through, and we will not imply otherwise.",
  },
  {
    q: "Why do you publish the full formula when nobody else does?",
    a: "Because a hidden formula cannot be checked by a pharmacist, a physician, or anyone with a known sensitivity. We think that costs more than the protection it offers. There is a longer answer in the library.",
  },
] as const;

/**
 * PLACEHOLDER — must be replaced with a real, attributable, consented quote
 * from a registered practitioner, including registration number. Do not
 * publish this page with invented credentials.
 */
export const PRACTITIONER_NOTE = {
  quote:
    "What I look for first is whether I can see the composition — the part of the plant, the quantity, and what the batch was tested for. Most proprietary Ayurvedic products do not let me check that, so I cannot advise a patient on them. When a company publishes it, the conversation changes entirely.",
  name: "PLACEHOLDER — practitioner name",
  credentials: "PLACEHOLDER — BAMS, MD (Ayurveda) · Registration no. PLACEHOLDER",
  city: "PLACEHOLDER",
};
