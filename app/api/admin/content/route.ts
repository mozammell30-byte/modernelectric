import { NextResponse } from "next/server";
import { readSiteContent, writeSiteContent, type SiteContent } from "@/lib/site-content";

export async function GET() {
  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  const body = (await req.json()) as SiteContent;
  if (!body || !Array.isArray(body.portfolio)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await writeSiteContent(body);
  return NextResponse.json({ ok: true });
}
