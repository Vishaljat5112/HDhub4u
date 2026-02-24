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
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header
          className="
            h-16 bg-black border-b border-gray-800
            sticky top-0 z-40
            flex items-center justify-between
            px-4 sm:px-6
          "
        >
          <h1 className="font-bold text-lg tracking-wide">
  🎬 HDHub4u <span className="text-yellow-500">Admin</span>
</h1>



          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="
                w-10 h-10 rounded-full
                bg-gray-800
                flex items-center justify-center
                border border-gray-700
                hover:border-yellow-500
                transition
              "
            >
              {/* User Icon */}
              <svg
                className="h-5 w-5 text-gray-200"
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
                className="
                  absolute right-0 mt-3 w-44
                  bg-black border border-gray-800
                  rounded-lg shadow-xl
                  overflow-hidden
                "
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/admin/profile");
                  }}
                  className="
                    w-full text-left px-4 py-3
                    text-sm font-semibold
                    hover:bg-gray-800
                    transition
                  "
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="
                    w-full text-left px-4 py-3
                    text-sm font-semibold text-red-400
                    hover:bg-gray-800
                    transition
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 sm:p-6 bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}