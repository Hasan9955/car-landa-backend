import { Router } from "express";
import { BannerController } from "./banner.controller";


const router = Router();


router.get("/all-banners", BannerController.getAllBanners);

router.get("/:bannerId", BannerController.getBannerById);

router.post("/create-banner", BannerController.createBanner);

router.put("/:bannerId", BannerController.updateBanner);

router.delete("/:bannerId", BannerController.deleteBanner);

export const BannerRoutes = router;