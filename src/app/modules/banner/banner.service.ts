import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import prisma from "../../lib/prisma";
import { fileUploader } from "../../middlewares/fileUploader";
import { deleteFromS3ByUrl } from "../../lib/deleteFromS3ByUrl";




const getAllBanners = async () => { 

    const banners = await prisma.banner.findMany();
    return banners; 

};

const getBannerById = async (bannerId: string) => {

    const banner = await prisma.banner.findUnique({
        where: { id: bannerId }
    });
    return banner;
};

const createBanner = async (data: { bannerImage: string; link?: string; isActive?: boolean }, file: any) => {
    
  let bannerImage: string = data.bannerImage || "";
  if (file) {
    const uploadResult = await fileUploader.uploadToDigitalOcean(file);
    bannerImage = uploadResult.Location;
  }

  const banner = await prisma.banner.create({
      data: {
          ...data,
          bannerImage
      }
  });
  return banner;
};

const updateBanner = async (id: string, data: { bannerImage?: string; link?: string; isActive?: boolean }, file: any) => {
const existingBanner = await prisma.banner.findUnique({
    where: { id },
  });

  if (!existingBanner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }

  let bannerImage = existingBanner.bannerImage;

  if (file) {
    if (bannerImage) {
      await deleteFromS3ByUrl(existingBanner.bannerImage as string);
    }
    const uploadResult = await fileUploader.uploadToDigitalOcean(file);
    bannerImage = uploadResult.Location;
  }
  const result = await prisma.banner.update({
    where: { id },
    data: {
      bannerImage,
      link: data.link,
      isActive: data.isActive,
    },
  });
  return result;
};


const deleteBanner = async (bannerId: string) => {
    const banner = await prisma.banner.delete({
        where: { id: bannerId }
    });
    return banner;
}

export const BannerService = {
    getAllBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner
};