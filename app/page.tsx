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
import { faq, services, whatsappNumber } from "@/lib/data";
import { readSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://modernelectric.onrender.com";

export default async function HomePage() {
  const content = await readSiteContent();
  const phoneNumber = `+${whatsappNumber}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Modern Electric",
      url: siteUrl,
      image: `${siteUrl}/logo.png`,
      logo: `${siteUrl}/logo.png`,
      telephone: phoneNumber,
      email: "mozammell2018@gmail.com",
      priceRange: "INR",
      description:
        "Custom LED display boards, mosque prayer time systems, scrolling signboards, shop signage, and programmable LED installations.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near Childrens Corner Institution, Sangrampur, Kalikapota, Ushti",
        addressLocality: "Sangrampur",
        addressRegion: "West Bengal",
        postalCode: "743355",
        addressCountry: "IN",
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "West Bengal",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phoneNumber,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Bengali", "Hindi"],
      },
      makesOffer: content.pricing.map((plan) => ({
        "@type": "Offer",
        name: `${plan.name} LED display package`,
        description: plan.description,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/#pricing`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Modern Electric",
      url: siteUrl,
      description:
        "Custom programmable LED display systems for mosques, shops, businesses, and digital signage projects.",
      publisher: {
        "@id": `${siteUrl}/#business`,
      },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${siteUrl}/#services`,
      name: "Modern Electric LED display services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@id": `${siteUrl}/#business`,
          },
          areaServed: "India",
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <div className="relative overflow-x-clip bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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


