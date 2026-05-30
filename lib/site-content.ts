import { readFile } from "node:fs/promises";
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
const CONTENT_KEY = "main";

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

function mergeWithDefault(input: Partial<SiteContent> | null | undefined): SiteContent {
  return {
    portfolio: Array.isArray(input?.portfolio) ? input!.portfolio : defaultContent.portfolio,
    gallery: Array.isArray(input?.gallery) ? input!.gallery : defaultContent.gallery,
    hero: { ...defaultContent.hero, ...(input?.hero ?? {}) },
    testimonials: Array.isArray(input?.testimonials) ? input!.testimonials : defaultContent.testimonials,
    pricing: Array.isArray(input?.pricing) ? input!.pricing : defaultContent.pricing,
  };
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;
  return { url, serviceKey };
}

async function readLocalSeedContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return mergeWithDefault(parsed);
  } catch {
    return defaultContent;
  }
}

async function supabaseRequest(pathname: string, init?: RequestInit) {
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error("Supabase environment variables are missing.");
  }

  const headers = new Headers(init?.headers);
  headers.set("apikey", config.serviceKey);
  headers.set("Authorization", `Bearer ${config.serviceKey}`);

  return fetch(`${config.url}${pathname}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

async function seedSupabaseContent() {
  const seed = await readLocalSeedContent();
  await writeSiteContent(seed);
  return seed;
}

export async function readSiteContent(): Promise<SiteContent> {
  if (!getSupabaseConfig()) {
    return readLocalSeedContent();
  }

  try {
    const res = await supabaseRequest(`/rest/v1/site_content?key=eq.${CONTENT_KEY}&select=content&limit=1`, {
      method: "GET",
    });

    if (!res.ok) {
      return defaultContent;
    }

    const rows = (await res.json()) as Array<{ content?: Partial<SiteContent> }>;
    const content = rows[0]?.content;

    if (!content) {
      return seedSupabaseContent();
    }

    return mergeWithDefault(content);
  } catch {
    return defaultContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  if (!getSupabaseConfig()) {
    throw new Error("Supabase environment variables are missing.");
  }

  const normalized = mergeWithDefault(content);
  const res = await supabaseRequest("/rest/v1/site_content?on_conflict=key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      key: CONTENT_KEY,
      content: normalized,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Supabase content save failed: ${message}`);
  }
}
