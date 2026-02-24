import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getAllCategories } from "../controllers/category.controller.js";
import { addCategory } from "../controllers/category.controller.js";

import { updateCategory } from "../controllers/category.controller.js";
import { deleteCategory } from "../controllers/category.controller.js";
import { getNavbarCategories } from "../controllers/user/category.controller.js";
import { getMoviesByCategorySlug } from "../controllers/user/category.controller.js";

const router = express.Router();
// router.get("/categories",authMiddleware,  getAllCategories);
// router.post("/categories", authMiddleware, addCategory);


// update category
router.put("/edit/:id",authMiddleware, updateCategory);
//delete category
router.delete("/delete/:id",authMiddleware, deleteCategory);
//add new category
router.post("/add", authMiddleware, addCategory);
//get categories
router.get("/", authMiddleware, getAllCategories);

//get categories in navbar
router.get("/navbar", getNavbarCategories);
//get category by slug
router.get("/:slug", getMoviesByCategorySlug);

export default router;