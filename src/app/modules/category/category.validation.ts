import { z } from "zod";

export const createCategorySchema = z.object({  
  categoryName: z.string({
    required_error: "Category name is required!",
  }),
  isDeleted: z.boolean().default(false)
});
 

export const updateCategorySchema = z.object({
  categoryName: z.string().optional(),
  isDeleted: z.boolean().optional()
});