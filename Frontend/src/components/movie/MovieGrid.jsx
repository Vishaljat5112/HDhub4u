import { useEffect, useState } from "react";
import axios from "axios";

import SectionHeader from "./SectionHeader";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const BASE_URL = "http://localhost:5000";

export default function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/movies/front`);
        setMovies(res?.data?.movies || []);
      } catch (error) {
        console.error("Movies fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return null;

  return (
    <div className="px-2 bg-black">

      {/* Section Header */}
      <SectionHeader title="Latest Releases" />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination Wrapper */}
      <div className="flex justify-center mt-12">
        <Pagination />
      </div>

    </div>
  );
}
