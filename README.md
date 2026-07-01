# Techmarkage Express

> A premium intercity bus travel demo website — built by Amrit Raj as a portfolio
> submission for the Techmarkage team.

Techmarkage Express is a fictional intercity coach operator built as a demo. The
site is engineered to read like a real, live travel brand — but every stat is set
to zero, every external link shows a "this is a demo" notice, and every booking
is a simulated success. This is a showcase of frontend craft, not a live product.

## What's inside

- **Animated hero** with parallax highway background, animated gradient orbs,
  driving coach silhouette, and a scroll indicator
- **Sticky navbar** that transforms on scroll, with a slide-in mobile drawer,
  a dark-mode toggle, and a "Demo" badge
- **Six animated "Why Techmarkage" feature cards** with hover lift and glow
- **Eight popular-route cards** with staggered scroll reveal
- **How It Works** — four-step booking flow with connected timeline
- **Six-class fleet showcase** with tabbed selector and thumbnail grid
- **Booking form** with live city suggestions and a boarding-pass success state
  that generates a demo PNR
- **Live tracking teaser** banner
- **Animated count-up stats** (all zero — demo mode)
- **Dual-direction testimonials marquee**
- **FAQ accordion** on the home page
- **Download app + newsletter signup** split section with animated subscribe form
- **About page** with vision, values, roadmap timeline, and leadership grid
- **Contact page** with demo form, regional depots, and FAQ
- **Themed 404 page** with animated SVG bus taking a wrong turn
- **Scroll progress bar** at the top of every page
- **Back-to-top button** that appears on scroll
- **Page transition** fade+slide on route change
- **Dark mode** with a cyan-on-deep-teal palette
- **Demo notices** on every external link (socials, app stores, support links)

## Tech stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS 4** with a custom cyan design system
- **Framer Motion** for scroll-triggered reveals, parallax, hover states,
  page transitions, and the mobile navigation drawer
- **next-themes** for dark mode
- **Sonner** for demo-notice toasts
- **shadcn/ui** primitives (Button, Badge, Toaster)
- **lucide-react** icons
- **next/image** with Unsplash remote images (optimised, lazy-loaded)
- **Sora + Inter** display/body type via `next/font`

## Design language

| Token       | Light             | Dark              | Usage                          |
| ----------- | ----------------- | ----------------- | ------------------------------ |
| Primary     | `#042F38`         | `#ECFEFF`         | Text, hero, footer             |
| Accent      | `#06B6D4`         | `#22D3EE`         | CTAs, highlights, links        |
| Background  | `#F0FDFA`         | `#021014`         | Body                           |
| Secondary   | `#ECFEFF`         | `#0E2A33`         | Alternating sections           |

Typography pairs **Sora** (display, 700–800) with **Inter** (body, 400–600).

## Demo notices

Every link that would normally navigate to an external site or a not-yet-built
page triggers a toast: _"This is a demo website. Links will be connected when the
production site is built."_ This includes social media icons, app store buttons,
support links, phone numbers, and "browse all cities" buttons.

## Local development

```bash
bun install
bun run dev
```

The site runs at `http://localhost:3000`.

## Deployment

Deployed on Vercel. The repo auto-deploys from `main`.

## Credits

Built by **Amrit Raj** as a portfolio demo. All company names, routes, fares,
testimonials, and people mentioned are fictional and used for showcase purposes
only.
