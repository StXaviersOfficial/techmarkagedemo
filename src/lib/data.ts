// Centralized content for TechMarkage Express — a demo site by Amrit Raj.
// All names, routes, and testimonials are fictional. Stats are set to 0
// to signal this is a pre-launch demo build.

export const company = {
  name: "TechMarkage Express",
  legalName: "TechMarkage Express (Demo)",
  tagline: "Every mile, beautifully done.",
  shortPitch:
    "A premium intercity coach service concept connecting cities across India with sleeper, semi-sleeper, and Volvo multi-axle buses. This is a demo build — the real fleet launches soon.",
  foundedYear: 2026,
  headquarters: "3rd Floor, Aurum House, MG Road, Bengaluru 560001",
  phone: "+91 80 4567 1890",
  tollFree: "1800 425 8690",
  email: "care@techmarkage.express",
  pressEmail: "press@techmarkage.express",
  gst: "29AAGCV1247F1ZP",
  cac: "U60221KA2026PTC000000",
  author: "Amrit Raj",
};

export const stats = [
  { label: "Coaches in fleet", value: 0, suffix: "" },
  { label: "Cities connected", value: 0, suffix: "" },
  { label: "Happy travelers", value: 0, suffix: "", compact: true },
  { label: "Years on the road", value: 0, suffix: "" },
];

export const whyChooseUs = [
  {
    icon: "shield",
    title: "Safety first, always",
    description:
      "Every TechMarkage coach will be fitted with disc brakes, ABS, ESC, and speed governors. Two trained drivers per long-haul route, plus a 24×7 control room monitoring telematics in real time.",
  },
  {
    icon: "armchair",
    title: "Engineered for comfort",
    description:
      "Reclining seats with calf support, individual AC vents, USB charging at every seat, and ergonomic legroom designed for 12+ hour journeys without fatigue.",
  },
  {
    icon: "clock",
    title: "On-time, guaranteed",
    description:
      "We track departure punctuality as a core metric. If your coach leaves the boarding point more than 20 minutes late, your next ride is on us — no questions asked.",
  },
  {
    icon: "tag",
    title: "Honest, affordable fares",
    description:
      "Dynamic pricing that stays fair. Sleeper fares starting at ₹299, with no hidden convenience fees, no surge spikes on weekends, and free cancellations up to 8 hours before departure.",
  },
  {
    icon: "snowflake",
    title: "AC and non-AC options",
    description:
      "Choose between fully air-conditioned Volvo multi-axle coaches, climate-controlled sleepers, or budget-friendly non-AC seater routes on shorter inter-district corridors.",
  },
  {
    icon: "radar",
    title: "Live GPS tracking",
    description:
      "Share your live location with family from inside the app. Get arrival ETA at every pickup, geo-fenced stop alerts, and a driver profile before you board.",
  },
];

export type Route = {
  id: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  price: number;
  duration: string;
  distanceKm: number;
  departures: string[];
  busType: string;
  popularity: number;
};

