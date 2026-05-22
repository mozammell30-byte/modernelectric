import { NextResponse } from "next/server";
import { ADMIN_AUTH_COOKIE, getAdminPassword, getAdminSessionValue } from "@/lib/admin-auth";
import {
  getAttemptRecord,
  getClientIdFromHeaders,
  registerFailedAttempt,
  registerSuccessfulLogin,
} from "@/lib/admin-login-guard";

export async function POST(req: Request) {
  const clientId = getClientIdFromHeaders(req.headers);
  const existing = await getAttemptRecord(clientId);
  const now = Date.now();

  if (existing.blockedUntil > now) {
    const retryAfterSec = Math.ceil((existing.blockedUntil - now) / 1000);
    return NextResponse.json(
      {
        error: "Too many failed attempts. Device/IP is blocked for 5 hours.",
        retryAfterSec,
      },
      { status: 429 },
    );
  }

  const body = (await req.json()) as { password?: string };
  if (!body?.password || body.password !== getAdminPassword()) {
    const updated = await registerFailedAttempt(clientId);
    const blockedNow = updated.blockedUntil > Date.now();
    if (blockedNow) {
      const retryAfterSec = Math.ceil((updated.blockedUntil - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: "Too many failed attempts. Device/IP is blocked for 5 hours.",
          retryAfterSec,
        },
        { status: 429 },
      );
    }
    const remaining = Math.max(0, 5 - updated.failCount);
    return NextResponse.json({ error: `Invalid password. ${remaining} attempt(s) left.` }, { status: 401 });
  }

  await registerSuccessfulLogin(clientId);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_AUTH_COOKIE, getAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
