// Local mock data for the Thuna Foundations frontend.
// All UI reads through src/lib/data/* selectors — swap this file's exports
// with API-backed implementations later without touching UI components.

import type {
  Campaign,
  FaqItem,
  ImpactMetric,
  Initiative,
  JourneyStep,
  Partner,
  Story,
  Testimonial,
  Value,
  VolunteerOpportunity,
} from "@/types";

// --- Images (Unsplash CDN, real hosted URLs) -------------------------------
const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// --- Initiatives -----------------------------------------------------------
export const initiatives: Initiative[] = [
  {
    id: "care",
    slug: "thuna-care",
    name: "THUNA CARE",
    title: "Healthcare & Medical Assistance",
    category: "Health",
    accent: "coral",
    icon: "HeartPulse",
    shortDescription:
      "Care that reaches families when it matters most — from clinics to critical treatment.",
    description:
      "Thuna Care brings medical support to people who need it — from mobile clinics in remote villages to life-saving treatment for families in crisis.",
    longDescription:
      "We partner with hospitals, doctors, and community health workers to make quality care accessible. Our work covers preventive checkups, maternal and child health, mental wellbeing, chronic-disease support, and emergency treatment. Every rupee is directed toward reducing suffering and restoring dignity.",
    heroImage: img("photo-1584515933487-779824d29309"),
    gallery: [
      img("photo-1579684385127-1ef15d508118"),
      img("photo-1576091160399-112ba8d25d1d"),
      img("photo-1631815589968-fdb09a223b1e"),
    ],
    impact: [
      { label: "Patients treated", value: "42,300+" },
      { label: "Mobile clinics", value: "68" },
      { label: "Surgeries funded", value: "1,240" },
    ],
    highlights: [
      "Free mobile clinics in 42 villages",
      "Maternal & child health programs",
      "Emergency treatment fund",
      "Mental health first-response",
    ],
    focusAreas: ["Primary care", "Maternal health", "Chronic care", "Emergency treatment"],
    relatedStories: ["asha-second-chance", "clinic-on-wheels"],
    relatedCampaigns: ["winter-medical-camp"],
  },
  {
    id: "education",
    slug: "thuna-education",
    name: "THUNA EDUCATION",
    title: "Education & Scholarships",
    category: "Education",
    accent: "yellow",
    icon: "GraduationCap",
    shortDescription:
      "Scholarships, mentors and safe learning spaces for students who deserve every chance.",
    description:
      "Thuna Education keeps students in school and helps them thrive — through scholarships, mentorship, tutoring, and safer classrooms.",
    longDescription:
      "From primary schools to university, we invest in learners whose futures would otherwise be limited by circumstance. Our scholars are paired with mentors, supported with books and devices, and welcomed into a community that cheers them on.",
    heroImage: img("photo-1503676260728-1c00da094a0b"),
    gallery: [
      img("photo-1497486751825-1233686d5d80"),
      img("photo-1523240795612-9a054b0db644"),
      img("photo-1509062522246-3755977927d7"),
    ],
    impact: [
      { label: "Scholars supported", value: "8,600+" },
      { label: "Schools partnered", value: "120" },
      { label: "Graduation rate", value: "94%" },
    ],
    highlights: [
      "Full-tuition scholarships",
      "One-to-one mentorship",
      "Learning materials & devices",
      "Girls-in-STEM tracks",
    ],
    focusAreas: ["Scholarships", "Mentorship", "Safe classrooms", "Digital learning"],
    relatedStories: ["meera-first-graduate"],
    relatedCampaigns: ["back-to-school"],
  },
  {
    id: "skills",
    slug: "thuna-skills",
    name: "THUNA SKILLS",
    title: "Skill Development & Employment",
    category: "Livelihood",
    accent: "orange",
    icon: "Hammer",
    shortDescription:
      "Practical training and job pathways for people ready to build a livelihood.",
    description:
      "Thuna Skills equips youth and adults with market-ready skills — from tailoring and carpentry to coding and digital work — and helps them find dignified employment.",
    longDescription:
      "Our training centers combine hands-on instruction with soft skills, financial literacy, and placement support. We work with employers to match graduates to real jobs and with entrepreneurs to launch small businesses.",
    heroImage: img("photo-1521737604893-d14cc237f11d"),
    gallery: [
      img("photo-1517048676732-d65bc937f952"),
      img("photo-1552664730-d307ca884978"),
      img("photo-1531482615713-2afd69097998"),
    ],
    impact: [
      { label: "Graduates trained", value: "5,120" },
      { label: "Placement rate", value: "78%" },
      { label: "Training centers", value: "24" },
    ],
    highlights: ["Vocational academies", "Employer placement network", "Micro-business grants"],
    focusAreas: ["Vocational training", "Digital skills", "Job placement", "Entrepreneurship"],
    relatedStories: ["ravi-workshop"],
    relatedCampaigns: [],
  },
  {
    id: "village",
    slug: "thuna-village",
    name: "THUNA VILLAGE",
    title: "Village Development",
    category: "Community",
    accent: "green",
    icon: "Home",
    shortDescription:
      "Whole-village programs — water, sanitation, roads, and community spaces.",
    description:
      "Thuna Village invests in the systems that make a village thrive — clean water, sanitation, safe roads, and shared community spaces designed with residents.",
    longDescription:
      "We plan alongside village councils, not for them. Our long-term programs run for years, not weeks, and combine infrastructure with training so improvements last well beyond our involvement.",
    heroImage: img("photo-1523482580672-f109ba8cb9be"),
    gallery: [
      img("photo-1500382017468-9049fed747ef"),
      img("photo-1470071459604-3b5ec3a7fe05"),
      img("photo-1518604666860-9ed391f76460"),
    ],
    impact: [
      { label: "Villages transformed", value: "38" },
      { label: "Wells built", value: "212" },
      { label: "Community centers", value: "26" },
    ],
    highlights: ["Clean water access", "Sanitation systems", "Community centers"],
    focusAreas: ["Water & sanitation", "Roads & lighting", "Community spaces", "Local governance"],
    relatedStories: ["clinic-on-wheels"],
    relatedCampaigns: [],
  },
  {
    id: "hope",
    slug: "thuna-hope",
    name: "THUNA HOPE",
    title: "Social Welfare & Financial Assistance",
    category: "Welfare",
    accent: "purple",
    icon: "HandHeart",
    shortDescription:
      "Direct support to families facing sudden hardship — food, rent, medical bills.",
    description:
      "Thuna Hope stands beside families during crisis with rapid financial and material assistance so a hard week doesn't become a lost year.",
    longDescription:
      "Working with community partners we identify families in acute need and provide dignified, no-strings support — a rent payment, groceries for a month, a medical bill, a small business restart grant.",
    heroImage: img("photo-1488521787991-ed7bbaae773c"),
    gallery: [
      img("photo-1518398046578-8cca57782e17"),
      img("photo-1593113598332-cd288d649433"),
    ],
    impact: [
      { label: "Families assisted", value: "6,780" },
      { label: "Rent support", value: "$1.2M" },
      { label: "Meals provided", value: "310,000" },
    ],
    highlights: ["Rapid crisis response", "Rent & utility support", "Food security grants"],
    focusAreas: ["Crisis grants", "Food security", "Shelter", "Restart support"],
    relatedStories: ["asha-second-chance"],
    relatedCampaigns: ["winter-medical-camp"],
  },
  {
    id: "green",
    slug: "thuna-green",
    name: "THUNA GREEN",
    title: "Environmental Sustainability",
    category: "Environment",
    accent: "teal",
    icon: "Leaf",
    shortDescription:
      "Reforestation, clean energy and community-led climate resilience.",
    description:
      "Thuna Green invests in the planet — through reforestation, clean cookstoves, solar micro-grids and community climate resilience programs.",
    longDescription:
      "We work with local farmers, schools and cooperatives to plant trees that survive, build clean-energy solutions people can afford, and prepare communities for climate change with training and infrastructure.",
    heroImage: img("photo-1441974231531-c6227db76b6e"),
    gallery: [
      img("photo-1518495973542-4542c06a5843"),
      img("photo-1466611653911-95081537e5b7"),
    ],
    impact: [
      { label: "Trees planted", value: "1.4M" },
      { label: "Clean cookstoves", value: "12,400" },
      { label: "Solar villages", value: "22" },
    ],
    highlights: ["Reforestation", "Solar micro-grids", "Climate education"],
    focusAreas: ["Reforestation", "Clean energy", "Climate education", "Waste"],
    relatedStories: [],
    relatedCampaigns: ["plant-a-forest"],
  },
  {
    id: "women",
    slug: "thuna-women",
    name: "THUNA WOMEN",
    title: "Women's Empowerment",
    category: "Empowerment",
    accent: "pink",
    icon: "Sparkles",
    shortDescription:
      "Programs that unlock leadership, safety, and financial independence for women.",
    description:
      "Thuna Women partners with women's collectives to build leadership, safety, and financial independence — with programs designed by women, for women.",
    longDescription:
      "From self-help groups and micro-finance to leadership academies and safety networks, our work centers women's own priorities and puts resources directly in their hands.",
    heroImage: img("photo-1573497019940-1c28c88b4f3e"),
    gallery: [
      img("photo-1521737852567-6949f3f9f2b5"),
      img("photo-1531123897727-8f129e1688ce"),
    ],
    impact: [
      { label: "Women reached", value: "18,900" },
      { label: "Self-help groups", value: "540" },
      { label: "Businesses launched", value: "1,100" },
    ],
    highlights: ["Micro-finance", "Leadership academies", "Safety networks"],
    focusAreas: ["Micro-finance", "Leadership", "Safety", "Health"],
    relatedStories: ["meera-first-graduate"],
    relatedCampaigns: [],
  },
  {
    id: "youth",
    slug: "thuna-youth",
    name: "THUNA YOUTH",
    title: "Youth Leadership & Development",
    category: "Youth",
    accent: "navy",
    icon: "Rocket",
    shortDescription:
      "Young leaders shaping their communities through programs, camps and civic labs.",
    description:
      "Thuna Youth invests in the next generation with leadership programs, civic labs, sports, arts, and mentorship — helping young people find their voice and their path.",
    longDescription:
      "We run year-long fellowships, summer leadership camps, arts & sports clubs, and civic labs where young people prototype solutions for their neighborhoods.",
    heroImage: img("photo-1529333166437-7750a6dd5a70"),
    gallery: [
      img("photo-1517486808906-6ca8b3f04846"),
      img("photo-1529333166437-7750a6dd5a70"),
    ],
    impact: [
      { label: "Young leaders", value: "3,400" },
      { label: "Youth clubs", value: "88" },
      { label: "Civic projects", value: "210" },
    ],
    highlights: ["Leadership fellowships", "Civic innovation labs", "Sports & arts"],
    focusAreas: ["Leadership", "Civic labs", "Sports", "Arts"],
    relatedStories: ["ravi-workshop"],
    relatedCampaigns: [],
  },
  {
    id: "relief",
    slug: "thuna-relief",
    name: "THUNA RELIEF",
    title: "Emergency & Disaster Response",
    category: "Relief",
    accent: "orange",
    icon: "LifeBuoy",
    shortDescription:
      "Rapid response when disasters strike — shelter, food, medical, rebuilding.",
    description:
      "Thuna Relief mobilizes within hours of a disaster — delivering shelter, food, medical support and long-term rebuilding help.",
    longDescription:
      "Our pre-positioned supplies and trained volunteer network let us act fast. We stay through the long tail of recovery, partnering with communities to rebuild homes, schools and livelihoods.",
    heroImage: img("photo-1547683905-f686c993aae5"),
    gallery: [
      img("photo-1587653263995-422546a7a569"),
      img("photo-1596461404969-9ae70f2830c1"),
    ],
    impact: [
      { label: "People sheltered", value: "24,600" },
      { label: "Homes rebuilt", value: "1,830" },
      { label: "Response days", value: "< 24h" },
    ],
    highlights: ["24-hour response", "Shelter & food", "Rebuilding programs"],
    focusAreas: ["Rapid response", "Shelter", "Medical", "Rebuilding"],
    relatedStories: [],
    relatedCampaigns: ["flood-response"],
  },
  {
    id: "future",
    slug: "thuna-future",
    name: "THUNA FUTURE",
    title: "Child Development & Education",
    category: "Children",
    accent: "yellow",
    icon: "Baby",
    shortDescription:
      "Early childhood care, nutrition, and safe learning for children under 10.",
    description:
      "Thuna Future gives every child a strong start — through early childhood centers, nutrition programs, and safe, joyful learning environments.",
    longDescription:
      "Our early-childhood centers pair play-based learning with nutrition, health screenings and family support. Because the first ten years shape a lifetime.",
    heroImage: img("photo-1503454537195-1dcabb73ffb9"),
    gallery: [
      img("photo-1471286174890-9c112ffca5b4"),
      img("photo-1503454537195-1dcabb73ffb9"),
    ],
    impact: [
      { label: "Children reached", value: "11,200" },
      { label: "Childhood centers", value: "46" },
      { label: "Nutrition meals / yr", value: "820,000" },
    ],
    highlights: ["Early childhood centers", "Nutrition programs", "Family support"],
    focusAreas: ["Early learning", "Nutrition", "Health", "Family"],
    relatedStories: [],
    relatedCampaigns: ["back-to-school"],
  },
];

