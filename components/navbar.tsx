"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/whatsapp";
import { Logo } from "@/components/logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="container-shell mt-4">
        <div className="glass-panel flex min-w-0 items-center justify-between gap-3 rounded-2xl px-3 py-3 sm:px-4">
          <Link href="#home" aria-label="Modern Electric Home" className="min-w-0">
            <Logo />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-[#AAAAAA] transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => openWhatsApp("Assalamualaikum, I want a quote for LED display installation.")}
              className="bg-[#00FF99] text-black hover:bg-[#6bffbf]"
            >
              Get Quote
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-white/20 p-2 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {open && (
          <div className="glass-panel mt-2 rounded-2xl p-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-[#AAAAAA]" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => openWhatsApp("Assalamualaikum, I want a quote for LED display installation.")}
                className="bg-[#00FF99] text-black hover:bg-[#6bffbf]"
              >
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


