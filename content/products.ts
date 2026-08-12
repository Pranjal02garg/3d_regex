/**
 * The catalogue.
 *
 * Herb lists, pack sizes and dosage forms come from the physical labels.
 * Quantities in `formulation`, all pricing, and every batch/assay figure are
 * INDICATIVE placeholders — `DATA_VERIFIED` in content/site.ts gates how the
 * UI captions them, so nothing unverified is ever presented as final.
 */

export type CareLevel = "everyday" | "short-course" | "guided";

export type FormulationRow = {
  ingredient: string; // slug into content/ingredients.ts
  mg: number;
  note?: string;
};

export type Product = {
  slug: string;
  name: string;
  devanagari: string;
  tagline: string;
  concern: string;
  concernSlug: string;
  careLevel: CareLevel;
  form: "tablet" | "capsule";
  unitsPerPack: number;
  unitsPerDay: number;
  price: number;
  mrp: number;
  accent: string;
  accentDark: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  vegetarian: boolean;
  ageGroup: string;
  /** One sentence. What it is, said plainly. */
  summary: string;
  /** The classical framing — history, not a claim. */
  lineage: string;
  classicalReference: string;
  benefits: { title: string; body: string }[];
  formulation: FormulationRow[];
  formulationBase: string;
  dosage: {
    amount: string;
    timing: string;
    duration: string;
    max: string;
  };
  safety: {
    avoidIf: string[];
    interactions: string[];
    sideEffects: string;
  };
  qc: { label: string; spec: string }[];
  ritual: { week: string; expect: string }[];
  faqs: { q: string; a: string }[];
  batch: { code: string; made: string; expires: string; tested: string };
};

