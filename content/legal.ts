/**
 * Policy documents.
 *
 * Written in plain language deliberately — a returns policy nobody can parse
 * is a returns policy designed not to be used, and customers read that
 * correctly. These are drafts and must be reviewed by a lawyer before launch.
 */

export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  updated: string;
  sections: { h: string; p: string[] }[];
};

export const legalDocs: Record<string, LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy",
    updated: "2026-07-01",
    intro:
      "What we collect, why, and how to get rid of it. This is a draft and must be reviewed by a lawyer before launch.",
    sections: [
      {
        h: "What we collect",
        p: [
          "To fulfil an order: your name, delivery address, email address and mobile number. To take payment: nothing — payment details go directly to the payment provider and never reach our servers.",
          "If you use the remedy finder, your answers stay in your browser. They are not transmitted to us, and there is no email gate on the result.",
        ],
      },
      {
        h: "What we do not do",
        p: [
          "We do not sell or rent your data. We do not build advertising profiles from your health-related browsing, and we do not pass what you looked at to third-party ad networks.",
          "We do not add you to a mailing list because you bought something. The newsletter checkbox at checkout is unticked by default and stays that way unless you tick it.",
        ],
      },
      {
        h: "How long we keep it",
        p: [
          "Order records are retained for the period required under Indian tax law. Everything else is deleted on request.",
          "To have your data removed, email the address in the footer. We will confirm within seven working days.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "The cart is stored in your browser's local storage so it survives a refresh. That is functional, not tracking, and it never leaves your device until you check out.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms",
    updated: "2026-07-01",
    intro:
      "The terms on which we sell. Draft — must be reviewed by a lawyer before launch.",
    sections: [
      {
        h: "What we sell",
        p: [
          "Ayurvedic proprietary medicines, manufactured under an AYUSH licence in a Schedule T certified facility. They are not evaluated the way pharmaceuticals are, and nothing on this site should be read as claiming otherwise.",
          "Product information on this site is for general guidance. It does not replace advice from a registered medical practitioner who knows your history.",
        ],
      },
      {
        h: "Orders and pricing",
        p: [
          "Prices are in Indian rupees and inclusive of all taxes. The price you see at checkout is the price you pay — we do not add handling, convenience or cash-on-delivery fees.",
          "We may decline or cancel an order where a product is out of stock or where a pricing error is obvious. If we do, you are refunded in full.",
        ],
      },
      {
        h: "Subscriptions",
        p: [
          "A subscription can be skipped, paused or cancelled at any time from your account, with no notice period and no cancellation fee. You are notified before each dispatch.",
        ],
      },
      {
        h: "Governing law",
        p: ["These terms are governed by Indian law."],
      },
    ],
  },

  "shipping-returns": {
    slug: "shipping-returns",
    title: "Shipping & returns",
    updated: "2026-07-01",
    intro: "How your order gets to you, and what happens if something is wrong.",
    sections: [
      {
        h: "Dispatch",
        p: [
          "Orders placed before 2pm on a working day are dispatched the same day. Otherwise, the next working day. We do not dispatch on Sundays.",
          "Delivery is typically two to five days across India. Remote pin codes can take longer, and you will see a realistic estimate at checkout rather than an optimistic one.",
        ],
      },
      {
        h: "Charges",
        p: [
          "Free over ₹599. Below that, a flat ₹59. Cash on delivery costs nothing extra — charging for it is a way of pricing up customers who do not have a card, and we are not going to do it.",
        ],
      },
      {
        h: "Returns",
        p: [
          "Unopened packs can be returned within 14 days for a full refund, including the original delivery charge. Email us and we arrange the pickup.",
          "We cannot accept opened medicine back — that is a safety rule rather than a commercial one. If a pack arrives damaged, or the batch code does not match, tell us and we replace it immediately with no return required.",
        ],
      },
      {
        h: "If something is wrong",
        p: [
          "Contact us first rather than the courier. We would rather resolve it than have you spend an afternoon on a helpline.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Medical disclaimer",
    updated: "2026-07-01",
    intro: "The limits of what we sell, stated plainly.",
    sections: [
      {
        h: "These are not prescription medicines",
        p: [
          "Regex Remedies products are Ayurvedic proprietary medicines. They support the body's own function. They are not a substitute for diagnosis, prescription medication, or surgery, and they should never be used to postpone getting something looked at.",
        ],
      },
      {
        h: "When to see a doctor instead",
        p: [
          "Blood in the stool or black tarry stool. Unintended weight loss. Pain that wakes you at night. Fever alongside your symptoms. A change in bowel habit lasting more than three weeks. Any undiagnosed change in vaginal discharge, odour or bleeding.",
          "None of these should be self-treated, with our products or anyone else's.",
        ],
      },
      {
        h: "Who should not use our products",
        p: [
          "Anyone pregnant, breastfeeding or trying to conceive. Anyone under 18. Every product page also lists conditions specific to that formulation, and the remedy finder screens for them before it recommends anything.",
        ],
      },
      {
        h: "Interactions",
        p: [
          "If you take anticoagulants, immunosuppressants or hormonal medication, speak to your doctor before starting anything from this range. The composition is published in full on every product page precisely so they can check it.",
        ],
      },
    ],
  },
};
