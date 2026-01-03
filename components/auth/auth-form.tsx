"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function AuthForm() {
    const { signIn } = useAuthActions();
    const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.set("flow", flow);

        try {
            await signIn("password", formData);
        } catch (err) {
            setError(
                flow === "signIn"
                    ? "Invalid email or password"
                    : "Could not create account"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                    <svg
                        className="size-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    Secure Authentication
                </div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight">
                    {flow === "signIn" ? "Welcome back" : "Create account"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {flow === "signIn"
                        ? "Sign in to access your tasks"
                        : "Sign up to start managing your tasks"}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                    <div className="relative">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email address"
                            required
                            autoComplete="email"
                            className="h-11 bg-card/50 pl-10 text-sm backdrop-blur-sm"
                        />
                        <svg
                            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    <div className="relative">
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            autoComplete={flow === "signIn" ? "current-password" : "new-password"}
                            className="h-11 bg-card/50 pl-10 text-sm backdrop-blur-sm"
                        />
                        <svg
                            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                </div>

                {error && (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 w-full rounded-lg bg-gradient-to-r from-primary to-primary/80 text-sm font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                >
                    {isLoading ? (
                        <svg className="size-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    ) : flow === "signIn" ? (
                        "Sign in"
                    ) : (
                        "Create account"
                    )}
                </Button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    {flow === "signIn" ? "Don't have an account?" : "Already have an account?"}
                    <button
                        type="button"
                        onClick={() => {
                            setFlow(flow === "signIn" ? "signUp" : "signIn");
                            setError(null);
                        }}
                        className="ml-1 font-medium text-primary hover:underline"
                    >
                        {flow === "signIn" ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    );
}
