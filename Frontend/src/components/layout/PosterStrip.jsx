import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const BASE_URL = "http://localhost:5000";

export default function PosterStrip() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderMovies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/movies/slider`);
        setMovies(res?.data?.movies || []);
      } catch (error) {
        console.error("Slider fetch error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderMovies();
  }, []);

  // ⛔ Swiper empty data pe render nahi karega
  if (loading || movies.length === 0) return null;

  return (
    <div className="w-full bg-black border-b border-gray-800 py-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={8}
        slidesPerView={8}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 5 },
          1024: { slidesPerView: 8 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id || movie._id}>
            <div className="h-full w-full overflow-hidden rounded-sm">
              <img
                src={`${BASE_URL}${movie.poster}`}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
