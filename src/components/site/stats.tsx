"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import { stats } from "@/lib/data";
import { Reveal } from "@/components/site/reveal";

function formatValue(value: number, compact?: boolean) {
  if (!compact) return value.toLocaleString("en-IN");
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toLocaleString("en-IN");
}

function Counter({
  value,
  compact,
  suffix,
}: {
  value: number;
  compact?: boolean;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, motionValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatValue(Math.round(display), compact)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24 text-primary-foreground">
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            By the numbers
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            A concept built for scale.
          </h2>
          <p className="mt-4 text-base text-primary-foreground/70 sm:text-lg text-pretty">
            This is a pre-launch demo. The metrics below will populate once the fleet
            goes live — for now, they showcase the dashboard layout.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="relative rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="font-display text-4xl font-extrabold tracking-tight text-accent sm:text-5xl lg:text-6xl">
                <Counter
                  value={stat.value}
                  compact={stat.compact}
                  suffix={stat.suffix}
                />
              </div>
              <div className="mt-3 text-sm font-medium text-primary-foreground/80 sm:text-base">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center" delay={0.3}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Demo mode — real metrics appear after launch
          </span>
        </Reveal>
      </div>
    </section>
  );
}
