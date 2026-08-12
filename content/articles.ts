/**
 * Health Library.
 *
 * Written as reference material rather than content marketing: each piece
 * answers a question a real customer asks, and several of them argue against
 * buying something. That is the point — a library that only ever concludes
 * "and that is why you need our product" is an advertisement, and readers
 * can tell.
 */

export type Article = {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  category: "Understanding" | "Ingredients" | "How we work" | "Practical";
  readingMinutes: number;
  published: string;
  updated?: string;
  author: string;
  authorRole: string;
  /** Body is rendered as a sequence of blocks — no markdown parser needed. */
  body: (
    | { type: "p"; text: string }
    | { type: "h"; text: string }
    | { type: "list"; items: string[] }
    | { type: "quote"; text: string }
    | { type: "callout"; tone: "info" | "caution"; title: string; text: string }
  )[];
  related?: string[];
};

export const articles: Article[] = [
  {
    slug: "when-constipation-is-not-just-constipation",
    title: "When constipation is not just constipation",
    kicker: "Knowing when to stop self-treating",
    excerpt:
      "Most constipation is dietary and resolves. A small proportion is a signal. Here is how to tell the difference, and when to stop reaching for a laxative.",
    category: "Understanding",
    readingMinutes: 6,
    published: "2026-05-04",
    author: "PLACEHOLDER — reviewer name",
    authorRole: "PLACEHOLDER — BAMS / MD, registration number",
    body: [
      {
        type: "p",
        text: "Constipation is one of the most common reasons people buy something from a chemist without asking anyone first. Usually that is reasonable. Occasionally it is not, and the difference is worth knowing before you spend three months managing a symptom rather than its cause.",
      },
      { type: "h", text: "What ordinary constipation looks like" },
      {
        type: "p",
        text: "It follows a change — travel, a period of eating differently, less water, less movement, a new medicine. It responds to fibre and fluid. It comes and goes rather than steadily worsening. And it is not accompanied by anything else.",
      },
      { type: "h", text: "What warrants a consultation" },
      {
        type: "list",
        items: [
          "A change in bowel habit that has persisted for more than three weeks without an obvious cause",
          "Blood in the stool, or stool that is black and tarry",
          "Weight loss you did not intend",
          "Constipation alternating with diarrhoea",
          "Pain that wakes you at night",
          "A first episode of significant constipation after the age of forty-five",
        ],
      },
      {
        type: "callout",
        tone: "caution",
        title: "This list is not exhaustive",
        text: "It is a prompt to see someone, not a diagnostic tool. If something feels wrong to you and is not on this list, that is still a good reason to be examined.",
      },
      { type: "h", text: "On stimulant laxatives" },
      {
        type: "p",
        text: "Senna and its relatives work by prompting the bowel wall directly. They are effective and they have a place. What they are not is a daily habit: with continuous use the bowel adapts, the dose creeps up, and you end up managing the laxative rather than the constipation.",
      },
      {
        type: "p",
        text: "This is why our own Kabzraj is sold as a seven-day course and says so on the label. It is a slightly awkward thing for a company to print, because it caps how much of it any one person will buy. It is also true.",
      },
      { type: "h", text: "What actually helps, long term" },
      {
        type: "list",
        items: [
          "Water, in a quantity that feels excessive at first",
          "Soluble fibre — psyllium husk is cheap and well documented",
          "Movement, particularly after meals",
          "A consistent time of day, because the bowel responds to routine",
          "Reviewing any medicine you take that lists constipation as a side effect",
        ],
      },
      {
        type: "quote",
        text: "If a laxative stops working, the answer is almost never a stronger laxative.",
      },
    ],
    related: ["reading-an-ayurvedic-label", "what-third-party-testing-actually-means"],
  },
  {
    slug: "reading-an-ayurvedic-label",
    title: "How to read an Ayurvedic label",
    kicker: "A practical guide, including to ours",
    excerpt:
      "Proprietary Ayurvedic medicines are labelled to a different standard than pharmaceuticals. Here is what the words mean, what is legally required, and what is missing when it is missing.",
    category: "Practical",
    readingMinutes: 8,
    published: "2026-04-18",
    updated: "2026-06-30",
    author: "PLACEHOLDER — reviewer name",
    authorRole: "PLACEHOLDER — regulatory affairs",
    body: [
      {
        type: "p",
        text: "Two bottles can carry the same herb list and contain quite different products. The gap sits in the detail that labels are not always required to give you — and once you know which details those are, comparing becomes much easier.",
      },
      { type: "h", text: "Look for the part of the plant" },
      {
        type: "p",
        text: "\"Ashwagandha\" tells you almost nothing. Root and leaf have different constituent profiles and different traditional uses. A label that says \"root\" is telling you something; a label that says only the name is either not tracking it or not sharing it.",
      },
      { type: "h", text: "Look for a quantity next to each name" },
      {
        type: "p",
        text: "A list of fifteen herbs with no quantities can legitimately mean fifteen meaningful inclusions, or two meaningful ones and thirteen present in trace amounts so they can appear on the front of the pack. Without numbers you cannot tell, and that ambiguity is sometimes the point.",
      },
      { type: "h", text: "Look for the licence" },
      {
        type: "p",
        text: "An Ayurvedic medicine manufactured in India carries a manufacturing licence number issued by the state's Directorate of Ayurveda. It should be printed on the pack. If you cannot find one, that is a meaningful absence.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Extract ratios",
        text: "\"10:1 extract\" means ten parts raw herb produced one part extract. It is useful information — but only alongside a quantity. A 10:1 extract at an undisclosed dose tells you nothing at all.",
      },
      { type: "h", text: "What claims are not allowed to say" },
      {
        type: "p",
        text: "Indian advertising rules restrict claims that a product cures or prevents specific diseases. This is why careful brands write \"traditionally used to support\" and less careful ones write \"cures\". The wording is not timidity; it reflects what has actually been established.",
      },
      {
        type: "p",
        text: "You will find \"cures\" printed on some packs anyway, including on older stock of our own labels. We are revising those, and we would rather write this paragraph than pretend otherwise.",
      },
    ],
    related: ["what-third-party-testing-actually-means", "why-we-publish-the-full-formula"],
  },
  {
    slug: "what-third-party-testing-actually-means",
    title: "What third-party testing actually means",
    kicker: "And what it does not",
    excerpt:
      "Heavy metals, microbial limits, aflatoxin, species identity. What gets tested in an Ayurvedic supply chain, who does the testing, and the questions worth asking a brand.",
    category: "How we work",
    readingMinutes: 7,
    published: "2026-03-09",
    author: "PLACEHOLDER — reviewer name",
    authorRole: "PLACEHOLDER — quality assurance",
    body: [
      {
        type: "p",
        text: "\"Lab tested\" appears on a great many packs and means a wide range of things. It is worth knowing what was tested, by whom, and whether the result travels with the batch you are holding.",
      },
      { type: "h", text: "The four tests that matter most" },
      {
        type: "list",
        items: [
          "Heavy metals — lead, arsenic, mercury and cadmium. Plants concentrate what is in their soil, so this is about where a herb was grown as much as how it was handled.",
          "Microbial limits — total aerobic count, yeast and mould, and specific pathogens. Dried plant material is not sterile.",
          "Aflatoxin — a mould toxin, relevant to anything stored warm and humid, which in India is most things.",
          "Species identity — confirming the plant is what the invoice says. Substitution is the quiet problem of the botanical trade, and it is not always deliberate.",
        ],
      },
      { type: "h", text: "Who does the testing" },
      {
        type: "p",
        text: "An in-house lab is not the same as an accredited one. NABL accreditation means a laboratory's methods and competence have been independently assessed. Ask which lab, and ask whether the report is per-batch or a one-off from a batch made two years ago.",
      },
      { type: "h", text: "The question worth asking" },
      {
        type: "quote",
        text: "Can I see the report for the batch number printed on this bottle?",
      },
      {
        type: "p",
        text: "If the answer is yes, everything else on the pack becomes more credible. If it is no, that is worth weighing. We publish ours per batch at the verify page, and we would encourage you to hold every brand you buy from to the same standard, including us.",
      },
    ],
    related: ["why-we-publish-the-full-formula", "reading-an-ayurvedic-label"],
  },
  {
    slug: "why-we-publish-the-full-formula",
    title: "Why we publish the full formula",
    kicker: "The argument against secret blends",
    excerpt:
      "Proprietary blends protect a recipe from competitors. They also prevent a pharmacist from checking an interaction. We decided which of those mattered more.",
    category: "How we work",
    readingMinutes: 5,
    published: "2026-02-11",
    author: "PLACEHOLDER — founder name",
    authorRole: "PLACEHOLDER — role",
    body: [
      {
        type: "p",
        text: "The standard argument for a proprietary blend is straightforward: the formula is the business, and publishing it invites imitation. It is not an unreasonable position. We took the other one.",
      },
      { type: "h", text: "What a hidden formula costs" },
      {
        type: "p",
        text: "A pharmacist cannot check an interaction against a list without quantities. A physician cannot advise a patient on whether to continue something before surgery. A person with a known sensitivity cannot establish whether a product is safe for them. In each of those cases the sensible answer becomes \"don't take it\" — which is the correct answer, and a lost customer.",
      },
      { type: "h", text: "What imitation actually requires" },
      {
        type: "p",
        text: "Most of these formulae are centuries old and printed in texts anyone can buy. The recipe was never the secret. What is difficult is sourcing cultivated Kutki rather than wild, processing Surana properly, and holding a specification batch after batch. None of that is protected by withholding a number from a label.",
      },
      {
        type: "quote",
        text: "If a formula only works commercially while nobody can see it, that is a marketing position rather than a formulation.",
      },
      {
        type: "p",
        text: "So every product page here carries the full composition, the part of the plant used, the quantity per dose, and what we test for. If a competitor finds that useful, we can live with it.",
      },
    ],
    related: ["what-third-party-testing-actually-means", "reading-an-ayurvedic-label"],
  },
  {
    slug: "kutki-and-the-problem-of-wild-collection",
    title: "Kutki, and the problem of wild collection",
    kicker: "Ingredient note",
    excerpt:
      "Picrorhiza kurroa grows between three and four and a half thousand metres, and demand has outrun what those slopes can supply. What that means for what you pay.",
    category: "Ingredients",
    readingMinutes: 6,
    published: "2026-01-24",
    author: "PLACEHOLDER — reviewer name",
    authorRole: "PLACEHOLDER — sourcing",
    body: [
      {
        type: "p",
        text: "Kutki has been the liver drug of the Indian materia medica for as long as there has been one. It also grows in a narrow high-altitude band in the western Himalaya, takes years to reach a harvestable rhizome, and is collected by hand.",
      },
      { type: "h", text: "Why wild-collected is cheaper" },
      {
        type: "p",
        text: "Because nobody paid to grow it. Wild collection carries no cultivation cost, no land cost and no waiting. It also carries no traceability, no certainty of species, and no guarantee the population recovers.",
      },
      { type: "h", text: "What cultivation changes" },
      {
        type: "list",
        items: [
          "The species is verifiable, because you know what was planted",
          "Harvest timing can be controlled, which matters for glycoside content",
          "The grower is identifiable, so a bad batch can be traced",
          "The wild population is left alone",
        ],
      },
      {
        type: "p",
        text: "It costs several times more. That difference is most of why Livgex is our most expensive product, and we would rather explain the price than quietly source the cheaper material.",
      },
      {
        type: "callout",
        tone: "info",
        title: "The same applies to Ashoka",
        text: "Saraca asoca is under comparable pressure. The bark used in Lucogex is cultivated for the same reasons.",
      },
    ],
    related: ["why-we-publish-the-full-formula"],
  },
  {
    slug: "supplements-that-do-not-need-to-exist",
    title: "Supplements that do not need to exist",
    kicker: "An uncomfortable list",
    excerpt:
      "A large share of what is sold in this category solves a problem that water, sleep or a doctor's appointment would solve better. Including, sometimes, ours.",
    category: "Understanding",
    readingMinutes: 5,
    published: "2026-06-06",
    author: "PLACEHOLDER — founder name",
    authorRole: "PLACEHOLDER — role",
    body: [
      {
        type: "p",
        text: "It is an odd thing for a supplement company to publish, but the category has an honesty problem and pretending otherwise does not help anyone.",
      },
      { type: "h", text: "Things a supplement will not fix" },
      {
        type: "list",
        items: [
          "Chronic constipation caused by not drinking water",
          "Fatigue caused by not sleeping",
          "Reflux that has gone on for months and has never been looked at",
          "Anything accompanied by unexplained weight loss",
          "A liver under strain from ongoing alcohol use",
        ],
      },
      {
        type: "p",
        text: "In each of those cases something else is the answer, and buying a bottle mostly delays it. We would rather say so on our own website than have you discover it after three months.",
      },
      { type: "h", text: "Where a formulation does earn its place" },
      {
        type: "p",
        text: "For a defined complaint, over a defined period, alongside the boring fundamentals rather than instead of them. That is a much smaller claim than the category usually makes, and it is the one we are willing to stand behind.",
      },
      {
        type: "quote",
        text: "The most useful thing we can tell some visitors is that they do not need to buy anything from us.",
      },
    ],
    related: ["when-constipation-is-not-just-constipation"],
  },
];

export const articleBySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return articleBySlug.get(slug);
}
