"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import type { PortfolioItem } from "@/lib/data";

export function Portfolio({ items }: { items: PortfolioItem[] }) {
  const [activeVideo, setActiveVideo] = useState<null | {
    title: string;
    category: string;
    videoId: string;
  }>(null);
  const [activeImage, setActiveImage] = useState<null | {
    title: string;
    category: string;
    image: string;
  }>(null);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveVideo(null);
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <section id="portfolio" className="pt-6 pb-14 sm:pt-8 sm:pb-16">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto inline-flex rounded-lg border border-[#00FF99]/40 bg-[#00FF99]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00FF99]">
            Recent Work
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
            Installs that <span className="text-[#00FF99] drop-shadow-[0_0_14px_rgba(0,255,153,0.8)]">light up</span>
            <br />
            communities
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#9aa0a8]">
            A selection of our recent mosque and business deployments across the country.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[180px] gap-4 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveImage({ title: item.title, category: item.category, image: item.image })}
              className={[
                "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10",
                item.span === "tall" ? "md:row-span-2" : "",
                item.span === "wide" ? "md:col-span-2" : "",
              ].join(" ")}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10 transition group-hover:opacity-90" />
              {item.videoId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideo({
                      title: item.title,
                      category: item.category,
                      videoId: item.videoId!,
                    });
                  }}
                  className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00FF99]/45 bg-[#00FF99]/85 p-4 text-black shadow-[0_0_25px_rgba(0,255,153,0.45)] transition hover:scale-110"
                  aria-label={`Play ${item.title} video`}
                >
                  <Play className="h-6 w-6 fill-current" />
                </button>
              )}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="inline-flex rounded-full border border-[#00FF99]/45 bg-[#00FF99]/12 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#00FF99]">
                  {item.tag}
                </p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-white">{item.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#00FF99]/35 bg-[#0a0a0a]">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/30 bg-black/60 p-2 text-white"
              aria-label="Close video modal"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="border-t border-white/10 p-4">
              <h3 className="text-3xl font-semibold text-white">{activeVideo.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9aa0a8]">{activeVideo.category}</p>
            </div>
          </div>
        </div>
      )}

      {activeImage && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-[#00D1FF]/35 bg-[#0a0a0a]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/30 bg-black/60 p-2 text-white"
              aria-label="Close image preview"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="max-h-[75vh] overflow-hidden">
              <img src={activeImage.image} alt={activeImage.title} className="h-full w-full object-contain" />
            </div>
            <div className="border-t border-white/10 p-4">
              <h3 className="text-3xl font-semibold text-white">{activeImage.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9aa0a8]">{activeImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



