import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { ReportPreviewSection } from "@/components/marketing/report-preview-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { TrustedMarquee } from "@/components/marketing/trusted-marquee";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedMarquee />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <ReportPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}