import { NextRequest, NextResponse } from "next/server";
import { getReviews, addReview } from "@/lib/review-store";

export const dynamic = "force-dynamic";

// GET /api/reviews — list all reviews, newest first
export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json({ reviews, count: reviews.length });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load reviews", reviews: [], count: 0 },
      { status: 200 }
    );
  }
}

// POST /api/reviews — submit a new review
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, route, rating, quote } = body ?? {};

    if (
      typeof name !== "string" || name.trim().length < 2 ||
      typeof quote !== "string" || quote.trim().length < 10 ||
      typeof rating !== "number" || rating < 1 || rating > 5
    ) {
      return NextResponse.json(
        { error: "Invalid review. Name, rating (1–5), and a message are required." },
        { status: 400 }
      );
    }

    const review = await addReview({
      name: name.trim().slice(0, 80),
      route: typeof route === "string" ? route.trim().slice(0, 120) : "General",
      rating,
      quote: quote.trim().slice(0, 600),
    });

    return NextResponse.json({ review, ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save review", ok: false },
      { status: 500 }
    );
  }
}
