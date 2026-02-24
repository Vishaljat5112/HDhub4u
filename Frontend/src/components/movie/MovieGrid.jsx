import { useEffect, useState } from "react";
import axios from "axios";

import SectionHeader from "./SectionHeader";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function MovieGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/movies/front"
        );

        setMovies(res?.data?.movies || []);
      } catch (error) {
        console.error("Movies fetch error:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="px-2 bg-black">
      <SectionHeader title="Latest Releases" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Pagination />
      </div>
    </div>
  );
}