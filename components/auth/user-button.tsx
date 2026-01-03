"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

export function UserButton() {
    const { signOut } = useAuthActions();
    const user = useQuery(api.users.current);

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-xs font-bold text-primary-foreground">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden text-sm font-medium sm:block">
                    {user.email}
                </span>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-muted-foreground hover:text-foreground"
            >
                <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
                <span className="ml-1 hidden sm:inline">Sign out</span>
            </Button>
        </div>
    );
}
