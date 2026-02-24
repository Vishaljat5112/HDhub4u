import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getDashboardStats,
  getLatestMovies,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", authMiddleware, getDashboardStats);
router.get("/latest-movies", authMiddleware, getLatestMovies);

export default router;