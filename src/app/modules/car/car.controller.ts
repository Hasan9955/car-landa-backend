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