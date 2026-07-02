"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Star, Bus } from "lucide-react";
import { popularRoutes } from "@/lib/data";
import { Reveal, Stagger, staggerItem, fadeUp, fadeLeft, fadeRight, scaleIn, blurIn } from "@/components/site/anim";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showDemoNotice } from "@/lib/demo";

export function PopularRoutes() {
  return (
    <section
      id="routes"
      className="relative py-24 sm:py-32 bg-secondary/40"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading block */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal variant={scaleIn}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Popular routes
              </span>
            </Reveal>
            <Reveal variant={blurIn} delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Where India will travel with us.
              </h2>
            </Reveal>
            <Reveal variant={fadeUp} delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
                Eight corridors planned for the launch phase. Fares are indicative — final
                pricing will depend on departure time, seat type, and date of travel.
              </p>
            </Reveal>
          </div>
          <Reveal variant={fadeRight} delay={0.3}>
            <Button
              onClick={() => showDemoNotice("Full route network")}
              variant="outline"
              className="hidden shrink-0 sm:inline-flex"
            >
              Browse all 86 cities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        {/* Route cards — staggered, alternating entrance */}
        <Stagger
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {popularRoutes.map((route, i) => {
            const variant = i % 2 === 0 ? fadeLeft : fadeRight;
            return (
              <motion.article
                key={route.id}
                variants={variant}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative border-b border-border bg-gradient-to-br from-primary to-primary/80 px-6 py-5 text-primary-foreground">
                  <div className="absolute inset-0 bg-grid-dark opacity-30" />
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                        <MapPin className="h-3 w-3 text-accent" />
                        {route.fromCity}
                      </div>
                      <div className="mt-1.5 font-display text-2xl font-bold leading-tight">
                        {route.from}
                      </div>
                      <div className="my-2 flex items-center gap-2">
                        <span className="h-px flex-1 bg-primary-foreground/20" />
                        <Bus className="h-3.5 w-3.5 text-accent" />
                        <span className="h-px flex-1 bg-primary-foreground/20" />
                      </div>
                      <div className="font-display text-2xl font-bold leading-tight">
                        {route.to}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                        <MapPin className="h-3 w-3 text-accent" />
                        {route.toCity}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-accent/20 text-accent border-0 hover:bg-accent/20">
                        ★ {route.popularity}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Duration
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 font-semibold">
                        <Clock className="h-3.5 w-3.5 text-accent" />
                        {route.duration}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Distance
                      </div>
                      <div className="mt-1 font-semibold">{route.distanceKm} km</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Departures today
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {route.departures.map((time) => (
                        <span
                          key={time}
                          className="rounded-md border border-border bg-secondary px-2 py-1 text-xs font-medium tabular-nums"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Coach type
                    </div>
                    <div className="mt-1 text-sm font-medium">{route.busType}</div>
                  </div>

                  <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Fares from
                      </div>
                      <div className="font-display text-2xl font-extrabold text-primary">
                        ₹{route.price}
                      </div>
                    </div>
                    <Button
                      onClick={() => showDemoNotice("Booking")}
                      size="sm"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 group/btn"
                    >
                      Book now
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </Stagger>

        <Reveal variant={fadeUp} className="mt-10 flex justify-center sm:hidden">
          <Button onClick={() => showDemoNotice("Full route network")} variant="outline">
            Browse all 86 cities
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
