import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const navItem =
    "px-3 py-1 rounded-md transition duration-200 hover:bg-[#2a2a2a] hover:text-white";

  // Fetch navbar categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/categories/navbar`
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Navbar categories error", error);
      }
    };

    fetchCategories();
  }, []);

  // SEARCH SUBMIT HANDLER
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/search?q=${search}`);
    setSearch("");
    setOpen(false); // mobile drawer close
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <div className="w-full bg-[#111] text-white border-b border-gray-800">
        <div className="max-w-350 mx-auto flex items-center justify-between px-4 py-3">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white"
              onClick={() => setOpen(true)}
            >
              <Menu size={26} />
            </button>

            <Link
              to="/"
              className="bg-yellow-500 text-black px-2 py-2 font-bold hover:scale-110 transition duration-100 rounded-md shadow"
            >
              🎬 4KHDHub
            </Link>
          </div>

          {/* CENTER MENU (Desktop) */}
          <div className="hidden md:flex gap-4 text-sm font-medium">
            <Link to="/" className={navItem}>
              HDHub4u Home 🏠
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={navItem}
              >
                {cat.name}
              </Link>
            ))}

            <span className={`${navItem} flex items-center gap-1 cursor-pointer`}>
              GENRES <ChevronDown size={16} />
            </span>

            <span className={`${navItem} flex items-center gap-1 cursor-pointer`}>
              More <ChevronDown size={16} />
            </span>
          </div>

          {/* RIGHT SEARCH (DESKTOP) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:block">
            <input
              type="text"
              placeholder="Search movie, star or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-black px-4 py-2 rounded-md w-64"
            />
          </form>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#2b2b2b] text-white z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <form onSubmit={handleSearchSubmit} className="p-4">
          <input
            type="text"
            placeholder="Search movie, star or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white text-black"
          />
        </form>

        {/* Menu Links */}
        <div className="flex flex-col text-base">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="px-5 py-4 border-b border-gray-700 hover:bg-gray-700 transition"
          >
            HDHub4u Home 🏠
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              onClick={() => setOpen(false)}
              className="px-5 py-4 border-b border-gray-700 hover:bg-gray-700 transition"
            >
              {cat.name}
            </Link>
          ))}

          <div className="px-5 py-4 border-b border-gray-700">
            GENRES ▾
          </div>
          <div className="px-5 py-4 border-b border-gray-700">
            More ▾
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}