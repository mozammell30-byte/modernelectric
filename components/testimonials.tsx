"use client";

import { Star } from "lucide-react";
import type { TestimonialItem } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function Testimonials({ items }: { items: TestimonialItem[] }) {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by Mosques & Local Shops"
          description="Real words from clients after installation and programming support."
        />
        <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.name} className="glass-panel rounded-xl p-4">
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={`${item.name}-${i}`}
                    className={`h-3.5 w-3.5 ${
                      i < 3 ? "fill-[#00FF99] text-[#00FF99]" : i === 3 ? "fill-[#00D1FF] text-[#00D1FF]" : "fill-[#FF3B3B] text-[#FF3B3B]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#AAAAAA]">"{item.quote}"</p>
              <p className="mt-3 text-sm font-semibold text-white">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
