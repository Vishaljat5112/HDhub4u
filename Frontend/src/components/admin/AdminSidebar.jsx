import { NavLink, useNavigate } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white">
      <div className="h-16 flex flex-col justify-center px-4 bg-gray-900">
  <span className="text-lg font-bold tracking-wide">HDhub4U</span>
  <span className="text-xs text-gray-400">Admin Panel</span>
</div>

<p className="px-4 mt-4 mb-2 text-xs text-gray-400 uppercase">
  Management
</p>

      <nav className="mt-4 space-y-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/add-movie"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Add Movie
        </NavLink>

        <NavLink
          to="/admin/movies"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
         Movies List
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Settings
        </NavLink>

             <NavLink
          to="/admin/notification"
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Notifications
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-gray-700"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
