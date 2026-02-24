import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance.js";


export default function CategoryMovies() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/movies/category/${id}`
      );
      setMovies(res.data.movies || []);
    } catch (error) {
      console.error("Movie fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [id]);

  if (loading) {
    return <div className="text-white p-6">Loading movies...</div>;
  }

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Movies
      </h1>

      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-[#1a1a1a] rounded shadow hover:scale-105 transition"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-t"
              />
              <div className="p-3 text-center font-semibold">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}