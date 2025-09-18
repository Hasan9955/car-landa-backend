import { z } from "zod";
import { CAR_MODEL, Location, FuelType, Transmission } from "@prisma/client";

export const carSchema = z.object({
  id: z.string().optional(),

  categoryId: z.string({
    required_error: "Category ID is required!",
  }),
  brandId: z.string({
    required_error: "Brand ID is required!",
  }),

  carName: z.string({
    required_error: "Car name is required!",
  }),
  carModel: z.string({
    required_error: "Car model is required!",
  }),

  price: z.number({
    required_error: "Price is required!",
    invalid_type_error: "Price must be a number!",
  }),
  registrationYear: z.number({
    required_error: "Registration year is required!",
    invalid_type_error: "Registration year must be a number!",
  }),

  carLocation: z.nativeEnum(Location, {
    required_error: "Car location is required!",
    invalid_type_error: "Invalid location provided!",
  }),
  interiorColor: z.string({
    required_error: "Interior color is required!",
  }),
  exteriorColor: z.string({
    required_error: "Exterior color is required!",
  }),
  mileage: z.number({
    required_error: "Mileage is required!",
    invalid_type_error: "Mileage must be a number!",
  }),

  fuelType: z.nativeEnum(FuelType, {
    required_error: "Fuel type is required!",
    invalid_type_error: "Invalid fuel type provided!",
  }),
  numberOfCylinders: z.number({
    required_error: "Number of cylinders is required!",
    invalid_type_error: "Number of cylinders must be a number!",
  }),
  transmission: z.nativeEnum(Transmission, {
    required_error: "Transmission type is required!",
    invalid_type_error: "Invalid transmission type provided!",
  }),

  numberOfSeats: z.number({
    required_error: "Number of seats is required!",
    invalid_type_error: "Number of seats must be a number!",
  }),
  enginePower: z.number({
    required_error: "Engine power is required!",
    invalid_type_error: "Engine power must be a number!",
  }),
  shippingCost: z.number({
    required_error: "Shipping cost is required!",
    invalid_type_error: "Shipping cost must be a number!",
  }),
  customClearanceCost: z.number({
    required_error: "Custom clearance cost is required!",
    invalid_type_error: "Custom clearance cost must be a number!",
  }),

  description: z.string({
    required_error: "Description is required!",
  }),
  carImages: z.array(z.string({
    required_error: "At least one car image is required!",
  })).min(1, { message: "At least one image must be provided!" }),

  discount: z.number().optional().default(0.0),
  isFeatured: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type CarInput = z.infer<typeof carSchema>;
