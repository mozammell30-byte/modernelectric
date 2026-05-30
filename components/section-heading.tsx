"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <p className="inline-flex max-w-full rounded-md border border-[#00D1FF]/35 bg-[#00D1FF]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#00D1FF] sm:tracking-[0.2em]">
        {eyebrow}
      </p>
      <h2 className="neon-title mt-3 break-words text-3xl font-bold leading-[1.08] sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm text-[#AAAAAA] sm:text-base">{description}</p>
    </motion.div>
  );
}
