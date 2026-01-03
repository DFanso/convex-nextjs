"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ChatPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const messages = useQuery(api.messages.list) || [];
    const onlineCount = useQuery(api.messages.onlineCount) || 0;
    const sendMessage = useMutation(api.messages.send);
    const currentUser = useQuery(api.users.current);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        await sendMessage({ text: message.trim() });
        setMessage("");
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30",
                    isOpen && "rotate-45"
                )}
            >
                {isOpen ? (
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
                {!isOpen && messages.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                        {messages.length > 99 ? "99+" : messages.length}
                    </span>
                )}
            </button>

            {/* Chat Panel */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl transition-all duration-300",
                    isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/30 bg-card px-4 py-3">
                    <div>
                        <h3 className="font-semibold">Community Chat</h3>
                        <p className="text-xs text-muted-foreground">
                            {onlineCount} {onlineCount === 1 ? "user" : "users"} online
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="size-2 animate-pulse rounded-full bg-green-500" />
                        <span className="text-xs text-green-500">Live</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                                <svg className="size-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium">No messages yet</p>
                            <p className="text-xs text-muted-foreground">Be the first to say hello!</p>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isOwn = currentUser?.id === msg.userId;
                            const time = new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <div
                                    key={msg._id}
                                    className={cn(
                                        "flex flex-col gap-1",
                                        isOwn ? "items-end" : "items-start"
                                    )}
                                >
                                    {!isOwn && (
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {msg.userName || msg.userEmail.split("@")[0]}
                                        </span>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-[280px] rounded-2xl px-4 py-2 text-sm",
                                            isOwn
                                                ? "bg-primary text-primary-foreground rounded-br-md"
                                                : "bg-muted text-foreground rounded-bl-md"
                                        )}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground/60">{time}</span>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="border-t border-border/30 p-3">
                    <div className="flex gap-2">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-muted/50 border-0"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!message.trim()}
                            className="shrink-0 rounded-lg"
                        >
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
