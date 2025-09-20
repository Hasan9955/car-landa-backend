import { z } from "zod";


export const favoriteValidationSchema = z.object({
  userId: z.string({
    required_error: "User ID is required!",
  }),
  carId: z.string({
    required_error: "Car ID is required!",
  })
});