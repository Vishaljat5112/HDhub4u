import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getAllCategories } from "../controllers/category.controller.js";
import { addCategory } from "../controllers/category.controller.js";
const router = express.Router();

//add new category
router.post("/add", authMiddleware, addCategory);
//get categories
router.get("/", authMiddleware, getAllCategories);

export default router;