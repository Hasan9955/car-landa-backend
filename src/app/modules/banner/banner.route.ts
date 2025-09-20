import { Router } from "express";
import { BannerController } from "./banner.controller";
import { fileUploader } from "../../middlewares/fileUploader";
import parseBodyData from "../../middlewares/parseBodyData";


const router = Router();


router.get("/all-banners", BannerController.getAllBanners);

router.get("/:bannerId", BannerController.getBannerById);

router.post("/create-banner",
    fileUploader.uploadBannerImage,
    parseBodyData,
    BannerController.createBanner);

router.put("/:bannerId",
    fileUploader.uploadBannerImage,
    parseBodyData,
    BannerController.updateBanner);

router.delete("/:bannerId", BannerController.deleteBanner);

export const BannerRoutes = router;