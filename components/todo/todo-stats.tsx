"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

export function TodoStats() {
    const stats = useQuery(api.todos.stats);
    const clearCompleted = useMutation(api.todos.clearCompleted);

    if (!stats) {
        return (
            <div className="flex items-center justify-between rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
                <div className="flex gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <div className="h-6 w-8 animate-pulse rounded bg-muted/50" />
                            <div className="h-3 w-12 animate-pulse rounded bg-muted/30" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const { total, completed, pending } = stats;

    return (
        <div className="flex items-center justify-between rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
            {/* Stats */}
            <div className="flex gap-8">
                <StatItem
                    value={total}
                    label="Total"
                    color="text-foreground"
                    bgColor="bg-foreground/10"
                />
                <StatItem
                    value={pending}
                    label="Pending"
                    color="text-primary"
                    bgColor="bg-primary/10"
                />
                <StatItem
                    value={completed}
                    label="Completed"
                    color="text-green-500"
                    bgColor="bg-green-500/10"
                />
            </div>

            {/* Clear completed button */}
            {completed > 0 && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearCompleted()}
                    className="text-muted-foreground hover:text-destructive"
                >
                    <svg
                        className="mr-1.5 size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                    Clear completed
                </Button>
            )}
        </div>
    );
}

function StatItem({
    value,
    label,
    color,
    bgColor,
}: {
    value: number;
    label: string;
    color: string;
    bgColor: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <div
                className={`flex size-10 items-center justify-center rounded-lg ${bgColor}`}
            >
                <span className={`text-lg font-bold ${color}`}>{value}</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
    );
}
