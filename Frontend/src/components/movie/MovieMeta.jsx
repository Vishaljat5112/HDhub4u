import { Link } from "react-router-dom";

const MovieMeta = ({ movie, genres }) => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mb-10 text-[#ddd]">

      {/*  DATE + TAG STRIP  */}
      <div className="flex flex-wrap gap-2 mb-5 text-sm justify-center">
        <span className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 text-white border border-blue-600">
          📅 {today}
        </span>

        {genres.map((g, i) => (
          <span
            key={i}
            className="
              px-3 py-1 rounded
              bg-[#111] border border-[#333]
              text-[#ddd]
              hover:bg-gray-700
              transition cursor-pointer
            "
          >
            {g}
          </span>
        ))}
      </div>

      <hr className="border-t border-[#333] my-6" />

      {/*  DESCRIPTION  */}
      <p className="text-center italic leading-relaxed text-[#bfbfbf] max-w-4xl mx-auto mb-6">
        Download <b>{movie.title}</b> Hindi HDTC 1080p 720p & 480p x264 (LiNE) |{" "}
        Watch {movie.title} Full Movie in Hindi Online Free on{" "}
        <span className="text-[#3ea6ff] font-medium">HDHub4u</span>!
      </p>

      {/*POSTER */}
      <div className="flex justify-center mb-6">
        <img
        src={`${import.meta.env.VITE_API_URL}${movie.poster}`}
          alt={movie.title}
          className="
            w-60 max-w-[90%]
            aspect-2/3
            rounded-lg
            shadow-[0_6px_18px_rgba(0,0,0,0.7)]
          "
        />
      </div>

      {/* ACTION LINKS */}
      <div className="flex flex-col items-center gap-3 mb-8">
        {/* Temporary route  */}
        <Link
          to="/how-to-download"
          className="
            text-[#3ea6ff] font-semibold
            hover:underline
            flex items-center gap-1
          "
        >
          [ How To Download ⬇ ]
        </Link>

        {/* Telegram */}
        <a
          href="https://t.me/+-YI7KVjlMaM0ZWQ0"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            bg-white text-black
            px-4 py-2 rounded
            font-semibold text-sm
          "
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
            alt="Telegram"
            className="w-6 h-6"
          />
          Join us on Telegram
        </a>
      </div>

      <hr className="border-t border-[#333] my-6" />

      {/* MOVIE INFO */}
      <div className="text-center text-sm leading-loose">
        <h2 className="text-white text-lg font-semibold mb-2">
          {movie.title} (Full Movie)
        </h2>

        <div>
          <b>IMDb Rating:</b> {movie.rating || "x"}/10
        </div>

        <div>
          <b>Genre:</b> {genres.join(" | ")}
        </div>

        <div>
          <b>Language:</b>{" "}
          <span className="text-red-500">Hindi (LiNE) & HC-Subs</span>
        </div>

        <div>
          <b>Quality:</b>{" "}
          <span className="text-[#3ea6ff]">HQ-HDTC</span> 1080p | 720p | 480p
        </div>
      </div>

      <hr className="border-t border-[#333] my-6" />
    </div>
  );
};

export default MovieMeta;