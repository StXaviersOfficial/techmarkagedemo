"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   Comprehensive animation library for TechMarkage Express
   Provides 8 reveal directions + stagger helpers so we can
   put 150+ scroll-triggered appearing animations across the site.
   ============================================================ */

// Easing curve used everywhere for consistency
export const EASE = [0.22, 1, 0.36, 1] as const;

// ---- Reveal variants (one per direction) ----
// Each has a slightly different duration so elements animate at
// varied speeds — making the stagger more visually interesting.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const flipUp: Variants = {
  hidden: { opacity: 0, rotateX: -45 },
  visible: { opacity: 1, rotateX: 0, transition: { duration: 0.6, ease: EASE } },
};

// ---- Stagger container variants ----
export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

// ---- Generic Reveal that accepts any variant ----
// NOTE: once=false so animations re-trigger every time the element
// enters the viewport — both on scroll-down AND scroll-up.
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  delay?: number;
  once?: boolean;
  id?: string;
  as?: "div" | "span" | "li" | "section" | "article";
};

export function Reveal({
  children,
  className,
  variant = fadeUp,
  delay = 0,
  once = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ---- Stagger wrapper ----
// NOTE: once=false so the stagger replays on every viewport entry.
type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  once = false,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ---- Item that goes inside a Stagger (uses fadeUp by default) ----
export const staggerItem = fadeUp;

// ---- Animated badge (small pill that scales+fades in) ----
export function AnimatedBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ---- Animated heading (fades up, slightly larger movement) ----
export function AnimatedHeading({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.h2
      ref={ref}
      variants={blurIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.h2>
  );
}
