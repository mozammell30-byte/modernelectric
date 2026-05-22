import { whatsappNumber } from "@/lib/data";

export function openWhatsApp(message: string) {
  const text = encodeURIComponent(message.trim());
  const url = `https://wa.me/${whatsappNumber}?text=${text}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

