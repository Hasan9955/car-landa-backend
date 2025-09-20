import { Router } from "express";
import { CarController } from "./car.controller";


const router = Router();



router.get("/all-cars", CarController.getAllCars);

router.get("/:carId", CarController.getCarById);

router.post("/create-car", CarController.createCar);

router.put("/:carId", CarController.updateCar);

router.delete("/:carId", CarController.deleteCar);




export const CarRoutes = router;






