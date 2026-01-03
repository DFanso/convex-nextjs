"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TodoInput() {
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const create = useMutation(api.todos.create);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsSubmitting(true);
        await create({ text: text.trim() });
        setText("");
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-2 backdrop-blur-sm transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/10">
                {/* Plus icon */}
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                    <svg
                        className="size-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </div>

                {/* Input */}
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1 border-0 bg-transparent text-base placeholder:text-muted-foreground/60 focus-visible:ring-0"
                    disabled={isSubmitting}
                />

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={!text.trim() || isSubmitting}
                    className="rounded-lg bg-gradient-to-r from-primary to-primary/80 px-6 text-sm font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
                >
                    {isSubmitting ? (
                        <svg
                            className="size-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
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
                    ) : (
                        "Add Task"
                    )}
                </Button>
            </div>
        </form>
    );
}
