import { Router } from "express";
import BaseRoutes from "./base/BaseRouter.js";
import UserController from "../controllers/UserController.js";

const router = Router();

class UserRoutes extends BaseRoutes{
    public routes(): void{

        // create a new user
        router.post("/createUser", UserController.create);

        // get all users
        router.get("/users", UserController.findAll);

        // get user by ID
        router.get("/userById/:id", UserController.findById);

        // update user by ID
        router.put("/updateUser/:id", UserController.update);

        // delete user by ID
        router.delete("/deleteUser/:id", UserController.delete);
    }
}

export default new UserRoutes().router;