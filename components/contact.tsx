"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { openWhatsApp } from "@/lib/whatsapp";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    requirements: "",
  });

  function submitToWhatsApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = `
New LED Inquiry

Name: ${form.name || "-"}
Phone: ${form.phone || "-"}
Email: ${form.email || "-"}
Project Type / Location: ${form.project || "-"}
Requirements: ${form.requirements || "-"}
    `;
    openWhatsApp(message);
  }

  return (
    <section id="contact" className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Light Up Your Space"
          description="Free consultation and quick quotation. WhatsApp us anytime."
        />

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          <form onSubmit={submitToWhatsApp} className="glass-panel neon-ring rounded-2xl p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Full Name"
                aria-label="Full Name"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              />
              <Input
                placeholder="Phone Number"
                aria-label="Phone Number"
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              />
            </div>
            <Input
              className="mt-3"
              placeholder="Email Address"
              aria-label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            />
            <Input
              className="mt-3"
              placeholder="Project Type / Location"
              aria-label="Project Type / Location"
              value={form.project}
              onChange={(e) => setForm((s) => ({ ...s, project: e.target.value }))}
            />
            <Textarea
              className="mt-3"
              placeholder="Write your requirements..."
              aria-label="Project Requirements"
              rows={4}
              value={form.requirements}
              onChange={(e) => setForm((s) => ({ ...s, requirements: e.target.value }))}
            />
            <div className="mt-3 flex gap-2">
              <Button type="submit" className="bg-[#00FF99] text-black hover:bg-[#6bffbf]">Send Inquiry</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => openWhatsApp("Assalamualaikum, I want to discuss a custom LED display project.")}
                className="border-[#00D1FF]/60 bg-[#00D1FF]/10 text-[#00D1FF] hover:bg-[#00D1FF]/20"
              >
                WhatsApp
              </Button>
            </div>
          </form>

          <div className="space-y-3">
            <div className="glass-panel rounded-xl p-4 text-sm text-[#AAAAAA]">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#00FF99]" /> +91 9800782814</p>
            </div>
            <div className="glass-panel rounded-xl p-4 text-sm text-[#AAAAAA]">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#00D1FF]" /> mozammell2018@gmail.com</p>
            </div>
            <div className="glass-panel rounded-xl p-4 text-sm text-[#AAAAAA]">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#FF3B3B]" /> Near Childrens Corner Institution, Sangrampur, Kalikapota, Ushti, Sangrampur, West Bengal 743355</p>
            </div>
            <div className="glass-panel rounded-xl p-2">
              <div className="overflow-hidden rounded-md border border-white/15">
                <iframe
                  title="Modern Electric Location Map"
                  src="https://www.google.com/maps?q=Near+Childrens+Corner+Institution,+Sangrampur,+Kalikapota,+Ushti,+Sangrampur,+West+Bengal+743355&output=embed"
                  className="h-40 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
