import db from "../config/db.js";

export const getDashboardStats = (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalMovies FROM movies", (err, movieResult) => {
    if (err) return res.status(500).json({ message: "Movies count failed" });

    stats.totalMovies = movieResult[0].totalMovies;

    db.query(
      "SELECT COUNT(*) AS totalCategories FROM categories",
      (err, catResult) => {
        if (err)
          return res.status(500).json({ message: "Category count failed" });

        stats.totalCategories = catResult[0].totalCategories;

        res.json(stats);
      }
    );
  });
};


export const getLatestMovies = (req, res) => {
  const limit = Number(req.query.limit) || 6;

  const sql = `
    SELECT id, title, poster, year, rating
    FROM movies
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("LATEST MOVIES ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch movies" });
    }

    res.json(rows);
  });
};