// --- Impact ----------------------------------------------------------------
export const impactMetrics: ImpactMetric[] = [
  { id: "people",       label: "People supported",      value: 128_400, suffix: "+", description: "Individuals directly reached through our initiatives." },
  { id: "communities",  label: "Communities reached",   value: 640,     suffix: "+", description: "Villages and neighborhoods where we work today." },
  { id: "students",     label: "Students empowered",    value: 8_600,   suffix: "+", description: "Scholars, learners and young leaders in our programs." },
  { id: "families",     label: "Families assisted",     value: 6_780,   description: "Households receiving crisis or long-term support." },
  { id: "volunteers",   label: "Volunteers connected",  value: 3_120,   description: "People giving their time to stand beside others." },
];

// --- Stories ---------------------------------------------------------------
export const stories: Story[] = [
  {
    id: "s1",
    slug: "asha-second-chance",
    title: "Asha's second chance",
    excerpt:
      "A mother of two found care, dignity and a way forward when everything felt impossible.",
    body: [
      "When Asha's husband fell ill, their small savings disappeared within weeks. She stopped eating so her children could.",
      "A community health worker connected her family with Thuna Care and Thuna Hope. Within days, medical costs were covered and a rent grant kept the family in their home.",
      "Six months later, Asha is training as a tailor with Thuna Skills. 'For the first time,' she says, 'I feel someone is walking with us.'",
    ],
    category: "Impact",
    initiativeSlug: "thuna-care",
    author: "Priya Menon",
    date: "2026-03-18",
    readMinutes: 5,
    coverImage: img("photo-1509099836639-18ba1795216d"),
    featured: true,
  },
  {
    id: "s2",
    slug: "meera-first-graduate",
    title: "The first graduate in her family",
    excerpt:
      "Meera walked across the stage with a scholarship, a mentor, and a village cheering her on.",
    body: [
      "Meera grew up two hours from the nearest college. A Thuna Education scholarship — and a mentor who called every week — kept her studying.",
      "This spring, she became the first person in her family to earn a degree. Next fall, she'll teach in her own village.",
    ],
    category: "Education",
    initiativeSlug: "thuna-education",
    author: "Daniel Okoye",
    date: "2026-02-02",
    readMinutes: 4,
    coverImage: img("photo-1523240795612-9a054b0db644"),
  },
  {
    id: "s3",
    slug: "clinic-on-wheels",
    title: "A clinic that comes to you",
    excerpt:
      "How a mobile van is changing what care looks like in twelve remote villages.",
    body: [
      "The van pulls in every Tuesday. Before Thuna Care, the nearest doctor was a full day away.",
      "Now, prenatal checkups happen on schedule and chronic conditions get managed before they turn into emergencies.",
    ],
    category: "Health",
    initiativeSlug: "thuna-care",
    author: "Fatima Rao",
    date: "2026-01-14",
    readMinutes: 6,
    coverImage: img("photo-1576091160399-112ba8d25d1d"),
  },
  {
    id: "s4",
    slug: "ravi-workshop",
    title: "Ravi opened his own workshop",
    excerpt:
      "A carpentry course, a small grant, and a lot of grit — and a business was born.",
    body: [
      "Ravi finished a six-month Thuna Skills course with a certificate and a plan.",
      "A micro-grant covered his first tools. Today his workshop employs three neighbors.",
    ],
    category: "Livelihood",
    initiativeSlug: "thuna-skills",
    author: "Ellen Park",
    date: "2025-11-28",
    readMinutes: 3,
    coverImage: img("photo-1517048676732-d65bc937f952"),
  },
];

