"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, MoonStar, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGrid } from "@/components/animated-grid";
import { openWhatsApp } from "@/lib/whatsapp";
import type { HeroContent } from "@/lib/data";

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12">
      <AnimatedGrid />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,255,153,0.12),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(0,209,255,0.1),transparent_32%),radial-gradient(circle_at_34%_86%,rgba(70,0,120,0.2),transparent_28%)]" />

      <div className="container-shell relative grid gap-8 lg:grid-cols-[minmax(460px,1fr)_minmax(620px,1.15fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <span className="inline-flex rounded-xl border border-[#00FF99]/40 bg-[#00FF99]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00FF99]">
            {content.badge}
          </span>

          <h1 className="text-4xl font-bold leading-[0.96] text-white sm:text-5xl lg:text-[72px]">
            <span className="text-[#00FF99] drop-shadow-[0_0_14px_rgba(0,255,153,0.85)]">{content.titleLine1}</span>
            <br />
            {content.titleLine2}
            <br />
            <span className="text-[#00D1FF] drop-shadow-[0_0_12px_rgba(0,209,255,0.8)]">{content.titleLine3}</span>
          </h1>

          <p className="max-w-[520px] text-base leading-relaxed text-[#A6AAB2] sm:text-lg">{content.description}</p>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => openWhatsApp("Assalamualaikum, I need a quote for a custom LED display system.")}
              className="h-11 rounded-xl bg-[#00D1A2] px-6 text-sm font-semibold text-black hover:bg-[#54ffd0]"
            >
              {content.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => openWhatsApp("Assalamualaikum, I want to chat about LED display options.")}
              variant="outline"
              className="h-11 rounded-xl border-[#00D1FF]/50 bg-[#00D1FF]/10 px-6 text-sm font-semibold text-[#66dfff] hover:bg-[#00D1FF]/20"
            >
              <MessageCircle className="mr-2 h-4 w-4" /> {content.ctaSecondary}
            </Button>
          </div>

          <div className="grid max-w-[340px] grid-cols-3 gap-4 pt-1">
            {[
              ["350+", "Installs"],
              ["120+", "Mosques"],
              ["5", "Years"],
            ].map((item) => (
              <div key={item[1]}>
                <p className="text-3xl font-bold text-[#00FF99] drop-shadow-[0_0_12px_rgba(0,255,153,0.7)] sm:text-4xl">
                  {item[0]}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#8f95a0]">{item[1]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.05 }}
          className="relative lg:pl-2"
        >
          <div className="glass-panel relative rounded-3xl border-[#00FF99]/35 bg-gradient-to-b from-[#07251d]/70 to-[#080d12]/85 p-4 shadow-[0_0_22px_rgba(0,255,153,0.2)]">
            <div className="space-y-3 rounded-2xl border border-[#00FF99]/25 bg-[#050607] p-4">
              <div className="flex items-center justify-between text-xs text-[#00FF99]">
                <span>4 Dhu al-Hijjah 1447 AH</span>
                <MoonStar className="h-4 w-4" />
              </div>

              <div className="rounded-xl border border-[#00FF99]/20 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:7px_7px] p-4 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[#00FF99]/75">Next Prayer</p>
                <p className="mt-2 font-mono text-3xl font-semibold text-[#00FF99] drop-shadow-[0_0_14px_rgba(0,255,153,0.75)] sm:text-4xl lg:text-5xl">
                  MAGHRIB 06:36 PM
                </p>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[
                  ["Fajr", "03:49"],
                  ["Dhuhr", "11:55"],
                  ["Asr", "15:17"],
                  ["Maghrib", "18:36"],
                  ["Isha", "20:01"],
                ].map((row) => (
                  <div key={row[0]} className="rounded-lg border border-white/10 bg-[#10141b] p-1.5 text-center sm:p-2">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#8b90a0]">{row[0]}</p>
                    <p className="mt-1 font-mono text-sm text-[#00FF99]">{row[1]}</p>
                  </div>
                ))}
              </div>

              <div className="h-10 overflow-hidden rounded-lg border border-[#FF3B3B]/30 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:7px_7px] px-3 py-2">
                <p className="animate-marquee whitespace-nowrap font-mono text-sm text-[#ff4b4b]">{content.ticker}</p>
              </div>
            </div>

            <div className="absolute -bottom-2 right-3 rounded-2xl border border-[#00D1FF]/35 bg-[#04131f]/85 px-4 py-1.5 text-[#66dfff] shadow-[0_0_16px_rgba(0,209,255,0.3)]">
              <p className="text-[10px] uppercase tracking-[0.15em]">
                <Wifi className="mr-1 inline h-3 w-3" /> Live â€¢ Synced
              </p>
              <p className="text-sm font-semibold">WiFi Controlled</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
