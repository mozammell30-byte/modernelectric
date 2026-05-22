import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[110px] w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-[#6f6f6f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]/40",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";


