import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { addMovie } from "../controllers/movie.controller.js";
import { getAllMovies } from "../controllers/movie.controller.js";
import adminAuth from "../middleware/auth.middleware.js";

const router = express.Router();

//  ADD MOVIE ROUTE
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "screenshots", maxCount: 6 },
  ]),
  addMovie
);

// GET MOVIE ROUTE
router.get("/", adminAuth, getAllMovies);

export default router;
