import express from "express";
import { AuthRouters } from "../modules/auth/auth.routes";
import { UserRouters } from "../modules/user/user.routes";
import { CarRoutes } from "../modules/car/car.routes";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouters,
  },
  {
    path: "/users",
    route: UserRouters,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
