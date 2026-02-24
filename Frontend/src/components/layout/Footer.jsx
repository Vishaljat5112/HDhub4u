import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-b from-[#1a1a1a] to-black border-t border-gray-800 py-6 px-4 text-sm">
      <div className="max-w-350 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-gray-300 text-lg">
          2026 ©{" "}
          <span className="text-blue-400 font-semibold">HDHub4u.Tv</span> | All Rights Reserved.
        </p>

        <div className="flex flex-wrap gap-6 text-blue-400 text-lg">
          <Link
            to="/disclaimer"
            className="hover:text-white transition"
          >
            Disclaimer
          </Link>

          <Link
            to="/join-group"
            className="hover:text-white transition"
          >
            Join Our Group !
          </Link>

          <Link
            to="/how-to-download"
            className="hover:text-white transition"
          >
            How To Download ?
          </Link>

          <Link
            to="/movie-request"
            className="hover:text-white transition"
          >
            Movie Request Page
          </Link>
        </div>

      </div>
    </footer>
  );
}