export const products: Product[] = [
  {
    slug: "gasogex",
    name: "Gas-O-Gex",
    devanagari: "गैस-ओ-जेक्स",
    tagline: "For bloating, wind and a heavy stomach",
    concern: "Digestion",
    concernSlug: "digestion",
    careLevel: "everyday",
    form: "tablet",
    unitsPerPack: 100,
    unitsPerDay: 4,
    price: 285,
    mrp: 340,
    accent: "#5F7348",
    accentDark: "#9DB57F",
    rating: 4.6,
    reviewCount: 214,
    inStock: true,
    vegetarian: true,
    ageGroup: "14 and over",
    summary:
      "A carminative tablet built from five kitchen botanicals, for the tightness and wind that follow a heavy or late meal.",
    lineage:
      "This is the least exotic formula we make, and deliberately so. Every plant in it already sits in an Indian kitchen — fennel after dinner, ajwain for a heavy stomach, a pinch of hing in the dal. The classical texts formalised what households already did; we have only standardised the quantities so each tablet behaves the same way as the last.",
    classicalReference: "Hingvashtaka Churna — Bhaishajya Ratnavali, Agnimandya Adhikara",
    benefits: [
      {
        title: "Works on wind, not on transit",
        body: "Carminatives help trapped gas disperse. This is not a laxative and will not move the bowel — if that is what you need, Kabzraj is the right product.",
      },
      {
        title: "Take it with food, not instead of it",
        body: "The formula is designed around a meal. Taken after eating, it does its work while digestion is underway.",
      },
      {
        title: "No sedatives, no antacids",
        body: "There is nothing in here that masks discomfort by numbing it, and nothing that neutralises stomach acid you need.",
      },
    ],
    formulation: [
      { ingredient: "saunf", mg: 130 },
      { ingredient: "ajwain", mg: 120 },
      { ingredient: "jeera", mg: 100 },
      { ingredient: "pudina", mg: 80, note: "As dried extract" },
      { ingredient: "hing", mg: 20, note: "Tempered, as per classical method" },
    ],
    formulationBase: "Excipients: microcrystalline cellulose, magnesium stearate. No colour, no added sugar.",
    dosage: {
      amount: "1–2 tablets",
      timing: "After lunch and after dinner, with warm water",
      duration: "Can be taken daily",
      max: "4 tablets in 24 hours",
    },
    safety: {
      avoidIf: [
        "You are pregnant or breastfeeding",
        "You are under 14",
        "You have an active gastric ulcer",
      ],
      interactions: [
        "No known interactions at label dose. If you take prescription medicine, leave a two-hour gap.",
      ],
      sideEffects:
        "Occasionally a peppery aftertaste. Stop and speak to a doctor if pain is severe, persistent, or accompanied by fever or blood.",
    },
    qc: [
      { label: "Heavy metals", spec: "Pb, As, Hg, Cd — within AYUSH limits" },
      { label: "Microbial load", spec: "TAMC < 10⁵ cfu/g" },
      { label: "Pesticide residue", spec: "Screened, within Schedule limits" },
      { label: "Disintegration", spec: "< 30 minutes" },
      { label: "Volatile oil assay", spec: "Anethole, thymol — batch certified" },
    ],
    ritual: [
      { week: "First few doses", expect: "Wind and tightness usually settle within an hour or two of a meal." },
      { week: "Week 2", expect: "Most people find the pattern less frequent rather than the episodes shorter." },
      { week: "Week 6", expect: "If nothing has changed by now, the cause is likely not simple indigestion. See a doctor." },
    ],
    faqs: [
      {
        q: "Can I take it every day?",
        a: "Yes. There is no stimulant or purgative in this formula, so it is intended for ongoing use.",
      },
      {
        q: "Will it help acidity?",
        a: "Only indirectly. It is a carminative, not an antacid. Persistent acid reflux should be looked at by a doctor rather than managed with a supplement.",
      },
      {
        q: "Is it safe with tea or coffee?",
        a: "Yes, though very strong tea taken at the same time can blunt the effect. Leave half an hour if you can.",
      },
    ],
    batch: { code: "GOG-2026-014", made: "March 2026", expires: "February 2029", tested: "March 2026" },
  },

  {
    slug: "kabzraj",
    name: "Kabzraj",
    devanagari: "कब्जराज",
    tagline: "For constipation that has not moved in days",
    concern: "Digestion",
    concernSlug: "digestion",
    careLevel: "short-course",
    form: "tablet",
    unitsPerPack: 100,
    unitsPerDay: 2,
    price: 299,
    mrp: 360,
    accent: "#96701F",
    accentDark: "#D6AE55",
    rating: 4.5,
    reviewCount: 386,
    inStock: true,
    vegetarian: true,
    ageGroup: "18 and over",
    summary:
      "A short-course formula that combines a bulking fibre with a directly acting classical purgative. Effective, and specifically not for daily use.",
    lineage:
      "Two things have to happen for a stuck bowel to move: the stool has to soften, and the gut has to be prompted to act. Isabgol does the first and senna the second. Classical practice paired them for exactly this reason, and also warned against leaning on the second one indefinitely — a warning we have carried onto the label rather than buried in a leaflet.",
    classicalReference: "Swarnapatri Yoga — Sharangadhara Samhita, Madhyama Khanda",
    benefits: [
      {
        title: "Softens and prompts",
        body: "Isabgol holds water so stool is not dry and hard; senna prompts the bowel wall. One without the other tends to disappoint.",
      },
      {
        title: "Deliberately a short course",
        body: "Stimulant laxatives lose effect and can create dependence with continuous use. Seven days, then stop — this is on the label, not in the small print.",
      },
      {
        title: "Overnight action",
        body: "Taken at bedtime, it typically works the following morning rather than at an inconvenient hour.",
      },
    ],
    formulation: [
      { ingredient: "isabgol", mg: 180, note: "95% purity" },
      { ingredient: "senna", mg: 90, note: "Sennoside-standardised" },
      { ingredient: "haritaki", mg: 110 },
      { ingredient: "saunf", mg: 70 },
      { ingredient: "ajwain", mg: 50 },
    ],
    formulationBase: "Excipients: microcrystalline cellulose, magnesium stearate. No colour, no added sugar.",
    dosage: {
      amount: "2 tablets",
      timing: "At bedtime, with a full glass of warm water",
      duration: "Up to 7 consecutive days",
      max: "2 tablets in 24 hours",
    },
    safety: {
      avoidIf: [
        "You are pregnant or breastfeeding",
        "You are under 18",
        "You have abdominal pain of unknown cause, or suspected obstruction",
        "You have inflammatory bowel disease",
      ],
      interactions: [
        "Can reduce absorption of medicines taken at the same time — leave a two-hour gap.",
        "Regular use alongside diuretics can affect potassium. Speak to your doctor first.",
      ],
      sideEffects:
        "Cramping is the common one, usually a sign the dose is higher than you need. If there is no result after three days, stop and see a doctor rather than increasing the dose.",
    },
    qc: [
      { label: "Sennoside content", spec: "Standardised, certified per batch" },
      { label: "Heavy metals", spec: "Pb, As, Hg, Cd — within AYUSH limits" },
      { label: "Microbial load", spec: "TAMC < 10⁵ cfu/g" },
      { label: "Swelling index (husk)", spec: "≥ 40" },
      { label: "Disintegration", spec: "< 30 minutes" },
    ],
    ritual: [
      { week: "Night one", expect: "Most people see a result the next morning, 6–10 hours after the dose." },
      { week: "Day 3", expect: "If there has still been no result, stop. Increasing the dose is the wrong move." },
      { week: "Day 7", expect: "Course ends. If constipation returns immediately, the cause needs looking at properly." },
    ],
    faqs: [
      {
        q: "Why only seven days?",
        a: "Senna is a stimulant laxative. Used continuously, the bowel adapts and comes to rely on it. Seven days is the point at which the risk starts to outweigh the benefit for most people.",
      },
      {
        q: "What do I do after the seven days?",
        a: "Water, fibre and movement do more for chronic constipation than any tablet. If the problem is persistent, it is worth investigating rather than repeating a course.",
      },
      {
        q: "Can I take it in the morning instead?",
        a: "You can, but it acts 6–10 hours later, so a morning dose tends to work in the evening.",
      },
    ],
    batch: { code: "KBZ-2026-021", made: "April 2026", expires: "March 2029", tested: "April 2026" },
  },

  {
    slug: "livgex",
    name: "Livgex",
    devanagari: "लिवजेक्स",
    tagline: "Daily support for liver function",
    concern: "Liver",
    concernSlug: "liver",
    careLevel: "guided",
    form: "tablet",
    unitsPerPack: 100,
    unitsPerDay: 4,
    price: 449,
    mrp: 520,
    accent: "#2E5E45",
    accentDark: "#7FBFA0",
    rating: 4.7,
    reviewCount: 178,
    inStock: true,
    vegetarian: true,
    ageGroup: "18 and over",
    summary:
      "Five classical hepatoprotective botanicals in one tablet, intended for sustained use alongside — never instead of — medical care.",
    lineage:
      "Kutki has been the liver drug of the Indian materia medica for as long as there has been one, and it is still collected from between three and four and a half thousand metres. We buy cultivated material only; the wild population cannot support the demand. The other four are the plants classical physicians reached for when Kutki alone was too cold or too sharp.",
    classicalReference: "Arogyavardhini Vati lineage — Rasaratna Samuchchaya, Adhyaya 20",
    benefits: [
      {
        title: "For sustained use",
        body: "Liver support is a matter of months, not days. This formula is designed for that timescale and priced for it.",
      },
      {
        title: "Bitter on purpose",
        body: "Kutki and Kalmegh are two of the bitterest drugs in the pharmacopoeia. The taste is not a defect; it is the active fraction.",
      },
      {
        title: "Alongside your doctor",
        body: "If you have a diagnosed liver condition, bring this to your hepatologist before starting. We would rather lose the sale than sit alongside something it should not.",
      },
    ],
    formulation: [
      { ingredient: "kutki", mg: 100, note: "Cultivated, picroside-standardised" },
      { ingredient: "bhringraj", mg: 120 },
      { ingredient: "kalmegh", mg: 90 },
      { ingredient: "punarnava", mg: 110 },
      { ingredient: "giloy", mg: 80 },
    ],
    formulationBase: "Excipients: microcrystalline cellulose, magnesium stearate. No colour, no added sugar.",
    dosage: {
      amount: "2 tablets",
      timing: "Twice daily, after food",
      duration: "Review with a practitioner after 12 weeks",
      max: "4 tablets in 24 hours",
    },
    safety: {
      avoidIf: [
        "You are pregnant or breastfeeding",
        "You are under 18",
        "You have gallstones or a bile duct obstruction",
        "You are scheduled for surgery within two weeks",
      ],
      interactions: [
        "Andrographis may add to the effect of anticoagulants and some blood-pressure medicines.",
        "If you take immunosuppressants, do not start this without your specialist's agreement.",
      ],
      sideEffects:
        "The bitterness can cause nausea if taken on an empty stomach — take it after food. Stop and seek advice if you notice yellowing of the eyes or skin, or dark urine.",
    },
    qc: [
      { label: "Picroside I + II", spec: "Standardised, certified per batch" },
      { label: "Andrographolide", spec: "Standardised, certified per batch" },
      { label: "Heavy metals", spec: "Pb, As, Hg, Cd — within AYUSH limits" },
      { label: "Aflatoxin", spec: "B1, B2, G1, G2 — not detected" },
      { label: "Species identity", spec: "Verified against reference specimen" },
    ],
    ritual: [
      { week: "Weeks 1–2", expect: "Nothing dramatic. Appetite and the feeling of heaviness after fatty food are usually the first things people mention." },
      { week: "Week 6", expect: "The point at which a repeat liver panel starts to be meaningful, if your doctor is monitoring one." },
      { week: "Week 12", expect: "Review with your practitioner. Continuing indefinitely without review is not the intent." },
    ],
    faqs: [
      {
        q: "Can I take this if I drink?",
        a: "It is not a licence to. No supplement offsets alcohol, and anything that suggests it does is not being straight with you.",
      },
      {
        q: "Will it change my liver enzyme readings?",
        a: "We make no claim about that. If your doctor is tracking LFTs, tell them you have started this so the readings are interpreted correctly.",
      },
      {
        q: "Why is it more expensive than the others?",
        a: "Cultivated Kutki costs several times what wild-collected material does. We think that trade-off is the right one.",
      },
    ],
    batch: { code: "LVG-2026-009", made: "February 2026", expires: "January 2029", tested: "February 2026" },
  },

  {
    slug: "pilegex",
    name: "Pilegex",
    devanagari: "पाइलजेक्स",
    tagline: "For haemorrhoidal discomfort and itching",
    concern: "Piles care",
    concernSlug: "piles-care",
    careLevel: "short-course",
    form: "capsule",
    unitsPerPack: 24,
    unitsPerDay: 2,
    price: 389,
    mrp: 450,
    accent: "#A6492E",
    accentDark: "#E09076",
    rating: 4.4,
    reviewCount: 291,
    inStock: true,
    vegetarian: true,
    ageGroup: "18 and over",
    summary:
      "A twelve-day course built around Surana, the classical drug named for this indication, with astringent and cooling herbs alongside.",
    lineage:
      "Bhaishajya Ratnavali names Surana directly in its chapter on arsha. The corm has to be properly processed — raw, the calcium oxalate raphides make it an irritant, which is precisely the wrong thing here. The astringents were classically added to address the weeping and the itch rather than the swelling itself.",
    classicalReference: "Surana Vataka — Bhaishajya Ratnavali, Arsha Adhikara",
    benefits: [
      {
        title: "Twelve days, then reassess",
        body: "A pack is twenty-four capsules — a deliberate twelve-day course. If nothing has improved by the end of it, you need to be examined, not to buy another pack.",
      },
      {
        title: "Works with the bowel, not against it",
        body: "Straining is the mechanism behind most haemorrhoidal complaints. Softer stool matters more than anything a capsule can do, which is why this is often taken alongside dietary fibre.",
      },
      {
        title: "We will tell you when to see a doctor",
        body: "Bleeding that is heavy, dark, or accompanied by weight loss is not something to treat at home. That sentence appears on the pack.",
      },
    ],
    formulation: [
      { ingredient: "suran", mg: 200, note: "Processed to remove raphides" },
      { ingredient: "haritaki", mg: 120 },
      { ingredient: "neem", mg: 80 },
      { ingredient: "nagkesar", mg: 60 },
      { ingredient: "amalaki", mg: 90, note: "As part of Triphala" },
    ],
    formulationBase: "Vegetarian HPMC capsule shell. No colour, no added sugar.",
    dosage: {
      amount: "1 capsule",
      timing: "Twice daily, after food",
      duration: "12 days — one pack is one course",
      max: "2 capsules in 24 hours",
    },
    safety: {
      avoidIf: [
        "You are pregnant or breastfeeding",
        "You are under 18",
        "You are passing dark or heavy blood",
        "You have a known oxalate sensitivity or a history of kidney stones",
      ],
      interactions: [
        "No known interactions at label dose. Leave a two-hour gap from prescription medicine.",
      ],
      sideEffects:
        "A mild warming sensation is common in the first days. Seek medical advice for severe pain, fever, or bleeding that increases.",
    },
    qc: [
      { label: "Oxalate (processed corm)", spec: "Reduced, verified per batch" },
      { label: "Heavy metals", spec: "Pb, As, Hg, Cd — within AYUSH limits" },
      { label: "Microbial load", spec: "TAMC < 10⁵ cfu/g" },
      { label: "Capsule shell", spec: "HPMC, vegetarian, gelatin-free" },
      { label: "Species identity", spec: "Verified against reference specimen" },
    ],
    ritual: [
      { week: "Days 1–3", expect: "Itching and irritation are usually the first things to settle." },
      { week: "Days 4–8", expect: "Discomfort on passing stool typically eases, provided stool is soft." },
      { week: "Day 12", expect: "Course ends. Persistent symptoms need examination — a second pack is not the answer." },
    ],
    faqs: [
      {
        q: "Why is a pack only twenty-four capsules?",
        a: "Because a course is twelve days. A larger pack would encourage indefinite use of something that should prompt a check-up if it stops working.",
      },
      {
        q: "Can I take this with Kabzraj?",
        a: "For a short period, yes — softer stool is the point. Do not run both beyond seven days without advice.",
      },
      {
        q: "Will this shrink a prolapse?",
        a: "No. Prolapsed haemorrhoids are a clinical matter. Please see a surgeon rather than treating them at home.",
      },
    ],
    batch: { code: "PLG-2026-017", made: "March 2026", expires: "February 2029", tested: "March 2026" },
  },

  {
    slug: "lucogex",
    name: "Lucogex",
    devanagari: "लुकोजेक्स",
    tagline: "For white discharge and intimate irritation",
    concern: "Women's wellness",
    concernSlug: "womens-wellness",
    careLevel: "guided",
    form: "capsule",
    unitsPerPack: 24,
    unitsPerDay: 2,
    price: 399,
    mrp: 470,
    accent: "#8F5560",
    accentDark: "#D79AA5",
    rating: 4.5,
    reviewCount: 143,
    inStock: true,
    vegetarian: true,
    ageGroup: "18 and over",
    summary:
      "Lodhra, Ashoka and Shatavari in their classical arrangement, for the symptom described in Ayurveda as shweta pradara.",
    lineage:
      "Lodhra bark appears in almost every historical formula for this indication, usually with Ashoka and a bitter such as Daruharidra. What the classical texts could not do is distinguish between causes — and that distinction matters enormously here, which is why this is the one product we ask people to start under guidance.",
    classicalReference: "Lodhrasava lineage — Bhaishajya Ratnavali, Pradara Adhikara",
    benefits: [
      {
        title: "Start with a diagnosis",
        body: "Discharge has several causes and they are not treated the same way. A gynaecologist can tell them apart in a single visit; a supplement cannot.",
      },
      {
        title: "Classical, not improvised",
        body: "Lodhra with Ashoka is one of the oldest documented pairings in the Indian materia medica for this indication.",
      },
      {
        title: "Ethically sourced Ashoka",
        body: "Saraca asoca is under real collection pressure. Ours is cultivated, and we would rather say that than stay quiet about it.",
      },
    ],
    formulation: [
      { ingredient: "lodhra", mg: 180 },
      { ingredient: "ashoka", mg: 150, note: "Cultivated stock only" },
      { ingredient: "shatavari", mg: 120 },
      { ingredient: "nagkesar", mg: 60 },
      { ingredient: "daruharidra", mg: 70 },
    ],
    formulationBase: "Vegetarian HPMC capsule shell. No colour, no added sugar.",
    dosage: {
      amount: "1 capsule",
      timing: "Twice daily, after food",
      duration: "Review with a practitioner after 12 days",
      max: "2 capsules in 24 hours",
    },
    safety: {
      avoidIf: [
        "You are pregnant or trying to conceive",
        "You are breastfeeding",
        "You are under 18",
        "You have an undiagnosed change in discharge, odour, or bleeding",
      ],
      interactions: [
        "Shatavari is a phytoestrogen. If you have a hormone-sensitive condition or take hormonal medication, speak to your doctor first.",
      ],
      sideEffects:
        "Mild digestive heaviness in the first days. Seek medical advice for fever, pelvic pain, foul odour, or bleeding between periods — these are not symptoms to manage at home.",
    },
    qc: [
      { label: "Berberine (Daruharidra)", spec: "Standardised, certified per batch" },
      { label: "Heavy metals", spec: "Pb, As, Hg, Cd — within AYUSH limits" },
      { label: "Microbial load", spec: "TAMC < 10⁵ cfu/g" },
      { label: "Ashoka provenance", spec: "Cultivated, chain-of-custody documented" },
      { label: "Species identity", spec: "Verified against reference specimen" },
    ],
    ritual: [
      { week: "Days 1–4", expect: "Irritation typically settles before anything else changes." },
      { week: "Days 5–12", expect: "Most people report a gradual change rather than a sudden one." },
      { week: "After day 12", expect: "Review with your gynaecologist. Continuing without a diagnosis is not the right path." },
    ],
    faqs: [
      {
        q: "Do I really need to see a doctor first?",
        a: "We would strongly prefer it. Bacterial vaginosis, thrush and a hormonal cause all present similarly and are managed differently. One consultation saves months of guessing.",
      },
      {
        q: "Can I take it during my period?",
        a: "Yes, there is no need to stop.",
      },
      {
        q: "Is it safe while trying to conceive?",
        a: "No. Shatavari's hormonal activity is not something to introduce while trying to conceive without a doctor's input.",
      },
    ],
    batch: { code: "LCG-2026-011", made: "February 2026", expires: "January 2029", tested: "February 2026" },
  },
];

