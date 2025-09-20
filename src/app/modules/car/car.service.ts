import { CAR_MODEL } from "@prisma/client";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination.type";
import { ICar } from "./car.interface";
import prisma from "../../lib/prisma";
import ApiError from "../../errors/ApiError";
import { fileUploader } from "../../middlewares/fileUploader";
import httpStatus from "http-status";
import { deleteFromS3ByUrl } from "../../lib/deleteFromS3ByUrl";





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

  const cars = await prisma.car.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip, 
  });

  const totalCars = await prisma.car.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total: totalCars,
      totalPages: Math.ceil(totalCars / limit),
    },
    data: cars,
  };
};

const getCarById = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: { id }
  });
  return car;
};


const createCarIntoDB = async (payload: any, files: any) => {
  let carImages: string[] = []; 

  if (files && files.carImages.length > 0) {
    const uploadResults = await Promise.all(
      files.carImages.map(async (file: any) => {
        const uploadResult = await fileUploader.uploadToDigitalOcean(file);
        return uploadResult.Location;
      })
    ); 

    carImages = uploadResults;
  }

  
  const newCar = await prisma.car.create({
    data: {
      ...payload, 
      carImages: carImages,
    },
  });

  return newCar;
};




const updateCarById = async (
  id: string,
  payload: any,
  files: any
) => {
  const existingCar = await prisma.car.findUnique({
    where: { id },
  });

  if (!existingCar) {
    throw new ApiError(httpStatus.NOT_FOUND, "Car not found");
  }

  
  let carImages: string[] = Array.isArray(payload.carImages)
    ? payload.carImages
    : [];
    
   
  if (files && files.carImages.length > 0) {
    const uploadResults = await Promise.all(
      files.carImages.map((file: any) => fileUploader.uploadToDigitalOcean(file))
    );
    const newImageUrls = uploadResults.map((res) => res.Location);
    carImages = [...carImages, ...newImageUrls]; 
  }

  // delete the images that were removed by user
  const removedImages = existingCar.carImages.filter(
    (img) => !carImages.includes(img)
  );
  if (removedImages.length > 0) {
    await Promise.all(removedImages.map((img) => deleteFromS3ByUrl(img)));
  }


  const result = await prisma.car.update({
    where: { id },
    data: {
      ...payload,
      carImages,
    },
  });

  return result;
};



const deleteCarById = async (carId: string) => {
  const existingCar = await prisma.car.findUnique({
    where: { id: carId },
  });

  if (!existingCar) {
    throw new ApiError(httpStatus.NOT_FOUND, "Car not found");
  }

  await prisma.car.delete({
    where: { id: carId },
  });

  return existingCar;
}


export const CarService = {
    createCarIntoDB,
    getAllCars,
    getCarById,
    updateCarById,
    deleteCarById,
};