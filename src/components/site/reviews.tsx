"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Send, Loader2, CheckCircle2, MessageSquarePlus, User } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Review = {
  id: string;
  name: string;
  route: string;
  rating: number;
  quote: string;
  date: string;
  createdAt: number;
};

// Deterministic color from a name → used for the initial-avatar background.
const AVATAR_COLORS = [
  "from-cyan-500 to-teal-500",
  "from-blue-500 to-cyan-500",
  "from-teal-500 to-emerald-500",
  "from-indigo-500 to-cyan-500",
  "from-emerald-500 to-cyan-500",
  "from-sky-500 to-blue-500",
];

function colorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ review, isNew }: { review: Review; isNew?: boolean }) {
  return (
    <motion.article
      layout
      initial={isNew ? { opacity: 0, y: -16, scale: 0.97 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Initial-based avatar — no stock photos */}
          <div
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white shadow-sm",
              colorForName(review.name)
            )}
            aria-hidden
          >
            {initials(review.name)}
          </div>
          <div>
            <div className="font-display text-sm font-bold">{review.name}</div>
            <div className="text-xs text-muted-foreground">{review.route}</div>
          </div>
        </div>
        <Quote className="h-7 w-7 text-accent/30" />
      </div>
      <div className="mt-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < review.rating ? "fill-accent text-accent" : "fill-muted text-muted-foreground"
            )}
          />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
        “{review.quote}”
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{review.date}</span>
        {isNew && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Just posted
          </span>
        )}
      </div>
    </motion.article>
  );
}

function ReviewForm({ onSubmitted }: { onSubmitted: (review: Review) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [hoverRating, setHoverRating] = useState(0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || quote.trim().length < 10) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, route: route || "General", rating, quote }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const created: Review | undefined = data?.review;
      setStatus("done");
      setName("");
      setRoute("");
      setRating(5);
      setQuote("");
      toast.success("Review posted", {
        description: "Thanks for sharing your experience!",
      });
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        if (created) onSubmitted(created);
      }, 1100);
    } catch {
      setStatus("idle");
      toast.error("Could not post review", {
        description: "Please try again in a moment.",
      });
    }
  };

  if (!open) {
    return (
      <div className="flex justify-center">
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          size="lg"
          className="group h-14 px-8"
        >
          <MessageSquarePlus className="mr-2 h-5 w-5 text-accent transition-transform group-hover:rotate-12" />
          Write a review
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <form
        onSubmit={submit}
        className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-lg shadow-primary/5 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold tracking-tight">
            Share your experience
          </h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Your review will appear instantly in the list below. Demo mode — no signup needed.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your name *
            </span>
            <input
              type="text"
              required
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya Iyer"
              className="form-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Route travelled
            </span>
            <input
              type="text"
              maxLength={120}
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="e.g. Bengaluru → Mumbai"
              className="form-input"
            />
          </label>
        </div>

        <div className="mt-4">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Rating *
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                className="rounded p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-colors",
                    n <= (hoverRating || rating)
                      ? "fill-accent text-accent"
                      : "fill-muted text-muted-foreground"
                  )}
                />
              </button>
            ))}
            <span className="ml-2 text-sm font-semibold text-accent">
              {hoverRating || rating}.0
            </span>
          </div>
        </div>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your review * <span className="text-muted-foreground/60">(min 10 characters)</span>
          </span>
          <textarea
            required
            minLength={10}
            maxLength={600}
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Tell us about your trip — the coach, the crew, the punctuality…"
            className="form-input resize-none"
          />
          <span className="mt-1 block text-right text-xs text-muted-foreground">
            {quote.length}/600
          </span>
        </label>

        <div className="mt-4 flex items-center gap-3">
          <Button
            type="submit"
            disabled={status !== "idle"}
            className={cn(
              "h-12 px-7",
              status === "done"
                ? "bg-green-600 text-white hover:bg-green-600"
                : "bg-accent text-accent-foreground hover:bg-accent/90"
            )}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Post review
                </motion.span>
              )}
              {status === "loading" && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting…
                </motion.span>
              )}
              {status === "done" && (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Posted
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newId, setNewId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews", { cache: "no-store" });
      const data = await res.json();
      setReviews(data.reviews ?? []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const handleSubmitted = (created: Review) => {
    // Prepend the created review to local state immediately so the user
    // always sees it appear, even if the serverless store is ephemeral.
    setReviews((prev) => {
      // Avoid duplicates if the GET also returns it.
      if (prev.some((r) => r.id === created.id)) return prev;
      return [created, ...prev];
    });
    setNewId(created.id);
    const t = setTimeout(() => setNewId(null), 6000);
    return () => clearTimeout(t);
  };

  // Track the newest review after a refresh so we can badge it "Just posted".
  // (Only used as a fallback when the created review isn't passed directly.)
  useEffect(() => {
    if (reviews.length > 0 && refreshKey > 0) {
      setNewId(reviews[0].id);
      const t = setTimeout(() => setNewId(null), 6000);
      return () => clearTimeout(t);
    }
  }, [reviews, refreshKey]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-secondary/40">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Traveller reviews
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Real reviews. Really posted.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            These reviews are stored in a live demo database. Submit your own and watch it
            appear at the top of the list — no signup, no email, just a name and a story.
          </p>
        </Reveal>

        {/* Submission form */}
        <Reveal className="mt-12">
          <ReviewForm onSubmitted={handleSubmitted} />
        </Reveal>

        {/* Reviews grid */}
        <div className="mt-14">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 animate-pulse rounded-2xl border border-border bg-card/60"
                />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
              <User className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-4 font-display text-lg font-bold">No reviews yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Be the first to share your TechMarkage experience.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    isNew={review.id === newId}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Counter strip */}
        {!loading && reviews.length > 0 && (
          <Reveal className="mt-10 text-center" delay={0.1}>
            <p className="text-sm text-muted-foreground">
              <span className="font-display text-2xl font-extrabold text-accent">
                {reviews.length}
              </span>{" "}
              review{reviews.length === 1 ? "" : "s"} in the demo database · rating{" "}
              <span className="font-bold text-foreground">
                {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
              </span>
              /5
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
