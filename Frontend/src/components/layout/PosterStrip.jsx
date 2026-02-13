import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import { movies } from "../../data/movies";

export default function PosterStrip() {
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
    <SwiperSlide key={movie.id}>
      <div className="h-full w-full overflow-hidden rounded-sm">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
}
