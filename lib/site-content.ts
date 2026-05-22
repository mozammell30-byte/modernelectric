import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  galleryItems,
  portfolio,
  pricingPlans,
  testimonials,
  type GalleryItem,
  type PortfolioItem,
  type PricingPlan,
  type TestimonialItem,
  type HeroContent,
} from "@/lib/data";

export type SiteContent = {
  portfolio: PortfolioItem[];
  gallery: GalleryItem[];
  hero: HeroContent;
  testimonials: TestimonialItem[];
  pricing: PricingPlan[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "site-content.json");

const defaultContent: SiteContent = {
  portfolio,
  gallery: galleryItems,
  hero: {
    badge: "India | Bengali | English | Arabic",
    titleLine1: "Custom LED Display",
    titleLine2: "Solutions for",
    titleLine3: "Mosques & Businesses",
    description:
      "Programmable prayer time boards, Azan countdowns, scrolling LED signs, and digital signboards engineered, programmed, and installed by our local team.",
    ctaPrimary: "Get a Quote",
    ctaSecondary: "WhatsApp Us",
    ticker:
      "? ???????? ??????? â€¢ Welcome to Baitul Mukarram â€¢ ?????? ???? ?????? â€¢ Please switch phones to silent ?",
  },
  testimonials,
  pricing: pricingPlans,
};

async function ensureFile() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(FILE_PATH, "utf8");
  } catch {
    await writeFile(FILE_PATH, JSON.stringify(defaultContent, null, 2), "utf8");
  }
}

function mergeWithDefault(input: Partial<SiteContent> | null | undefined): SiteContent {
  return {
    portfolio: Array.isArray(input?.portfolio) ? input!.portfolio : defaultContent.portfolio,
    gallery: Array.isArray(input?.gallery) ? input!.gallery : defaultContent.gallery,
    hero: { ...defaultContent.hero, ...(input?.hero ?? {}) },
    testimonials: Array.isArray(input?.testimonials) ? input!.testimonials : defaultContent.testimonials,
    pricing: Array.isArray(input?.pricing) ? input!.pricing : defaultContent.pricing,
  };
}

export async function readSiteContent(): Promise<SiteContent> {
  await ensureFile();
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return mergeWithDefault(parsed);
  } catch {
    return defaultContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  await ensureFile();
  const normalized = mergeWithDefault(content);
  await writeFile(FILE_PATH, JSON.stringify(normalized, null, 2), "utf8");
}
