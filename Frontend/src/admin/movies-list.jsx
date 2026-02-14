import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";








export default function MoviesList() {
  const navigate = useNavigate();  

  const [movies, setMovies] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchMovies();

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/movies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/admin/movies/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    // UI 
    setMovies(movies.filter((movie) => movie.id !== id));
  } catch (err) {
    alert("Failed to delete movie");
  }
};
  
  return (
    <div className="p-4 bg-white rounded shadow max-w-full px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Movies List</h1>

        <div className="flex items-center gap-4">
          {/* Add Movie Button */}
          <a
            href="http://localhost:5173/admin/add-movie"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Add Movie
          </a>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="rounded-full hover:bg-gray-200 p-1 focus:outline-none"
              aria-label="User menu"
            >
              {/* Simple User Icon SVG */}
              <svg
                className="w-8 h-8 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-200 text-gray-700"
                >
                  Profile
                </a>


                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movies Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Poster</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Year</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No movies found.
                </td>
              </tr>
            ) : (
              movies.map((movie) => (
                <tr
                  key={movie.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={`http://localhost:5000${movie.poster}`}
                      alt={movie.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {movie.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {movie.year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {movie.rating ?? "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {movie.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                      // Add  Edit handler here
                      onClick={() => alert(`Edit movie ID: ${movie.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
