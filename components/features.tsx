"use client";

import { CheckCircle2 } from "lucide-react";
import { features } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { GlowCard } from "@/components/glow-card";

export function Features() {
  return (
    <section id="features" className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built for Performance and Longevity"
          description="Engineered components, efficient power profiles, and flexible control systems in one premium package."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <GlowCard key={feature} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#00D1FF]" />
              <p className="font-medium text-white">{feature}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}



