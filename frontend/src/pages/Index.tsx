import HeroSection from "@/components/landing/HeroSection";
import MemorialShowcase from "@/components/landing/MemorialShowcase";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ClosingSection from "@/components/landing/ClosingSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <MemorialShowcase />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ClosingSection />
      <Footer />
    </main>
  );
};

export default Index;
