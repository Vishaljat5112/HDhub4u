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
  <div className="bg-black border border-gray-800 rounded-xl p-4 sm:p-6">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
        🎬 Movies <span className="text-yellow-500">List</span>
      </h1>

      <button
        onClick={() => setOpen(true)}
        className="
          bg-yellow-500 text-black
          font-bold px-5 py-2 rounded-lg
          hover:bg-yellow-400 transition
          w-full sm:w-auto
        "
      >
        + Add Movie
      </button>
    </div>

    {/* TABLE WRAPPER */}
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full min-w-225 text-sm">
        <thead>
          <tr className="bg-gray-900 text-gray-300 uppercase text-xs tracking-wider">
            <th className="px-4 py-3 text-left">Poster</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Year</th>
            <th className="px-4 py-3 text-left">Rating</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-gray-400"
              >
                No movies found.
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr
                key={movie.id}
                className="
                  border-t border-gray-800
                  hover:bg-gray-900 transition
                "
              >
                {/* POSTER */}
                <td className="px-4 py-3">
                  <img
                    src={`http://localhost:5000${movie.poster}`}
                    alt={movie.title}
                    className="w-14 h-20 object-cover rounded-md border border-gray-700"
                  />
                </td>

                {/* TITLE */}
                <td className="px-4 py-3 font-semibold text-white ">
                  {movie.title}
                </td>

                {/* YEAR */}
                <td className="px-4 py-3 text-gray-300">
                  {movie.year}
                </td>

                {/* RATING */}
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded bg-gray-800 text-gray-200">
                    {movie.rating ?? "N/A"}
                  </span>
                </td>

                {/* CATEGORY */}
                <td className="px-4 py-3 capitalize text-gray-300">
                  {movie.category_name}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMovie(movie);
                        setEditOpen(true);
                      }}
                      className="
                        px-3 py-1 rounded-md
                        bg-blue-600 text-white
                        hover:bg-blue-500 transition
                        font-semibold
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="
                        px-3 py-1 rounded-md
                        bg-red-600 text-white
                        hover:bg-red-500 transition
                        font-semibold
                      "
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

    {/* ADD MOVIE MODAL */}
    {open && (
      <Modal onClose={() => setOpen(false)}>
        <h2 className="text-lg font-bold mb-4">
          🎬 Add Movie
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

    {/* EDIT MOVIE MODAL */}
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
            fetchMovies();
          }}
        />
      </Modal>
    )}
  </div>
);
  
}
