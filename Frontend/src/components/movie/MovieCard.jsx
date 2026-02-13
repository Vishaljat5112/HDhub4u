export default function MovieCard({ movie }) {
  return (
    <div className="bg-[#141414] rounded-md overflow-hidden shadow-md hover:shadow-lg transition group">
      
      {/* Poster */}
      <div className="overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-75 object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Text Section */}
      <div className="p-3 bg-linear-to-b from-[#1c1c1c] to-[#0f0f0f]">
        <p className="text-white text-sm font-semibold leading-5">
          {movie.title} ({movie.year}) {movie.quality} [{movie.language}] 1080p 720p & 480p Dual Audio [x264/HEVC] | Full Movie
        </p>
      </div>
    </div>
  );
}
