"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Armchair,
  Clock,
  Tag,
  Snowflake,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { whyChooseUs } from "@/lib/data";
import {
  Reveal,
  Stagger,
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  rotateIn,
  EASE,
} from "@/components/site/anim";

const iconMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  armchair: Armchair,
  clock: Clock,
  tag: Tag,
  snowflake: Snowflake,
  radar: Radar,
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading block — 3 staggered elements */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal variant={scaleIn}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Why TechMarkage
            </span>
          </Reveal>
          <Reveal variant={fadeUp} delay={0.1}>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              The details that decide
              <br className="hidden sm:block" /> whether you arrive rested.
            </h2>
          </Reveal>
          <Reveal variant={fadeUp} delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              Every choice we make — from the seat foam we specify to the rest hours we
              mandate for drivers — is engineered around one question: would we put our own
              family on this bus?
            </p>
          </Reveal>
        </div>

        {/* 6 cards with stagger — each card animates from alternating sides */}
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            // Alternate entrance direction per card for visual variety
            const variant = i % 3 === 0 ? fadeLeft : i % 3 === 1 ? fadeUp : fadeRight;
            return (
              <motion.div
                key={item.title}
                variants={variant}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Top gradient bar — scales in on hover */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-accent to-cyan-300"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: EASE }}
                />
                <div className="relative">
                  {/* Icon — rotates in */}
                  <motion.div
                    variants={rotateIn}
                    className="grid h-14 w-14 place-items-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {/* Decorative corner glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-300 group-hover:bg-accent/10" />
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