// --- Campaigns -------------------------------------------------------------
export const campaigns: Campaign[] = [
  {
    id: "c1",
    slug: "winter-medical-camp",
    title: "Winter medical camp",
    summary: "Free checkups, medicine and warm meals in 12 villages this winter.",
    description:
      "Every winter, respiratory illness spikes in the villages we serve. This campaign funds 12 free medical camps, warm meals, and follow-up care through Thuna Care and Thuna Hope.",
    initiativeSlug: "thuna-care",
    status: "active",
    goal: 80000,
    raised: 52400,
    currency: "USD",
    supporters: 612,
    endsOn: "2026-08-30",
    coverImage: img("photo-1631815589968-fdb09a223b1e"),
  },
  {
    id: "c2",
    slug: "back-to-school",
    title: "Back to school",
    summary: "500 scholarships and full school kits for children starting the year.",
    description:
      "For many families, September is the hardest month. This campaign funds 500 scholarships and school kits with books, uniforms and supplies.",
    initiativeSlug: "thuna-education",
    status: "active",
    goal: 120000,
    raised: 96800,
    currency: "USD",
    supporters: 1420,
    endsOn: "2026-09-15",
    coverImage: img("photo-1503676260728-1c00da094a0b"),
  },
  {
    id: "c3",
    slug: "plant-a-forest",
    title: "Plant a forest",
    summary: "250,000 trees, planted with the farmers who will tend them.",
    description:
      "Every tree in this campaign is planted with a farmer who commits to caring for it for three years — the survival rate is above 90%.",
    initiativeSlug: "thuna-green",
    status: "active",
    goal: 50000,
    raised: 18300,
    currency: "USD",
    supporters: 288,
    coverImage: img("photo-1441974231531-c6227db76b6e"),
  },
  {
    id: "c4",
    slug: "flood-response",
    title: "Coastal flood response",
    summary: "Emergency shelter, food and rebuilding for 3,000 displaced families.",
    description:
      "Our Thuna Relief team was on the ground within hours. This campaign funds the long tail — rebuilding homes, schools and livelihoods.",
    initiativeSlug: "thuna-relief",
    status: "completed",
    goal: 250000,
    raised: 268500,
    currency: "USD",
    supporters: 3810,
    coverImage: img("photo-1547683905-f686c993aae5"),
  },
];

