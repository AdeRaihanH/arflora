import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export { hashPassword, verifyPassword } from "@/lib/password";

const COOKIE_NAME = "arflora_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET belum diatur di environment.");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createToken(adminId: string) {
  const payload = `${adminId}.${Date.now() + SESSION_TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [adminId, exp, signature] = parts;
  const expected = sign(`${adminId}.${exp}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  if (Number(exp) < Date.now()) return null;
  return adminId;
}

export async function setSessionCookie(adminId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(adminId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentAdmin() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const adminId = verifyToken(token);
  if (!adminId) return null;
  return prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, name: true },
  });
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
