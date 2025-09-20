import { CAR_MODEL } from "@prisma/client";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination.type";
import { ICar } from "./car.interface";



const createCarIntoDB = async (car: ICar) => {

    console.log("Creating car:", car);
    return car;
}

const getAllCars =  async (
  options: IPaginationOptions & { search?: string; filter?: string }
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { search, filter } = options;

  const whereCondition: any = {};

  if (filter) {
    whereCondition.carModel = filter as CAR_MODEL;
  }

  if (search) {
    whereCondition.carName = {
      contains: search,
      mode: "insensitive",
    };
  }

    return [];
}

const getCarById = async (carId: string): Promise<ICar | null> => {


    return null;
}

const updateCarById = async (carId: string, car: Partial<ICar>): Promise<ICar | null> => {


    return null;
}

const deleteCarById = async (carId: string): Promise<ICar | null> => {


    return null;
}


export const CarService = {
    createCarIntoDB,
    getAllCars,
    getCarById,
    updateCarById,
    deleteCarById,
};