export const CARE_LEVELS: Record<
  CareLevel,
  { label: string; short: string; description: string; tone: "safe" | "caution" | "info" }
> = {
  everyday: {
    label: "Everyday",
    short: "Safe for ongoing daily use",
    description:
      "No stimulant or purgative action. Suitable to take continuously at label dose, within the stated cautions.",
    tone: "safe",
  },
  "short-course": {
    label: "Short course",
    short: "Intended for a defined period",
    description:
      "Designed to be taken for a set number of days and then stopped. If symptoms persist past the course, that is a signal to be examined — not to start another pack.",
    tone: "caution",
  },
  guided: {
    label: "Practitioner-guided",
    short: "Start under medical guidance",
    description:
      "The underlying causes here need distinguishing before treatment. Please begin this alongside a registered practitioner rather than on your own.",
    tone: "info",
  },
};

export const CONCERNS = [
  {
    slug: "digestion",
    title: "Digestion",
    hindi: "पाचन",
    blurb: "Bloating, wind, acidity and constipation — the everyday complaints.",
  },
  {
    slug: "liver",
    title: "Liver",
    hindi: "यकृत",
    blurb: "Sustained support for the organ that does the quiet work.",
  },
  {
    slug: "piles-care",
    title: "Piles care",
    hindi: "अर्श",
    blurb: "Haemorrhoidal discomfort, itching and irritation.",
  },
  {
    slug: "womens-wellness",
    title: "Women's wellness",
    hindi: "स्त्री स्वास्थ्य",
    blurb: "Classical formulations for gynaecological complaints.",
  },
] as const;

export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function productsByConcern(concernSlug: string): Product[] {
  return products.filter((p) => p.concernSlug === concernSlug);
}

/** Total mg of declared actives per dose — used by the formulation table. */
export function totalActives(product: Product): number {
  return product.formulation.reduce((sum, row) => sum + row.mg, 0);
}
