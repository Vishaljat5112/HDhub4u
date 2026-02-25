import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import adminAuth from "../middleware/auth.middleware.js";

import {
  addMovie,
  getAllMovies,
  deleteMovie,
  editMovie,
  getSliderMovies,
  getAllMoviesFront,
  searchMovies,
  getMovieDetail
} from "../controllers/movie.controller.js";

const router = express.Router();


// get movies for users (grid)
router.get("/front", getAllMoviesFront);

// get slider movies
router.get("/slider", getSliderMovies);

// search movies
router.get("/search", searchMovies);

// movie detail page (slug)   LAST
router.get("/:slug", getMovieDetail);



// add movie
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "screenshots", maxCount: 6 },
  ]),
  addMovie
);

// get all movies (admin)
router.get("/", adminAuth, getAllMovies);

// edit movie
router.patch(
  "/:id",
  adminAuth,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "screenshots", maxCount: 6 },
  ]),
  editMovie
);

// delete movie
router.delete("/:id", authMiddleware, deleteMovie);

export default router;