// --- Testimonials ----------------------------------------------------------
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Thuna didn't hand us a plan. They sat with us until we made one together.",
    name: "Kavita R.",
    role: "Village council member",
    location: "Solur",
  },
  {
    id: "t2",
    quote: "The scholarship changed my daughter's life. The mentor changed her belief in herself.",
    name: "Ahmed I.",
    role: "Parent",
    location: "Nairobi",
  },
  {
    id: "t3",
    quote: "As a volunteer I gave a few hours. What I received was a community.",
    name: "Sara L.",
    role: "Volunteer",
  },
];

// --- Values ----------------------------------------------------------------
export const values: Value[] = [
  { name: "Compassion",     description: "We care with empathy.",              accent: "coral",  icon: "Heart" },
  { name: "Togetherness",   description: "We grow through unity.",             accent: "yellow", icon: "Users" },
  { name: "Dignity",        description: "We respect every individual.",       accent: "purple", icon: "Crown" },
  { name: "Inclusivity",    description: "Everyone has a place.",              accent: "pink",   icon: "HandHeart" },
  { name: "Responsibility", description: "We act with honesty.",               accent: "green",  icon: "ShieldCheck" },
  { name: "Hope",           description: "We believe in better possibilities.",accent: "orange", icon: "Sun" },
];

