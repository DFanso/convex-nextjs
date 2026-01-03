import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Get all todos for the current user, sorted by creation date (newest first)
export const list = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return [];
        }
        return await ctx.db
            .query("todos")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .order("desc")
            .collect();
    },
});

// Create a new todo
export const create = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            completed: false,
            createdAt: Date.now(),
            userId,
        });
        return todoId;
    },
});

// Toggle todo completion status
export const toggle = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const todo = await ctx.db.get(args.id);
        if (!todo || todo.userId !== userId) {
            throw new Error("Todo not found");
        }
        await ctx.db.patch(args.id, {
            completed: !todo.completed,
        });
    },
});

// Update todo text
export const update = mutation({
    args: { id: v.id("todos"), text: v.string() },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const todo = await ctx.db.get(args.id);
        if (!todo || todo.userId !== userId) {
            throw new Error("Todo not found");
        }
        await ctx.db.patch(args.id, {
            text: args.text,
        });
    },
});

// Delete a todo
export const remove = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const todo = await ctx.db.get(args.id);
        if (!todo || todo.userId !== userId) {
            throw new Error("Todo not found");
        }
        await ctx.db.delete(args.id);
    },
});

// Clear all completed todos for current user
export const clearCompleted = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const completedTodos = await ctx.db
            .query("todos")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("completed"), true))
            .collect();

        for (const todo of completedTodos) {
            await ctx.db.delete(todo._id);
        }
    },
});

// Get stats for current user's todos
export const stats = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return { total: 0, completed: 0, pending: 0 };
        }
        const todos = await ctx.db
            .query("todos")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();
        const total = todos.length;
        const completed = todos.filter((t) => t.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    },
});
