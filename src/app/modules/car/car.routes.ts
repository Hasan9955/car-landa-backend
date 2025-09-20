import { Router } from "express";
import { CarController } from "./car.controller";
import { fileUploader } from "../../middlewares/fileUploader";
import parseBodyData from "../../middlewares/parseBodyData";


const router = Router();



router.get("/all-cars", CarController.getAllCars);

router.get("/:carId", CarController.getCarById);

router.post("/create-car",
    fileUploader.uploadMultipleImage,
    parseBodyData,
    CarController.createCar);

router.put("/:carId",
    fileUploader.uploadMultipleImage,
    parseBodyData,
    CarController.updateCar);

router.delete("/:carId", CarController.deleteCar);




export const CarRoutes = router;






