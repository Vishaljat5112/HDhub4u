import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/hdhub4ulogo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const baseLink =
    "block px-4 py-3 rounded-md text-[15px] font-semibold tracking-wide transition";
  const activeLink =
    "bg-yellow-500 text-black font-bold";
  const normalLink =
    "text-gray-200 hover:bg-gray-800 hover:text-white";

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4 z-60">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="HDHub4u"
            className="h-7 object-contain"
          />
          <span className="text-xs text-gray-400 font-semibold">
            Admin Panel
          </span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-white text-2xl font-bold"
        >
          ☰
        </button>
      </div>

      {/*  OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/*  SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-black text-white z-70
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-gray-800">
          <img
            // src="/assets/images/hdhub4ulogo.png"
             src={logo}
            alt="HDHub4u"
            className="h-9 object-contain"
          />
          {/* <div className="leading-tight">
            <p className="text-sm font-bold text-white">
              Admin Panel
            </p>
            <p className="text-[11px] text-gray-400 font-semibold">
              HDHub4u Control
            </p>
          </div> */}
        </div>

        {/* SECTION */}
        <p className="px-4 mt-4 mb-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
          Management
        </p>

        {/* NAV */}
        <nav className="px-2 space-y-1">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-movie"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
            onClick={() => setOpen(false)}
          >
            Add Movie
          </NavLink>

          <NavLink
            to="/admin/movies"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
            onClick={() => setOpen(false)}
          >
            Movies List
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : normalLink}`
            }
            onClick={() => setOpen(false)}
          >
            Categories
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 mt-4 rounded-md font-bold text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MOBILE SPACER */}
      <div className="lg:hidden h-14" />
    </>
  );
}