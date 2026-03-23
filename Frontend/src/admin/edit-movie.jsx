import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance.js";
import toast from "react-hot-toast";

function EditMovieForm({ movie, onSuccess }) {
  console.log("EDIT MOVIE DATA ", movie);

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
  const [genres, setGenres] = useState("");
  const [stars, setStars] = useState("");
  const [poster, setPoster] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  const [posterPreview, setPosterPreview] = useState(null);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  /* PREFILL */
  useEffect(() => {
    if (!movie) return;

    console.log("FINAL MOVIE OBJECT ", movie);

    setForm({
      title: movie.title || "",
      description: movie.description || "",
      language: movie.language || "",
      year: movie.year || "",
      category_id: movie.category_id || "",
      rating: movie.rating || "",
      director: movie.director || "",
      trailer: movie.trailer || "",
    });

    // GENRES
    if (Array.isArray(movie.genres)) {
      setGenres(movie.genres.map((g) => g.name).join(", "));
    } else {
      setGenres("");
    }

    // STARS
    if (Array.isArray(movie.stars)) {
      setStars(movie.stars.map((s) => s.name).join(", "));
    } else {
      setStars("");
    }

    const BASE = import.meta.env.VITE_API_URL;

    // POSTER
    setPosterPreview(
      movie.poster ? `${BASE}${movie.poster}` : null
    );

    // SCREENSHOTS
    if (Array.isArray(movie.screenshots)) {
      setScreenshotPreviews(
        movie.screenshots.map(
          (s) => `${BASE}${s.image}`
        )
      );
    } else {
      setScreenshotPreviews([]);
    }
  }, [movie]);




  /* FETCH CATEGORIES */
  useEffect(() => {
    axiosInstance
      .get("/api/admin/categories")
      .then((res) => setCategories(res.data))
      .catch((err) =>
        console.error("CATEGORY FETCH ERROR", err)
      );
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    data.append("genres", JSON.stringify(genres.split(",")));
    data.append("stars", JSON.stringify(stars.split(",")));

    if (poster) data.append("poster", poster);
    screenshots.forEach((f) => data.append("screenshots", f));

    try {
      await axiosInstance.patch(
        `/api/admin/movies/${movie.id}`,
        data
      );

      toast.success("Movie updated successfully");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("UPDATE MOVIE ERROR", err);
      toast.error("Error updating movie");
    }
  };


  return (
  <form
    onSubmit={handleSubmit}
    className="
      bg-black border border-gray-800
      rounded-xl p-4 sm:p-6
      max-w-5xl mx-auto
    "
  >
    {/* HEADER */}
    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      ✏️ Edit <span className="text-yellow-500">Movie</span>
    </h2>

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* TITLE */}
      <div className="flex flex-col gap-1">
        <span className="text-red-500 text-xs font-medium">
          Change Title
        </span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
        />
      </div>

      {/* YEAR */}
      <div className="flex flex-col gap-1">
        <span className="text-red-500 text-xs font-medium">
          Change Year
        </span>
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
        />
      </div>


      {/* CATEGORY */}
      <div className="flex flex-col gap-1">
        <span className="text-red-500 text-xs font-medium">
          Change Category
        </span>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="input bg-gray-900 text-white border-gray-700"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* RATING */}
      <div className="flex flex-col gap-1">
        <span className="text-red-500 text-xs font-medium">
          Change Rating (1–10)
        </span>
        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
        />
      </div>

      
     
    </div>

    

    

    {/* POSTER */}
    <div className="mt-5">
      <span className="text-red-500 text-xs font-medium block mb-1">
         Poster Image (Only for preview)
      </span>

      <label
        className="
          flex items-center justify-between
          border border-gray-700 rounded-lg
          px-4 py-2 cursor-pointer
          hover:bg-gray-800
        "
      >
        <span className="text-gray-400">
          {poster ? poster.name : "poster image"}
        </span>

        {/* <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setPoster(file);
              setPosterPreview(URL.createObjectURL(file));
            }
          }}
        /> */}
      </label>

      {posterPreview && (
        <img
          src={posterPreview}
          className="h-32 mt-3 rounded-lg border border-gray-700 object-cover"
        />
      )}
    </div>

   
    {/* SUBMIT */}
    <button
      className="
        mt-6 w-full sm:w-auto
        bg-yellow-500 text-black
        font-bold px-8 py-2 rounded-lg
        hover:bg-yellow-400 transition
      "
    >
      Update Movie
    </button>
  </form>
);
}
export default EditMovieForm;
