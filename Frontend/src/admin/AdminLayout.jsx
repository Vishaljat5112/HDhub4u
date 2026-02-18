




import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/admin/AdminSidebar";
export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 ml-64">
       <header
  className="h-16 bg-white shadow
             sticky top-0 z-50
             flex items-center justify-between px-6"
>
  <h1 className="font-semibold text-lg tracking-wide">
    Admin Panel
  </h1>

  {/* Profile Section */}
  <div className="relative z-50" ref={dropdownRef}>
    <button
      onClick={() => setOpen(!open)}
      className="w-11 h-11 rounded-full bg-linear-to-br from-indigo-500 to-purple-600
                 flex items-center justify-center shadow-md
                 ring-2 ring-transparent hover:ring-indigo-400
                 transition-all duration-200"
    >
      {/* User Icon */}
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A13.937 13.937 0 0112 15
             c2.5 0 4.847.655 6.879 1.804
             M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>

    {/* Dropdown */}
    {open && (
      <div
        className="absolute right-0 mt-3 w-48
                   bg-white shadow-xl border border-gray-200
                   rounded-xl z-50"
      >
        <button
          onClick={() => {
            setOpen(false);
            navigate("/admin/profile");
          }}
          className="flex items-center gap-3 w-full px-4 py-3
                     hover:bg-indigo-50 rounded-t-xl transition"
        >
          <span className="text-indigo-600 font-medium">Profile</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3
                     text-red-600 hover:bg-red-50 rounded-b-xl transition"
        >
          <span className="font-medium">Logout</span>
        </button>
      </div>
    )}
  </div>
</header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
