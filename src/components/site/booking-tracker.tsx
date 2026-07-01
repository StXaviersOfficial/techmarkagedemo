"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, CheckCircle2, Loader2, ArrowRight, Bus, X } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormState = {
  from: string;
  to: string;
  date: string;
  passengers: string;
};

const initialState: FormState = {
  from: "",
  to: "",
  date: "",
  passengers: "1",
};

const popularCities = [
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Jaipur",
  "Kolkata",
  "Ahmedabad",
  "Goa",
  "Surat",
  "Indore",
];

type Status = "idle" | "loading" | "success";

export function BookingTracker() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [pnr, setPnr] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.date) return;
    setStatus("loading");
    setTimeout(() => {
      const pnrNum = "VY" + Math.floor(100000 + Math.random() * 900000);
      setPnr(pnrNum);
      setStatus("success");
    }, 1600);
  };

  const reset = () => {
    setForm(initialState);
    setStatus("idle");
    setPnr("");
  };

  const swapCities = () => {
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  return (
    <section
      id="book"
      className="relative py-24 sm:py-32 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Book & track
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Search a route. Track your coach. Done.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            One search across 248 coaches and 86 cities. Once you book, your live
            tracking link lands in your inbox instantly.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                      className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent/15 text-accent"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-2xl font-extrabold sm:text-3xl">
                      You&apos;re booked.
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      A confirmation and live tracking link have been sent to your email.
                    </p>

                    <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-border bg-secondary/40 p-6 text-left">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4 text-accent" />
                          <span className="font-display text-sm font-bold uppercase tracking-wider">
                            Boarding pass
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-accent">{pnr}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
                          <div className="mt-1 font-display text-lg font-bold">{form.from}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">To</div>
                          <div className="mt-1 font-display text-lg font-bold">{form.to}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Date</div>
                          <div className="mt-1 font-medium">{form.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Passengers</div>
                          <div className="mt-1 font-medium">{form.passengers}</div>
                        </div>
                      </div>
                      <div className="mt-4 rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent-foreground/80">
                        Gate opens 25 minutes before departure. Carry a valid photo ID.
                      </div>
                    </div>

                    <Button onClick={reset} variant="outline" className="mt-6">
                      Book another trip
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {/* From */}
                      <div className="relative">
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <MapPin className="h-3 w-3 text-accent" /> From
                        </label>
                        <input
                          type="text"
                          value={form.from}
                          onChange={(e) => setForm({ ...form, from: e.target.value })}
                          onFocus={() => setActiveField("from")}
                          onBlur={() => setTimeout(() => setActiveField(null), 200)}
                          placeholder="Bengaluru"
                          required
                          className="h-12 w-full rounded-lg border border-border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                        <CitySuggest
                          visible={activeField === "from"}
                          onPick={(city) => {
                            setForm({ ...form, from: city });
                            setActiveField(null);
                          }}
                          exclude={form.to}
                        />
                      </div>

                      {/* Swap button (mobile-friendly) */}
                      <div className="relative hidden lg:flex items-end justify-center pb-1">
                        <button
                          type="button"
                          onClick={swapCities}
                          aria-label="Swap origin and destination"
                          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground/70 transition-all hover:rotate-180 hover:border-accent hover:text-accent"
                        >
                          <ArrowRight className="h-4 w-4 -rotate-90" />
                        </button>
                      </div>

                      {/* To */}
                      <div className="relative lg:col-span-1">
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <MapPin className="h-3 w-3 text-accent" /> To
                        </label>
                        <input
                          type="text"
                          value={form.to}
                          onChange={(e) => setForm({ ...form, to: e.target.value })}
                          onFocus={() => setActiveField("to")}
                          onBlur={() => setTimeout(() => setActiveField(null), 200)}
                          placeholder="Mumbai"
                          required
                          className="h-12 w-full rounded-lg border border-border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                        <CitySuggest
                          visible={activeField === "to"}
                          onPick={(city) => {
                            setForm({ ...form, to: city });
                            setActiveField(null);
                          }}
                          exclude={form.from}
                        />
                      </div>

                      {/* Date */}
                      <div className="relative">
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <Calendar className="h-3 w-3 text-accent" /> Date
                        </label>
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          required
                          className="h-12 w-full rounded-lg border border-border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                    </div>

                    {/* Passengers + search */}
                    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <Users className="h-3 w-3 text-accent" /> Passengers
                        </label>
                        <select
                          value={form.passengers}
                          onChange={(e) => setForm({ ...form, passengers: e.target.value })}
                          className="h-12 w-full rounded-lg border border-border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                        >
                          {["1 passenger", "2 passengers", "3 passengers", "4 passengers", "5 passengers", "6 passengers"].map((opt, i) => (
                            <option key={opt} value={String(i + 1)}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="h-12 bg-accent px-8 text-accent-foreground hover:bg-accent/90 sm:min-w-[200px]"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching…
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Search buses
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Demo search — try “Bengaluru” to “Mumbai” for a date this week.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Live tracking teaser */}
        <Reveal id="track" className="mt-10" delay={0.2}>
          <div className="grid gap-4 rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/85 p-6 text-primary-foreground sm:p-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Live tracking
              </div>
              <h3 className="mt-4 font-display text-xl font-bold sm:text-2xl">
                Watch your coach move in real time.
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80 sm:text-base">
                Once you book, share a live GPS link with family so they know exactly when
                to pick you up. ETA refreshes every 90 seconds.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="#book">
                  Track a booked trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CitySuggest({
  visible,
  onPick,
  exclude,
}: {
  visible: boolean;
  onPick: (city: string) => void;
  exclude: string;
}) {
  const cities = popularCities.filter((c) => c !== exclude).slice(0, 6);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="absolute left-0 right-0 top-full z-20 mt-1.5 overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
        >
          <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Popular cities
          </div>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onPick(city);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-secondary"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {city}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
