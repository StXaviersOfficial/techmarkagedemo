import { promises as fs } from "fs";
import path from "path";

export type Review = {
  id: string;
  name: string;
  route: string;
  rating: number;
  quote: string;
  date: string;
  createdAt: number;
};

// Seed reviews — these load on first run so the section is never empty.
// Names are realistic; avatars are rendered as initials (no stock photos).
const seedReviews: Review[] = [
  {
    id: "seed-1",
    name: "Ananya Iyer",
    route: "Bengaluru → Mumbai",
    rating: 5,
    quote:
      "This is a placeholder review. Real reviews will be written by users on the actual website once it goes live.",
    date: "March 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
  {
    id: "seed-2",
    name: "Rohan Mehta",
    route: "Pune → Goa",
    rating: 5,
    quote:
      "This is a placeholder review. Real reviews will be written by users on the actual website once it goes live.",
    date: "February 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 21,
  },
  {
    id: "seed-3",
    name: "Sneha Reddy",
    route: "Hyderabad → Pune",
    rating: 5,
    quote:
      "This is a placeholder review. Real reviews will be written by users on the actual website once it goes live.",
    date: "January 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: "seed-4",
    name: "Vikram Anand",
    route: "Chennai → Bengaluru",
    rating: 5,
    quote:
      "This is a placeholder review. Real reviews will be written by users on the actual website once it goes live.",
    date: "March 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "seed-5",
    name: "Fatima Sheikh",
    route: "Delhi → Jaipur",
    rating: 5,
    quote:
      "This is a placeholder review. Real reviews will be written by users on the actual website once it goes live.",
    date: "April 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "seed-6",
    name: "Karthik Subramaniam",
    route: "Ahmedabad → Surat",
    rating: 5,
    quote:
      "This is a placeholder review. Real reviews will be written by users on the actual website once it goes live.",
    date: "February 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
  },
];

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "reviews.json");

async function ensureStore(): Promise<Review[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    await fs.writeFile(DATA_FILE, JSON.stringify(seedReviews, null, 2));
    return seedReviews;
  } catch {
    // File doesn't exist or is invalid — create it with seeds.
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch {
      // ignore mkdir errors (e.g. read-only FS on serverless)
    }
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(seedReviews, null, 2));
    } catch {
      // If we can't write (serverless read-only FS), just return seeds in memory.
    }
    return seedReviews;
  }
}

export async function getReviews(): Promise<Review[]> {
  const reviews = await ensureStore();
  return [...reviews].sort((a, b) => b.createdAt - a.createdAt);
}

export async function addReview(
  input: Omit<Review, "id" | "createdAt" | "date">
): Promise<Review> {
  const reviews = await ensureStore();
  const now = Date.now();
  const review: Review = {
    ...input,
    id: `r-${now}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
    date: new Date(now).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    }),
  };
  const updated = [review, ...reviews];
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2));
  } catch {
    // best-effort write; review still returned for the session
  }
  return review;
}
