"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { routes } from "@/lib/routes";
import { signOut } from "@/server-actions/auth";
import { Loader2, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserMenu(props: {
  name: string | null;
  email: string | null;
  compact?: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={
        props.compact
          ? "flex items-center gap-3"
          : "rounded-md border border-border bg-secondary px-6 py-6"
      }
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
          <User size={20} />
        </div>
        <div>
          <p className="font-medium">{props.name ?? "ShopSmart User"}</p>
          <p className="text-sm text-muted-foreground">{props.email}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className={props.compact ? "ml-2" : "mt-5 flex gap-2"}
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          signOut()
            .then((result) => {
              toast({
                title: result.message,
                description: result.action,
              });
              router.push(routes.signIn);
              router.refresh();
            })
            .finally(() => setIsLoading(false));
        }}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <LogOut size={16} />
        )}
        {!props.compact && <span>Sign out</span>}
      </Button>
    </div>
  );
}
