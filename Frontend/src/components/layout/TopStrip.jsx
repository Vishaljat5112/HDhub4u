import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import hdlogo from "../../assets/hdhub4ulogo.png";

export default function TopStrip() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-black text-white border-b border-gray-800">
      <div className="max-w-350 mx-auto flex items-center justify-between px-4 py-2.5">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>

          <img
            src={hdlogo}
            alt="HDHub4u"
            className="h-15 object-contain"
          />
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/disclaimer" className="hover:bg-gray-800 rounded px-2 transition">
            Disclaimer
          </Link>
          <Link to="/how-to-download" className="hover:bg-gray-800 rounded px-2 transition">
            How To Download ?
          </Link>
          <Link to="/join-group" className="hover:bg-gray-800 rounded px-2 transition">
            Join Our Group !
          </Link>
          <Link to="/movie-request" className="hover:bg-gray-800 rounded px-2 transition">
            Movie Request Page
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link onClick={() => setOpen(false)} to="/disclaimer" className="hover:text-blue-400">
            Disclaimer
          </Link>
          <Link onClick={() => setOpen(false)} to="/how-to-download" className="hover:text-blue-400">
            How To Download ?
          </Link>
          <Link onClick={() => setOpen(false)} to="/join-group" className="hover:text-blue-400">
            Join Our Group !
          </Link>
          <Link onClick={() => setOpen(false)} to="/movie-request" className="hover:text-blue-400">
            Movie Request Page
          </Link>
        </div>
      )}
    </div>
  );
}