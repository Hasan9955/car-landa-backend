import { Router } from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { createCategorySchema, updateCategorySchema } from "./category.validation";
import { fileUploader } from "../../middlewares/fileUploader";
import { parse } from "path";
import parseBodyData from "../../middlewares/parseBodyData";


const router = Router();

router.get("/all-categories", CategoryController.getAllCategories);

router.get("/:categoryId", CategoryController.getCategoryById);

router.post("/create-category",
    // auth(UserRole.RESTRICTED_ADMIN, UserRole.STANDARD_ADMIN, UserRole.SUPER_ADMIN),
    fileUploader.uploadCategoryImage,
    parseBodyData,
    // validateRequest(createCategorySchema),
    CategoryController.createCategory);

router.put("/:categoryId",
    // auth(UserRole.RESTRICTED_ADMIN, UserRole.STANDARD_ADMIN, UserRole.SUPER_ADMIN),
    fileUploader.uploadCategoryImage,
    parseBodyData,
    validateRequest(updateCategorySchema),
    CategoryController.updateCategory);

router.delete("/:categoryId", 
    // auth(UserRole.RESTRICTED_ADMIN, UserRole.STANDARD_ADMIN, UserRole.SUPER_ADMIN),
    CategoryController.deleteCategory);

export const CategoryRoutes = router;