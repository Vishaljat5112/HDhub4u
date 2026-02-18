import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/common/modal.jsx";
import AddMovieForm from "./add-movie.jsx";
import toast from "react-hot-toast";
import EditMovieForm from "./edit-movie";






export default function MoviesList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);



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

  const handleDelete = async (movieId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/movies/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // UI 
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
      toast.success("Movie deleted!");
    } catch (err) {
      toast.error("Delete failed");

    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-full px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Movies List</h1>

        <div className="flex items-center gap-4">
          {/* Add Movie Button */}
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Movie
          </button>

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
                    {movie.category_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-3">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setSelectedMovie(movie);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Add Movie
          </h2>

          <AddMovieForm
            onSuccess={() => {
              setOpen(false);

              setTimeout(() => {
                fetchMovies();
              }, 0);
            }}
          />

        </Modal>
      )}

      {editOpen && selectedMovie && (
        <Modal
          title="Edit Movie"
          onClose={() => {
            setEditOpen(false);
            setSelectedMovie(null);
          }}
        >
          <EditMovieForm
            movie={selectedMovie}
            onSuccess={() => {
              setEditOpen(false);
              setSelectedMovie(null);
              fetchMovies(); // list refresh
            }}
          />
        </Modal>
      )}


    </div>
  );
}
