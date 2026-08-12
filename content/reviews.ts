/**
 * Customer reviews.
 *
 * PLACEHOLDER CONTENT — these are illustrative and must be replaced with real,
 * verifiable reviews before launch. They are written the way real reviews read:
 * uneven length, a few that are only three stars, and no marketing language.
 * A wall of five-star praise is the fastest way to lose a sceptical reader.
 */

export type Review = {
  id: string;
  product: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  title?: string;
  body: string;
  /** Set when the brand has replied publicly. */
  reply?: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    product: "kabzraj",
    name: "Sunita R.",
    city: "Pune",
    rating: 5,
    date: "2026-06-14",
    title: "Worked overnight, as described",
    verified: true,
    body: "Took two at bedtime and it worked by about seven the next morning. What I appreciated more was the pack telling me to stop after a week. I have bought laxatives for years and none of them ever said that.",
  },
  {
    id: "r2",
    product: "kabzraj",
    name: "Devendra P.",
    city: "Indore",
    rating: 3,
    date: "2026-05-30",
    verified: true,
    body: "It works, but I got cramping the first two nights. Dropping to one tablet fixed it. Would have been useful to see that suggested on the pack rather than working it out myself.",
    reply:
      "Thank you — this is fair. We have added a line about starting at one tablet to the dosage panel on this page, and it goes on the next label revision.",
  },
  {
    id: "r3",
    product: "gasogex",
    name: "Meera K.",
    city: "Chennai",
    rating: 5,
    date: "2026-06-02",
    title: "Replaced my after-dinner saunf habit",
    verified: true,
    body: "Bought it for the bloating I get after eating late. It is basically what my grandmother would have given me, in a tablet I can keep at my desk. No complaints.",
  },
  {
    id: "r4",
    product: "gasogex",
    name: "Arun S.",
    city: "Bengaluru",
    rating: 4,
    date: "2026-05-11",
    verified: true,
    body: "Does what it says for wind. Did nothing for my acidity, but the page was upfront that it would not, so that is on me for hoping.",
  },
  {
    id: "r5",
    product: "livgex",
    name: "Dr. Anand M.",
    city: "Hyderabad",
    rating: 5,
    date: "2026-04-28",
    title: "The composition page sold me",
    verified: true,
    body: "I am a physician and I do not usually recommend proprietary Ayurvedic products, mostly because I cannot see what is in them. This one lists quantities, parts used and the assay markers. That is the bar and almost nobody clears it.",
  },
  {
    id: "r6",
    product: "livgex",
    name: "Prakash J.",
    city: "Nagpur",
    rating: 4,
    date: "2026-06-20",
    verified: true,
    body: "Three months in. Heaviness after oily food is noticeably less. My LFTs have not changed dramatically, but the site never suggested they would, which I respect.",
  },
  {
    id: "r7",
    product: "pilegex",
    name: "Verified buyer",
    city: "Ludhiana",
    rating: 5,
    date: "2026-06-08",
    verified: true,
    body: "Itching settled in about three days. Twelve-day course finished, no recurrence yet. Ordering was discreet, which mattered to me.",
  },
  {
    id: "r8",
    product: "pilegex",
    name: "Verified buyer",
    city: "Jaipur",
    rating: 3,
    date: "2026-05-19",
    verified: true,
    body: "Helped with the irritation but not much with the pain. I ended up seeing a doctor, which honestly the pack did tell me to do if things did not improve.",
  },
  {
    id: "r9",
    product: "lucogex",
    name: "Verified buyer",
    city: "Kolkata",
    rating: 5,
    date: "2026-06-11",
    verified: true,
    body: "I went to a gynaecologist first because the page insisted, and it turned out to be something else entirely. Came back to this afterwards on her advice. Strange thing to thank a supplement company for, but there it is.",
  },
  {
    id: "r10",
    product: "lucogex",
    name: "Verified buyer",
    city: "Ahmedabad",
    rating: 4,
    date: "2026-04-16",
    verified: true,
    body: "Gradual rather than dramatic. Twelve days made a difference. The capsules are large — worth knowing if you find those difficult.",
  },
  {
    id: "r11",
    product: "gasogex",
    name: "Kavita N.",
    city: "Mumbai",
    rating: 5,
    date: "2026-03-22",
    verified: true,
    body: "Bought a pack for my father who is seventy-two. He reads every label and could not find anything to object to, which is unprecedented.",
  },
  {
    id: "r12",
    product: "kabzraj",
    name: "Rehan A.",
    city: "Lucknow",
    rating: 5,
    date: "2026-06-25",
    verified: true,
    body: "Delivery in two days to a small town. Batch number on the bottle matched the one on the verify page. Small thing, but I checked.",
  },
];

export function reviewsFor(productSlug: string): Review[] {
  return reviews
    .filter((r) => r.product === productSlug)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function ratingHistogram(productSlug: string): number[] {
  const counts = [0, 0, 0, 0, 0];
  for (const r of reviewsFor(productSlug)) counts[r.rating - 1] += 1;
  return counts;
}
