export default function GenresSection() {
  const genres = [
    {
      title: "Action",
      desc: "High-octane thrills and explosive adventures",
      emoji: "💥",
      bg: "from-red-600 to-red-800",
    },
    {
      title: "Comedy",
      desc: "Laughter and feel-good moments",
      emoji: "😂",
      bg: "from-yellow-600 to-yellow-800",
    },
    {
      title: "Drama",
      desc: "Emotional storytelling and character depth",
      emoji: "🎭",
      bg: "from-blue-600 to-blue-800",
    },
    {
      title: "Sci-Fi",
      desc: "Future worlds and technological wonders",
      emoji: "🚀",
      bg: "from-purple-600 to-purple-800",
    },
    {
      title: "Horror",
      desc: "Spine-chilling scares and supernatural tales",
      emoji: "👻",
      bg: "from-green-600 to-green-800",
    },
    {
      title: "Romance",
      desc: "Love stories that touch the heart",
      emoji: "💕",
      bg: "from-pink-600 to-pink-800",
    },
    {
      title: "Animation",
      desc: "Artistic storytelling through animation",
      emoji: "🎨",
      bg: "from-indigo-600 to-indigo-800",
    },
    {
      title: "Documentary",
      desc: "Real stories and factual narratives",
      emoji: "📽️",
      bg: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <section className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 py-20 rounded-xl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-white mb-16">
          Movie Genres
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {genres.map((g) => (
            <div
              key={g.title}
              className={`rounded-2xl p-8 bg-linear-to-br ${g.bg}
                          shadow-xl hover:shadow-2xl
                          transform hover:-translate-y-2 hover:scale-[1.02]
                          transition-all duration-300 cursor-pointer`}
            >
              <div className="text-4xl mb-4">{g.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {g.title}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
