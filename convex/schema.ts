import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,
    todos: defineTable({
        text: v.string(),
        completed: v.boolean(),
        createdAt: v.number(),
        userId: v.optional(v.id("users")), // Optional to support existing data migration
    })
        .index("by_created", ["createdAt"])
        .index("by_user", ["userId"]),
});
