"use client";

import { motion } from "framer-motion";
import { Search, Ticket, Bus, MapPin } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/site/reveal";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search your route",
    description:
      "Enter your origin, destination, and date. We show every available coach class, departure time, and fare side by side — no tabs, no friction.",
  },
  {
    icon: Ticket,
    step: "02",
    title: "Pick your seat",
    description:
      "Open the live seat map, choose your berth or seat, and check out in under 30 seconds. Pay with UPI, cards, wallets, or net banking.",
  },
  {
    icon: Bus,
    step: "03",
    title: "Board with a QR",
    description:
      "Your boarding pass lands in the app and your inbox. Show the QR at the gate, hop on, and find your seat — no printouts, no fumbling.",
  },
  {
    icon: MapPin,
    step: "04",
    title: "Track in real time",
    description:
      "Share your live GPS link with family. Get a push notification 25 minutes before every stop, and an accurate ETA that refreshes every 90 seconds.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            How it works
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            From search to seat in four steps.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            We obsess over the booking flow so you don&apos;t have to. The entire journey —
            from opening the app to settling into your seat — takes less than two minutes.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {steps.map((s) => (
              <motion.div
                key={s.step}
                variants={staggerItem}
                className="relative text-center"
              >
                <div className="relative mx-auto grid h-28 w-28 place-items-center">
                  <div className="absolute inset-0 rounded-full bg-accent/5" />
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="relative grid h-20 w-20 place-items-center rounded-full bg-card border border-border text-accent shadow-sm"
                  >
                    <s.icon className="h-8 w-8" strokeWidth={1.6} />
                  </motion.div>
                  <span className="absolute -top-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground shadow-sm">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
