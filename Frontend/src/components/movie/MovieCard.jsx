const BASE_URL = "http://localhost:5000";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-[#141414] rounded-md overflow-hidden shadow-md hover:shadow-lg transition group">
      
      {/* Poster */}
      <div className="overflow-hidden">
        <img
          src={`${BASE_URL}${movie.poster}`}
          alt={movie.title}
          className="w-full h-75 object-cover group-hover:scale-110 transition duration-300"
          loading="lazy"
        />
      </div>

      {/* Text Section */}
      <div className="p-3 bg-linear-to-b from-[#1c1c1c] to-[#0f0f0f]">
        <p className="text-white text-sm font-semibold leading-5">
          {movie.title} ({movie.year}) [{movie.language} 1080p 720p & 480p Dual Audio [x264/HEVC] | Full Movie]
        </p>
      </div>
    </div>
  );
}
