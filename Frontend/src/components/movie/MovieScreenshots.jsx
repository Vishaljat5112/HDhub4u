const MovieScreenshots = ({ screenshots }) => {
  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="my-12 text-center">
      
      {/* TITLE */}
      <h3
        className="
          text-red-500
          mb-6
          tracking-wide
          font-semibold
        "
      >
        : Screen-Shots :
      </h3>

      {/* SCREENSHOTS LIST */}
      <div className="flex flex-col items-center gap-6">
        {screenshots.map((img, idx) => (
          <a
            key={idx}
            href={`${import.meta.env.VITE_API_URL}${img}`}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <img
             src={`${import.meta.env.VITE_API_URL}${img}`}
              alt={`screenshot-${idx}`}
              className="
                w-180 max-w-[95%]
                rounded-md
                shadow-[0_6px_18px_rgba(0,0,0,0.7)]
                cursor-pointer
                transition-transform duration-300
                hover:scale-[1.02]
              "
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default MovieScreenshots;