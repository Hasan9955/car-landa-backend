import { Router } from "express";


const router = Router();



router.get("/all-cars");

router.get("/:carId");

router.post("/create-car");

router.put("/:carId");

router.delete("/:carId");




export const CarRoutes = router;






