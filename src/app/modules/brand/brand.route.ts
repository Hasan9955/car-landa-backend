import { Router } from "express";
import { BrandController } from "./brand.controller";



const router = Router();


router.get("/all-brands", BrandController.getAllBrands);

router.get("/:brandId", BrandController.getBrandById);

router.post("/create-brand", BrandController.createBrandIntoDB);

router.put("/:brandId", BrandController.updateBrand);

router.delete("/:brandId", BrandController.deleteBrand);


export const BrandRoutes = router;