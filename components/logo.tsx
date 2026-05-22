import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Image src="/logo.png" alt="Modern Electric Logo" width={48} height={32} className="h-8 w-12 object-contain" />
      {showText && (
        <span className="font-space text-lg font-bold tracking-wide text-white">
          Modern<span className="text-[#00FF99]">Electric</span>
        </span>
      )}
    </div>
  );
}
