import { z } from "zod";


export const bannerValidationSchema = z.object({
  imageUrl: z.string({
    required_error: "Image URL is required!",
  }),
  link: z.string().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
