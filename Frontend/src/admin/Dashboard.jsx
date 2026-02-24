import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalCategories: 0,
  });
  const [movies, setMovies] = useState([]);

  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  //  poster url builder
  const getPosterUrl = (poster) => {
    if (!poster) return "http://localhost:5000/uploads/no-poster.jpg";

    // poster already "/uploads/..." 
    if (poster.startsWith("/")) {
      return `http://localhost:5000${poster}`;
    }

    return `http://localhost:5000/${poster}`;
  };

  useEffect(() => {
    fetchStats();
    fetchLatestMovies();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/dashboard/stats`,
        { headers }
      );
      setStats(res.data);
    } catch (err) {
      console.error("STATS ERROR:", err);
    }
  };

  const fetchLatestMovies = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/dashboard/latest-movies?limit=6`,
        { headers }
      );
      setMovies(res.data);
    } catch (err) {
      console.error("MOVIES ERROR:", err);
    }
  };

return (
  <div className="bg-black text-white min-h-screen flex flex-col">

    {/* PAGE TITLE */}
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">
        🎬 HDHub4u <span className="text-yellow-500">Dashboard</span>
      </h2>
      <p className="text-gray-400 mt-1">
        Overview of your content & latest activity
      </p>
    </div>

    {/* STATS CARDS*/}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-6 mb-12">
      {/* TOTAL MOVIES */}
      <div
        className="
          relative overflow-hidden
          bg-linear-to-br from-[#1c1c1c] to-[#0f0f0f]
          border border-gray-800
          rounded-2xl p-6
          hover:border-yellow-500 transition
        "
      >
        <div className="absolute top-4 right-4 text-yellow-500 text-3xl">🎬</div>
        <h4 className="text-gray-400 text-sm uppercase tracking-wider">
          Total Movies
        </h4>
        <p className="text-4xl font-extrabold mt-2">
          {stats.totalMovies}
        </p>
      </div>

      {/* TOTAL CATEGORIES */}
      <div
        className="
          relative overflow-hidden
          bg-linear-to-br from-[#1c1c1c] to-[#0f0f0f]
          border border-gray-800
          rounded-2xl p-6
          hover:border-yellow-500 transition
        "
      >
        <div className="absolute top-4 right-4 text-yellow-500 text-3xl">📂</div>
        <h4 className="text-gray-400 text-sm uppercase tracking-wider">
          Total Categories
        </h4>
        <p className="text-4xl font-extrabold mt-2">
          {stats.totalCategories}
        </p>
      </div>
    </div>

    {/* LATEST MOVIES*/}
    <div className="px-4 sm:px-6 mb-16">
      <h3 className="text-xl sm:text-2xl font-bold mb-4">
        🔥 Latest <span className="text-yellow-500">Releases</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
              bg-[#121212]
              rounded-xl overflow-hidden
              border border-gray-800
              group hover:border-yellow-500
              transition
            "
          >
            {/* POSTER */}
            <div className="overflow-hidden aspect-2/3">
              <img
                src={`http://localhost:5000${movie.poster}`}
                alt={movie.title}
                loading="lazy"
                className="
                  w-full h-full object-cover
                  group-hover:scale-110 transition duration-300
                "
              />
            </div>

            {/* TEXT */}
            <div className="p-3 bg-linear-to-b from-[#1a1a1a] to-[#0e0e0e]">
              <p className="text-sm font-semibold leading-snug line-clamp-2">
                {movie.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {movie.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/*FOOTER*/}
    <footer className="mt-auto border-t border-gray-800 py-4 text-center">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-500 font-semibold">HDHub4u</span> Admin Panel
      </p>
      <p className="text-xs text-gray-600 mt-1">
        Crafted with ❤️ for cinematic content management
      </p>
    </footer>
  </div>
);
}

export default Dashboard;