import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WorkSection } from "@/components/work-section";
import { ServicesSection } from "@/components/services-section";
import { HowIWorkSection } from "@/components/how-i-work-section";
import { BackgroundSection } from "@/components/background-section";
import { ContactSection, Footer } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="focus:bg-fg focus:text-bg sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Nav />

      <main className="mx-auto max-w-3xl px-6">
        <Hero />
        <WorkSection />
        <ServicesSection />
        <HowIWorkSection />
        <BackgroundSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
