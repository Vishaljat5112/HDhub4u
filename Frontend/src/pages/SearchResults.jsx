import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/movie/MovieCard.jsx";
import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("Search query:", query);
  if (!query) return;

  setLoading(true);

  axios
    .get(`${BASE_URL}/api/admin/movies/search?q=${query}`)
    .then((res) => {
      // 🔥 YAHI FIX HAI
      setMovies(Array.isArray(res.data) ? res.data : []);
    })
    .catch((error) => {
      console.error("Search error", {
        data: error.response?.data,
        message: error.message,
        status: error.response?.status,
      });
      setMovies([]); // safety
    })
    .finally(() => {
      setLoading(false);
    });
}, [query]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-4 md:px-8 py-6">

      <TopStrip />
      <PosterStrip />
      <Navbar />
      <AlertBar />



      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-white text-xl md:text-2xl font-semibold">
          Search results for{" "}
          <span className="text-red-500">"{query}"</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {loading
            ? "Searching movies..."
            : `${movies.length} result(s) found`}
        </p>
      </div>

      {/*  Loader */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No movies found 😔
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Try searching with another title, star or genre
          </p>
        </div>
      )}

      {/*  Movies Grid */}
      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.isArray(movies) && movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}