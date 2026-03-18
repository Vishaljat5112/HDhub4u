const MovieDownload = ({ title, movieUrl }) => {

  if (!movieUrl) {
    return (
      <div className="my-16 text-center text-red-400">
        Movie file not available
      </div>
    );
  }

  // Cloudinary direct download trick
  const downloadUrl = movieUrl.replace("/upload/", "/upload/fl_attachment/");

  const qualities = [
    "480p ⚡ [400MB]",
    "720p HEVC [750MB]",
    "720p x264 [1.1GB]",
    "1080p HEVC [1.7GB]",
    "1080p x264 [2.6GB]",
    "HQ-Rip 1080p [6.8GB]",
    "HQ 1080p [13.5GB]",
  ];

  return (
    <div className="my-16 text-[#ddd]">

      <hr className="border-t border-[#333] my-4" />

      {/* TITLE */}
      <h3 className="text-center font-semibold mb-3">
        Download {title} Full Movie in Hindi | HD
      </h3>

      {/* DOWNLOAD HEADER */}
      <div className="text-center text-red-500 font-semibold my-2">
        : DOWNLOAD LINKS :
      </div>

      <hr className="border-t border-[#333] my-4" />

      {/* DOWNLOAD LINKS */}
      {qualities.map((q, idx) => (
        <div key={idx}>
          <div className="text-center py-3">
            <a
              href={downloadUrl}
              className="
                text-[#3ea6ff]
                text-base
                font-medium
                hover:underline
              "
            >
              {q}
            </a>
          </div>
          <hr className="border-t border-[#333]" />
        </div>
      ))}

      {/* STREAM PLAYER */}

      <div className="mt-10">

        <h3 className="text-center text-green-500 font-semibold mb-4">
          WATCH ONLINE
        </h3>

        <div className="flex justify-center">

          <video
            controls
            className="
              w-full
              max-w-4xl
              rounded-lg
              shadow-lg
              border border-[#333]
            "
          >
            <source src={movieUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>

      </div>

      <hr className="border-t border-[#333] mt-6" />

    </div>
  );
};

export default MovieDownload;