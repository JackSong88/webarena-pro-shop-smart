"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import {
  createSession,
  destroySession,
  getCurrentUser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { ensureDemoAccountSeed } from "@/lib/demo-auth-seed";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

const signUpSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
});

export async function signIn(values: { email: string; password: string }) {
  try {
    const parsed = signInSchema.parse(values);
    const email = parsed.email.toLowerCase();
    const { password } = parsed;

    await ensureDemoAccountSeed(email);

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return {
        error: true,
        message: "Sign in failed",
        action: "Check your email and password, then try again.",
      };
    }

    await createSession(user.id);
    revalidatePath("/");

    return {
      error: false,
      message: "Signed in",
      action: "Welcome back to ShopSmart.",
    };
  } catch (error) {
    console.error("Sign in failed.", error);

    return {
      error: true,
      message: "Sign in failed",
      action: "Please use a valid email and password.",
    };
  }
}

export async function signUp(values: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const input = signUpSchema.parse(values);
    const email = input.email.toLowerCase();
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      return {
        error: true,
        message: "Account already exists",
        action: "Use a different email or sign in instead.",
      };
    }

    const result = await db.insert(users).values({
      name: input.name,
      email,
      passwordHash: hashPassword(input.password),
      createdAt: Math.floor(Date.now() / 1000),
    });

    await createSession(result[0].insertId);
    revalidatePath("/");

    return {
      error: false,
      message: "Account created",
      action: "You're ready to start shopping.",
    };
  } catch (error) {
    console.error("Sign up failed.", error);

    return {
      error: true,
      message: "Could not create account",
      action: "Please review your details and try again.",
    };
  }
}

export async function signOut() {
  await destroySession();
  revalidatePath("/");

  return {
    error: false,
    message: "Signed out",
    action: "See you again soon.",
  };
}

export async function getCurrentAccount() {
  return await getCurrentUser();
}
