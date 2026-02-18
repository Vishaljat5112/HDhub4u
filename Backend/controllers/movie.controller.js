import db from "../config/db.js";


// get movies for user frontend

export const getAllMoviesFront = (req, res) => {
  const sql = `
    SELECT id, title, year, language, poster
    FROM movies
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Get movies error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch movies",
      });
    }

    res.status(200).json({
      success: true,
      movies: result,
    });
  });
};


export const getSliderMovies = (req, res) => {
  const sql = `
    SELECT id, title, poster, rating
    FROM movies
    ORDER BY id DESC
    LIMIT 15
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch slider movies",
      });
    }

    res.status(200).json({
      success: true,
      movies: result,
    });
  });
};


















const dbQuery = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const deleteMovie = (req, res) => {
  const movieId = req.params.id;
  if (!movieId) {
    return res.status(400).json({ message: "Movie ID required" });
  }

  const sql = "DELETE FROM movies WHERE id = ?";

  db.query(sql, [movieId], (err, result) => {
    if (err) {
      console.error("DELETE MOVIE ERROR:", err);
      return res.status(500).json({ message: "Failed to delete movie" });
    }
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted successfully" });
  });

};




export const getAllMovies = (req, res) => {
  const sql = `
    SELECT 
      movies.id,
      movies.title,
      movies.poster,
      movies.year,
      movies.rating,
      movies.category_id,
      categories.name AS category_name
    FROM movies
    LEFT JOIN categories 
      ON movies.category_id = categories.id
    ORDER BY movies.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("GET MOVIES ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch movies" });
    }

    res.json(rows);
  });
};


export const editMovie = (req, res) => {


  try {
    const movieId = req.params.id;



    const {
      title,
      description,
      language,
      year,
      category_id,
      rating,
      director,
      genres,
      stars,
      trailer,
    } = req.body;

    const currentYear = new Date().getFullYear();
    const categoryIdClean =
      category_id && category_id !== ""
        ? parseInt(category_id)
        : null;

    const errors = {};

    //  PATCH = sirf jo aaye wahi validate
    if (title && (title.trim().length < 3 || title.trim().length > 10))
      errors.title = "Title must be 3–10 characters";

    if (language && (language.trim().length < 3 || language.trim().length > 10))
      errors.language = "Language must be 3–10 characters";

    if (director && (director.trim().length < 3 || director.trim().length > 10))
      errors.director = "Director must be 3–10 characters";

    if (
      description &&
      (description.trim().length < 10 || description.trim().length > 50)
    )
      errors.description = "Description must be 10–50 characters";

    if (year) {
      const y = parseInt(year);
      if (y <= 2000 || y > currentYear) errors.year = "Invalid year";
    }

    if (rating) {
      const r = parseFloat(rating);
      if (r < 1 || r > 10) errors.rating = "Invalid rating";
    }

    if (trailer && !/^https?:\/\/.+/.test(trailer))
      errors.trailer = "Invalid trailer URL";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    //  Get old movie
    db.query(
      "SELECT poster FROM movies WHERE id = ?",
      [movieId],
      (err, rows) => {
        if (err || rows.length === 0) {
          return res.status(404).json({ message: "Movie not found" });
        }

        const oldPoster = rows[0].poster;

        const posterPath = req.files?.poster
          ? `/uploads/posters/${req.files.poster[0].filename}`
          : oldPoster;

        const updateSql = `
          UPDATE movies SET
            title = COALESCE(?, title),
            description = COALESCE(?, description),
            language = COALESCE(?, language),
            year = COALESCE(?, year),
            category_id = COALESCE(?, category_id),
            rating = COALESCE(?, rating),
            poster = ?,
            director = COALESCE(?, director),
            trailer = COALESCE(?, trailer)
          WHERE id = ?
        `;

        const values = [
          title || null,
          description || null,
          language || null,
          year || null,
          categoryIdClean,
          rating || null,
          posterPath,
          director || null,
          trailer || null,
          movieId,
        ];

        db.query(updateSql, values, async (err) => {
          if (err) {
            console.error("SQL UPDATE ERROR ", err);
            return res.status(500).json({
              message: err.sqlMessage || err.message || "Update failed",
            });
          }

          // Relations (optional)
          if (genres) await handleGenres(movieId, JSON.parse(genres), true);
          if (stars) await handleStars(movieId, JSON.parse(stars), true);
          if (req.files?.screenshots)
            await handleScreenshots(movieId, req.files.screenshots, true);

          return res.json({ message: "Movie updated successfully" });
        });
      }
    );
  } catch (error) {
    console.error("EDIT MOVIE ERROR ", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const addMovie = (req, res) => {
  try {
    const {
      title,
      description,
      language,
      year,
      category_id,
      rating,
      director,
      genres,
      stars,
      trailer,
    } = req.body;

    const currentYear = new Date().getFullYear();

    // CLEAN VALUES
    const titleClean = title?.toString().trim();
    const languageClean = language?.toString().trim();
    const directorClean = director?.toString().trim();
    const descriptionClean = description?.toString().trim();
    const categoryClean = category_id?.toString().trim();
    const yearInt = parseInt(year);
    const ratingFloat = parseFloat(rating);

    let genresArray = [];
    let starsArray = [];

    if (genres) genresArray = JSON.parse(genres);
    if (stars) starsArray = JSON.parse(stars);

    const errors = {};

    // TITLE (3–10)
    if (!titleClean || titleClean.length < 3 || titleClean.length > 10) {
      errors.title = "Title must be between 3 and 10 characters.";
    }

    // LANGUAGE (3–10)
    if (!languageClean || languageClean.length < 3 || languageClean.length > 10) {
      errors.language = "Language must be between 3 and 10 characters.";
    }

    // DIRECTOR (3–10)
    if (!directorClean || directorClean.length < 3 || directorClean.length > 10) {
      errors.director = "Director must be between 3 and 10 characters.";
    }

    // DESCRIPTION (10–50)
    if (!descriptionClean || descriptionClean.length < 10 || descriptionClean.length > 50) {
      errors.description = "Description must be between 10 and 50 characters.";
    }

    // YEAR (2001–current)
    if (!yearInt || yearInt <= 2000 || yearInt > currentYear) {
      errors.year = `Year must be between 2001 and ${currentYear}.`;
    }

    // RATING (1–10)
    if (isNaN(ratingFloat) || ratingFloat < 1 || ratingFloat > 10) {
      errors.rating = "Rating must be between 1 and 10.";
    }

    // CATEGORY
    if (!categoryClean) {
      errors.category = "Category is required.";
    }

    // GENRES (3–10 each item)
    if (!genresArray.length) {
      errors.genres = "At least one genre required.";
    } else {
      for (let g of genresArray) {
        if (g.trim().length < 3 || g.trim().length > 10) {
          errors.genres = "Each genre must be between 3 and 10 characters.";
          break;
        }
      }
    }

    // STARS (3–30 each item)
    if (!starsArray.length) {
      errors.stars = "At least one star required.";
    } else {
      for (let s of starsArray) {
        if (s.trim().length < 3 || s.trim().length > 30) {
          errors.stars = "Each star must be between 3 and 30 characters.";
          break;
        }
      }
    }

    // POSTER REQUIRED
    if (!req.files?.poster) {
      errors.poster = "Poster is required.";
    }

    // SCREENSHOTS REQUIRED
    if (!req.files?.screenshots || req.files.screenshots.length === 0) {
      errors.screenshots = "At least one screenshot is required.";
    }

    // TRAILER REQUIRED
    if (!trailer || !/^https?:\/\/.+/.test(trailer)) {
      errors.trailer = "Valid trailer URL is required"

    }

    // IF ANY ERROR → STOP HERE
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // POSTER PATH
    const posterPath = `/uploads/posters/${req.files.poster[0].filename}`;

    // INSERT MOVIE
    const movieSql = `
      INSERT INTO movies
      (title, description, language, year, category_id, rating, poster, director, admin_id, trailer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const movieValues = [
      titleClean,
      descriptionClean,
      languageClean,
      yearInt,
      categoryClean,
      ratingFloat,
      posterPath,
      directorClean,
      req.admin.id,
      trailer,
    ];

    db.query(movieSql, movieValues, async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Movie insert failed" });
      }

      const movieId = result.insertId;

      try {
        await handleGenres(movieId, genresArray);
        await handleStars(movieId, starsArray);
        await handleScreenshots(movieId, req.files.screenshots);

        return res.status(201).json({
          message: "Movie added successfully",
          movieId,
        });
      } catch (err) {
        return res.status(500).json({ message: "Relation mapping failed" });
      }
    });

  } catch (error) {
    console.error("ADD MOVIE ERROR 👉", error);
    return res.status(500).json({
      message: error.message || "Server error"
    });
  }
};


