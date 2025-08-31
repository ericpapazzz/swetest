import { Router } from "express";
import AnalyticsController from "../controllers/AnalyticsController.js";

const router = Router();

// get user analytics
router.get("/analytics", AnalyticsController.getUserAnalytics);

export default router;