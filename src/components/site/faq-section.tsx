"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/data";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import { showDemoNotice } from "@/lib/demo";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            Everything you need to know before your first trip. Can&apos;t find what
            you&apos;re looking for? Our team is one tap away.
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
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
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-accent transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center" delay={0.2}>
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
