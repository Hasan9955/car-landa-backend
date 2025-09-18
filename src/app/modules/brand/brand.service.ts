import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination.type";
import prisma from "../../lib/prisma";
import { ICategory } from "../category/category.interface";
import { fileUploader } from "../../middlewares/fileUploader";
import { deleteFromS3ByUrl } from "../../lib/deleteFromS3ByUrl";
import { IBrand } from "./brand.interface";


const getAllBrands =  async (
  options: IPaginationOptions & { search?: string; filter?: string }
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { search, filter } = options;

  const whereCondition: any = {};


  if (search) {
    whereCondition.brandName = {
      contains: search,
      mode: "insensitive",
    };
  }

  const brands = await prisma.brand.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip,
    select: {
      id: true,
      brandName: true,
      brandLogo: true,
      createdAt: true,
    },
  });

  const totalBrands = await prisma.brand.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total: totalBrands,
      totalPages: Math.ceil(totalBrands / limit),
    },
    data: brands,
  };
};

const getBrandById = async (id: string) => {
  const brand = await prisma.brand.findUnique({
    where: { id } 
  });
  return brand;
};


const createBrandIntoDB = async (payload: IBrand, file: any) => {
  const brands = await prisma.brand.findUnique({
    where: {
      brandName: payload.brandName,
    },
  });

  if (brands) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Brand already exists with this name"
    );
  } 

  let imageUrl = null;
  if (file) {
    const uploadResult = await fileUploader.uploadToDigitalOcean(file);
    imageUrl = uploadResult.Location;
  }

  const brand = await prisma.brand.create({
    data: {
      brandName: payload.brandName.trim(),
      brandLogo: imageUrl as string,
    },
  });

  return {
    brand
};
};



const updateBrand = async (id: string, payload: any, file: any) => {
  const existingBrand = await prisma.brand.findUnique({
    where: { id },
  });

  if (!existingBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
  }

  let imageUrl = existingBrand.brandLogo;

  if (file) {
    if (imageUrl) {
      await deleteFromS3ByUrl(existingBrand.brandLogo as string);
    }
    const uploadResult = await fileUploader.uploadToDigitalOcean(file);
    imageUrl = uploadResult.Location;
  }
  const result = await prisma.brand.update({
    where: { id },
    data: {
      brandName: payload.brandName,
      brandLogo: imageUrl,
    },
  });
  return result;
};


const deleteBrand = async (id: string) => {
  const existingBrand = await prisma.brand.findUnique({
    where: { id },
  });

  if (!existingBrand) {
    throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
  }
  await prisma.brand.delete({
    where: { id },
  });
  return;
};


export const BrandService = {
  getAllBrands,
  getBrandById,
  createBrandIntoDB,
  updateBrand,
  deleteBrand,
};


