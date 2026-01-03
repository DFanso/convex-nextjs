"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TodoItemProps {
    id: Id<"todos">;
    text: string;
    completed: boolean;
}

export function TodoItem({ id, text, completed }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggle = useMutation(api.todos.toggle);
    const update = useMutation(api.todos.update);
    const remove = useMutation(api.todos.remove);

    const handleToggle = () => {
        toggle({ id });
    };

    const handleSave = () => {
        if (editText.trim()) {
            update({ id, text: editText.trim() });
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        await remove({ id });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setEditText(text);
            setIsEditing(false);
        }
    };

    return (
        <div
            className={cn(
                "group relative flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300",
                "hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5",
                completed && "opacity-60",
                isDeleting && "animate-fade-out scale-95 opacity-0"
            )}
        >
            {/* Gradient accent line */}
            <div
                className={cn(
                    "absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b transition-all duration-300",
                    completed
                        ? "from-green-500/50 to-emerald-500/50"
                        : "from-primary/50 to-primary/20"
                )}
            />

            {/* Checkbox */}
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={completed}
                    onCheckedChange={handleToggle}
                    className={cn(
                        "size-5 rounded-full transition-all duration-300",
                        completed && "bg-green-500 border-green-500 data-[checked]:bg-green-500 data-[checked]:border-green-500"
                    )}
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="h-8 bg-background/50 text-sm"
                    />
                ) : (
                    <p
                        className={cn(
                            "text-sm font-medium transition-all duration-300 cursor-pointer truncate",
                            completed && "text-muted-foreground line-through decoration-2"
                        )}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {text}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setIsEditing(true)}
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </Button>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleDelete}
                    className="text-muted-foreground hover:text-destructive"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    );
}
