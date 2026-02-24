import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/login.jsx";
import Home from "./pages/Home.jsx";  
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard.jsx";
import AddMovie from "./admin/add-movie.jsx";
import { Toaster } from "react-hot-toast";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import MoviesList from "./admin/movies-list.jsx";
import Categories from "./admin/Categories.jsx";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";


import Disclaimer from "./pages/Disclaimer";
import HowToDownload from "./pages/HowToDownload";
import JoinGroup from "./pages/JoinGroup";
import MovieRequest from "./pages/MovieRequest";
import  MovieDetail  from "./pages/MovieDetails.jsx";



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
            <Route path="/admin/categories" element={<Categories />} />
          </Route>
        </Route>

          {/* user movie route */}
     <Route path="/category/:slug" element={<CategoryPage />} />  
       {/*search movie route  */}
       <Route path="/search" element={<SearchResults />} />
       {/* Movie detail page */}
        <Route path="/movie/:slug" element={<MovieDetail />} />


       {/* top strip routes */}
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/how-to-download" element={<HowToDownload />} />
        <Route path="/join-group" element={<JoinGroup />} />
        <Route path="/movie-request" element={<MovieRequest />} />
      </Routes>
    </BrowserRouter>
      </>
  );

}

export default App;
