import { Router } from "express";



const router = Router();

router.get("/all-categories");
router.get("/:categoryId");
router.post("/create-category");
router.put("/:categoryId");
router.delete("/:categoryId");

export const CategoryRoutes = router;