import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance.js";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // fetch categories
  const fetchCategories = async () => {
    const res = await axiosInstance.get("/api/admin/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // add or update
  const handleSubmit = async (e) => {
    console.log("ADD / UPDATE CLICKED");
    e.preventDefault();

  if (editId) {
  await axiosInstance.put(
    `/api/admin/categories/edit/${editId}`,
    { name } 
  );
} else {
  await axiosInstance.post(
    "/api/admin/categories/add",
    { name } 
  );
}

    setName("");
    setEditId(null);
    fetchCategories();
  };

  // delete
  const handleDelete = async (id) => {
    console.log("DELETE CLICKED", id);
    if (!window.confirm("Delete this category?")) return;

    await axiosInstance.delete(
      `/api/admin/categories/delete/${id}`
    );
    fetchCategories();
  };

 return (
  <div className="bg-black border border-gray-800 rounded-xl p-4 sm:p-6">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
        📂 Categories <span className="text-yellow-500">Manager</span>
      </h2>
    </div>

    {/* ADD / EDIT FORM */}
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="Category name"
        className="
          bg-gray-900 text-white placeholder-gray-400
          border border-gray-700 rounded-lg
          px-4 py-2 w-full sm:w-72
          focus:outline-none focus:border-yellow-500
        "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        type="submit"
        className="
          bg-yellow-500 text-black
          font-bold px-6 py-2 rounded-lg
          hover:bg-yellow-400 transition
          w-full sm:w-auto
        "
      >
        {editId ? "Update Category" : "Add Category"}
      </button>
    </form>

    {/* TABLE */}
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full min-w-125 text-sm">
        <thead>
          <tr className="bg-gray-900 text-gray-300 uppercase text-xs tracking-wider">
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center py-8 text-gray-400"
              >
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr
                key={cat.id}
                className="
                  border-t border-gray-800
                  hover:bg-gray-900 transition
                "
              >
                <td className="px-4 py-3 text-gray-300">
                  #{cat.id}
                </td>

                <td className="px-4 py-3 font-semibold text-white">
                  {cat.name}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      className="
                        bg-blue-600 text-white
                        px-3 py-1 rounded-md
                        hover:bg-blue-500 transition
                        font-semibold
                      "
                      onClick={() => {
                        setEditId(cat.id);
                        setName(cat.name);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="
                        bg-red-600 text-white
                        px-3 py-1 rounded-md
                        hover:bg-red-500 transition
                        font-semibold
                      "
                      onClick={() => handleDelete(cat.id)}
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
  </div>
);
}

export default Categories;