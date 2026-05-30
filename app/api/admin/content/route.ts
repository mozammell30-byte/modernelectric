import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readSiteContent, writeSiteContent, type SiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SiteContent;
    if (!body || !Array.isArray(body.portfolio) || !Array.isArray(body.gallery)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await writeSiteContent(body);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown save error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