// --- Journey ---------------------------------------------------------------
export const journey: JourneyStep[] = [
  { step: "01", title: "Listen",       description: "We understand people, communities and their real needs.", accent: "yellow" },
  { step: "02", title: "Stand beside", description: "We bring care, resources, guidance and opportunity.",       accent: "coral" },
  { step: "03", title: "Create change",description: "Together, we build confidence, independence and long-term progress.", accent: "green" },
];

// --- Volunteer opportunities ----------------------------------------------
export const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: "v1",
    title: "Community health mentor",
    initiativeSlug: "thuna-care",
    location: "Solur District",
    commitment: "8 hours / week · 3 months",
    skills: ["Empathy", "Basic health knowledge", "Local language"],
    description:
      "Support mobile clinic visits, follow up with families and help coordinate care with local health workers.",
  },
  {
    id: "v2",
    title: "Scholar mentor",
    initiativeSlug: "thuna-education",
    location: "Remote (weekly calls)",
    commitment: "1 hour / week · 12 months",
    skills: ["Listening", "Encouragement", "Career experience"],
    description:
      "Guide a Thuna scholar through their year with weekly check-ins, advice and belief.",
  },
  {
    id: "v3",
    title: "Skills workshop facilitator",
    initiativeSlug: "thuna-skills",
    location: "Bangalore",
    commitment: "One weekend / month",
    skills: ["Trade skill", "Teaching", "Patience"],
    description:
      "Lead a workshop in your specialty — coding, tailoring, carpentry, digital marketing.",
  },
  {
    id: "v4",
    title: "Rapid response volunteer",
    initiativeSlug: "thuna-relief",
    location: "On-call, regional",
    commitment: "Variable",
    skills: ["Availability", "Logistics", "Calm under pressure"],
    description:
      "Join a trained team ready to mobilize within 24 hours of a disaster.",
  },
];

