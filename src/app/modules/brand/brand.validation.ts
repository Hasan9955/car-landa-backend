import { z } from "zod";

export const createBrandSchema = z.object({ 
  BrandName: z.string({
    required_error: "Brand name is required!",
  }),  
  isDeleted: z.boolean().default(false)
});


export const updateBrandSchema = z.object({
  BrandName: z.string().optional(),
  isDeleted: z.boolean().optional()
});