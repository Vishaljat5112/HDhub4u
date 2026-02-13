import { useEffect, useState } from "react";
import axios from "axios";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/movies",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    setMovies(res.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Movies List</h1>

      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-black rounded-lg overflow-hidden shadow hover:scale-[1.02] transition"
          >
            {/* Poster */}
            <img
              src={`http://localhost:5000${movie.poster}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />

            {/* Content */}
            <div className="p-3 text-white">
              <h3 className="text-sm font-semibold line-clamp-2">
                {movie.title}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                {movie.year} • ⭐ {movie.rating || "N/A"}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  className="flex-1 text-xs bg-red-600 hover:bg-red-700 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
