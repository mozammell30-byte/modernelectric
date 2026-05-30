import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://modernelectric.onrender.com";
const siteName = "Modern Electric";
const siteTitle = "Modern Electric | LED Display Boards for Mosques & Businesses";
const siteDescription =
  "Custom programmable LED display boards in West Bengal for mosques, prayer time systems, scrolling signboards, shop signage, and custom LED installations.";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "LED display board West Bengal",
    "mosque LED display",
    "prayer time display board",
    "masjid prayer time board",
    "scrolling LED signboard",
    "shop LED signboard",
    "programmable LED display",
    "custom LED signage",
    "LED display installation Kolkata",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "LED display and digital signage",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Modern Electric LED display solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "--_6W4b2Pvy2tY5avMFA7wVnXueUUijlXNrFygkCV-w",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
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


