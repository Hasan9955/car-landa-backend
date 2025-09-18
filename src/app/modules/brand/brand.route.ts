import { Router } from "express";
import { BrandController } from "./brand.controller";
import parseBodyData from "../../middlewares/parseBodyData";
import { fileUploader } from "../../middlewares/fileUploader";



const router = Router();


router.get("/all-brands", BrandController.getAllBrands);

router.get("/:brandId", BrandController.getBrandById);

router.post("/create-brand", 
    fileUploader.uploadBrandLogo, 
    parseBodyData, 
    BrandController.createBrandIntoDB
);

router.put("/:brandId", 
    fileUploader.uploadBrandLogo, 
    parseBodyData,
    BrandController.updateBrand);

router.delete("/:brandId", BrandController.deleteBrand);


export const BrandRoutes = router;