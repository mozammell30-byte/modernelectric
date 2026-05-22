"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      className={cn(
        "glass-panel group relative overflow-hidden rounded-2xl p-5 transition",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_top_right,rgba(0,255,153,0.15),transparent_45%)]",
        className,
      )}
    >
      {children}
    </motion.article>
  );
}


