import { useEffect, useState, } from "react";
import toast from "react-hot-toast";
import AddCategory from "../components/admin/AddCategory.jsx"
import Modal from "../components/common/modal.jsx";
import axios from "axios";
import axiosInstance from "../services/axiosInstance.js";

function AddMovieForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "",
    year: "",
    category_id: "",
    rating: "",
    director: "",
    trailer: "",
  });

  const [categories, setCategories] = useState([]);
  const [posterPreview, setPosterPreview] = useState(null);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  const [catOpen, setCatOpen] = useState(false);




  useEffect(() => {
    axiosInstance
      .get("/api/admin/categories")
      .then((res) => {
        console.log("Categories", res.data);
        setCategories(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Admin categories error", err);
        setCategories([]);
      });
  }, []);

  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState("");
  const [stars, setStars] = useState("");
  const [poster, setPoster] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [movieFile, setMovieFile] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };


  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    // Title (3–10 characters)
    if (!form.title || form.title.trim().length < 3 || form.title.trim().length > 10) {
      newErrors.title = "Title must be between 3 and 10 characters.";
    }

    // Language (3–10 characters)
    if (!form.language || form.language.trim().length < 3 || form.language.trim().length > 10) {
      newErrors.language = "Language must be between 3 and 10 characters.";
    }

    // Director (3–10 characters)
    if (!form.director || form.director.trim().length < 3 || form.director.trim().length > 10) {
      newErrors.director = "Director name must be between 3 and 10 characters.";
    }

    // Genres (3–20 characters)
    if (!genres || genres.trim().length < 3 || genres.trim().length > 20) {
      newErrors.genres = "Genres must be between 3 and 20 characters.";
    }

    // Stars (3–30 characters)
    if (!stars || stars.trim().length < 3 || stars.trim().length > 30) {
      newErrors.stars = "Stars must be between 3 and 30 characters.";
    }

    // Description (10–50 characters)
    if (!form.description || form.description.trim().length < 10 || form.description.trim().length > 50) {
      newErrors.description = "Description must be between 10 and 50 characters.";
    }

    // Rating (1–10 number)
    const ratingNumber = Number(form.rating);
    if (
      !form.rating ||
      isNaN(ratingNumber) ||
      ratingNumber < 1 ||
      ratingNumber > 10
    ) {
      newErrors.rating = "Rating must be a number between 1 and 10.";
    }

    // Year (2001 to current year)
    const yearNumber = Number(form.year);
    if (!form.year || isNaN(yearNumber)) {
      newErrors.year = "Year is required.";
    } else if (yearNumber <= 2000 || yearNumber > currentYear) {
      newErrors.year = `Year must be between 2001 and ${currentYear}.`;
    }

    // Category
    if (!form.category_id) {
      newErrors.category_id = "Please select a category.";
    }

    // Poster
    if (!poster) {
      newErrors.poster = "Please upload poster.";
    }

    // Screenshots
    if (!screenshots || screenshots.length === 0) {
      newErrors.screenshots = "Please upload screenshots.";
    }

    //movie
    if (!movieFile) {
      newErrors.movie = "Please upload movie file.";
    }

    //Trailer only for youtube links
    // if (!form.trailer || !/^https?:\/\/.+/.test(form.trailer.trim())) {
    //   newErrors.trailer = "Trailer URL is required.";
    // }

    //for any type of links

    if (!form.trailer || form.trailer.trim().length < 10) {
      newErrors.trailer = "Valid trailer URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (e) => {
  console.log("submit clicked");
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Movie file validation
  if (movieFile) {

    const allowedTypes = [
      "video/mp4",
      "video/x-matroska",
      "video/quicktime",
      "video/x-msvideo"
    ];

    if (!allowedTypes.includes(movieFile.type)) {
      toast.error("Only video files allowed (MP4, MKV, MOV, AVI)");
      return;
    }

    const maxSize = 200 * 1024 * 1024; // 200MB

    if (movieFile.size > maxSize) {
      toast.error("Movie file must be less than 200MB");
      return;
    }
  }

  const data = new FormData();

  Object.keys(form).forEach((key) => {
    data.append(key, form[key]);
  });

  data.append("genres", genres.trim());
  data.append("stars", stars.trim());
  data.append("poster", poster);

  screenshots.forEach((file) => {
    data.append("screenshots", file);
  });

  if (movieFile) {
    data.append("movie", movieFile);
  }

  try {

    await axios.post(
      "http://localhost:5000/api/admin/movies",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    toast.success("Movie added successfully");

    if (onSuccess) onSuccess();

    setErrors({});

    // RESET FORM
    setForm({
      title: "",
      description: "",
      language: "",
      year: "",
      category_id: "",
      rating: "",
      director: "",
      trailer: "",
    });

    setGenres("");
    setStars("");
    setPoster(null);
    setScreenshots([]);
    setMovieFile(null);

  } catch (err) {
    toast.error("Error adding movie!");
  }

};
  return (
    <form
      onSubmit={handleSubmit}
      className="
      bg-black border border-gray-800
      p-4 sm:p-6 rounded-lg
      max-w-5xl mx-auto
    "
    >
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TITLE */}
        <div>
          <input
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={handleChange}
            className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400
            ${errors.title ? "border-red-500 border-2" : ""}`}
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">
              Title must between 3–10 characters.
            </p>
          )}
        </div>

        {/* YEAR */}
        <div>
          <input
            name="year"
            value={form.year}
            placeholder="Year"
            onChange={handleChange}
            className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400
            ${errors.year ? "border-red-500 border-2" : ""}`}
          />
          {errors.year === "invalidYear" && (
            <p className="text-red-400 text-xs mt-1">
              Year must be between 2001 and current year
            </p>
          )}
        </div>

        {/* LANGUAGE */}
        <div>
          <input
            name="language"
            value={form.language}
            placeholder="Language"
            onChange={handleChange}
            className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400
            ${errors.language ? "border-red-500 border-2" : ""}`}
          />
          {errors.language && (
            <p className="text-red-400 text-xs mt-1">
              Language must be between 3–10 characters.
            </p>
          )}
        </div>

        {/* CATEGORY */}
        <div className="flex gap-2">
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="input h-10.5 bg-gray-900 text-white border-gray-700 flex-1"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* <button
          type="button"
          onClick={() => setCatOpen(true)}
          className="
            px-4 rounded
            bg-yellow-500 text-black font-semibold
            hover:bg-yellow-400 transition
          "
        >
          + Add
        </button> */}
        </div>

        {/* RATING */}
        <div>
          <input
            name="rating"
            value={form.rating}
            placeholder="Rating"
            onChange={handleChange}
            className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400
            ${errors.rating ? "border-red-500 border-2" : ""}`}
          />
          {errors.rating && (
            <p className="text-red-400 text-xs mt-1">
              Rating must be between 1 and 10
            </p>
          )}
        </div>

        {/* DIRECTOR */}
        <div>
          <input
            name="director"
            value={form.director}
            placeholder="Director"
            onChange={handleChange}
            className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400
            ${errors.director ? "border-red-500 border-2" : ""}`}
          />
          {errors.director && (
            <p className="text-red-400 text-xs mt-1">
              Director name must be between 3–10 characters.
            </p>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-4">
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          rows="4"
          onChange={handleChange}
          className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400 w-full
          ${errors.description ? "border-red-500 border-2" : ""}`}
        />
        {errors.description && (
          <p className="text-red-400 text-xs mt-1">
            Description must be between 10–50 characters.
          </p>
        )}
      </div>

      {/* GENRES & STARS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          placeholder="Genres (comma separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400
          ${errors.genres ? "border-red-500 border-2" : ""}`}
        />
        <input
          placeholder="Stars (comma separated)"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400
          ${errors.stars ? "border-red-500 border-2" : ""}`}
        />
      </div>

      {/* TRAILER */}
      <div className="mt-4">
        <input
          name="trailer"
          value={form.trailer}
          placeholder="Movie Trailer URL"
          onChange={handleChange}
          className={`input bg-gray-900 text-white border-gray-700 placeholder-gray-400 w-full
          ${errors.trailer ? "border-red-500 border-2" : ""}`}
        />
        {errors.trailer && (
          <p className="text-red-400 text-xs mt-1">{errors.trailer}</p>
        )}
      </div>

      {/* POSTER */}
      <div className="mt-5">
        <label className="text-sm font-semibold text-gray-300 mb-1 block">
          Poster
        </label>
        <label className="flex items-center justify-between border border-gray-700 rounded px-4 py-2 cursor-pointer hover:bg-gray-800">
          <span className="text-gray-400">
            {poster ? poster.name : "Choose poster image"}
          </span>
          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              setPoster(file);
              setPosterPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        {posterPreview && (
          <img
            src={posterPreview}
            className="h-32 mt-3 rounded border border-gray-700 object-cover"
          />
        )}
      </div>

      {/* SCREENSHOTS */}
      <div className="mt-5">
        <label className="text-sm font-semibold text-gray-300 mb-1 block">
          Screenshots
        </label>
        <label className="flex items-center justify-between border border-gray-700 rounded px-4 py-2 cursor-pointer hover:bg-gray-800">
          <span className="text-gray-400">
            {screenshots.length
              ? `${screenshots.length} files selected`
              : "Choose screenshots (1–6)"}
          </span>
          <input
            type="file"
            multiple
            hidden
            onChange={(e) => {
              const files = [...e.target.files];
              setScreenshots(files);
              setScreenshotPreviews(files.map((f) => URL.createObjectURL(f)));
            }}
          />
        </label>

        <div className="flex gap-2 flex-wrap mt-3">
          {screenshotPreviews.map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-24 w-24 object-cover rounded border border-gray-700"
            />
          ))}
        </div>
      </div>
      {/* MOVIE FILE */}
      <div className="mt-5">
        <label className="text-sm font-semibold text-gray-300 mb-1 block">
          Movie File
        </label>

        <label className="flex items-center justify-between border border-gray-700 rounded px-4 py-2 cursor-pointer hover:bg-gray-800">
          <span className="text-gray-400">
            {movieFile ? movieFile.name : "Choose movie file"}
          </span>

          <input
            type="file"
            hidden
            accept="video/mp4,video/mkv,video/x-matroska"
            onChange={(e) => {
              const file = e.target.files[0];
              setMovieFile(file);
            }}
          />
        </label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="
        mt-6 w-full sm:w-auto
        bg-yellow-500 text-black
        font-bold px-8 py-2 rounded
        hover:bg-yellow-400 transition
      "
      >
        Add Movie
      </button>

      {/* CATEGORY MODAL (UNCHANGED) */}
      {catOpen && (
        <Modal onClose={() => setCatOpen(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Add Category
          </h2>

          <AddCategory
            onSuccess={() => {
              setCatOpen(false);
              setTimeout(() => {
                axiosInstance
                  .get("/api/admin/categories")
                  .then((res) => setCategories(res.data))
                  .catch((err) =>
                    console.error("CATEGORY FETCH ERROR", err)
                  );
              }, 0);
            }}
          />
        </Modal>
      )}
    </form>
  );
}

export default AddMovieForm;
