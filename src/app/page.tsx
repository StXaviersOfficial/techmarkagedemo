"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/site/hero";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { PopularRoutes } from "@/components/site/popular-routes";
import { HowItWorks } from "@/components/site/how-it-works";
import { Fleet } from "@/components/site/fleet";
import { BookingTracker } from "@/components/site/booking-tracker";
import { Stats } from "@/components/site/stats";
import { Reviews } from "@/components/site/reviews";
import { FaqSection } from "@/components/site/faq-section";
import { DownloadNewsletter } from "@/components/site/download-newsletter";
import { SiteShell } from "@/components/site/site-shell";

// Lazy-load the scroll scene so it never blocks initial page paint.
const BusScrollScene = dynamic(
  () => import("@/components/site/bus-scroll-scene").then((m) => ({ default: m.BusScrollScene })),
  { ssr: false }
);

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <BusScrollScene />
      <WhyChooseUs />
      <PopularRoutes />
      <HowItWorks />
      <Fleet />
      <BookingTracker />
      <Stats />
      <Reviews />
      <FaqSection />
      <DownloadNewsletter />
    </SiteShell>
  );
}
