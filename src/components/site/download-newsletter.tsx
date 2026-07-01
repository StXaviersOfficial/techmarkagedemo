"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Apple,
  Play,
  Mail,
  CheckCircle2,
  QrCode,
  Bell,
  MapPin,
  Ticket,
  Loader2,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appFeatures = [
  { icon: Ticket, label: "Mobile boarding pass" },
  { icon: MapPin, label: "Live GPS tracking" },
  { icon: Bell, label: "Departure alerts" },
];

export function DownloadNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
      setEmail("");
    }, 1300);
  };

  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* App download */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Smartphone className="h-3 w-3" />
              Voyaline app
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              The whole terminal,
              <br /> in your pocket.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-primary-foreground/80 sm:text-lg text-pretty">
              Book in under 30 seconds, board with a QR, track your coach live, and get a
              push notification 25 minutes before every stop. Free on iOS and Android.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <AppButton store="apple" />
              <AppButton store="google" />
            </div>

            <ul className="mt-8 space-y-3">
              {appFeatures.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/15 text-accent">
                    <f.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-primary-foreground/85">{f.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* QR + newsletter */}
          <Reveal delay={0.15}>
            <div className="grid h-full gap-6">
              {/* QR card */}
              <div className="flex flex-col items-start gap-6 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
                <div className="grid h-32 w-32 shrink-0 place-items-center rounded-xl bg-background">
                  <div className="grid h-24 w-24 place-items-center rounded-lg bg-primary p-3 text-primary-foreground">
                    <QrCode className="h-full w-full" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    Scan to install
                  </h3>
                  <p className="mt-2 text-sm text-primary-foreground/75">
                    Point your phone camera at the code. We&apos;ll send you to the right
                    store for your device automatically.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    4.8 ★ on App Store · 4.7 ★ on Play
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="flex flex-1 flex-col justify-center rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm sm:p-8">
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  Get route deals before anyone else.
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/75">
                  Fare drops, new routes, and long-weekend flash sales — sent every
                  Wednesday. Unsubscribe in one click.
                </p>

                <form onSubmit={subscribe} className="mt-5 space-y-3">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-lg border border-primary-foreground/20 bg-background pl-10 pr-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status !== "idle"}
                    className={cn(
                      "h-12 w-full text-sm font-semibold",
                      status === "done"
                        ? "bg-green-600 text-white hover:bg-green-600"
                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {status === "idle" && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          Subscribe to the newsletter
                        </motion.span>
                      )}
                      {status === "loading" && (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Subscribing…
                        </motion.span>
                      )}
                      {status === "done" && (
                        <motion.span
                          key="done"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          You&apos;re in. Welcome aboard.
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </form>
                <p className="mt-3 text-xs text-primary-foreground/60">
                  We respect your inbox. One email a week, never more.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AppButton({ store }: { store: "apple" | "google" }) {
  return (
    <a
      href="#"
      className="group flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 backdrop-blur-sm transition-all hover:border-accent hover:bg-primary-foreground/10"
    >
      {store === "apple" ? (
        <Apple className="h-6 w-6 text-primary-foreground" />
      ) : (
        <Play className="h-6 w-6 text-accent" />
      )}
      <div className="text-left leading-tight">
        <div className="text-[10px] uppercase tracking-wider text-primary-foreground/60">
          {store === "apple" ? "Download on the" : "Get it on"}
        </div>
        <div className="font-display text-sm font-bold text-primary-foreground">
          {store === "apple" ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}
