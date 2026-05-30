"use client";

import { Check, ArrowRight } from "lucide-react";
import type { PricingPlan } from "@/lib/data";
import { openWhatsApp } from "@/lib/whatsapp";

const accentMap = {
  green: {
    border: "border-[#00FF99]/25",
    glow: "shadow-[0_0_24px_rgba(0,255,153,0.18)]",
    price: "text-[#00FF99] drop-shadow-[0_0_12px_rgba(0,255,153,0.7)]",
    button: "bg-[#12c98d] hover:bg-[#27e7a6] text-black",
    check: "text-[#35fcb6]",
  },
  blue: {
    border: "border-[#00D1FF]/30",
    glow: "shadow-[0_0_24px_rgba(0,209,255,0.2)]",
    price: "text-[#45dfff] drop-shadow-[0_0_12px_rgba(0,209,255,0.7)]",
    button: "bg-[#20b9d6] hover:bg-[#39d6f3] text-black",
    check: "text-[#66e8ff]",
  },
  purple: {
    border: "border-[#d88dff]/28",
    glow: "shadow-[0_0_24px_rgba(216,141,255,0.18)]",
    price: "text-[#e0a6ff] drop-shadow-[0_0_12px_rgba(216,141,255,0.65)]",
    button: "bg-[#12c98d] hover:bg-[#27e7a6] text-black",
    check: "text-[#efbcff]",
  },
} as const;

export function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section className="section-space" id="pricing">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto inline-flex rounded-lg border border-[#00D1FF]/40 bg-[#00D1FF]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00D1FF]">
            Pricing
          </p>
          <h2 className="mt-4 break-words text-3xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Transparent <span className="text-[#45dfff] drop-shadow-[0_0_14px_rgba(69,223,255,0.8)]">packages</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[#9aa0a8] sm:text-lg">
            Indicative starting prices. Final quote depends on size, color count and installation site.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {plans.map((plan) => {
            const accent = accentMap[plan.accent];
            return (
              <article
                key={plan.name}
                className={`relative min-w-0 rounded-2xl border bg-[#0b0b0b] p-5 sm:rounded-3xl sm:p-6 ${accent.border} ${accent.glow}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 max-w-[calc(100%-2rem)] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#20b9d6] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black shadow-[0_0_14px_rgba(32,185,214,0.7)] sm:tracking-[0.16em]">
                    Most Popular
                  </span>
                )}

                <p className="text-xs uppercase tracking-[0.16em] text-[#9da4b1]">{plan.name}</p>
                <p className={`mt-2 break-words text-4xl font-bold sm:text-6xl ${accent.price}`}>{plan.price}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#7b828f]">{plan.subtitle}</p>
                <p className="mt-4 border-b border-white/10 pb-5 text-base text-[#a9afba] sm:text-xl">{plan.description}</p>

                <ul className="mt-5 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#d2d7df]">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accent.check}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      `Assalamualaikum, I want the ${plan.name} package.\nPrice: ${plan.price}\nPlease share details and installation timeline.`,
                    )
                  }
                  className={`mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition ${accent.button}`}
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
