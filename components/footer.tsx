import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell grid gap-7 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-2 max-w-xs text-sm text-[#AAAAAA]">
            Custom programmable LED solutions for mosques and local businesses with premium hardware and dependable support.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <div className="mt-2 flex flex-col gap-1.5 text-sm text-[#AAAAAA]">
            <Link href="#services">Services</Link>
            <Link href="#portfolio">Portfolio</Link>
            <Link href="#features">Features</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="mt-2 flex gap-3 text-[#AAAAAA]">
            <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <p className="container-shell mt-6 text-xs text-[#777]">© {new Date().getFullYear()} Modern Electric. All rights reserved.</p>
    </footer>
  );
}
