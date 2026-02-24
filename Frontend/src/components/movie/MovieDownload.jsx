const MovieDownload = ({ title }) => {
  const downloadLink = "https://example.com";

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

      {/* DIVIDER */}
      <hr className="border-t border-[#333] my-4" />

      {/* TOP TITLE */}
      <h3 className="text-center font-semibold mb-3">
        Download {title} Full Movie in Hindi | HD
      </h3>

      {/* DOWNLOAD LINKS TITLE */}
      <div className="text-center text-red-500 font-semibold my-2">
        : DOWNLOAD LINKS :
      </div>

      <hr className="border-t border-[#333] my-4" />

      {/* SAMPLE */}
      <div className="text-center text-yellow-400 font-semibold py-3">
        [SAMPLE]
      </div>

      <hr className="border-t border-[#333] my-4" />

      {/* QUALITY LINKS */}
      {qualities.map((q, idx) => (
        <div key={idx}>
          <div className="text-center py-3">
            <a
              href={downloadLink}
              target="_blank"
              rel="noreferrer"
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

      {/* WATCH PLAYER */}
      <div className="text-center text-green-500 font-semibold py-5">
        WATCH | PLAYER-2
      </div>

      <hr className="border-t border-[#333]" />
    </div>
  );
};

export default MovieDownload;