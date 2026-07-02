"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/data";
import { Reveal, fadeUp, fadeLeft, scaleIn, blurIn, EASE } from "@/components/site/anim";
import { cn } from "@/lib/utils";
import { showDemoNotice } from "@/lib/demo";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <Reveal variant={scaleIn}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <HelpCircle className="h-3 w-3" />
              FAQ
            </span>
          </Reveal>
          <Reveal variant={blurIn} delay={0.1}>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal variant={fadeUp} delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              Everything you need to know before your first trip. Can&apos;t find what
              you&apos;re looking for? Our team is one tap away.
            </p>
          </Reveal>
        </div>

        {/* FAQ items — staggered slide-in from left */}
        <motion.div
          className="mt-12 space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={fadeLeft}
                whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={cn(
                  "overflow-hidden rounded-xl border bg-card transition-colors",
                  isOpen ? "border-accent/40" : "border-border"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-bold sm:text-base">
                    {f.q}
                  </span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE }}>
                    <ChevronDown className="h-5 w-5 shrink-0 text-accent" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <Reveal variant={fadeUp} className="mt-10 text-center" delay={0.2}>
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-accent font-semibold"
              onClick={() => showDemoNotice("Live chat support")}
            >
              Talk to our team →
            </Button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
