
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import "./config/db.js"; 
import adminRoutes from "./routes/admin.routes.js";
import movieRoutes from "./routes/movie.routes.js";






const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
console.log("Admin routes loaded");

app.use("/uploads", express.static("uploads"));
app.use("/api/admin/movies", movieRoutes);


// app.use("/api", movieRoutes);


app.get("/", (req, res) => {
  res.send("HDHub4u Admin Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
