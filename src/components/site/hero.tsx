"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Bus, Star, MapPin, Clock, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: yBg, scale }} className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2400&q=80"
          alt="Highway winding through a scenic valley at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/60" />
      </motion.div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 -z-10 bg-grid-dark opacity-50" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-1/4 h-[32rem] w-[32rem] rounded-full bg-cyan-400/15 blur-3xl"
      />

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/90">
              Demo build · concept preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Travel further.
            <br />
            <span className="text-gradient-cyan">Travel smarter.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80 sm:text-xl text-pretty"
          >
            A premium intercity coach service concept — sleeper, semi-sleeper, and Volvo
            multi-axle buses across India. Live GPS tracking, on-time guarantee, and fares
            that respect your wallet, starting at ₹299.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 h-14 px-8 text-base"
            >
              <Link href="/#book">
                Book a ticket
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground backdrop-blur-sm h-14 px-8 text-base"
            >
              <Link href="/#routes">
                <MapPin className="mr-2 h-4 w-4" />
                View routes
              </Link>
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Star className="h-4 w-4 fill-accent text-accent" />
                  </motion.span>
                ))}
              </div>
              <span className="text-sm text-primary-foreground/80">
                <span className="font-bold text-primary-foreground">5.0</span> · demo preview
              </span>
            </div>
            <div className="hidden h-5 w-px bg-primary-foreground/20 sm:block" />
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>On-time guarantee</span>
            </div>
            <div className="hidden h-5 w-px bg-primary-foreground/20 sm:block" />
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <Clock className="h-4 w-4 text-accent" />
              <span>24×7 control room</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated coach silhouette */}
      <motion.div
        initial={{ x: "-110%" }}
        animate={{ x: "110%" }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 1 }}
        className="pointer-events-none absolute bottom-8 left-0 hidden lg:flex items-center gap-3 opacity-60"
      >
        <Bus className="h-8 w-8 text-accent" />
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-primary-foreground/50"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
