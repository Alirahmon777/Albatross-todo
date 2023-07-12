import { z } from 'zod';

export const updateTaskSchema = z.object({
  body: z.optional(z.string()),
  date: z.optional(z.string()),
  smallBody: z.optional(z.string()),
  categoryId: z.optional(z.number()),
  completed: z.optional(z.boolean()),
});
