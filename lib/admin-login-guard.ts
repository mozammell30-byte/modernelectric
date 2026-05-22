import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type AttemptRecord = {
  failCount: number;
  blockedUntil: number;
  updatedAt: number;
};

type AttemptMap = Record<string, AttemptRecord>;

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "admin-login-attempts.json");

async function ensureFile() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(FILE_PATH, "utf8");
  } catch {
    await writeFile(FILE_PATH, JSON.stringify({}, null, 2), "utf8");
  }
}

async function readMap(): Promise<AttemptMap> {
  await ensureFile();
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    return JSON.parse(raw) as AttemptMap;
  } catch {
    return {};
  }
}

async function writeMap(map: AttemptMap) {
  await ensureFile();
  await writeFile(FILE_PATH, JSON.stringify(map, null, 2), "utf8");
}

export function getClientIdFromHeaders(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown-client";
}

export async function getAttemptRecord(clientId: string): Promise<AttemptRecord> {
  const map = await readMap();
  return map[clientId] ?? { failCount: 0, blockedUntil: 0, updatedAt: Date.now() };
}

export async function registerFailedAttempt(clientId: string) {
  const map = await readMap();
  const current = map[clientId] ?? { failCount: 0, blockedUntil: 0, updatedAt: Date.now() };
  const now = Date.now();

  const stillBlocked = current.blockedUntil > now;
  const failCount = stillBlocked ? current.failCount : current.failCount + 1;
  let blockedUntil = current.blockedUntil;

  if (!stillBlocked && failCount >= 5) {
    blockedUntil = now + 5 * 60 * 60 * 1000;
  }

  map[clientId] = { failCount, blockedUntil, updatedAt: now };
  await writeMap(map);

  return map[clientId];
}

export async function registerSuccessfulLogin(clientId: string) {
  const map = await readMap();
  map[clientId] = { failCount: 0, blockedUntil: 0, updatedAt: Date.now() };
  await writeMap(map);
}
