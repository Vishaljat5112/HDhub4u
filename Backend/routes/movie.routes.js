import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { addMovie } from "../controllers/movie.controller.js";
import { getAllMovies } from "../controllers/movie.controller.js";
import adminAuth from "../middleware/auth.middleware.js";
import { deleteMovie } from "../controllers/movie.controller.js";
import { editMovie } from "../controllers/movie.controller.js";
import { getSliderMovies } from "../controllers/movie.controller.js";
import { getAllMoviesFront } from "../controllers/movie.controller.js";
const router = express.Router();

//get movies for users
router.get("/front", getAllMoviesFront);

//get slider
router.get("/slider", getSliderMovies);


//edit movie
router.patch(
  "/:id",
  adminAuth,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "screenshots", maxCount: 6 },
  ]),
  editMovie
);


//  ADD MOVIE ROUTE
router.post(
  "/",   //addmovie
  authMiddleware,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "screenshots", maxCount: 6 },
  ]),
  addMovie
);

// GET MOVIE ROUTE
router.get("/", adminAuth, getAllMovies);

// DELETE MOVIE ROUTE
router.delete("/:id", authMiddleware, deleteMovie);


export default router;
