import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddMovieForm() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        language: "",
        year: "",
        category: "",
        rating: "",
        director: "",
    });

    const [errors, setErrors] = useState({});
    const [genres, setGenres] = useState("");
    const [stars, setStars] = useState("");
    const [poster, setPoster] = useState(null);
    const [screenshots, setScreenshots] = useState([]);

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

        if (!form.title) newErrors.title = true;
        if (!form.language) newErrors.language = true;
        if (!form.category) newErrors.category = true;
        if (!form.director) newErrors.director = true;
         if (!form.rating) newErrors.rating = true;
        if (!form.description) newErrors.description = true;
        if (!genres) newErrors.genres = true;
        if (!stars) newErrors.stars = true;

        if (!form.year) {
            newErrors.year = true;
        } else if (Number(form.year) > currentYear) {
            newErrors.year = "invalidYear";
        }

        if (!poster) newErrors.poster = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
             e.preventDefault();
        if (!validateForm()) {
            return;
        }

       

        const data = new FormData();
        Object.keys(form).forEach((key) => {
            data.append(key, form[key]);
        });

        data.append("genres", JSON.stringify(genres.split(",")));
        data.append("stars", JSON.stringify(stars.split(",")));
        data.append("poster", poster);

        screenshots.forEach((file) => {
            data.append("screenshots", file);
        });

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

            toast.success("Movie added successfully 🎉");

            setErrors({});

            // RESET FORM 
            setForm({
                title: "",
                description: "",
                language: "",
                year: "",
                category: "",
                rating: "",
                director: "",
            });

            setGenres("");
            setStars("");
            setPoster(null);
            setScreenshots([]);

        } catch (err) {
            toast.error("Error adding movie ❌");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-4xl">
            <div className="grid grid-cols-2 gap-5">
                <input name="title" value={form.title} placeholder="Title" onChange={handleChange} className={`input ${errors.title ? "border-red-500! border-2!" : ""}`} />

                <input name="year" value={form.year} placeholder="Year" onChange={handleChange} className={`input ${errors.year ?"border-red-500! border-2!" : ""}`} />
                {errors.year === "invalidYear" && (
                    <p className="text-red-500 text-xs">
                        Year cannot be greater than current year
                    </p>
                
                )}
                <input name="language" value={form.language} placeholder="Language" onChange={handleChange} className={`input ${errors.language ? "border-red-500! border-2!" : ""}`} />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={`input ${errors.category ?"border-red-500! border-2!" : ""}`}
                >
                    <option value="">Select Category</option>
                    <option value="bollywood">Bollywood</option>
                    <option value="hollywood">Hollywood</option>
                    <option value="hindi-dubbed">Hindi Dubbed</option>
                    <option value="south-hindi">South Hindi</option>
                    <option value="webseries">Web Series</option>
                    <option value="18+">18+</option>
                </select>

                <input name="rating" value={form.rating} placeholder="Rating" onChange={handleChange} className={`input ${errors.rating ? " border-red-500! border-2!" : ""}`} />
                <input name="director" value={form.director} placeholder="Director" onChange={handleChange} className={`input ${errors.director ? "border-red-500! border-2!" : ""}`} />
            </div>

            <textarea
                name="description"
                value={form.description}
                placeholder="Description"
                className={`input mt-4 w-full ${errors.description ? "border-red-500! border-2!" : ""}`}
                rows="4"
                onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                    placeholder="Genres (comma separated)"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    className={`input ${errors.genres ? "border-red-500! border-2!" : ""}`}
                />
                <input
                    placeholder="Stars (comma separated)"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    className={`input ${errors.stars ? "border-red-500! border-2!" : ""}`}
                />
            </div>

            <label className="block text-sm font-medium mb-1">Poster</label>
            <label className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-gray-500">
                    {poster ? poster.name : "Choose poster image"}
                </span>
                <input
                    type="file"
                    hidden
                    onChange={(e) => setPoster(e.target.files[0])}
                />
            </label>

            <label className="block text-sm font-medium mb-1 mt-4">Screenshots</label>
            <label className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-gray-500">
                    {screenshots.length
                        ? `${screenshots.length} files selected`
                        : "Choose screenshots (1-6)"}
                </span>
                <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => setScreenshots([...e.target.files])}
                />
            </label>

            <button className="mt-6 bg-black text-white px-6 py-2 rounded">
                Add Movie
            </button>
        </form>
    );
}

export default AddMovieForm;
