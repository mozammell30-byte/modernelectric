import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "uploads";

  if (!url || !serviceKey) return null;
  return { url, serviceKey, bucket };
}

export async function POST(req: Request) {
  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json({ error: "Supabase storage is not configured" }, { status: 500 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const ext = path.extname(file.name) || ".png";
  const base = path.basename(file.name, ext);
  const filename = `${Date.now()}-${safeName(base)}${ext.toLowerCase()}`;
  const objectPath = `admin/${filename}`;
  const uploadPath = objectPath.split("/").map(encodeURIComponent).join("/");

  const res = await fetch(`${config.url}/storage/v1/object/${config.bucket}/${uploadPath}`, {
    method: "POST",
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      "Content-Type": file.type,
      "Cache-Control": "31536000",
      "x-upsert": "false",
    },
    body: await file.arrayBuffer(),
  });

  if (!res.ok) {
    const message = await res.text();
    return NextResponse.json({ error: `Image upload failed: ${message}` }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    url: `${config.url}/storage/v1/object/public/${config.bucket}/${uploadPath}`,
  });
}
