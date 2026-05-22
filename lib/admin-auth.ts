export const ADMIN_AUTH_COOKIE = "admin_auth";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function getAdminSessionValue() {
  return process.env.ADMIN_SESSION_VALUE || "modern-electric-admin-session";
}
