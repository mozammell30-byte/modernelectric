"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  "Discuss Requirement",
  "Build & Program",
  "Delivery & Installation",
];

export function Process() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="How It Works"
          title="Simple 3-Step Delivery"
          description="A streamlined process from requirements gathering to on-site setup and handover."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00FF99]/30 bg-[#00FF99]/10 font-semibold text-[#00FF99]">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{step}</h3>
              <p className="mt-2 text-sm text-[#AAAAAA]">
                Dedicated guidance and transparent updates to keep every stage smooth and predictable.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



