import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,

    // Todos table
    todos: defineTable({
        text: v.string(),
        completed: v.boolean(),
        createdAt: v.number(),
        userId: v.id("users"), // Optional for migration
    })
        .index("by_created", ["createdAt"])
        .index("by_user", ["userId"]),

    // Chat messages table for real-time chat
    messages: defineTable({
        text: v.string(),
        userId: v.id("users"),
        userName: v.string(),
        userEmail: v.string(),
        createdAt: v.number(),
    }).index("by_created", ["createdAt"]),
});
