"use client";

import { motion } from "framer-motion";
import { Landmark, Clock3, Timer, Text, Store, Settings2 } from "lucide-react";
import { services } from "@/lib/data";
import { GlowCard } from "@/components/glow-card";
import { SectionHeading } from "@/components/section-heading";

const iconMap = {
  mosque: Landmark,
  clock: Clock3,
  timer: Timer,
  scroll: Text,
  store: Store,
  settings: Settings2,
};

export function Services() {
  return (
    <section id="services" className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="What We Build"
          title="High-Impact LED Systems"
          description="From mosque prayer boards to local business signage, each system is engineered for clarity, reliability, and strong visual presence."
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <GlowCard key={service.title}>
                <Icon className="h-6 w-6 text-[#00FF99]" />
                <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-[#AAAAAA]">{service.description}</p>
              </GlowCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}



