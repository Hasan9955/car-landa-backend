import { Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";
import { BrandService } from "./brand.service";
import sendResponse from "../../helpers/sendResponse";
import httpStatus from "http-status";



const getAllBrands = catchAsync(async (req: Request, res: Response) => {
    const options = req.query;
    const result = await BrandService.getAllBrands(options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brands fetched successfully",
        data: result,
    });
});



const getBrandById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.brandId;
    const result = await BrandService.getBrandById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand fetched successfully",
        data: result,
    });
});

const createBrandIntoDB = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const file = req.file;
    console.log({payload}, {file});
    const result = await BrandService.createBrandIntoDB(payload, file);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Brand created successfully",
        data: result,
    });
});

const updateBrand = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.brandId;
    const payload = req.body;
    const file = req.file;
    const result = await BrandService.updateBrand(id, payload, file);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand updated successfully",
        data: result,
    });
});


const deleteBrand = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.brandId;
    await BrandService.deleteBrand(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand deleted successfully",
        data: null,
    });
});


export const BrandController = {
    getAllBrands,
    getBrandById,
    createBrandIntoDB,
    updateBrand,
    deleteBrand,
};

