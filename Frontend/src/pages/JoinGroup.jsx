import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";

import { Link } from "react-router-dom";

export default function JoinGroup() {
  const TELEGRAM_LINK = "https://t.me/+-YI7KVjlMaM0ZWQ0"; 

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
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
          📢 Join Our Group !
        </h2>

        <p className="text-center text-blue-400 text-lg font-semibold mb-4">
          Join “HDHub4u TeleGram Channel”
        </p>

        <div className="border-t border-b border-gray-700 py-4 mb-6">
          <p className="text-center text-red-500 font-semibold text-lg">
            U Can Join Our Official TeleGram Channel For Instant Updates!
          </p>
        </div>

        {/* TELEGRAM CARD */}
        <div className="flex justify-center my-10">
          <div className="bg-white rounded-lg p-6 text-black text-center w-full max-w-sm shadow-lg">
            <p className="text-lg font-semibold mb-3">
              For Latest Movie Updates
            </p>

            <div className="flex justify-center mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                alt="Telegram"
                className="w-20 h-20"
              />
            </div>

            <p className="text-xl font-bold mb-4">
              Join our <span className="text-blue-500">Telegram</span> Channel
            </p>

            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 font-semibold hover:underline text-lg"
            >
              ▶ Click Here To Join ◀
            </a>
          </div>
        </div>

        {/* EXTRA INFO */}
        <div className="border-t border-gray-700 pt-6 text-gray-300 text-sm text-center">
          <p>
            We have also opened our new list site with name{" "}
            <span className="text-blue-400 font-semibold">HDHubList.com</span>.
            Here you will get all list of HDHub4u official sites and
            news related to any updates.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} HDHub4u.TV • All Rights Reserved</p>
          <p className="mt-2">
            Disclaimer • How To Download • Join Our Group • Contact Us
          </p>
        </div>
      </footer>

    </div>
  );
}