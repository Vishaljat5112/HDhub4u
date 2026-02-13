import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center px-6">
          <h1 className="font-semibold text-lg">Admin Panel</h1>
        </header>

        {/* Dynamic Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
