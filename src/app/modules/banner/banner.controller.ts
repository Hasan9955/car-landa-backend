import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";
import { BannerService } from "./banner.service";
import sendResponse from "../../helpers/sendResponse";
import httpStatus from "http-status";



const getAllBanners = catchAsync(async (req: Request, res: Response) => {
  const options = req.query;
  const result = await BannerService.getAllBanners();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banners fetched successfully",
    data: result,
  });
});


const getBannerById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bannerId;
  const result = await BannerService.getBannerById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner fetched successfully",
    data: result,
  });
});

const createBanner = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file;
  const result = await BannerService.createBanner(payload, file);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Banner created successfully",
    data: result,
  });
});


const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bannerId;
  const payload = req.body;
  const file = req.file;
  const result = await BannerService.updateBanner(id, payload, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner updated successfully",
    data: result,
  });
});




const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bannerId;
  const result = await BannerService.deleteBanner(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner deleted successfully",
    data: result,
  });
});


export const BannerController = {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};