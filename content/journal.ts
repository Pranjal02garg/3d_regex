export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  content: string;
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "understanding-schedule-t-gmp",
    title: "Understanding Schedule T GMP: Why Manufacturing Standards Matter",
    excerpt: "Ayurveda is ancient, but its manufacturing shouldn't be. Learn why Schedule T GMP certification is non-negotiable for modern botanicals.",
    date: "2026-08-10",
    author: "Dr. Ananya Sharma",
    category: "Quality & Safety",
    content: `
When you purchase an Ayurvedic formulation, you are placing immense trust in the manufacturer. Unlike modern pharmaceuticals where a single active molecule is synthesized in a lab, Ayurvedic medicines rely on complex botanical extracts. The soil quality, harvest time, extraction method, and hygiene of the facility all dramatically impact the final product.

### What is Schedule T?
Schedule T of the Drugs and Cosmetics Act (1940) outlines the Good Manufacturing Practices (GMP) specifically for Ayurvedic, Siddha, and Unani medicines. It is a rigorous framework designed to ensure that products are consistently produced and controlled according to quality standards.

### The Problem with Unregulated Manufacturing
Without strict adherence to GMP, botanical formulations are susceptible to:
- **Heavy Metal Contamination:** Lead, mercury, and arsenic from poor soil or unclean equipment.
- **Microbial Growth:** Fungus and bacteria thriving on improperly dried herbs.
- **Adulteration:** Substituting expensive herbs with cheaper, ineffective alternatives.

### The Regex Remedies Standard
At Regex Remedies, our facility is entirely Schedule T GMP certified. But we go a step further. Every single batch is independently tested by a NABL-accredited laboratory before it ever reaches you. We test for heavy metals, microbial load, and the exact concentration of the active phytochemicals (assay markers) we promise on the label.

Transparency isn't just a marketing word for us. It is the foundation of our entire manufacturing process.
    `,
  },
  {
    slug: "science-of-digestion-ayurveda",
    title: "Agni: The Ayurvedic Science of Digestion and Metabolism",
    excerpt: "In Ayurveda, you aren't what you eat—you are what you digest. Explore the concept of Agni and how botanical formulations support gut health.",
    date: "2026-07-28",
    author: "Dr. Rajesh Kumar",
    category: "Science & Tradition",
    content: `
Modern medicine has recently discovered the 'gut microbiome' and its profound impact on overall health, immunity, and even mental well-being. Ayurveda, however, has centered its entire philosophy on this concept for over 3,000 years through the principle of *Agni* (digestive fire).

### Understanding Agni
Agni is the biological fire that governs metabolism. It is responsible for digesting food, absorbing nutrients, and cellular transformation. When Agni is strong (Sama Agni), the body extracts nourishment efficiently and eliminates waste completely. 

When Agni is impaired (Vishama, Tikshna, or Manda Agni), it leads to the accumulation of *Ama*—toxic, un-metabolized byproducts that are the root cause of systemic inflammation and chronic disease.

### Botanical Support for Agni
Our formulations like **Gasogex** and **Kabzraj** are not just designed to suppress symptoms. They are formulated to restore Agni. 
- *Zingiber officinale* (Ginger) acts as a deepan (appetizer) and pachan (digestant), physically stimulating gastric emptying.
- *Foeniculum vulgare* (Fennel) relaxes the smooth muscles of the gastrointestinal tract, relieving spasm and trapped wind.

By combining standardized extracts of these classical herbs, we provide reliable, measurable support for your digestive fire.
    `,
  },
  {
    slug: "the-open-formulary-promise",
    title: "The Open Formulary: Radical Transparency in Botanical Medicine",
    excerpt: "Why we publish the exact parts, quantities, and active marker concentrations of every herb we use.",
    date: "2026-07-15",
    author: "Regex Remedies Quality Team",
    category: "Our Philosophy",
    content: `
Walk down the supplement aisle of any pharmacy, and pick up an Ayurvedic or herbal product. Turn it around and look at the label. You will likely see a list of herbs, perhaps a 'proprietary blend', and very little else.

You won't see which part of the plant was used (the root? the leaf? the stem?). You won't see the extraction ratio. And you certainly won't see the concentration of the active phytochemicals that actually do the work.

### Why the Secrecy?
The lack of transparency in the herbal industry is often defended as 'protecting trade secrets'. In reality, it allows manufacturers to use 'fairy dusting'—adding a microscopically small, clinically ineffective amount of an expensive herb just to list it on the label.

### The Open Formulary Engine
We built Regex Remedies as an antidote to this opacity. We believe you have a fundamental right to know exactly what you are putting into your body.

Our **Open Formulary** is a commitment to radical transparency:
1. **Botanical Name & Part Used:** We specify *Withania somnifera* (Root), not just 'Ashwagandha'.
2. **Extraction Ratio:** We state if it 10:1 extract, meaning 10kg of raw herb was concentrated into 1kg of extract.
3. **Assay Markers:** We standardize our extracts and publish the exact concentration of the active compounds (e.g., standardized to 5% Withanolides).

We don't hide behind 'proprietary blends'. Our formulas are open, our test results are verifiable, and our quality speaks for itself.
    `,
  }
];
