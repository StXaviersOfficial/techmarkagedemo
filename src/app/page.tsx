import { Hero } from "@/components/site/hero";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { PopularRoutes } from "@/components/site/popular-routes";
import { HowItWorks } from "@/components/site/how-it-works";
import { Fleet } from "@/components/site/fleet";
import { BookingTracker } from "@/components/site/booking-tracker";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { FaqSection } from "@/components/site/faq-section";
import { DownloadNewsletter } from "@/components/site/download-newsletter";
import { SiteShell } from "@/components/site/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <WhyChooseUs />
      <PopularRoutes />
      <HowItWorks />
      <Fleet />
      <BookingTracker />
      <Stats />
      <Testimonials />
      <FaqSection />
      <DownloadNewsletter />
    </SiteShell>
  );
}
