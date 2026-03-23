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

function getSessionCookieOptions(expires: Date) {
  const isProduction = process.env.NODE_ENV === "production";
  const isHuggingFaceSpace = Boolean(process.env.SPACE_HOST);
  const useCrossSiteCookie = isProduction && isHuggingFaceSpace;

  return {
    httpOnly: true,
    sameSite: useCrossSiteCookie ? "none" : "lax",
    secure: isProduction,
    expires,
    path: "/",
  } as const;
}

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

  try {
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
  } catch (error) {
    console.error("Failed to load the current user from the session store.", error);
    return null;
  }
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

  cookies().set(
    SESSION_COOKIE_NAME,
    sessionToken,
    getSessionCookieOptions(new Date(expiresAt * 1000))
  );
}

export async function destroySession() {
  const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
  }

  cookies().set(
    SESSION_COOKIE_NAME,
    "",
    getSessionCookieOptions(new Date(0))
  );
}
