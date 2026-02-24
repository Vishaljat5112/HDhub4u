import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance.js";


import MovieCard from "../components/movie/MovieCard";
import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";

export default function CategoryPage() {
  const { slug } = useParams();

  const [movies, setMovies] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

 useEffect(() => {
  const fetchCategoryMovies = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/user/categories/${slug}`
      );

      setMovies(res.data.movies || []);
      setCategoryName(res.data.category || "");
    } catch (error) {
      console.error("Error fetching category movies", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCategoryMovies();
}, [slug]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-6">

      <TopStrip />
      <PosterStrip />
      <Navbar />
      <AlertBar />

      {/* CATEGORY TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {categoryName || slug.replace("-", " ")}
      </h1>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-400">
          Loading movies...
        </div>
      )}

      {/* EMPTY */}
      {!loading && movies.length === 0 && (
        <div className="text-center text-gray-400">
          No movies found in this category.
        </div>
      )}

      {/* MOVIES GRID */}
      {!loading && movies.length > 0 && (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            gap-4
          "
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} HDHub4u.TV • All Rights Reserved
          </p>
          <p className="mt-2">
            Disclaimer • Privacy Policy • DMCA • Contact Us
          </p>
        </div>
      </footer>

    </div>
  );
}