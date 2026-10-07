import { Architecture } from "@/components/landing/Architecture";
import { Capabilities } from "@/components/landing/Capabilities";
import { CodeIntelligence } from "@/components/landing/CodeIntelligence";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Nav } from "@/components/landing/Nav";
import { Showcases } from "@/components/landing/Showcases";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Capabilities />
        <CodeIntelligence />
        <Showcases />
        <Architecture />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
