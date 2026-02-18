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

    /* ---------- PREFILL ---------- */
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

    /*  JSX (FULL FORM)  */
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-4xl">
            <div className="grid grid-cols-2 gap-4">
                <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="Title" />
                <input name="year" value={form.year} onChange={handleChange} className="input" placeholder="Year" />
                <input
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="input"
                    placeholder="Language"
                />




                <select name="category_id" value={form.category_id} onChange={handleChange} className="input">
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <input name="rating" value={form.rating} onChange={handleChange} className="input" placeholder="Rating" />
                <input name="director" value={form.director} onChange={handleChange} className="input" placeholder="Director" />
            </div>

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="input mt-4 w-full"
                placeholder="Description"
            />


            <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    className="input"
                    placeholder="Genres"
                />

                <input
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    className="input"
                    placeholder="Stars"
                />

            </div>


            <label className="block text-sm font-medium mt-4">Poster</label>
            <label className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-gray-500">
                    {poster ? poster.name : "Change poster (optional)"}
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
                    className="h-32 mt-2 rounded border object-cover"
                />
            )}


            <label className="block text-sm font-medium mt-4">Screenshots</label>
            <label className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-gray-500">
                    {screenshots.length
                        ? `${screenshots.length} new files selected`
                        : "Change screenshots (optional)"}
                </span>
                <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => {
                        const files = [...e.target.files];
                        setScreenshots(files);
                        setScreenshotPreviews(files.map(f => URL.createObjectURL(f)));
                    }}
                />
            </label>

            <div className="flex gap-2 flex-wrap mt-2">
                {screenshotPreviews.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        className="h-24 w-24 object-cover rounded border"
                    />
                ))}
            </div>




            <button className="mt-6 bg-black text-white px-6 py-2 rounded">
                Update Movie
            </button>
        </form>
    );
}

export default EditMovieForm;
