import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all todos, sorted by creation date (newest first)
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("todos").order("desc").collect();
    },
});

// Create a new todo
export const create = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            completed: false,
            createdAt: Date.now(),
        });
        return todoId;
    },
});

// Toggle todo completion status
export const toggle = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) {
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
        await ctx.db.patch(args.id, {
            text: args.text,
        });
    },
});

// Delete a todo
export const remove = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Clear all completed todos
export const clearCompleted = mutation({
    args: {},
    handler: async (ctx) => {
        const completedTodos = await ctx.db
            .query("todos")
            .filter((q) => q.eq(q.field("completed"), true))
            .collect();

        for (const todo of completedTodos) {
            await ctx.db.delete(todo._id);
        }
    },
});

// Get stats for todos
export const stats = query({
    args: {},
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        const total = todos.length;
        const completed = todos.filter((t) => t.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    },
});
