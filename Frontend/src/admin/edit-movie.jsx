import { useEffect, useState } from "react";
import axios from "axios";
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

  //  GENRES (array of objects → string)
  if (Array.isArray(movie.genres)) {
    setGenres(movie.genres.map(g => g.name).join(", "));
  } else {
    setGenres("");
  }

  //  STARS (array of objects → string)
  if (Array.isArray(movie.stars)) {
    setStars(movie.stars.map(s => s.name).join(", "));
  } else {
    setStars("");
  }

  //  POSTER
  setPosterPreview(
    movie.poster ? `http://localhost:5000${movie.poster}` : null
  );

  //  SCREENSHOTS (array of objects → preview URLs)
  if (Array.isArray(movie.screenshots)) {
    setScreenshotPreviews(
      movie.screenshots.map(
        (s) => `http://localhost:5000${s.image}`
      )
    );
  } else {
    setScreenshotPreviews([]);
  }

}, [movie]);



    /* FETCH CATEGORIES */
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/admin/categories", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            })
            .then((res) => setCategories(res.data));
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
            await axios.patch(
                `http://localhost:5000/api/admin/movies/${movie.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                }
            );

            toast.success("Movie updated successfully");
            if (onSuccess) onSuccess();
        } catch (err) {
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
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
      />

      <input
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="Year"
        className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
      />

      <input
        name="language"
        value={form.language}
        onChange={handleChange}
        placeholder="Language"
        className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
      />

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

      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        placeholder="Rating"
        className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
      />

      <input
        name="director"
        value={form.director}
        onChange={handleChange}
        placeholder="Director"
        className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
      />
    </div>

    {/* DESCRIPTION */}
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description"
      rows={4}
      className="
        input bg-gray-900 text-white border-gray-700
        placeholder-gray-400 w-full mt-4
      "
    />

    {/* GENRES / STARS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <input
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
        placeholder="Genres (comma separated)"
        className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
      />

      <input
        value={stars}
        onChange={(e) => setStars(e.target.value)}
        placeholder="Stars (comma separated)"
        className="input bg-gray-900 text-white border-gray-700 placeholder-gray-400"
      />
    </div>

    {/* POSTER */}
    <div className="mt-5">
      <label className="block text-sm font-semibold text-gray-300 mb-1">
        Poster (optional)
      </label>

      <label className="
        flex items-center justify-between
        border border-gray-700 rounded-lg
        px-4 py-2 cursor-pointer
        hover:bg-gray-800
      ">
        <span className="text-gray-400">
          {poster ? poster.name : "Change poster image"}
        </span>

        <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setPoster(file);
              setPosterPreview(URL.createObjectURL(file));
            }
          }}
        />
      </label>

      {posterPreview && (
        <img
          src={posterPreview}
          className="h-32 mt-3 rounded-lg border border-gray-700 object-cover"
        />
      )}
    </div>

    {/* SCREENSHOTS */}
    <div className="mt-5">
      <label className="block text-sm font-semibold text-gray-300 mb-1">
        Screenshots (optional)
      </label>

      <label className="
        flex items-center justify-between
        border border-gray-700 rounded-lg
        px-4 py-2 cursor-pointer
        hover:bg-gray-800
      ">
        <span className="text-gray-400">
          {screenshots.length
            ? `${screenshots.length} new files selected`
            : "Change screenshots"}
        </span>

        <input
          type="file"
          multiple
          hidden
          onChange={(e) => {
            const files = [...e.target.files];
            setScreenshots(files);
            setScreenshotPreviews(
              files.map((f) => URL.createObjectURL(f))
            );
          }}
        />
      </label>

      <div className="flex gap-2 flex-wrap mt-3">
        {screenshotPreviews.map((src, i) => (
          <img
            key={i}
            src={src}
            className="h-24 w-24 rounded-lg object-cover border border-gray-700"
          />
        ))}
      </div>
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
