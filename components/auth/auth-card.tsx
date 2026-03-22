"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { routes } from "@/lib/routes";
import { signIn, signUp } from "@/server-actions/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const demoAccounts = [
  "buyer@shopsmart.local / demo1234",
  "freshmart@shopsmart.local / demo1234",
  "greenbasket@shopsmart.local / demo1234",
  "orchard@shopsmart.local / demo1234",
];

export function AuthCard(props: { mode: "signIn" | "signUp" }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isSignIn = props.mode === "signIn";

  return (
    <div className="grid w-full max-w-5xl gap-8 rounded-3xl border border-border bg-white p-4 shadow-sm md:grid-cols-[1.15fr_0.85fr] md:p-8">
      <div className="overflow-hidden rounded-[1.5rem] bg-slate-950 p-8 text-white">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-300">
          Seeded Demo Accounts
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {isSignIn ? "Sign in with a seeded account" : "Create a local ShopSmart account"}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
          Use one of the seeded demo accounts below to explore the local
          storefront and seller flows.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-medium">Seeded demo accounts</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            {demoAccounts.map((account) => (
              <p key={account}>{account}</p>
            ))}
          </div>
        </div>
      </div>

      <form
        className="flex flex-col justify-center gap-5 rounded-[1.5rem] bg-secondary p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setIsLoading(true);

          const action = isSignIn
            ? signIn({
                email: formValues.email,
                password: formValues.password,
              })
            : signUp(formValues);

          action
            .then((result) => {
              toast({
                title: result.message,
                description: result.action,
              });

              if (!result.error) {
                router.push(routes.account);
                router.refresh();
              }
            })
            .finally(() => setIsLoading(false));
        }}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {isSignIn ? "Welcome Back" : "Get Started"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            {isSignIn ? "Sign in to your account" : "Create your account"}
          </h2>
        </div>

        {!isSignIn && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Jordan Lee"
              required
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formValues.email}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder="buyer@shopsmart.local"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formValues.password}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            placeholder="Minimum 8 characters"
            required
          />
        </div>

        <Button disabled={isLoading} className="mt-2 flex gap-2">
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          {isSignIn ? "Sign In" : "Create Account"}
        </Button>

        <p className="text-sm text-muted-foreground">
          {isSignIn ? "Need an account?" : "Already have an account?"}{" "}
          <Link
            href={isSignIn ? routes.signUp : routes.signIn}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {isSignIn ? "Create one" : "Sign in"}
          </Link>
        </p>
      </form>
    </div>
  );
}
