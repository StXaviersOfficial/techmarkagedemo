# Voyaline Express

> Premium intercity bus travel — a fully animated, production-quality demo website.

Voyaline Express is a fictional intercity coach operator built as a portfolio demo.
The site is engineered to read like a real, live travel brand: 248 coaches, 86
cities, 1.24 million travellers, and a 20-minute on-time guarantee — every piece of
copy, route, fare, and testimonial is invented but written to feel authentic.

## Tech stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS 4** with a custom design system (deep navy + warm amber)
- **Framer Motion** for scroll-triggered reveals, parallax, hover states, and the
  mobile navigation drawer
- **shadcn/ui** primitives (Button, Badge, Toaster)
- **lucide-react** icons
- **next/image** with Unsplash remote images (optimised, lazy-loaded)
- **Sora + Inter** display/body type via `next/font`

## Features

- **Animated hero** with parallax highway background, animated gradient orbs, and a
  driving coach silhouette
- **Sticky navbar** that transforms on scroll, with a slide-in mobile menu
- **Why Choose Us** — six animated icon cards (safety, comfort, punctuality,
  affordability, AC/non-AC, live tracking)
- **Popular Routes** — eight city-pair cards with fare, duration, departures, and
  staggered scroll reveal
- **Fleet showcase** — six coach classes with tabbed selector, image, specs, and
  a thumbnail grid
- **Booking & live tracking** — search form (From / To / Date / Passengers) with a
  fake success state that renders a boarding pass with a generated PNR
- **Stats counter** — count-up animation triggered on scroll
- **Testimonials** — dual-direction marquee of eight traveller reviews
- **Download App / Newsletter** — split section with QR mock, store badges, and an
  animated subscribe form
- **About page** — company story, mission, values, milestones timeline, and
  leadership grid
- **Contact page** — working-looking contact form with success state, regional
  depot list, and an FAQ accordion
- **Themed 404 page** — animated SVG of a bus taking a wrong turn

## Design language

| Token       | Value      | Usage                              |
| ----------- | ---------- | ---------------------------------- |
| Primary     | `#0B1B3B`  | Deep navy — text, hero, footer     |
| Accent      | `#F59E0B`  | Warm amber — CTAs, highlights      |
| Background  | `#FBFAF6`  | Warm off-white — body              |
| Secondary   | `#F2EEE4`  | Cream — alternating sections       |

Typography pairs **Sora** (display, 700–800) with **Inter** (body, 400–600).

## Local development

```bash
bun install
bun run dev
```

The site runs at `http://localhost:3000`.

## Deployment

The site is deployed on Vercel. The repo is configured to deploy from `main` with
the default Next.js build (`next build`).

## License

This is a demo project. All company names, routes, fares, testimonials, and people
mentioned are fictional and used for portfolio purposes only.
