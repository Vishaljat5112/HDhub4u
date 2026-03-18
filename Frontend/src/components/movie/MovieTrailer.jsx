const MovieTrailer = ({ title, poster, trailer }) => {
  if (!trailer) return null;

  return (
    <div className="my-16 text-center">

      {/* TITLE */}
      <h3 className="text-red-500 font-semibold mb-5">
        Watch {title} trailer Hindi HD | Watch Online Full Trailer :-
      </h3>

      {/* TRAILER BOX */}
      <a
        href={trailer}
        target="_blank"
        rel="noreferrer"
        className="
          relative inline-block
          w-205 max-w-[95%]
          rounded-xl
          overflow-hidden
          shadow-[0_10px_28px_rgba(0,0,0,0.8)]
          group
        "
      >
        {/* POSTER IMAGE (RECTANGLE) */}
        <img
         src={`${import.meta.env.VITE_API_URL}${poster}`}
          alt={`${title} trailer`}
          className="
            w-full
            aspect-video
            object-cover
            transition-transform duration-300
            group-hover:scale-[1.03]
          "
          loading="lazy"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* PLAY BUTTON */}
        <div
          className="
            absolute inset-0
            flex items-center justify-center
          "
        >
          <div
            className="
              w-16 h-16 sm:w-20 sm:h-20
              rounded-full
              bg-black/60
              flex items-center justify-center
              transition
              group-hover:bg-black/70
            "
          >
            <div
              className="
    ml-1
    w-0 h-0
    border-solid
    border-l-22 sm:border-l-26px border-l-red-600
    border-t-14 sm:border-t-16px border-t-transparent
    border-b-14 sm:border-b-16px border-b-transparent
  "
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default MovieTrailer;