// --- Partners --------------------------------------------------------------
export const partners: Partner[] = [
  { id: "p1", name: "Meridian Foundation",  type: "ngo",        blurb: "Global funder for community health." },
  { id: "p2", name: "Arca Bank",            type: "corporate",  blurb: "Underwriting our scholarships program." },
  { id: "p3", name: "Solur Village Council",type: "community",  blurb: "Ten-year village transformation partner." },
  { id: "p4", name: "United Youth Network", type: "ngo",        blurb: "Youth leadership program collaborator." },
  { id: "p5", name: "Lumen Energy",         type: "corporate",  blurb: "Solar micro-grids across 22 villages." },
  { id: "p6", name: "Ministry of Community",type: "government", blurb: "Public partner for disaster response." },
];

// --- FAQ -------------------------------------------------------------------
export const faqs: FaqItem[] = [
  {
    question: "How do you decide where to work?",
    answer:
      "We partner with local councils and community leaders to identify needs. We only start where we're invited and we commit for the long term.",
  },
  {
    question: "How is my donation used?",
    answer:
      "You can direct donations to a specific initiative, campaign, or the general fund. We publish an annual impact report.",
  },
  {
    question: "Can I volunteer remotely?",
    answer:
      "Yes — mentorship and skills-based volunteering happen worldwide via video. Rapid-response volunteers work regionally.",
  },
  {
    question: "Do you work with governments and companies?",
    answer:
      "Yes. Partnership makes us stronger — we work with public and private partners who share our values.",
  },
];
