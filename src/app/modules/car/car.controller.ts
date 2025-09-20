import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync"; 
import sendResponse from "../../helpers/sendResponse";
import httpStatus from "http-status";
import { CarService } from "./car.service";



const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const options = req.query;
  const result = await CarService.getAllCars(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars fetched successfully",
    data: result,
  });
});

const getCarById = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  const result = await CarService.getCarById(carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car fetched successfully",
    data: result,
  });
});

const createCar = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file;
  const files = file ? [file] : [];
  const result = await CarService.createCarIntoDB(payload, files);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});


const updateCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  const payload = req.body;
  const file = req.file;
  const files = file ? [file] : null;
  const result = await CarService.updateCarById(carId, payload, files);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated successfully",
    data: result,
  });
});


const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  const result = await CarService.deleteCarById(carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car deleted successfully",
    data: result,
  });
});

export const CarController = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};

