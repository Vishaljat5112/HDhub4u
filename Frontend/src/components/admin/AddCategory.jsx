import { useEffect, useState} from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance.js";


function AddCategory({ onSuccess = () => {} }) {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return toast.error("Name required");

    try {
      await axiosInstance.post(
        "/api/admin/categories/add",
        { name },
      );

      toast.success("Category added");
      setName("");
      onSuccess();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Category add failed");
    }
  };

  return (
    <div>
      <input
        className="border p-2 w-full"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="mt-3 bg-black text-white px-4 py-2 rounded"
      >
        Add Category
      </button>
    </div>
  );
}

export default AddCategory;