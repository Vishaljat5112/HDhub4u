import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance.js";


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

      const res = await axiosInstance.post(
        "/api/admin/login",
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
  <div className="
    min-h-screen w-full
    flex items-center justify-center
    bg-black
    px-4
  ">
    {/* LOGIN CARD */}
    <div className="
      w-full max-w-md
      bg-black
      border border-gray-800
      rounded-2xl
      shadow-2xl
      p-6 sm:p-8
    ">
      {/* LOGO / TITLE */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          🎬 HDHub4u <span className="text-yellow-500">Admin</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Secure admin access
        </p>
      </div>

      {serverError && (
        <p className="text-red-400 text-sm mb-4 text-center">
          {serverError}
        </p>
      )}

      <form onSubmit={handleLogin} noValidate>
        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@hdhub4u.com"
            className={`
              w-full rounded-lg px-4 py-2
              bg-gray-900 text-white
              border border-gray-700
              placeholder-gray-500
              focus:outline-none focus:border-yellow-500
              ${errors.email ? "border-red-500" : ""}
            `}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••"
            className={`
              w-full rounded-lg px-4 py-2
              bg-gray-900 text-white
              border border-gray-700
              placeholder-gray-500
              focus:outline-none focus:border-yellow-500
              ${errors.password ? "border-red-500" : ""}
            `}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 rounded-lg
            bg-yellow-500 text-black
            font-bold
            hover:bg-yellow-400
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* FOOTER */}
      <p className="text-xs text-gray-500 text-center mt-6">
        © {new Date().getFullYear()} HDHub4u Admin Panel
      </p>
    </div>
  </div>
);
}
