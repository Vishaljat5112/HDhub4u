import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

// DB
import "./config/db.js";

// ROUTES
import adminRoutes from "./routes/admin.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

/* ======================
   MIDDLEWARES
   ====================== */
app.use(cors());
app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ======================
   ROUTES
   ====================== */

// 🔐 ADMIN ROUTES (TOKEN REQUIRED)
app.use("/api/admin", adminRoutes);
app.use("/api/admin/movies", movieRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

// 🌍 PUBLIC / USER ROUTES (NO TOKEN)
app.use("/api/movies", movieRoutes);
app.use("/api/user/categories", categoryRoutes);

/* ======================
   ROOT CHECK
   ====================== */
app.get("/", (req, res) => {
  res.send("HDHub4u Backend Running");
});

/* ======================
   SERVER START
   ====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});