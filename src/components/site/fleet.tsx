"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Check, ArrowRight } from "lucide-react";
import { fleet } from "@/lib/data";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Fleet() {
  const [active, setActive] = useState(0);
  const bus = fleet[active];

  return (
    <section
      id="fleet"
      className="relative py-24 sm:py-32 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Our fleet
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Six coach classes.
            <br className="hidden sm:block" /> One standard of care.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            From ₹199 non-AC district connectors to lie-flat Mercedes-Benz sleepers, every
            coach is maintained in-house at our 14 depots and inspected before every
            single trip.
          </p>
        </Reveal>

        {/* Selector tabs */}
        <Reveal className="mt-12" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2">
            {fleet.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  active === i
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                {b.name.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active bus showcase */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-2"
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]">
                <Image
                  src={bus.image}
                  alt={`${bus.name} coach operated by Voyaline Express`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="rounded-lg bg-background/95 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Fares from
                    </span>
                    <span className="ml-2 font-display text-lg font-extrabold text-primary">
                      ₹{bus.fareFrom}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-background/95 px-3 py-1.5 backdrop-blur-sm">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-primary">{bus.seats} seats</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {bus.tagline}
                </div>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {bus.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Popular on: <span className="font-medium text-foreground">{bus.popularFor}</span>
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {bus.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <a href="#book">
                      Reserve this coach
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="#fleet">Compare classes</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick grid of all coaches */}
        <Reveal className="mt-12" delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-center gap-4 rounded-xl border p-4 text-left transition-all",
                  active === i
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-accent/40 hover:bg-secondary/40"
                )}
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-sm font-bold">{b.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    ₹{b.fareFrom} · {b.seats} seats
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
