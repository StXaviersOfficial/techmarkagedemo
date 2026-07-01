"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ChevronDown,
  Building2,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal, Stagger, staggerItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { company, contactSubjects, faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done";

const offices = [
  {
    city: "Bengaluru",
    role: "Headquarters",
    address: "3rd Floor, Aurum House, MG Road, Bengaluru 560001",
    phone: "+91 80 4567 1890",
  },
  {
    city: "Mumbai",
    role: "Western regional depot",
    address: "Plot 14, MIDC Phase 2, Andheri East, Mumbai 400093",
    phone: "+91 22 4321 7780",
  },
  {
    city: "Delhi",
    role: "Northern regional depot",
    address: "Block C, Anand Vihar ISBT, Delhi 110092",
    phone: "+91 11 4567 2290",
  },
  {
    city: "Hyderabad",
    role: "Central control centre",
    address: "Sy. No. 84, Gachibowli Phase 2, Hyderabad 500032",
    phone: "+91 40 4321 8870",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: contactSubjects[0],
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
      setForm({ name: "", email: "", subject: contactSubjects[0], message: "" });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary py-28 text-primary-foreground sm:py-36">
          <div className="absolute inset-0 bg-grid-dark opacity-40" />
          <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                We&apos;re listening
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Talk to a person,
                <br />
                <span className="text-gradient-amber">not a chatbot.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Our contact centre answers 94% of calls within 60 seconds, 24 hours a
                day. Every message sent through this form is read by a human and
                acknowledged within 90 seconds.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Stagger className="grid gap-5 sm:grid-cols-3" stagger={0.08}>
              {[
                {
                  icon: Phone,
                  title: "Call us, 24×7",
                  lines: [company.tollFree, "(toll-free from any Indian mobile)"],
                  href: `tel:${company.tollFree}`,
                },
                {
                  icon: Mail,
                  title: "Email us",
                  lines: [company.email, "(replies within 2 working hours)"],
                  href: `mailto:${company.email}`,
                },
                {
                  icon: Clock,
                  title: "Operating hours",
                  lines: ["Contact centre: 24×7", "Depots: 4:00 AM – 11:30 PM IST"],
                },
              ].map((c) => (
                <motion.a
                  key={c.title}
                  href={c.href ?? undefined}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <c.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                    {c.title}
                  </h3>
                  <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
                    {c.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                </motion.a>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Form */}
              <Reveal className="lg:col-span-7">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    <span className="font-display text-lg font-bold tracking-tight">
                      Send us a message
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fields marked with * are required. We&apos;ll reply to the email
                    address you provide.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name *">
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Ananya Iyer"
                          className="form-input"
                        />
                      </Field>
                      <Field label="Email address *">
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="ananya@example.com"
                          className="form-input"
                        />
                      </Field>
                    </div>

                    <Field label="What is this about?">
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="form-input"
                      >
                        {contactSubjects.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Your message *">
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what happened, when, and on which route. The more detail you share, the faster we can help."
                        className="form-input resize-none"
                      />
                    </Field>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Button
                        type="submit"
                        disabled={status !== "idle"}
                        className={cn(
                          "h-12 px-8",
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
                              <Send className="mr-2 h-4 w-4" />
                              Send message
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
                              Sending…
                            </motion.span>
                          )}
                          {status === "done" && (
                            <motion.span
                              key="done"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Message sent
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                      {status === "done" && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-muted-foreground"
                        >
                          Ticket <span className="font-mono font-semibold text-foreground">#VY-{Math.floor(10000 + Math.random() * 89999)}</span> created. We&apos;ll reply within 2 hours.
                        </motion.span>
                      )}
                    </div>
                  </form>
                </div>
              </Reveal>

              {/* Sidebar */}
              <Reveal className="lg:col-span-5" delay={0.1}>
                <div className="space-y-5">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-accent" />
                      <span className="font-display text-base font-bold tracking-tight">
                        Registered office
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {company.legalName}
                      <br />
                      {company.headquarters}
                    </p>
                    <div className="mt-4 space-y-1.5 text-sm">
                      <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">GST:</span>
                        <span className="font-medium">{company.gst}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">CIN:</span>
                        <span className="font-medium">{company.cac}</span>
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      <span className="font-display text-base font-bold tracking-tight">
                        Regional depots
                      </span>
                    </div>
                    <ul className="mt-4 space-y-4">
                      {offices.map((o) => (
                        <li key={o.city} className="text-sm">
                          <div className="font-semibold text-foreground">
                            {o.city}
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                              · {o.role}
                            </span>
                          </div>
                          <p className="mt-1 text-muted-foreground">{o.address}</p>
                          <p className="mt-1 text-muted-foreground">
                            <a href={`tel:${o.phone}`} className="hover:text-accent">
                              {o.phone}
                            </a>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-secondary/40 sm:py-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                FAQ
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                The questions we hear most.
              </h2>
            </Reveal>

            <div className="mt-12 space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={f.q} delay={i * 0.05}>
                    <div
                      className={cn(
                        "overflow-hidden rounded-xl border bg-card transition-colors",
                        open ? "border-accent/40" : "border-border"
                      )}
                    >
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                        aria-expanded={open}
                      >
                        <span className="font-display text-sm font-bold sm:text-base">
                          {f.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-accent transition-transform",
                            open && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
