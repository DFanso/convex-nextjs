"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TodoItem } from "./todo-item";

export function TodoList() {
    const todos = useQuery(api.todos.list);

    if (todos === undefined) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm"
                    >
                        <div className="size-5 animate-pulse rounded-full bg-muted/50" />
                        <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
                    </div>
                ))}
            </div>
        );
    }

    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-card/20 py-16 backdrop-blur-sm">
                {/* Empty state illustration */}
                <div className="relative mb-6">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-xl" />
                    <div className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
                        <svg
                            className="size-10 text-primary/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                    No tasks yet
                </h3>
                <p className="text-sm text-muted-foreground">
                    Add your first task to get started
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    id={todo._id}
                    text={todo.text}
                    completed={todo.completed}
                />
            ))}
        </div>
    );
}
