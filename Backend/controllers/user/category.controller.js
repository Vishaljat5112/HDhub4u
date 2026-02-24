//for navbar of user page
import db from "../../config/db.js";


// controllers/user/category.controller.js
export const getMoviesByCategorySlug = (req, res) => {
  console.log("CATEGORY ROUTE HIT", req.params.slug);
  const { slug } = req.params;

  // 1️ Slug se category nikaalo
  const categorySql = `
    SELECT id, name
    FROM categories
    WHERE slug = ? AND is_active = 1
    LIMIT 1
  `;

  db.query(categorySql, [slug], (err, categoryRows) => {
    if (err) {
      return res.status(500).json({ message: "Category fetch failed" });
    }

    if (categoryRows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const category = categoryRows[0];

    // Us category ki movies lao (🔥 slug added)
    const moviesSql = `
      SELECT 
        id,
        title,
        slug,
        poster,
        year,
        language,
        rating
      FROM movies
      WHERE category_id = ?
      ORDER BY created_at DESC
    `;

    db.query(moviesSql, [category.id], (err, movies) => {
      if (err) {
        console.error("MOVIES QUERY ERROR ", err);
        return res.status(500).json({ message: "Movies fetch failed" });
      }

      res.json({
        category: category.name,
        movies,
      });
    });
  });
};





export const getNavbarCategories = (req, res) => {
  const sql = `
    SELECT id, name, slug
    FROM categories
    WHERE is_active = 1 AND slug IS NOT NULL
    ORDER BY priority ASC
    LIMIT 6
  `;

  db.query(sql, (err, rows) => {
    if (err) {
         console.error("NAVBAR CATEGORY ERROR 👉", err); 
      return res.status(500).json({ message: "Failed to fetch categories" });
    }
    res.json(rows);
  });
};