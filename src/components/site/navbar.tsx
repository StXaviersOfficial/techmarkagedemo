"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Bus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#routes", label: "Routes" },
  { href: "/#fleet", label: "Fleet" },
  { href: "/#why-us", label: "Why Voyaline" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-12px_rgba(11,27,59,0.18)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Voyaline Express home"
          >
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <Bus className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-tight text-primary">
                Voyaline
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                Express
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary group"
              >
                {link.label}
                <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/#track"
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              Track a bus
            </Link>
            <Button
              asChild
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
            >
              <Link href="/#book">Book a ticket</Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg text-primary md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-5">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Bus className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-extrabold text-primary">
                    Voyaline
                  </span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-lg text-foreground/70 hover:bg-secondary"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-3 py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 flex flex-col gap-3 px-2">
                  <Button
                    asChild
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href="/#book" onClick={() => setOpen(false)}>
                      Book a ticket
                    </Link>
                  </Button>
                  <Link
                    href="/#track"
                    onClick={() => setOpen(false)}
                    className="text-center text-sm font-medium text-foreground/70"
                  >
                    Track a bus
                  </Link>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 border-t border-border bg-secondary/60 px-5 py-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Voyaline Travels Pvt. Ltd.</p>
                <p className="mt-1">1800 425 8690 · care@voyaline.express</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
