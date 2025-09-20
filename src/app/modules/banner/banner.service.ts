import prisma from "../../lib/prisma";




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

const createBanner = async (data: { imageUrl: string; link?: string; isActive?: boolean }) => {
    const banner = await prisma.banner.create({
        data
    });
    return banner;
};

const updateBanner = async (bannerId: string, data: { imageUrl?: string; link?: string; isActive?: boolean }) => {
    const banner = await prisma.banner.update({
        where: { id: bannerId },
        data
    });
    return banner;
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