export const popularRoutes: Route[] = [
  {
    id: "blr-mum",
    from: "Bengaluru",
    to: "Mumbai",
    fromCity: "Kempegowda Bus Station",
    toCity: "Borivali East Terminal",
    price: 1499,
    duration: "16h 20m",
    distanceKm: 980,
    departures: ["17:30", "19:00", "21:15"],
    busType: "Volvo Multi-Axle Sleeper",
    popularity: 98,
  },
  {
    id: "del-jaipur",
    from: "Delhi",
    to: "Jaipur",
    fromCity: "Anand Vihar ISBT",
    toCity: "Sindhi Camp Terminal",
    price: 649,
    duration: "5h 45m",
    distanceKm: 281,
    departures: ["06:30", "09:00", "14:00", "23:00"],
    busType: "AC Semi-Sleeper",
    popularity: 95,
  },
  {
    id: "hyd-pune",
    from: "Hyderabad",
    to: "Pune",
    fromCity: "MGBS Junction",
    toCity: "Swargate Bus Stand",
    price: 1199,
    duration: "11h 10m",
    distanceKm: 560,
    departures: ["18:45", "20:30"],
    busType: "AC Sleeper",
    popularity: 91,
  },
  {
    id: "chen-bang",
    from: "Chennai",
    to: "Bengaluru",
    fromCity: "Koyambedu CMBT",
    toCity: "Shantinagar BMTC",
    price: 549,
    duration: "5h 20m",
    distanceKm: 346,
    departures: ["05:45", "07:30", "11:00", "15:30", "23:30"],
    busType: "AC Seater",
    popularity: 93,
  },
  {
    id: "pune-goa",
    from: "Pune",
    to: "Goa",
    fromCity: "Shivaji Nagar Terminal",
    toCity: "Panjim Kadamba Stand",
    price: 1299,
    duration: "12h 40m",
    distanceKm: 435,
    departures: ["19:15", "21:00"],
    busType: "AC Sleeper",
    popularity: 89,
  },
  {
    id: "ahm-surat",
    from: "Ahmedabad",
    to: "Surat",
    fromCity: "Geeta Mandir ST Stand",
    toCity: "Sahara Darwaja",
    price: 399,
    duration: "4h 15m",
    distanceKm: 265,
    departures: ["06:00", "08:15", "12:30", "17:45", "22:00"],
    busType: "Non-AC Seater",
    popularity: 87,
  },
  {
    id: "kol-dgh",
    from: "Kolkata",
    to: "Digha",
    fromCity: "Esplanade Terminus",
    toCity: "Old Digha Bus Stand",
    price: 449,
    duration: "4h 30m",
    distanceKm: 184,
    departures: ["06:00", "08:30", "13:00", "17:00"],
    busType: "AC Semi-Sleeper",
    popularity: 84,
  },
  {
    id: "ind-bpl",
    from: "Indore",
    to: "Bhopal",
    fromCity: "Sarwate Bus Terminal",
    toCity: "Nadra Bus Stand",
    price: 449,
    duration: "3h 50m",
    distanceKm: 193,
    departures: ["05:30", "09:00", "13:30", "18:00", "23:00"],
    busType: "AC Seater",
    popularity: 81,
  },
];

export type BusType = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  seats: number;
  features: string[];
  fareFrom: number;
  popularFor: string;
};

