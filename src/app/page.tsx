import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import AboutSection from '@/components/sections/AboutSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <MarqueeSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}