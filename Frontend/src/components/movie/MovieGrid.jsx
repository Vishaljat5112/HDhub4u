import SectionHeader from "./SectionHeader";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { movies } from "../../data/movies";

export default function MovieGrid() {
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
