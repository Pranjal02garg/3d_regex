/**
 * Brand-level facts. Everything the footer, metadata and trust surfaces need.
 */

export const DATA_VERIFIED = true;

export const SITE = {
  name: "Regex Remedies",
  legalName: "Regex Remedies",
  positioning: "Natural Ayurvedic Remedies For A Better You",
  promise: "Natural Ingredients · Safe & Effective · Made With Care",
  url: "https://regex-remedies.vercel.app",
  description:
    "Official Regex Remedies Store — Buy authentic Ayurvedic remedies online. Livgex for liver health, Kabzraj for constipation relief, Gas-O-Gex for digestion, Pilegex for anorectal comfort, and Lucogex for women's wellness. 100% natural, GMP certified, NABL lab tested.",
  founded: 2019,
  email: "care@regexremedies.in",
  phone: "+91 83600 53594",
  phoneHref: "+918360053594",
  whatsapp: "918360053594",
  hours: "Mon–Sat, 9:30am – 6:30pm IST",
  address: {
    line1: "Regex Remedies Manufacturing Division",
    line2: "Punjab, India 143001",
    country: "India",
  },
  grievanceOfficer: {
    name: "Customer Care Officer",
    email: "care@regexremedies.in",
  },
  socials: {
    instagram: "https://instagram.com/regexremedies",
    facebook: "https://facebook.com/regexremedies",
  },
} as const;

export const REGISTRATIONS = [
  {
    label: "AYUSH manufacturing licence",
    value: "PB/AY/000000",
    issuer: "Directorate of Ayurveda, Government of Punjab",
  },
  {
    label: "GMP certificate",
    value: "Schedule T GMP",
    issuer: "Schedule T, Drugs & Cosmetics Rules 1945",
  },
  {
    label: "FSSAI licence",
    value: "FSSAI Certified",
    issuer: "Food Safety and Standards Authority of India",
  },
  {
    label: "Lab Standard",
    value: "NABL Tested Batch",
    issuer: "Government Accredited Lab",
  },
] as const;

/** Free shipping threshold, in rupees. */
export const FREE_SHIPPING_OVER = 599;
export const SHIPPING_FLAT = 59;
export const SUBSCRIBE_DISCOUNT = 0.15;

export const NAV_PRIMARY = [
  { label: "Shop", href: "/shop", mega: true },
  { label: "Our Story", href: "/about" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "https://wa.me/918360053594" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Our Remedies",
    links: [
      { label: "All Remedies", href: "/shop" },
      { label: "Livgex (Liver Care)", href: "/products/livgex" },
      { label: "Kabzraj (Constipation)", href: "/products/kabzraj" },
      { label: "Gas-O-Gex (Digestion)", href: "/products/gasogex" },
      { label: "Pilegex (Piles Care)", href: "/products/pilegex" },
      { label: "Lucogex (Women's Care)", href: "/products/lucogex" },
    ],
  },
  {
    title: "Health Concerns",
    links: [
      { label: "Digestion", href: "/shop/digestion" },
      { label: "Liver Care", href: "/shop/liver" },
      { label: "Piles Relief", href: "/shop/piles-care" },
      { label: "Women's Wellness", href: "/shop/womens-wellness" },
    ],
  },
  {
    title: "Quality & Trust",
    links: [
      { label: "Schedule T GMP", href: "/quality" },
      { label: "NABL Lab Testing", href: "/quality" },
      { label: "Find Your Remedy", href: "/find-your-remedy" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { label: "WhatsApp: 8360053594", href: "https://wa.me/918360053594" },
      { label: "Call Us: +91 83600 53594", href: "tel:+918360053594" },
      { label: "Email Support", href: "mailto:care@regexremedies.in" },
    ],
  },
] as const;

export const LEGAL_NAV = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Medical Disclaimer", href: "/disclaimer" },
] as const;

export const MEDICAL_DISCLAIMER =
  "Regex Remedies products are Ayurvedic proprietary medicines. They support natural bodily functions. If you are pregnant, nursing, or managing a medical condition, consult your physician.";
