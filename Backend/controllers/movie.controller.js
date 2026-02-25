import db from "../config/db.js";

//generate slug
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // special chars remove
    .replace(/\s+/g, "-");      // space → hyphen
};

export default slugify;



//fetch data for detail page
export const getMovieDetail = (req, res) => {
  const { slug } = req.params;

  const movieSql = `
    SELECT 
      m.id,
      m.title,
      m.slug,
      m.description,
      m.language,
      m.rating,
      m.year,
      m.poster,
      m.trailer,
      m.director
    FROM movies m
    WHERE m.slug = ?
  `;

  db.query(movieSql, [slug], (err, movieResult) => {
    if (err) {
      console.error("MOVIE FETCH ERROR ", err);
      return res.status(500).json({ message: "Movie fetch failed" });
    }

    if (movieResult.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movie = movieResult[0];
    const movieId = movie.id;

    //  GENRES
    const genreSql = `
      SELECT g.name 
      FROM genres g
      JOIN movie_genres mg ON mg.genre_id = g.id
      WHERE mg.movie_id = ?
    `;

    //  STARS
    const starSql = `
      SELECT s.name
      FROM stars s
      JOIN movie_stars ms ON ms.star_id = s.id
      WHERE ms.movie_id = ?
    `;

    //  SCREENSHOTS
    const screenshotSql = `
      SELECT image 
      FROM movie_screenshots
      WHERE movie_id = ?
      LIMIT 6
    `;

    db.query(genreSql, [movieId], (err, genres) => {
      if (err) return res.status(500).json({ message: "Genre fetch failed" });

      db.query(starSql, [movieId], (err, stars) => {
        if (err) return res.status(500).json({ message: "Star fetch failed" });

        db.query(screenshotSql, [movieId], (err, screenshots) => {
          if (err)
            return res.status(500).json({ message: "Screenshot fetch failed" });

          return res.json({
            movie,
            genres: genres.map(g => g.name),
            stars: stars.map(s => s.name),
            screenshots: screenshots.map(i => i.image),
          });
        });
      });
    });
  });
};

//search for movies
export const searchMovies = (req, res) => {
const q = req.query.q || req.query.query;

  if (!q) {
    return res.status(400).json({ message: "Search query required" });
  }

  const sql = `
    SELECT DISTINCT m.*
    FROM movies m
    LEFT JOIN movie_genres mg ON mg.movie_id = m.id
    LEFT JOIN genres g ON g.id = mg.genre_id
    LEFT JOIN movie_stars ms ON ms.movie_id = m.id
    LEFT JOIN stars s ON s.id = ms.star_id
    WHERE
      LOWER(m.title) LIKE LOWER(?)
      OR LOWER(g.name) LIKE LOWER(?)
      OR LOWER(s.name) LIKE LOWER(?)
  `;

  const value = `%${q.trim()}%`;

  db.query(sql, [value, value, value], (err, rows) => {
    if (err) {
      console.error("SEARCH ERROR ", err);
      return res.status(500).json({ message: "Search failed" });
    }
    res.json(rows);
  });
};
// get movies for user frontend

export const getAllMoviesFront = (req, res) => {
  const sql = `
    SELECT id, title, year,slug, language, poster
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

    // 🔹 SLUG FUNCTION (same file)
    const generateSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    };

    // CLEAN VALUES
    const titleClean = title?.toString().trim();
    const languageClean = language?.toString().trim();
    const directorClean = director?.toString().trim();
    const descriptionClean = description?.toString().trim();
    const categoryClean = category_id?.toString().trim();
    const yearInt = parseInt(year);
    const ratingFloat = parseFloat(rating);

    // ARRAY CONVERSION
    const genresArray = genres
      ? genres.split(",").map(g => g.trim()).filter(Boolean)
      : [];

    const starsArray = stars
      ? stars.split(",").map(s => s.trim()).filter(Boolean)
      : [];

    const errors = {};

    // VALIDATIONS
    if (!titleClean || titleClean.length < 3 || titleClean.length > 100) {
      errors.title = "Title must be between 3 and 100 characters.";
    }

    if (!languageClean || languageClean.length < 3 || languageClean.length > 20) {
      errors.language = "Language must be between 3 and 20 characters.";
    }

    if (!directorClean || directorClean.length < 3 || directorClean.length > 50) {
      errors.director = "Director must be between 3 and 50 characters.";
    }

    if (!descriptionClean || descriptionClean.length < 10) {
      errors.description = "Description must be at least 10 characters.";
    }

    if (!yearInt || yearInt <= 2000 || yearInt > currentYear) {
      errors.year = `Year must be between 2001 and ${currentYear}.`;
    }

    if (isNaN(ratingFloat) || ratingFloat < 1 || ratingFloat > 10) {
      errors.rating = "Rating must be between 1 and 10.";
    }

    if (!categoryClean) {
      errors.category = "Category is required.";
    }

    if (!genresArray.length) {
      errors.genres = "At least one genre required.";
    }

    if (!starsArray.length) {
      errors.stars = "At least one star required.";
    }

    if (!req.files?.poster) {
      errors.poster = "Poster is required.";
    }

    if (!req.files?.screenshots || req.files.screenshots.length === 0) {
      errors.screenshots = "At least one screenshot is required.";
    }

    //for youtube trailer link 
    // if (!trailer || !/^https?:\/\/.+/.test(trailer)) {
    //   errors.trailer = "Valid trailer URL is required";
    // }

    
    if (!trailer || trailer.length < 10) {
      errors.trailer = "Valid trailer URL is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // POSTER PATH
    const posterPath = `/uploads/posters/${req.files.poster[0].filename}`;

    // 🔹 SLUG GENERATE
    let slug = generateSlug(titleClean);

    // 🔹 CHECK DUPLICATE SLUG
    const checkSlugSql = "SELECT id FROM movies WHERE slug = ?";

    db.query(checkSlugSql, [slug], (err, slugResult) => {
      if (err) {
        console.error("SLUG CHECK ERROR ", err);
        return res.status(500).json({ message: "Slug check failed" });
      }

      if (slugResult.length > 0) {
        slug = `${slug}-${yearInt}`;
      }

      // 🔹 INSERT MOVIE
      const movieSql = `
        INSERT INTO movies
        (title, slug, description, language, \`year\`, category_id, rating, poster, director, admin_id, trailer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const movieValues = [
        titleClean,
        slug,
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
          console.error("MOVIE INSERT ERROR ", err);
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
            slug,
          });
        } catch (err) {
          console.error("RELATION ERROR ", err);
          return res.status(500).json({ message: "Relation mapping failed" });
        }
      });
    });

  } catch (error) {
    console.error("ADD MOVIE ERROR ", error);
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