export const fleet: BusType[] = [
  {
    id: "volvo-multi-axle",
    name: "Volvo 9400 Multi-Axle",
    tagline: "Our flagship long-haul cruiser",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    seats: 44,
    features: ["Reclining seats", "Individual AC vents", "USB charging", "Onboard Wi-Fi", "Reading lights", "Pantry snacks"],
    fareFrom: 1199,
    popularFor: "Bengaluru – Mumbai, Hyderabad – Pune",
  },
  {
    id: "ac-sleeper",
    name: "Mercedes-Benz O500 Sleeper",
    tagline: "Lie-flat berths for overnight routes",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    seats: 36,
    features: ["Curtained sleeper berths", "Blanket & pillow", "Reading lamp", "Charging socket", "Personal TV", "Bottled water"],
    fareFrom: 999,
    popularFor: "Pune – Goa, Hyderabad – Pune",
  },
  {
    id: "semi-sleeper",
    name: "Ashok Leyland 12.5M Semi-Sleeper",
    tagline: "The dependable mid-distance workhorse",
    image:
      "https://images.unsplash.com/photo-1554260570-e9689a3418b8?auto=format&fit=crop&w=1200&q=80",
    seats: 41,
    features: ["160° recline", "Overhead racks", "Charging ports", "Climate control", "First-aid kit", "CCTV monitored"],
    fareFrom: 599,
    popularFor: "Delhi – Jaipur, Chennai – Bengaluru",
  },
  {
    id: "ac-seater",
    name: "Tata Starbus AC Seater",
    tagline: "Quick hops done right",
    image:
      "https://images.unsplash.com/photo-1556122071-e404eaedb77f?auto=format&fit=crop&w=1200&q=80",
    seats: 49,
    features: ["High-back seats", "USB charging", "Air suspension", "Mobile holders", "Ambient lighting", "Priority seating"],
    fareFrom: 349,
    popularFor: "Chennai – Bengaluru, Indore – Bhopal",
  },
  {
    id: "non-ac-seater",
    name: "Eicher 2050 Non-AC Seater",
    tagline: "Budget-friendly district connector",
    image:
      "https://images.unsplash.com/photo-1473042904451-00171c69419d?auto=format&fit=crop&w=1200&q=80",
    seats: 52,
    features: ["Push-back seats", "Large windows", "Roof vents", "Storage bins", "Affordable fares", "Frequent service"],
    fareFrom: 199,
    popularFor: "Ahmedabad – Surat, Indore – Ujjain",
  },
  {
    id: "electric-ac",
    name: "Switch EiV 22 Electric AC",
    tagline: "Zero-emission city-to-airport shuttle",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    seats: 38,
    features: ["All-electric drive", "Whisper quiet", "USB-C fast charge", "Real-time tracking", "Low-floor boarding", "Step-free access"],
    fareFrom: 299,
    popularFor: "City – Airport shuttles (BLR, HYD)",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  route: string;
  rating: number;
  quote: string;
  avatar: string;
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Iyer",
    route: "Bengaluru → Mumbai",
    rating: 5,
    quote:
      "The Volvo multi-axle was spotless and the berth was wide enough to actually sleep in. The driver pulled into Borivali 8 minutes early. I've stopped looking at other operators.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    date: "March 2026",
  },
  {
    id: "t2",
    name: "Rohan Mehta",
    route: "Pune → Goa",
    rating: 5,
    quote:
      "Booked at 11pm, boarded at 9pm the next day. The live tracking link was a relief — my parents knew exactly where I was the whole 12 hours. Worth every rupee.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    date: "February 2026",
  },
  {
    id: "t3",
    name: "Sneha Reddy",
    route: "Hyderabad → Pune",
    rating: 5,
    quote:
      "I travel this route every two weeks for work. TechMarkage is the only operator where the AC actually works, the blankets are clean, and the staff don't blast their own music at 2am.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    date: "January 2026",
  },
  {
    id: "t4",
    name: "Vikram Anand",
    route: "Chennai → Bengaluru",
    rating: 5,
    quote:
      "Five departures a day on this route means I never have to plan ahead. The AC seater is comfortable for a 5-hour hop and the price hasn't moved in two years.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    date: "March 2026",
  },
  {
    id: "t5",
    name: "Fatima Sheikh",
    route: "Delhi → Jaipur",
    rating: 5,
    quote:
      "Took the 6:30am semi-sleeper for a day trip. Reached Jaipur before lunch, caught the return at 11pm. Clean bus, polite driver, no nonsense. This is how intercity should be.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    date: "April 2026",
  },
  {
    id: "t6",
    name: "Karthik Subramaniam",
    route: "Ahmedabad → Surat",
    rating: 5,
    quote:
      "₹399 for a 4-hour ride with USB charging and air suspension. The competition charges the same for a rattling non-AC bus. TechMarkage is the obvious choice on this corridor.",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80",
    date: "February 2026",
  },
  {
    id: "t7",
    name: "Priya Nair",
    route: "Kolkata → Digha",
    rating: 5,
    quote:
      "Booked four tickets for the family weekend. The app grouped our seats automatically, the bus had working AC, and the driver took the bypass instead of sitting in traffic. Impressive.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    date: "March 2026",
  },
  {
    id: "t8",
    name: "Aditya Kulkarni",
    route: "Indore → Bhopal",
    rating: 5,
    quote:
      "Frequent service means I never need to wait more than 30 minutes at the terminal. The buses leave on time, every time. Punctuality is TechMarkage's superpower.",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&q=80",
    date: "January 2026",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Ravindra Pai",
    role: "Founder & Managing Director",
    bio: "Leading the vision behind TechMarkage Express — a new intercity coach service built around dignity, punctuality, and comfort. Eighteen years in surface transport logistics.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Lakshmi Venkataraman",
    role: "Chief Operating Officer",
    bio: "Designing the depot network, crew scheduling, and the 24×7 operations control centre in Bengaluru. Previously ran ground operations at a major Indian low-cost carrier.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Imtiaz Khan",
    role: "Chief Technology Officer",
    bio: "Building the live tracking stack from scratch — telematics, geo-fencing, the consumer app, and the driver-facing PDA. Holds three patents in fleet telematics.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sara Mathew",
    role: "Head of Customer Experience",
    bio: "Leads the contact centre and in-app support team. Insists that every complaint is acknowledged within 90 seconds, no exceptions.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    year: "2026",
    title: "The idea takes shape",
    description:
      "TechMarkage Express is founded with a simple premise: intercity bus travel in India deserves better. The founding team begins route planning and fleet acquisition.",
  },
  {
    year: "Q3 2026",
    title: "First coaches ordered",
    description:
      "An initial batch of Volvo 9400 multi-axle coaches and Mercedes-Benz O500 sleepers is ordered. Depot leases signed in Bengaluru, Mumbai, and Hyderabad.",
  },
  {
    year: "Q4 2026",
    title: "Pilot corridor launches",
    description:
      "The Bengaluru–Chennai–Bengaluru corridor goes live as a pilot. Live GPS tracking, the consumer app, and the on-time guarantee roll out from day one.",
  },
  {
    year: "Q1 2027",
    title: "Network expansion",
    description:
      "Service extends to Mumbai, Pune, Goa, and Delhi–Jaipur. Fleet crosses 50 coaches. The electric airport-shuttle pilot begins in Bengaluru.",
  },
  {
    year: "Q2 2027",
    title: "100-city milestone",
    description:
      "The network reaches 100 cities and 2,400 daily departures. The sleeper product rolls out network-wide with complimentary linen service.",
  },
  {
    year: "2028",
    title: "Full national coverage",
    description:
      "TechMarkage Express operates coast to coast — from Kolkata to Ahmedabad, Delhi to Chennai. The fleet crosses 200 coaches with a 97% on-time record.",
  },
];

