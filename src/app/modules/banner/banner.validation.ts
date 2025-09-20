import { z } from "zod";


export const bannerValidationSchema = z.object({
//   bannerImage: z.string({
//     required_error: "Banner image URL is required!",
//   }),
  link: z.string().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
