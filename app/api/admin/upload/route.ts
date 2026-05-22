import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || ".png";
  const base = path.basename(file.name, ext);
  const filename = `${Date.now()}-${safeName(base)}${ext.toLowerCase()}`;

  const target = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(target, buffer);

  return NextResponse.json({ ok: true, url: `/uploads/${filename}` });
}