export const values = [
  {
    title: "We respect your time",
    description:
      "Departure punctuality is the single most-watched metric in the company. We would rather cancel a trip than run it late.",
  },
  {
    title: "We respect your money",
    description:
      "Transparent pricing. No surge bombs on long weekends. No convenience fees. If we raise a fare, we publish why.",
  },
  {
    title: "We respect the road",
    description:
      "Two trained drivers on every route over 8 hours. Mandatory 4-hour rest between shifts. Telematics-flagged speeding incidents trigger automatic review.",
  },
  {
    title: "We respect the people who move you",
    description:
      "Drivers and crew are salaried, not commissioned. Health insurance, PF, and an annual wellness check are non-negotiable for every crew member.",
  },
];

export const faqs = [
  {
    q: "How early should I book my ticket?",
    a: "For popular routes like Bengaluru–Mumbai or Pune–Goa, we recommend booking 5–7 days in advance, especially on weekends and long weekends. For shorter corridors like Chennai–Bengaluru, same-day booking is usually fine across our five daily departures.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellations up to 8 hours before departure with a full refund to your original payment method. Between 8 and 2 hours, a 25% fee applies. Within 2 hours of departure, tickets are non-refundable but can be rescheduled once at no charge.",
  },
  {
    q: "Does every coach have live tracking?",
    a: "Yes. Every coach in the TechMarkage fleet is fitted with GPS telematics. Once your booking is confirmed, you'll see a 'Track my bus' link in the app and in your confirmation email.",
  },
  {
    q: "Are blankets and pillows provided on sleeper routes?",
    a: "Yes, on all AC sleeper and Volvo multi-axle sleeper services, a fresh blanket and pillow are placed on your berth before boarding. Linen is changed between every trip at the depot.",
  },
  {
    q: "Can I choose my seat?",
    a: "Absolutely. The seat map opens during booking for every coach type. Lower-berth, window, and front-row seats carry a small premium of ₹50–₹150 depending on the route.",
  },
  {
    q: "Do you operate AC and non-AC buses on the same route?",
    a: "On most inter-district corridors under 250km, yes. On long-haul routes over 400km, the network is fully air-conditioned for crew and passenger safety.",
  },
];

export const contactSubjects = [
  "Booking or refund issue",
  "Lost luggage enquiry",
  "Feedback on a trip",
  "Partnership & fleet enquiries",
  "Press & media",
  "Careers at TechMarkage",
];
