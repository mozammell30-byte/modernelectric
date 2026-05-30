import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("inline-flex min-w-0 items-center gap-2", className)}>
      <Image src="/logo.png" alt="Modern Electric Logo" width={48} height={32} className="h-8 w-12 shrink-0 object-contain" />
      {showText && (
        <span className="truncate font-space text-base font-bold tracking-wide text-white sm:text-lg">
          Modern<span className="text-[#00FF99]">Electric</span>
        </span>
      )}
    </div>
  );
}
