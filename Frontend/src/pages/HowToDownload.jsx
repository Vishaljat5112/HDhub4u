import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";
import { Link } from "react-router-dom";


export default function HowToDownload() {
  const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // here video url

  return (
    <div className="bg-black text-white min-h-screen">

          <TopStrip/>
              <PosterStrip/>
              <Navbar/>
              <AlertBar/>

      {/* GO TO HOME */}
      <div className="flex justify-center py-4 border-b border-gray-800">
        <Link
          to="/"
          className="bg-gray-800 hover:bg-gray-700 transition px-5 py-2 rounded-md text-sm font-medium"
        >
          Go to HomePage 🏠
        </Link>
      </div>

      {/* TITLE */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          📥 How To Download ?
        </h2>

        <p className="text-center text-orange-500 font-semibold text-lg mb-6">
          Watch The Video, To Easily Download Any Content From Site 😃
        </p>

        {/* VIDEO SECTION */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-md aspect-video border border-gray-700 rounded-lg overflow-hidden">
            <iframe
              src={VIDEO_URL}
              title="How To Download Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* STEPS */}
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">

          <h3 className="text-lg font-semibold text-white">
            📌 Follow These Simple Steps:
          </h3>

          <ul className="list-decimal pl-6 space-y-3">
            <li>
              Open <span className="text-yellow-400 font-semibold">HDHub4u</span> official website using VPN for best access.
            </li>
            <li>
              Search your desired <span className="text-white">Movie / Web Series</span> using search bar or categories.
            </li>
            <li>
              Open the movie page and scroll down to the <span className="text-white">Download Section</span>.
            </li>
            <li>
              Select your preferred <span className="text-white">Quality (480p / 720p / 1080p)</span>.
            </li>
            <li>
              Click on the download link and wait for redirect page to load.
            </li>
            <li>
              On redirect page, click <span className="text-green-400 font-semibold">“Generate Download Link”</span>.
            </li>
            <li>
              Your download will start automatically. Enjoy 🎬
            </li>
          </ul>

          {/* NOTE */}
          <div className="bg-gray-900 border border-gray-700 rounded-md p-4 mt-6">
            <p className="text-yellow-400 font-semibold mb-2">⚠ Important Note:</p>
            <p>
              Always use an <span className="text-white">Ad-Blocker</span> and
              <span className="text-white"> VPN</span> for safe & smooth downloading experience.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} HDHub4u.TV • All Rights Reserved</p>
          <p className="mt-2">
            Disclaimer • How To Download • Movie Request • Contact Us
          </p>
        </div>
      </footer>

    </div>
  );
}