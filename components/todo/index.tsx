"use client";

import { TodoInput } from "./todo-input";
import { TodoList } from "./todo-list";
import { TodoStats } from "./todo-stats";

export function TodoApp() {
    return (
        <div className="min-h-screen bg-background">
            {/* Background gradient effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-1/4 -top-1/4 size-1/2 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
                <div className="absolute -bottom-1/4 -right-1/4 size-1/2 rounded-full bg-gradient-to-tl from-primary/20 to-transparent blur-3xl" />
                <div className="absolute left-1/2 top-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="fixed inset-0 -z-10 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Main content */}
            <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-12 text-center">
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
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        Powered by Convex
                    </div>
                    <h1 className="mb-3 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                        Task Manager
                    </h1>
                    <p className="text-base text-muted-foreground">
                        Stay organized with real-time sync across all your devices
                    </p>
                </header>

                {/* Todo input */}
                <div className="mb-8">
                    <TodoInput />
                </div>

                {/* Stats */}
                <div className="mb-6">
                    <TodoStats />
                </div>

                {/* Todo list */}
                <TodoList />

                {/* Footer */}
                <footer className="mt-12 text-center">
                    <p className="text-xs text-muted-foreground/60">
                        Built with{" "}
                        <span className="font-medium text-muted-foreground">Next.js</span>,{" "}
                        <span className="font-medium text-muted-foreground">Convex</span>,
                        and{" "}
                        <span className="font-medium text-muted-foreground">shadcn/ui</span>
                    </p>
                </footer>
            </div>
        </div>
    );
}
