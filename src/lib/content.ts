export const EVENT = {
  name: "Ecom Up North",
  year: 2027,
  dates: "Wed 14 April 2027",
  venue: "Manchester Central",
  city: "Manchester",
  // Doors open 08:00 BST
  startsAt: "2027-04-14T08:00:00+01:00",
};

export const NAV_LINKS = [
  { label: "Why attend", href: "#why" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Tickets", href: "#tickets" },
  { label: "FAQ", href: "#faq" },
];

export const PARTNERS = [
  "Brightmill",
  "Pennine Pay",
  "Coldharbour",
  "Fellside",
  "Irwell Logistics",
  "Tidewell",
  "Ashgrove & Co",
  "Northstack",
  "Halden",
  "Mercer Labs",
];

export const STATS = [
  { value: 6000, suffix: "+", label: "Retail & ecommerce leaders" },
  { value: 250, suffix: "+", label: "Speakers across 8 stages" },
  { value: 180, suffix: "", label: "Exhibitors & solution partners" },
  { value: 12000, suffix: "", label: "Hosted 1:1 meetings" },
];

export const TOPICS = [
  "Agentic commerce",
  "Retail media",
  "Marketplaces",
  "Payments & checkout",
  "Logistics & returns",
  "Social commerce",
  "CRO & UX",
  "Loyalty & CRM",
  "Headless & composable",
  "Cross-border",
  "Sustainability",
  "Data & AI",
];

export const TRACKS = [
  {
    title: "AI & Agentic Commerce",
    body: "When the shopper is an agent. How to make your catalogue, pricing and checkout machine-readable — and still win on brand.",
    tag: "Main stage",
  },
  {
    title: "Retail Media & Growth",
    body: "Build a media network, fix attribution, and turn first-party data into a profit centre.",
    tag: "Growth stage",
  },
  {
    title: "Ops, Fulfilment & Returns",
    body: "Same-day across the Pennines, returns that pay for themselves, and warehouses that think.",
    tag: "Ops theatre",
  },
  {
    title: "Brand, Content & Community",
    body: "Creator-led growth, live shopping and the DTC brands proving community beats CAC.",
    tag: "Brand stage",
  },
];

export const WHY = [
  {
    title: "Hosted 1:1 meetings",
    body: "Tell us your priorities and we'll pre-book double-opt-in meetings with the retailers, brands and partners you actually want to meet.",
    stat: "12k",
    statLabel: "meetings booked",
  },
  {
    title: "Free expo floor",
    body: "180 exhibitors, live demos and eight open theatres. Expo passes are free for retailers and brands.",
    stat: "£0",
    statLabel: "expo pass",
  },
  {
    title: "Masterclass workshops",
    body: "Small-room, hands-on sessions on CRO, marketplaces, email and AI tooling — leave with a playbook, not just notes.",
    stat: "40+",
    statLabel: "workshops",
  },
  {
    title: "The Northern Social",
    body: "The day wraps with a live-music after-party across three venues in the Northern Quarter. Deals get done here.",
    stat: "1",
    statLabel: "legendary night",
  },
];

export const SPEAKERS = [
  { name: "Amara Okafor", role: "Chief Digital Officer", company: "Brightmill Home", hue: 88 },
  { name: "Callum Reid", role: "Founder & CEO", company: "Fellside Outdoor", hue: 170 },
  { name: "Priya Shah", role: "VP Marketplaces", company: "Tidewell Group", hue: 265 },
  { name: "Joe Whitworth", role: "Head of Retail Media", company: "Coldharbour", hue: 20 },
  { name: "Sofia Marín", role: "Director of CX", company: "Ashgrove & Co", hue: 330 },
  { name: "Daniel Oyelaran", role: "CTO", company: "Northstack", hue: 200 },
  { name: "Hannah Clegg", role: "Ecommerce Director", company: "Mill & Loom", hue: 45 },
  { name: "Ravi Menon", role: "Head of AI", company: "Pennine Pay", hue: 140 },
];

export type Session = {
  time: string;
  title: string;
  stage: string;
  speakers?: string;
  kind?: "keynote" | "panel" | "workshop" | "social";
};

export const AGENDA: Record<"morning" | "afternoon", Session[]> = {
  morning: [
    { time: "08:00", title: "Registration & breakfast briefing: Retail Barometer 2027", stage: "Main stage" },
    { time: "09:00", title: "Opening keynote: The North is open for business", stage: "Main stage", speakers: "Amara Okafor", kind: "keynote" },
    { time: "09:45", title: "Shopping agents: selling to software that shops for us", stage: "Main stage", speakers: "Ravi Menon, Priya Shah", kind: "panel" },
    { time: "10:30", title: "Composable, headless or just faster? The replatforming reality check", stage: "Main stage", speakers: "Daniel Oyelaran", kind: "panel" },
    { time: "11:15", title: "Retail media without the hype: building a profitable network", stage: "Growth stage", speakers: "Joe Whitworth", kind: "keynote" },
    { time: "11:45", title: "Masterclass: CRO sprints that ship in a week", stage: "Workshop room 2", kind: "workshop" },
  ],
  afternoon: [
    { time: "13:00", title: "Returns are a feature: designing post-purchase for loyalty", stage: "Ops theatre", speakers: "Sofia Marín", kind: "keynote" },
    { time: "13:45", title: "Masterclass: Marketplace playbook for UK brands going to EU", stage: "Workshop room 1", kind: "workshop" },
    { time: "14:30", title: "From market stall to marketplace: scaling a northern DTC brand", stage: "Brand stage", speakers: "Callum Reid", kind: "keynote" },
    { time: "15:15", title: "Heritage meets hypergrowth: modernising a 100-year-old retailer", stage: "Main stage", speakers: "Hannah Clegg", kind: "keynote" },
    { time: "16:15", title: "Closing keynote & Up North Awards", stage: "Main stage", kind: "keynote" },
    { time: "18:00", title: "The Northern Social", stage: "Northern Quarter", kind: "social" },
  ],
};

export const TICKETS = [
  {
    name: "Expo Pass",
    price: "Free",
    note: "For retailers & brands",
    features: ["Full expo floor access", "8 open theatres", "Networking app", "Free for qualifying retailers"],
    cta: "Claim free pass",
  },
  {
    name: "Conference Pass",
    price: "£595",
    note: "Early bird · ends 31 Dec",
    features: [
      "Everything in Expo",
      "Main & Growth stage keynotes",
      "Hosted 1:1 meetings",
      "40+ masterclass workshops",
      "Session recordings",
    ],
    cta: "Get conference pass",
    featured: true,
  },
  {
    name: "VIP Pass",
    price: "£1,195",
    note: "Limited to 200",
    features: [
      "Everything in Conference",
      "Priority meeting matching",
      "VIP lounge & dinners",
      "Northern Social fast track",
      "Reserved keynote seating",
    ],
    cta: "Go VIP",
  },
];

export const FAQS = [
  {
    q: "When and where is Ecom Up North?",
    a: "Wednesday 14 April 2027 at Manchester Central, a five-minute walk from Manchester Piccadilly and Deansgate stations. Doors open at 08:00, with the Northern Social running into the evening.",
  },
  {
    q: "Is the expo really free?",
    a: "Yes. Expo passes are free for retailers, brands and marketplace sellers. Solution providers, agencies and consultants can attend via a Conference or VIP pass.",
  },
  {
    q: "How do hosted meetings work?",
    a: "Tell us your priorities when you register. From February our team matches you with relevant retailers and partners. Every meeting is double opt-in — you only meet people you've said yes to.",
  },
  {
    q: "Can I exhibit or sponsor?",
    a: "Stands from 9m² through to headline partnerships are available. Use the form below and choose 'Exhibit', and our partnerships team will send the floor plan and brochure.",
  },
  {
    q: "Will sessions be recorded?",
    a: "Main and Growth stage sessions are recorded and available to Conference and VIP pass holders within 48 hours.",
  },
  {
    q: "Is the venue accessible?",
    a: "Manchester Central is fully step-free with a hearing loop on every stage, a quiet room and live captioning on the main stage. Let us know any requirements when you register.",
  },
];
