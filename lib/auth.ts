import { db } from "@/db/db";
import { sessions, users } from "@/db/schema";
import { routes } from "@/lib/routes";
import { and, eq, gt } from "drizzle-orm";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const SESSION_COOKIE_NAME = "shopsmart_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string | null) {
  if (!storedHash) return false;

  const [salt, storedKey] = storedHash.split(":");
  if (!salt || !storedKey) return false;

  const derivedKey = scryptSync(password, salt, 64);
  const storedKeyBuffer = Buffer.from(storedKey, "hex");

  if (derivedKey.length !== storedKeyBuffer.length) return false;

  return timingSafeEqual(derivedKey, storedKeyBuffer);
}

export const getCurrentUser = cache(async () => {
  const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const [record] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      passwordHash: users.passwordHash,
      storeId: users.storeId,
      createdAt: users.createdAt,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(
      and(
        eq(sessions.sessionToken, sessionToken),
        gt(sessions.expiresAt, Math.floor(Date.now() / 1000))
      )
    );

  return record ?? null;
});

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(routes.signIn);
  }

  return user;
}

export async function createSession(userId: number) {
  const sessionToken = randomBytes(32).toString("hex");
  const expiresAt =
    Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;

  await db.insert(sessions).values({
    sessionToken,
    userId,
    expiresAt,
  });

  cookies().set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt * 1000),
    path: "/",
  });
}

export async function destroySession() {
  const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
  }

  cookies().set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
}
