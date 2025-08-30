import { Router, type Request, type Response } from "express";
import BaseRoutes from "./base/BaseRouter.js";

const router = Router();

class HealthRoute extends BaseRoutes{
    public routes(): void{

        // api connectivity check endpoint
        this.router.get("/health", (req: Request, res: Response) => {
        res.status(200).json({
        status: "OK",
        message: "API is running successfully",
        timestamp: new Date().toISOString(),
        });
    });
    }
}

export default new HealthRoute().router;