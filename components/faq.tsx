"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function Faq() {
  return (
    <section className="section-space">
      <div className="container-shell max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Common Questions" description="Answers to frequently asked questions before project kick-off." />
        <Accordion type="single" collapsible className="mt-7 space-y-3">
          {faq.map((item, idx) => (
            <AccordionItem key={item.question} value={`item-${idx}`} className="glass-panel rounded-xl px-4">
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}



