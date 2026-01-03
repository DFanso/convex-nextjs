import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Get recent messages (last 100)
export const list = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return [];
        }
        const messages = await ctx.db
            .query("messages")
            .withIndex("by_created")
            .order("asc")
            .take(100);
        return messages;
    },
});

// Send a new message
export const send = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.get(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const messageId = await ctx.db.insert("messages", {
            text: args.text,
            userId,
            userName: user.name || "Anonymous",
            userEmail: user.email || "unknown@example.com",
            createdAt: Date.now(),
        });
        return messageId;
    },
});

// Delete a message (only the author can delete)
export const remove = mutation({
    args: { id: v.id("messages") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const message = await ctx.db.get(args.id);
        if (!message || message.userId !== userId) {
            throw new Error("Message not found or not authorized");
        }
        await ctx.db.delete(args.id);
    },
});

// Get online users count (users who sent a message in last 5 minutes)
export const onlineCount = query({
    args: {},
    handler: async (ctx) => {
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        const recentMessages = await ctx.db
            .query("messages")
            .withIndex("by_created")
            .filter((q) => q.gte(q.field("createdAt"), fiveMinutesAgo))
            .collect();

        const uniqueUsers = new Set(recentMessages.map((m) => m.userId));
        return uniqueUsers.size;
    },
});