/*  HELPERS */

const handleGenres = async (movieId, genres) => {
  if (!genres || genres.length === 0) return;

  for (const genre of genres) {
    const name = genre.trim();

    // Check if genre exists
    const rows = await dbQuery(
      "SELECT id FROM genres WHERE name = ?",
      [name]
    );

    let genreId;

    if (rows.length) {
      genreId = rows[0].id;
    } else {
      const result = await dbQuery(
        "INSERT INTO genres (name) VALUES (?)",
        [name]
      );
      genreId = result.insertId;
    }

    // Map genre to movie
    await dbQuery(
      "INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)",
      [movieId, genreId]
    );
  }
};

const handleStars = async (movieId, stars) => {
  if (!stars || stars.length === 0) return;

  for (const star of stars) {
    const name = star.trim();

    // Check if star exists
    const rows = await dbQuery(
      "SELECT id FROM stars WHERE name = ?",
      [name]
    );

    let starId;

    if (rows.length) {
      starId = rows[0].id;
    } else {
      const result = await dbQuery(
        "INSERT INTO stars (name) VALUES (?)",
        [name]
      );
      starId = result.insertId;
    }

    // Map star to movie
    await dbQuery(
      "INSERT INTO movie_stars (movie_id, star_id) VALUES (?, ?)",
      [movieId, starId]
    );
  }
};



const handleScreenshots = async (movieId, files) => {
  if (!files || files.length === 0) return;

  for (const file of files) {
    const imagePath = `/uploads/screenshots/${file.filename}`;

    await dbQuery(
      "INSERT INTO movie_screenshots (movie_id, image) VALUES (?, ?)",
      [movieId, imagePath]
    );
  }
};

