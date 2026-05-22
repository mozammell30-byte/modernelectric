import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://modernelectric.example"),
  title: "Modern Electric | Custom LED Display Solutions",
  description:
    "Premium programmable LED display systems for mosques and local businesses. Prayer time boards, scrolling LED signage, and custom installations.",
  keywords: [
    "LED display",
    "mosque LED board",
    "prayer time display",
    "custom signboard",
    "programmable LED",
  ],
  openGraph: {
    title: "Modern Electric | Custom LED Display Solutions",
    description:
      "Custom programmable LED display systems for mosques and businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}


