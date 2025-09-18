import httpStatus from "http-status";
import catchAsync from "../../helpers/catchAsync";
import sendResponse from "../../helpers/sendResponse";
import { CategoryServices } from "./category.service";
import { Request, Response } from "express";



const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const options = req.query;
  const result = await CategoryServices.getAllCategories(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
});


const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId;
  const result = await CategoryServices.getCategoryById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category fetched successfully",
    data: result,
    });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file;
  const result = await CategoryServices.createCategoryIntoDB(payload, file);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId;
  const payload = req.body;
  const file = req.file;
  const result = await CategoryServices.updateCategory(id, payload, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});


const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId;
  await CategoryServices.deleteCategory(id);
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully",
    data: null,
  });
});


export const CategoryController = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

