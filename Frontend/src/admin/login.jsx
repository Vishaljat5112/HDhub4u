import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field on typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      // Save JWT + admin info
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-linear-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen h-screen p-5">
      <div className="bg-white shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
          Admin Login
        </h1>

        {serverError && (
          <p className="text-red-500 text-sm mb-3 text-center">{serverError}</p>
        )}

        <form onSubmit={handleLogin} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.email ? "border-red-500! border-2!" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*************"
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.password ? "border-red-500! border-2!" : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
