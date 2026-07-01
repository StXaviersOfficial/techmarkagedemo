"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bus, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center overflow-hidden px-4 py-20">
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Animated bus scene */}
          <div className="relative mx-auto h-48 sm:h-64">
            <motion.svg
              viewBox="0 0 600 240"
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Road */}
              <line
                x1="0"
                y1="200"
                x2="600"
                y2="200"
                stroke="currentColor"
                className="text-border"
                strokeWidth="3"
              />
              {/* Animated road dashes */}
              <line
                x1="0"
                y1="200"
                x2="600"
                y2="200"
                stroke="currentColor"
                className="text-accent"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: "20 16",
                  animation: "road-dash 1s linear infinite",
                }}
              />

              {/* The bus driving off */}
              <motion.g
                initial={{ x: -200, y: 0, rotate: 0 }}
                animate={{ x: 700, y: -40, rotate: -15 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeIn",
                  repeatDelay: 1,
                }}
              >
                {/* Bus body */}
                <rect
                  x="60"
                  y="120"
                  width="140"
                  height="60"
                  rx="10"
                  fill="#0B1B3B"
                />
                {/* Windows */}
                <rect x="72" y="130" width="22" height="16" rx="2" fill="#FCD34D" />
                <rect x="100" y="130" width="22" height="16" rx="2" fill="#FCD34D" />
                <rect x="128" y="130" width="22" height="16" rx="2" fill="#FCD34D" />
                <rect x="156" y="130" width="22" height="16" rx="2" fill="#FCD34D" />
                {/* Headlight */}
                <circle cx="195" cy="150" r="4" fill="#F59E0B" />
                {/* Wheels */}
                <circle cx="90" cy="185" r="12" fill="#0B1B3B" />
                <circle cx="90" cy="185" r="6" fill="#94A3B8" />
                <circle cx="170" cy="185" r="12" fill="#0B1B3B" />
                <circle cx="170" cy="185" r="6" fill="#94A3B8" />
              </motion.g>

              {/* Signpost */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <line x1="450" y1="200" x2="450" y2="100" stroke="currentColor" className="text-border" strokeWidth="4" />
                <rect x="420" y="80" width="120" height="36" rx="4" fill="#F59E0B" />
                <text x="480" y="104" textAnchor="middle" fill="#0B1B3B" fontSize="14" fontWeight="700" fontFamily="sans-serif">
                  WRONG TURN
                </text>
              </motion.g>

              {/* Cloud puffs (motion lines suggesting speed) */}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx={120}
                  cy={160}
                  r={6 - i}
                  fill="currentColor"
                  className="text-muted-foreground/40"
                  initial={{ opacity: 0, cx: 120 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    cx: [120, 60, 20],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8"
          >
            <div className="font-display text-7xl font-extrabold tracking-tight text-primary sm:text-9xl">
              4<span className="text-gradient-amber">0</span>4
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              This route doesn&apos;t exist.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
              The page you&apos;re looking for took a wrong turn. Let&apos;s get you back
              on a route that&apos;s actually running.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8">
                <Link href="/#routes">
                  <Search className="mr-2 h-4 w-4" />
                  Browse routes
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Bus className="h-4 w-4 text-accent" />
              <span>Or call us at</span>
              <a
                href="tel:18004258690"
                className="font-semibold text-primary hover:text-accent transition-colors"
              >
                1800 425 8690
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
