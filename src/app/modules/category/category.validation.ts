import { z } from "zod";

export const categorySchema = z.object({  
  categoryName: z.string({
    required_error: "Category name is required!",
  }),
  isDeleted: z.boolean().default(false)
});

export type CategoryInput = z.infer<typeof categorySchema>;
