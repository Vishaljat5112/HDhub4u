import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/login.jsx";
import Home from "./pages/Home.jsx";  
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard.jsx";
import AddMovie from "./admin/add-movie.jsx";
import { Toaster } from "react-hot-toast";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import MoviesList from "./admin/movies-list.jsx";

function App() {
  return (
<>
      <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
     
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<Home/>} />
        {/* Protected Admin */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="movies" element={<MoviesList />} />
          </Route>
        </Route>



      </Routes>
    </BrowserRouter>
      </>
  );

}

export default App;
