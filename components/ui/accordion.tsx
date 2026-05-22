"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: AccordionPrimitive.AccordionItemProps) {
  return <AccordionPrimitive.Item className={cn(className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn("flex flex-1 items-center justify-between py-4 text-left text-sm font-medium text-white", className)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 text-[#AAAAAA]" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, ...props }: AccordionPrimitive.AccordionContentProps) {
  return <AccordionPrimitive.Content className={cn("pb-4 text-sm text-[#AAAAAA]", className)} {...props} />;
}


