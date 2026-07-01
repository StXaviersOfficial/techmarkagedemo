"use client";

import Link from "next/link";
import { Bus, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { company, popularRoutes } from "@/lib/data";

const quickLinks = [
  { href: "/#routes", label: "Popular routes" },
  { href: "/#fleet", label: "Our fleet" },
  { href: "/#why-us", label: "Why Voyaline" },
  { href: "/#track", label: "Live tracking" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

const supportLinks = [
  { href: "/contact", label: "Help centre" },
  { href: "/contact", label: "Cancellation policy" },
  { href: "/contact", label: "Refund status" },
  { href: "/contact", label: "Lost & found" },
  { href: "/contact", label: "Travel advisories" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter / X" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto bg-primary text-primary-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Bus className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-extrabold">Voyaline</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Express
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              {company.shortPitch}
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`tel:${company.tollFree}`}
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span>{company.tollFree} (toll-free, 24×7)</span>
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>{company.email}</span>
              </a>
              <p className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <span>{company.headquarters}</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Quick links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Top routes
            </h4>
            <ul className="mt-4 space-y-2.5">
              {popularRoutes.slice(0, 6).map((route) => (
                <li key={route.id}>
                  <Link
                    href={`/#book`}
                    className="group flex items-center justify-between text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    <span>
                      {route.from} → {route.to}
                    </span>
                    <span className="text-xs text-accent/80 group-hover:text-accent">
                      ₹{route.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Support
            </h4>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground/10 text-primary-foreground/80 transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span>
            <span className="hidden md:inline text-primary-foreground/30">·</span>
            <span>GST: {company.gst}</span>
            <span className="hidden md:inline text-primary-foreground/30">·</span>
            <span>CIN: {company.cac}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/contact" className="hover:text-primary-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-primary-foreground transition-colors">
              Terms of service
            </Link>
            <Link href="/contact" className="hover:text-primary-foreground transition-colors">
              Passenger charter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
