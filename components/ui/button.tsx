import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition",
          variant === "default" && "bg-white text-black",
          variant === "outline" && "border border-white/20",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";


