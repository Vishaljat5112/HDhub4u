export default function Footer() {
  return (
    <footer className="bg-black py-2 mt-24 rounded-xl">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Film Strip */}
        <div className="w-full h-2 mb-8
                        bg-[repeating-linear-gradient(
                          90deg,
                          #374151 0px,
                          #374151 20px,
                          #1f2937 20px,
                          #1f2937 40px
                        )]" />

        {/* Text */}
        <p className="text-gray-400 text-sm md:text-base mb-6">
          © 2025 <span className="text-gray-300 font-medium">HD Hub 4U</span>.  
          Celebrating the magic of movies worldwide.
        </p>

        {/* Icons */}
        <div className="flex justify-center gap-6 text-2xl text-gray-300">
          <span className="hover:scale-110 transition">🎬</span>
          <span className="hover:scale-110 transition">🍿</span>
          <span className="hover:scale-110 transition">🎭</span>
          <span className="hover:scale-110 transition">🎪</span>
          <span className="hover:scale-110 transition">📽️</span>
        </div>
      </div>
    </footer>
  );
}
