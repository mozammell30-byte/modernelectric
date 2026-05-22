import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { LedDemo } from "@/components/led-demo";
import { Navbar } from "@/components/navbar";
import { Portfolio } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { readSiteContent } from "@/lib/site-content";

export default async function HomePage() {
  const content = await readSiteContent();

  return (
    <div className="relative overflow-x-clip bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(0,255,153,0.11),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(0,209,255,0.12),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(255,59,59,0.08),transparent_30%)]" />
      <Navbar />
      <main>
        <Hero content={content.hero} />
        <Services />
        <LedDemo />
        <Portfolio items={content.portfolio} />
        <Gallery items={content.gallery} />
        <Features />
        <Process />
        <Testimonials items={content.testimonials} />
        <Pricing plans={content.pricing} />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


