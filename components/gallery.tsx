"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import type { GalleryItem } from "@/lib/data";

type GalleryProps = {
  items: GalleryItem[];
};

export function Gallery({ items }: GalleryProps) {
  const [active, setActive] = useState<null | { title: string; category: string; image: string }>(null);

  return (
    <section id="gallery" className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Gallery"
          title="Aesthetic Install Highlights"
          description="Professional snapshots from mosque installations, retail signboards, and LED hardware close-ups."
        />

        <div className="mt-8 grid auto-rows-[220px] gap-4 sm:grid-cols-2 md:auto-rows-[180px] md:grid-cols-4">
          {items.map((item, i) => (
            <motion.button
              key={item.title}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActive({ title: item.title, category: item.category, image: item.image })}
              className={[
                "group relative overflow-hidden rounded-2xl border border-white/10 text-left",
                item.span === "tall" ? "md:row-span-2" : "",
                item.span === "wide" ? "md:col-span-2" : "",
              ].join(" ")}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="inline-flex max-w-full rounded-full border border-[#00D1FF]/45 bg-[#00D1FF]/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-[#66dfff] sm:tracking-[0.14em]">
                  {item.category}
                </p>
                <h3 className="mt-2 break-words text-lg font-semibold text-white">{item.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-[#00D1FF]/35 bg-[#0a0a0a]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/30 bg-black/60 p-2 text-white"
              aria-label="Close image"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={active.image} alt={active.title} className="max-h-[75vh] w-full object-contain" />
            <div className="border-t border-white/10 p-4">
              <h3 className="break-words text-xl font-semibold text-white sm:text-2xl">{active.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#9aa0a8]">{active.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
