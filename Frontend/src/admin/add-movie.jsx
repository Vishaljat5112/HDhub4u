import { useEffect, useState, } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddCategory from "../components/admin/AddCategory.jsx"
import Modal from "../components/common/modal.jsx";

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
        axios
            .get("http://localhost:5000/api/admin/categories", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            })
            .then((res) => {
                console.log("Categories", res.data);
                setCategories(res.data);
            })
            .catch((err) => console.error(err));

    }, []);

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

        //Trailer
        if (!form.trailer || !/^https?:\/\/.+/.test(form.trailer.trim())) {
            newErrors.trailer = "Trailer URL is required.";
        }

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
            // setPosterPreview(null);
            // setScreenshotPreviews([]);

            toast.success("Movie added successfully");

            if (onSuccess) onSuccess();


            // resetForm();

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

        } catch (err) {
            toast.error("Error adding movie!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-4xl">
            <div className="grid grid-cols-2 gap-5 relative overflow-visible">
                <input name="title" value={form.title} placeholder="Title" onChange={handleChange} className={`input ${errors.title ? "border-red-500! border-2!" : ""}`} />
                {errors.title && (
                    <p className="text-red-500 text-xs">
                        Title must between 3-10 characters.
                    </p>
                )}

                <input name="year" value={form.year} placeholder="Year" onChange={handleChange} className={`input ${errors.year ? "border-red-500! border-2!" : ""}`} />
                {errors.year === "invalidYear" && (
                    <p className="text-red-500 text-xs">
                        Year must be between 2001 and current year
                    </p>
                )}

                <input name="language" value={form.language} placeholder="Language" onChange={handleChange} className={`input ${errors.language ? "border-red-500! border-2!" : ""}`} />
                {errors.language && (
                    <p className="text-red-500 text-xs">
                        Language must be between 3-10 characters.
                    </p>
                )}

                <div className="flex gap-2 items-center">
  <select
    name="category_id"
    value={form.category_id}
    onChange={handleChange}
    className="input flex-1"
  >
    <option value="">Select Category</option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={() => setCatOpen(true)}
    className="px-3 py-1 bg-black text-white rounded"
  >
    + Add
  </button>
</div>


                <input name="rating" value={form.rating} placeholder="Rating" onChange={handleChange} className={`input ${errors.rating ? " border-red-500! border-2!" : ""}`} />
                {errors.rating && (
                    <p className="text-red-500 text-xs">
                        Rating must be between 1 and 10
                    </p>
                )}
                <input name="director" value={form.director} placeholder="Director" onChange={handleChange} className={`input ${errors.director ? "border-red-500! border-2!" : ""}`} />
                {errors.director && (
                    <p className="text-red-500 text-xs">
                        Director name must be between 3-10 characters.
                    </p>
                )}
            </div>

            <textarea
                name="description"
                value={form.description}
                placeholder="Description"
                className={`input mt-4 w-full ${errors.description ? "border-red-500! border-2!" : ""}`}
                rows="4"
                onChange={handleChange}
            />
            {errors.description && (
                <p className="text-red-500 text-xs">
                    Description must be between 10-50 characters.
                </p>
            )}

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

            <input
                name="trailer"
                value={form.trailer}
                placeholder="Movie Trailer URL (YouTube / Vimeo)"
                onChange={handleChange}
                className={`input mt-4 w-full ${errors.trailer ? "border-red-500 border-2" : ""
                    }`}
            />

            {errors.trailer && (
                <p className="text-red-500 text-xs">
                    {errors.trailer}
                </p>
            )}


            <label className="block text-sm font-medium mb-1">Poster</label>
            <label className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-gray-500">
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
                    className="h-32 mt-2 rounded border object-cover"
                />
            )}

            {errors.poster && (
                <p className="text-red-500 text-xs">
                    Poster must be a valid image file.
                </p>
            )}


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


            {errors.screenshots && (
                <p className="text-red-500 text-xs">
                    Screenshots must be valid image files.
                </p>
            )}

            <button className="mt-6 bg-black text-white px-6 py-2 rounded">
                Add Movie
            </button>

{catOpen && (
  <Modal onClose={() => setCatOpen(false)}>
    <h2 className="text-lg font-semibold mb-4">
      Add Category
    </h2>

    <AddCategory
      onSuccess={() => {
        setCatOpen(false);

        setTimeout(() => {
          axios
            .get("http://localhost:5000/api/admin/categories", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              },
            })
            .then((res) => {
              setCategories(res.data);
            })
            .catch((err) => {
              console.error("CATEGORY FETCH ERROR", err);
            });
        }, 0);
      }}
    />
  </Modal>
)}


        </form>
        
    );
    
}

export default AddMovieForm;
