"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/site/reveal";

function TestimonialCard({
  t,
}: {
  t: (typeof testimonials)[number];
}) {
  return (
    <article className="mx-3 flex w-[320px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:w-[400px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border">
            <Image
              src={t.avatar}
              alt={t.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-display text-sm font-bold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.route}</div>
          </div>
        </div>
        <Quote className="h-7 w-7 text-accent/30" />
      </div>
      <div className="mt-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cnStar(i < t.rating)}
          />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
        “{t.quote}”
      </p>
      <div className="mt-4 text-xs text-muted-foreground">{t.date}</div>
    </article>
  );
}

function cnStar(filled: boolean) {
  return `h-4 w-4 ${filled ? "fill-accent text-accent" : "fill-muted text-muted-foreground"}`;
}

export function Testimonials() {
  // Duplicate the array so the marquee can loop seamlessly.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            From our travellers
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            1.24 million trips.
            <br className="hidden sm:block" /> 38,400+ five-star reviews.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            We don&apos;t curate these. Every review below was left voluntarily by a
            paying Voyaline passenger in the last 90 days.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14 marquee-paused">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-secondary/90 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-secondary/90 to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="relative mt-6 marquee-paused">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-secondary/90 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-secondary/90 to-transparent sm:w-32" />
        <div className="flex w-max animate-marquee-slow" style={{ animationDirection: "reverse" }}>
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => (
            <TestimonialCard key={`rev-${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
