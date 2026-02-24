const MovieHeader = ({ title }) => {
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #0f0f0f, #1c1c1c)",
        padding: "10px 14px",
        borderRadius: "4px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        flexWrap: "wrap", //  mobile safe
      }}
    >
      <div
        style={{
          width: "18px",
          height: "18px",
          backgroundColor: "#fff",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "700",
          color: "#000",
          flexShrink: 0, //  icon squeeze nahi hoga
        }}
      >
        W
      </div>

      <h1
        style={{
          fontSize: "14px", // mobile friendly
          fontWeight: "600",
          color: "#ffffff",
          lineHeight: "1.5",
          margin: 0,
          wordBreak: "break-word",
        }}
      >
        {title} HQ-HDTC Hindi (LiNE) 1080p 720p & 480p [x264/HEVC] | Full Movie
      </h1>
    </div>
  );
};

export default MovieHeader;