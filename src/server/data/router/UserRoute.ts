import { Router } from "express";
import BaseRoutes from "./base/BaseRouter.js";
import UserController from "../controllers/UserController.js";

const router = Router();

class UserRoutes extends BaseRoutes{
    public routes(): void{

        // create a new user
        this.router.post("/createUser", UserController.create);

        // get all users
        this.router.get("/users", UserController.findAll);

        // get user by ID
        this.router.get("/userById/:id", UserController.findById);

        // update user by ID
        this.router.put("/updateUser/:id", UserController.update);

        // delete user by ID
        this.router.delete("/deleteUser/:id", UserController.delete);
    }
}

export default new UserRoutes().router;