/**
 * Ingredient monographs.
 *
 * Botanical identity (binomial, family, part used) is factual and checkable.
 * `traditional` describes classical use — that is history, not a health claim.
 * `studied` describes what modern researchers have looked at, deliberately
 * phrased as an area of investigation rather than a proven effect; citations
 * are listed in content/_PLACEHOLDER.md and must be attached before launch.
 */

export type Ingredient = {
  slug: string;
  sanskrit: string;
  devanagari: string;
  common: string;
  latin: string;
  family: string;
  part: string;
  region: string;
  rasa: string;
  traditional: string;
  studied: string;
  safety?: string;
};

export const ingredients: Ingredient[] = [
  {
    slug: "haritaki",
    sanskrit: "Haritaki",
    devanagari: "हरीतकी",
    common: "Chebulic myrobalan",
    latin: "Terminalia chebula",
    family: "Combretaceae",
    part: "Fruit pericarp",
    region: "Sub-Himalayan tracts, Madhya Pradesh",
    rasa: "Astringent, with all tastes but salt",
    traditional:
      "One of the three fruits of Triphala and among the most cited single drugs in the classical corpus. Used to regulate downward movement in the gut — enough to relieve, not enough to purge.",
    studied:
      "Investigated for tannin and anthraquinone content and their effect on intestinal transit time.",
    safety: "Not advised during pregnancy or in acute dehydration.",
  },
  {
    slug: "bibhitaki",
    sanskrit: "Bibhitaki",
    devanagari: "बिभीतकी",
    common: "Belleric myrobalan",
    latin: "Terminalia bellirica",
    family: "Combretaceae",
    part: "Fruit pericarp",
    region: "Central India",
    rasa: "Astringent",
    traditional:
      "The second fruit of Triphala. Classically paired with Haritaki to temper its mobility.",
    studied: "Examined for gallotannin content and antioxidant activity in vitro.",
  },
  {
    slug: "amalaki",
    sanskrit: "Amalaki",
    devanagari: "आमलकी",
    common: "Indian gooseberry",
    latin: "Phyllanthus emblica",
    family: "Phyllanthaceae",
    part: "Fruit",
    region: "Uttarakhand, Gujarat",
    rasa: "Sour, with five of six tastes",
    traditional:
      "The third fruit of Triphala and the cooling member of the trio. Described in classical texts as a rasayana — a substance taken over time rather than for an episode.",
    studied:
      "Studied for its vitamin C and polyphenol profile, and for stability of that profile after drying.",
  },
  {
    slug: "suran",
    sanskrit: "Surana",
    devanagari: "सूरन",
    common: "Elephant foot yam",
    latin: "Amorphophallus paeoniifolius",
    family: "Araceae",
    part: "Corm",
    region: "West Bengal, Odisha",
    rasa: "Pungent, astringent",
    traditional:
      "The classical drug of choice for arsha (haemorrhoidal complaints), named directly in Bhaishajya Ratnavali. Prepared to remove the raphides that make the raw corm an irritant.",
    studied: "Looked at for its fibre fraction and effect on stool bulk.",
    safety:
      "Must be properly processed. Avoid if you have a known oxalate sensitivity.",
  },
  {
    slug: "neem",
    sanskrit: "Nimba",
    devanagari: "नीम",
    common: "Neem",
    latin: "Azadirachta indica",
    family: "Meliaceae",
    part: "Leaf",
    region: "Rajasthan, Tamil Nadu",
    rasa: "Bitter",
    traditional:
      "Used where heat and irritation present together. The bitterness is the point — in Ayurvedic reasoning, bitter cools.",
    studied: "Investigated for limonoid content, principally azadirachtin and nimbin.",
    safety: "Not advised during pregnancy or while trying to conceive.",
  },
  {
    slug: "nagkesar",
    sanskrit: "Nagakeshara",
    devanagari: "नागकेसर",
    common: "Ceylon ironwood",
    latin: "Mesua ferrea",
    family: "Calophyllaceae",
    part: "Stamen",
    region: "Assam, Western Ghats",
    rasa: "Astringent, bitter",
    traditional:
      "A classical styptic, used where tissue is inflamed and weeping. Appears in both haemorrhoidal and gynaecological formulae.",
    studied: "Examined for mesuol and coumarin constituents.",
  },
  {
    slug: "lodhra",
    sanskrit: "Lodhra",
    devanagari: "लोध्र",
    common: "Lodh tree",
    latin: "Symplocos racemosa",
    family: "Symplocaceae",
    part: "Stem bark",
    region: "Eastern Himalaya, Assam",
    rasa: "Astringent, bitter",
    traditional:
      "The principal classical drug for shweta pradara. Named in nearly every historical formula for the indication.",
    studied: "Studied for loturine and other benzylisoquinoline alkaloids.",
  },
  {
    slug: "ashoka",
    sanskrit: "Ashoka",
    devanagari: "अशोक",
    common: "Ashoka tree",
    latin: "Saraca asoca",
    family: "Fabaceae",
    part: "Stem bark",
    region: "Western Ghats, Odisha",
    rasa: "Astringent, bitter",
    traditional:
      "Named for the tree said to remove sorrow; used classically for menstrual discomfort and irregular flow.",
    studied: "Investigated for catechin and glycoside content.",
    safety:
      "Sourced only from cultivated stock. Saraca asoca is under collection pressure in the wild.",
  },
  {
    slug: "shatavari",
    sanskrit: "Shatavari",
    devanagari: "शतावरी",
    common: "Wild asparagus",
    latin: "Asparagus racemosus",
    family: "Asparagaceae",
    part: "Root tuber",
    region: "Madhya Pradesh, Maharashtra",
    rasa: "Sweet, bitter",
    traditional:
      "A rasayana specific to the female reproductive system, used over months rather than days.",
    studied: "Examined for steroidal saponins, the shatavarins.",
  },
  {
    slug: "daruharidra",
    sanskrit: "Daruharidra",
    devanagari: "दारुहरिद्रा",
    common: "Indian barberry",
    latin: "Berberis aristata",
    family: "Berberidaceae",
    part: "Stem",
    region: "Himachal Pradesh, Uttarakhand",
    rasa: "Bitter, astringent",
    traditional: "Used where discharge and irritation occur together.",
    studied: "One of the best-characterised Indian botanicals, for its berberine content.",
  },
  {
    slug: "kutki",
    sanskrit: "Katuki",
    devanagari: "कुटकी",
    common: "Picrorhiza",
    latin: "Picrorhiza kurroa",
    family: "Plantaginaceae",
    part: "Rhizome",
    region: "High-altitude Himalaya, 3,000–4,500 m",
    rasa: "Bitter",
    traditional:
      "The classical liver drug. Intensely bitter, and used in small quantity for exactly that reason.",
    studied: "Studied for the iridoid glycosides picroside I and II.",
    safety:
      "A Himalayan species under collection pressure; we buy cultivated material only.",
  },
  {
    slug: "bhringraj",
    sanskrit: "Bhringaraja",
    devanagari: "भृंगराज",
    common: "False daisy",
    latin: "Eclipta prostrata",
    family: "Asteraceae",
    part: "Whole plant",
    region: "Punjab, Uttar Pradesh — irrigated plains",
    rasa: "Bitter, pungent",
    traditional: "Classically paired with Kutki in liver formulae.",
    studied: "Investigated for wedelolactone content.",
  },
  {
    slug: "kalmegh",
    sanskrit: "Kalamegha",
    devanagari: "कालमेघ",
    common: "King of bitters",
    latin: "Andrographis paniculata",
    family: "Acanthaceae",
    part: "Whole plant",
    region: "Tamil Nadu, Andhra Pradesh",
    rasa: "Bitter",
    traditional: "Called bhunimba — 'neem of the ground' — for its bitterness.",
    studied:
      "Among the more heavily researched Indian botanicals, for andrographolide content.",
    safety: "Not advised during pregnancy.",
  },
  {
    slug: "punarnava",
    sanskrit: "Punarnava",
    devanagari: "पुनर्नवा",
    common: "Spreading hogweed",
    latin: "Boerhavia diffusa",
    family: "Nyctaginaceae",
    part: "Root",
    region: "Across the Indian plains",
    rasa: "Sweet, bitter, astringent",
    traditional:
      "The name means 'renewed again' — the plant revives with the first monsoon rain. Used classically where fluid accumulates.",
    studied: "Examined for punarnavine and boeravinone constituents.",
  },
  {
    slug: "giloy",
    sanskrit: "Guduchi",
    devanagari: "गुडूची",
    common: "Heart-leaved moonseed",
    latin: "Tinospora cordifolia",
    family: "Menispermaceae",
    part: "Stem",
    region: "Central and northern India",
    rasa: "Bitter, astringent",
    traditional:
      "Called amrita, the nectar of immortality — a rasayana used across many indications rather than one.",
    studied: "Studied for tinosporaside and its polysaccharide fraction.",
  },
  {
    slug: "senna",
    sanskrit: "Svarnapatri",
    devanagari: "स्वर्णपत्री",
    common: "Indian senna",
    latin: "Senna alexandrina",
    family: "Fabaceae",
    part: "Leaflet",
    region: "Tirunelveli, Tamil Nadu",
    rasa: "Bitter, pungent",
    traditional: "A directly acting classical purgative, used briefly rather than daily.",
    studied: "Well characterised for its sennoside content.",
    safety:
      "Stimulant laxative. Not for continuous use beyond one week, and not during pregnancy.",
  },
  {
    slug: "isabgol",
    sanskrit: "Ishadgola",
    devanagari: "ईसबगोल",
    common: "Psyllium husk",
    latin: "Plantago ovata",
    family: "Plantaginaceae",
    part: "Seed husk",
    region: "Mehsana, Gujarat",
    rasa: "Sweet",
    traditional: "Used to add softness and bulk where stool is dry and hard.",
    studied:
      "A well-documented soluble fibre; its water-holding capacity is the mechanism.",
    safety: "Always take with a full glass of water.",
  },
  {
    slug: "saunf",
    sanskrit: "Mishreya",
    devanagari: "सौंफ",
    common: "Fennel",
    latin: "Foeniculum vulgare",
    family: "Apiaceae",
    part: "Fruit",
    region: "Mandsaur, Madhya Pradesh",
    rasa: "Sweet, pungent",
    traditional:
      "Chewed after meals across India for a reason — a carminative in the plainest sense.",
    studied: "Characterised for anethole content in its volatile oil.",
  },
  {
    slug: "ajwain",
    sanskrit: "Yavani",
    devanagari: "अजवायन",
    common: "Carom seed",
    latin: "Trachyspermum ammi",
    family: "Apiaceae",
    part: "Fruit",
    region: "Rajasthan",
    rasa: "Pungent, bitter",
    traditional: "The household remedy for a heavy stomach, and a classical drug in its own right.",
    studied: "Studied for thymol, its principal volatile constituent.",
  },
  {
    slug: "jeera",
    sanskrit: "Jiraka",
    devanagari: "जीरा",
    common: "Cumin",
    latin: "Cuminum cyminum",
    family: "Apiaceae",
    part: "Fruit",
    region: "Unjha, Gujarat",
    rasa: "Pungent",
    traditional: "Classically described as kindling digestive fire without adding heat.",
    studied: "Characterised for cuminaldehyde content.",
  },
  {
    slug: "hing",
    sanskrit: "Hingu",
    devanagari: "हींग",
    common: "Asafoetida",
    latin: "Ferula asafoetida",
    family: "Apiaceae",
    part: "Oleo-gum-resin",
    region: "Imported resin, processed in Punjab",
    rasa: "Pungent",
    traditional:
      "Used in tiny quantity for trapped wind. The classical texts are specific that it must be tempered in fat before use.",
    studied: "Examined for ferulic acid esters and sulphur compounds.",
  },
  {
    slug: "pudina",
    sanskrit: "Putiha",
    devanagari: "पुदीना",
    common: "Mint",
    latin: "Mentha piperita",
    family: "Lamiaceae",
    part: "Leaf",
    region: "Barabanki, Uttar Pradesh",
    rasa: "Pungent",
    traditional: "Cooling and settling; used where the stomach is both hot and tight.",
    studied: "Well characterised for menthol content.",
    safety: "May aggravate reflux in some people.",
  },
];

export const ingredientBySlug = new Map(ingredients.map((i) => [i.slug, i]));

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredientBySlug.get(slug);
}
