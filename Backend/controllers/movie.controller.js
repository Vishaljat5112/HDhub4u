import db from "../config/db.js";




export const getAllMovies = (req, res) => {
  const sql = `
    SELECT id, title, poster, year, rating
    FROM movies
    ORDER BY id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("❌ GET MOVIES ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch movies" });
    }

    res.json(rows);
  });
};



export const addMovie = (req, res) => {
  console.log("🎬 ADD MOVIE API HIT");

  try {
    console.log("RAW BODY 👉", req.body);
    console.log("FILES 👉", req.files);

    const {
      title,
      description,
      language,
      year,
      category,
      rating,
      director,
      genres,
      stars,
    } = req.body;

    // 🔹 CLEAN VALUES
    const titleClean = title?.toString().trim();
    const categoryClean = category?.toString().trim();
    const yearInt = parseInt(year);
    const ratingFloat = rating && !isNaN(parseFloat(rating))
      ? parseFloat(rating)
      : null;

    if (!titleClean || !categoryClean || !yearInt || !language || !director) {
      return res.status(400).json({
        message: "Required fields missing",
        debug: { title, category, year, language, director },
      });
    }

    const currentYear = new Date().getFullYear();

    if (yearInt > currentYear) {
      return res.status(400).json({
        message: `Invalid year. Max allowed year is ${currentYear}`,
      });
    }

    // 🔹 Poster
    const posterPath = req.files?.poster
      ? `/uploads/posters/${req.files.poster[0].filename}`
      : null;

    // 🔹 Parse genres & stars
    let genresArray = [];
    let starsArray = [];

    if (genres) genresArray = JSON.parse(genres);
    if (stars) starsArray = JSON.parse(stars);

    // 🔹 INSERT MOVIE
    const movieSql = `
      INSERT INTO movies
      (title, description, language, year, category, rating, poster, director, admin_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;



    const movieValues = [
      titleClean,
      description || null,
      language || null,
      yearInt,
      categoryClean,
      ratingFloat,
      posterPath,
      director || null,
      req.admin.id,
    ];

    db.query(movieSql, movieValues, async (err, result) => {
      if (err) {
        console.error("❌ MOVIE INSERT ERROR:", err);
        return res.status(500).json({ message: "Movie insert failed" });
      }

      const movieId = result.insertId;
      console.log("✅ Movie ID:", movieId);

      try {
        await handleGenres(movieId, genresArray);
        await handleStars(movieId, starsArray);
        await handleScreenshots(movieId, req.files?.screenshots);


        return res.status(201).json({
          message: "Movie + genres + stars added successfully",
          movieId,
        });
      } catch (err) {
        console.error("❌ RELATION ERROR:", err);
        return res.status(500).json({ message: "Relation mapping failed" });
      }
    });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= HELPERS ================= */

const handleGenres = (movieId, genres) => {
  return new Promise((resolve, reject) => {
    if (!genres || genres.length === 0) return resolve();

    let done = 0;

    genres.forEach((genre) => {
      const name = genre.trim();

      db.query("SELECT id FROM genres WHERE name = ?", [name], (err, rows) => {
        if (err) return reject(err);

        const map = (genreId) => {
          db.query(
            "INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)",
            [movieId, genreId],
            (err) => {
              if (err) return reject(err);
              if (++done === genres.length) resolve();
            }
          );
        };

        if (rows.length) {
          map(rows[0].id);
        } else {
          db.query(
            "INSERT INTO genres (name) VALUES (?)",
            [name],
            (err, result) => {
              if (err) return reject(err);
              map(result.insertId);
            }
          );
        }
      });
    });
  });
};

const handleStars = (movieId, stars) => {
  return new Promise((resolve, reject) => {
    if (!stars || stars.length === 0) return resolve();

    let done = 0;

    stars.forEach((star) => {
      const name = star.trim();

      db.query("SELECT id FROM stars WHERE name = ?", [name], (err, rows) => {
        if (err) return reject(err);

        const map = (starId) => {
          db.query(
            "INSERT INTO movie_stars (movie_id, star_id) VALUES (?, ?)",
            [movieId, starId],
            (err) => {
              if (err) return reject(err);
              if (++done === stars.length) resolve();
            }
          );
        };

        if (rows.length) {
          map(rows[0].id);
        } else {
          db.query(
            "INSERT INTO stars (name) VALUES (?)",
            [name],
            (err, result) => {
              if (err) return reject(err);
              map(result.insertId);
            }
          );
        }
      });
    });
  });
};


const handleScreenshots = (movieId, files) => {
  return new Promise((resolve, reject) => {
    if (!files || files.length === 0) return resolve();

    let done = 0;

    files.forEach((file) => {
      const imagePath = `/uploads/screenshots/${file.filename}`;

      const sql =
        "INSERT INTO movie_screenshots (movie_id, image) VALUES (?, ?)";

      db.query(sql, [movieId, imagePath], (err) => {
        if (err) return reject(err);

        done++;
        if (done === files.length) resolve();
      });
    });
  });
};
