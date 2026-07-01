"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bus, Target, Heart, Users, Leaf } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal, Stagger, staggerItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { company, leadership, milestones, values, stats } from "@/lib/data";
import { showDemoNotice } from "@/lib/demo";

const valueIcons = [Target, Heart, Users, Leaf];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary py-32 text-primary-foreground sm:py-40">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2400&q=80"
              alt="Open highway through Indian countryside"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-primary/50" />
          </div>
          <div className="absolute inset-0 bg-grid-dark opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Launching {company.foundedYear}
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                We move people
                <br />
                <span className="text-gradient-cyan">with dignity.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                TechMarkage Express is a new intercity coach service built around a simple
                idea: bus travel in India deserves better. This is a demo of what&apos;s
                coming — the real fleet launches soon.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Our vision
                </span>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  A new name for a forgotten category.
                </h2>
              </Reveal>
              <Reveal className="lg:col-span-7" delay={0.1}>
                <div className="space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
                  <p>
                    Intercity bus travel in India moves millions of people every day. The
                    demand is obvious, the corridors are proven, yet the experience remains
                    universally miserable — cramped seats, broken AC, opaque pricing, and
                    no way to know when your bus will actually show up.
                  </p>
                  <p>
                    TechMarkage Express was founded to fix that. Not with a marketing
                    rethink, but with an operational one: buy the right coaches, hire and
                    train drivers as salaried professionals, instrument every vehicle with
                    live telematics, and hold ourselves to a 20-minute on-time guarantee.
                  </p>
                  <p>
                    The question the founding team asks before every decision hasn&apos;t
                    changed:
                    <span className="font-semibold text-foreground"> would we put our own family on this bus?</span>
                  </p>
                  <p>
                    That single test shapes everything — from the seat foam density we
                    specify, to the mandatory 4-hour rest between driver shifts, to the
                    on-time guarantee we plan to offer network-wide from day one. This
                    demo showcases the digital experience we&apos;re building. The fleet is
                    next.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Mission banner */}
        <section className="relative overflow-hidden bg-secondary/60 py-20">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <Bus className="mx-auto h-10 w-10 text-accent" />
              <p className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl lg:text-4xl">
                “We don&apos;t sell tickets. We sell a promise that you&apos;ll arrive
                rested, on time, and treated like a person — not a row number.”
              </p>
              <div className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Ravindra Pai</span>
                <br />
                Founder &amp; Managing Director
              </div>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                What we stand for
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Four principles, non-negotiable.
              </h2>
            </Reveal>

            <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" stagger={0.08}>
              {values.map((v, i) => {
                const Icon = valueIcons[i] ?? Target;
                return (
                  <motion.div
                    key={v.title}
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold tracking-tight">
                          {v.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {v.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* Roadmap timeline */}
        <section className="py-24 sm:py-32 bg-secondary/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Roadmap
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                The road ahead.
              </h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg text-pretty">
                Our planned milestones from concept to full national coverage.
              </p>
            </Reveal>

            <div className="relative mt-14">
              <div className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-border sm:left-1/2" />
              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <Reveal
                    key={m.year}
                    delay={i * 0.05}
                    className="relative pl-12 sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center sm:pl-0"
                  >
                    <div
                      className={
                        i % 2 === 0
                          ? "sm:col-start-1 sm:text-right"
                          : "sm:col-start-2"
                      }
                    >
                      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="font-display text-2xl font-extrabold text-accent">
                          {m.year}
                        </div>
                        <h3 className="mt-2 font-display text-lg font-bold tracking-tight">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {m.description}
                        </p>
                      </div>
                    </div>
                    <span className="absolute left-0 top-6 grid h-9 w-9 place-items-center rounded-full border-2 border-accent bg-background text-accent sm:left-1/2 sm:-translate-x-1/2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Leadership
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                The people behind the vision.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
                A founding team with decades of combined experience in surface transport,
                aviation operations, and fleet telematics.
              </p>
            </Reveal>

            <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {leadership.map((person) => (
                <motion.article
                  key={person.name}
                  variants={staggerItem}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={person.avatar}
                      alt={`${person.name}, ${person.role} at TechMarkage Express`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold tracking-tight">
                      {person.name}
                    </h3>
                    <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      {person.role}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {person.bio}
                    </p>
                  </div>
                </motion.article>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Stats banner */}
        <section className="bg-primary py-20 text-primary-foreground sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Demo mode — metrics populate after launch
              </span>
            </Reveal>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
              {stats.map((s) => (
                <Reveal key={s.label} className="text-center">
                  <div className="font-display text-4xl font-extrabold text-accent sm:text-5xl">
                    {s.compact
                      ? s.value >= 1_000_000
                        ? `${(s.value / 1_000_000).toFixed(2)}M`
                        : `${(s.value / 1_000).toFixed(0)}K`
                      : s.value.toLocaleString("en-IN")}
                    {s.suffix}
                  </div>
                  <div className="mt-2 text-sm text-primary-foreground/80">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal className="rounded-3xl border border-border bg-gradient-to-br from-secondary to-secondary/40 p-10 text-center sm:p-14">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Travel with us.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg text-pretty">
                A demo built to showcase the TechMarkage Express experience. The real fleet
                launches soon — your seat is waiting.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8"
                >
                  <Link href="/#book">
                    Try the demo booking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  onClick={() => showDemoNotice("Contact form")}
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-8"
                >
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
