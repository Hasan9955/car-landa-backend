import { FuelType, Transmission } from "@prisma/client";

export interface ICar {
  id: string;
  categoryId: string;
  brandId: string;

  carName: string;
  carModel: string;
  price: number;
  registrationYear: number;

  carLocation: string;
  interiorColor: string;
  exteriorColor: string;
  mileage: number;

  fuelType: FuelType;
  numberOfCylinders: number;
  transmission: Transmission;

  numberOfSeats: number;
  enginePower: number;
  shippingCost: number;
  customClearanceCost: number;
  description: string;
  carImages: string[];

  discount?: number;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
