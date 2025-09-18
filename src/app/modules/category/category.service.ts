import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination.type";
import prisma from "../../lib/prisma";
import { ICategory } from "./category.interface";
import { fileUploader } from "../../middlewares/fileUploader";
import { deleteFromS3ByUrl } from "../../lib/deleteFromS3ByUrl";



const getAllCategories = async (
  options: IPaginationOptions & { search?: string; filter?: string }
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { search, filter } = options;

  const whereCondition: any = {};


  if (search) {
    whereCondition.categoryName = {
      contains: search,
      mode: "insensitive",
    };
  }

  const categories = await prisma.category.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip,
    select: {
      id: true,
      categoryName: true,
      imageUrl: true, 
      createdAt: true,
    },
  });

  const totalCategories = await prisma.category.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total: totalCategories,
      totalPages: Math.ceil(totalCategories / limit),
    },
    data: categories,
  };
};


const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      categoryName: true,
      imageUrl: true,
      createdAt: true,
    },
  });
  return category;
};


const createCategoryIntoDB = async (payload: ICategory, file: any) => {
  const categories = await prisma.category.findUnique({
    where: {
      categoryName: payload.categoryName,
    },
  });

  if (categories) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Category already exists with this name"
    );
  } 

  let imageUrl = null;
  if (file) {
    const uploadResult = await fileUploader.uploadToDigitalOcean(file);
    imageUrl = uploadResult.Location;
  }

  const category = await prisma.category.create({
    data: {
      categoryName: payload.categoryName.trim(),
      imageUrl: imageUrl as string,
    },
  });

  return {
    category
};
};


const updateCategory = async (id: string, payload: any, file: any) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  let imageUrl = existingCategory.imageUrl;

  if (file) {
    if (imageUrl) {
      await deleteFromS3ByUrl(existingCategory.imageUrl as string);
    }
    const uploadResult = await fileUploader.uploadToDigitalOcean(file);
    imageUrl = uploadResult.Location;
  }
  const result = await prisma.category.update({
    where: { id },
    data: {
      categoryName: payload.categoryName,
      imageUrl: imageUrl,
    },
  });
  return result;
};


const deleteCategory = async (id: string) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }
  await prisma.category.delete({
    where: { id },
  });
  return;
};



export const CategoryServices = {
    getAllCategories,
    getCategoryById,
    createCategoryIntoDB,
    updateCategory,
    deleteCategory,
}