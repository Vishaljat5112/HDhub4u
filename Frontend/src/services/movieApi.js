
import axios from "axios";

export const getMovieDetail = (slug) => {
  return axios.get(
    `${import.meta.env.VITE_API_URL}/api/admin/movies/${slug}`
  );
};